import crypto from "crypto";
import { buildSafeWebhookLog } from "@/lib/nowpayments/ipn/logger";
import type { PaymentRepository } from "@/lib/nowpayments/ipn/repository";
import {
  nowPaymentsIpnSchema,
  type NowPaymentsIpnPayload,
  type PayloadParseResult,
  type PaymentFulfillmentService,
  type ProcessedWebhookResult,
  type ReplayProtectionResult,
  type SignatureValidationResult,
  type WebhookFreshnessResult,
} from "@/lib/nowpayments/ipn/types";

const PROCESSABLE_STATUSES = new Set(["confirmed", "finished"]);
const MAX_EVENT_AGE_MS = 5 * 60 * 1000;

export class NowPaymentsIpnService {
  constructor(
    private readonly repository: PaymentRepository,
    private readonly fulfillmentService: PaymentFulfillmentService,
    private readonly ipnSecret: string | undefined,
  ) {}

  verifySignature(rawBody: string, signature: string | null): SignatureValidationResult {
    if (!this.ipnSecret) {
      return { ok: true };
    }

    if (!signature) {
      return {
        ok: false,
        message: "Missing x-nowpayments-sig header",
        reason: "invalid signature",
      };
    }

    const expectedSignature = crypto
      .createHmac("sha512", this.ipnSecret)
      .update(rawBody, "utf8")
      .digest("hex");

    const providedBuffer = Buffer.from(signature.trim().toLowerCase(), "utf8");
    const expectedBuffer = Buffer.from(expectedSignature.trim().toLowerCase(), "utf8");

    if (
      providedBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(providedBuffer, expectedBuffer)
    ) {
      return {
        ok: false,
        message: "Invalid IPN signature",
        reason: "invalid signature",
      };
    }

    return { ok: true };
  }

