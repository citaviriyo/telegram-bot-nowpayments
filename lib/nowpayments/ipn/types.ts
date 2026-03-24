import { z } from "zod";

const numericField = z.coerce.number().finite();
const timestampField = z.union([z.string().trim().min(1), z.number().finite()]);

export const nowPaymentsIpnSchema = z.object({
  payment_id: z.string().trim().min(1, "payment_id is required"),
  payment_status: z.string().trim().min(1, "payment_status is required"),
  pay_address: z.string().trim().min(1, "pay_address is required"),
  price_amount: numericField,
  price_currency: z.string().trim().min(1, "price_currency is required"),
  pay_amount: numericField.optional(),
  pay_currency: z.string().trim().min(1, "pay_currency is required"),
  order_id: z.union([z.string(), z.number()]).optional().transform((value) => {
    if (value === undefined || value === null) {
      return undefined;
    }

    return String(value);
  }),
  order_description: z.string().optional(),
  actually_paid: numericField.optional(),
  invoice_id: z.union([z.string(), z.number()]).optional().transform((value) => {
    if (value === undefined || value === null) {
      return undefined;
    }

    return String(value);
  }),
  created_at: timestampField.optional(),
  updated_at: timestampField.optional(),
  pay_time: timestampField.optional(),
}).passthrough();

export type NowPaymentsIpnPayload = z.infer<typeof nowPaymentsIpnSchema>;

export type SignatureValidationResult =
  | { ok: true }
  | { ok: false; message: string; reason: "invalid signature" };

export type PayloadParseResult =
  | { ok: true; payload: NowPaymentsIpnPayload }
  | { ok: false; message: string; issues?: string[] };

export type WebhookFreshnessResult =
  | { ok: true; eventTimestamp: Date; timestampSource: "updated_at" | "pay_time" | "created_at" }
  | { ok: false; message: string; reason: "expired webhook" };

export type ReplayProtectionResult =
  | { ok: true; fingerprint: string }
  | { ok: false; reason: "replay detected"; fingerprint: string };

export type FulfillmentResult = {
  ok: boolean;
  retryable: boolean;
  message?: string;
};

export interface PaymentFulfillmentService {
  fulfillPayment(payload: NowPaymentsIpnPayload): Promise<FulfillmentResult>;
}

export type ProcessedWebhookResult =
  | { kind: "processed"; paymentId: string; status: string }
  | { kind: "already_processed"; paymentId: string; status: string }
  | { kind: "ignored"; paymentId: string; status: string }
  | { kind: "replay_detected"; paymentId: string; status: string };