  parsePayload(rawBody: string): PayloadParseResult {
    let parsedJson: unknown;

    try {
      parsedJson = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      return { ok: false, message: "Request body must be valid JSON" };
    }

    const validation = nowPaymentsIpnSchema.safeParse(parsedJson);
    if (!validation.success) {
      return {
        ok: false,
        message: "Webhook payload is missing required fields",
        issues: validation.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`),
      };
    }

    return { ok: true, payload: validation.data };
  }

  validateFreshness(payload: NowPaymentsIpnPayload, now = new Date()): WebhookFreshnessResult {
    const candidates: Array<["updated_at" | "pay_time" | "created_at", string | number | undefined]> = [
      ["updated_at", payload.updated_at],
      ["pay_time", payload.pay_time],
      ["created_at", payload.created_at],
    ];

    for (const [source, value] of candidates) {
      const parsed = this.parseTimestamp(value);
      if (!parsed) {
        continue;
      }

      const ageMs = now.getTime() - parsed.getTime();
      if (ageMs < 0 || ageMs <= MAX_EVENT_AGE_MS) {
        return { ok: true, eventTimestamp: parsed, timestampSource: source };
      }

      return {
        ok: false,
        message: `Webhook timestamp is older than ${MAX_EVENT_AGE_MS / 60000} minutes`,
        reason: "expired webhook",
      };
    }

    return {
      ok: false,
      message: "Webhook payload must include a valid created_at, updated_at, or pay_time timestamp",
      reason: "expired webhook",
    };
  }

  async protectAgainstReplay(
    payload: NowPaymentsIpnPayload,
    eventTimestamp: Date,
  ): Promise<ReplayProtectionResult> {
    const fingerprint = this.createReplayFingerprint(payload, eventTimestamp);
    const isNewEvent = await this.repository.registerReplayFingerprint(fingerprint, payload, eventTimestamp);

    if (!isNewEvent) {
      return {
        ok: false,
        reason: "replay detected",
        fingerprint,
      };
    }

    return {
      ok: true,
      fingerprint,
    };
  }

  async processPayload(
    payload: NowPaymentsIpnPayload,
    eventTimestamp: Date,
  ): Promise<ProcessedWebhookResult> {
    console.info("NOWPayments IPN received", buildSafeWebhookLog(payload));

    const replayResult = await this.protectAgainstReplay(payload, eventTimestamp);
    if (!replayResult.ok) {
      console.warn("NOWPayments IPN rejected", {
        reason: replayResult.reason,
        payment_id: payload.payment_id,
        payment_status: payload.payment_status.toLowerCase(),
        fingerprint: replayResult.fingerprint,
      });

      return {
        kind: "replay_detected",
        paymentId: payload.payment_id,
        status: payload.payment_status.toLowerCase(),
      };
    }

    await this.repository.saveWebhookEvent(payload);

    const normalizedStatus = payload.payment_status.toLowerCase();
    if (!PROCESSABLE_STATUSES.has(normalizedStatus)) {
      console.info("NOWPayments IPN ignored due to non-final status", {
        payment_id: payload.payment_id,
        payment_status: normalizedStatus,
      });

      return {
        kind: "ignored",
        paymentId: payload.payment_id,
        status: normalizedStatus,
      };
    }

    const claimed = await this.repository.claimForFulfillment(payload.payment_id);
    if (!claimed) {
      console.info("NOWPayments IPN already processed", {
        payment_id: payload.payment_id,
        payment_status: normalizedStatus,
      });

      return {
        kind: "already_processed",
        paymentId: payload.payment_id,
        status: normalizedStatus,
      };
    }

    console.info("NOWPayments payment processed", {
      payment_id: payload.payment_id,
      payment_status: normalizedStatus,
    });

    console.info("NOWPayments fulfillment triggered", {
      payment_id: payload.payment_id,
    });

    try {
      const fulfillmentResult = await this.fulfillmentService.fulfillPayment(payload);

      if (fulfillmentResult.ok) {
        await this.repository.markFulfillmentCompleted(payload.payment_id);

        console.info("NOWPayments fulfillment success", {
          payment_id: payload.payment_id,
        });
      } else {
        if (fulfillmentResult.retryable) {
          await this.repository.releaseFulfillmentClaim(payload.payment_id);
        } else {
          await this.repository.markFulfillmentCompleted(payload.payment_id);
        }

        console.error("NOWPayments fulfillment failure", {
          payment_id: payload.payment_id,
          retryable: fulfillmentResult.retryable,
          reason: fulfillmentResult.message,
        });
      }
    } catch (error) {
      await this.repository.releaseFulfillmentClaim(payload.payment_id);

      console.error("NOWPayments fulfillment failure", {
        payment_id: payload.payment_id,
        retryable: true,
        reason: error instanceof Error ? error.message : String(error),
      });
    }

    return {
      kind: "processed",
      paymentId: payload.payment_id,
      status: normalizedStatus,
    };
  }

  private parseTimestamp(value: string | number | undefined): Date | null {
    if (value === undefined) {
      return null;
    }

    if (typeof value === "number") {
      const timestampMs = value > 1_000_000_000_000 ? value : value * 1000;
      const parsed = new Date(timestampMs);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    const numericValue = Number(value);
    if (!Number.isNaN(numericValue) && value.trim() !== "") {
      const timestampMs = numericValue > 1_000_000_000_000 ? numericValue : numericValue * 1000;
      const parsedNumeric = new Date(timestampMs);
      if (!Number.isNaN(parsedNumeric.getTime())) {
        return parsedNumeric;
      }
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  private createReplayFingerprint(payload: NowPaymentsIpnPayload, eventTimestamp: Date): string {
    const fingerprintSource = [
      payload.payment_id,
      payload.payment_status.toLowerCase(),
      eventTimestamp.toISOString(),
    ].join("|");

    return crypto.createHash("sha256").update(fingerprintSource, "utf8").digest("hex");
  }
}
