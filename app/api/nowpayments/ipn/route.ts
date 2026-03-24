import { NextResponse } from "next/server";
import { PrismaNowPaymentsRepository } from "@/lib/nowpayments/ipn/repository";
import { NowPaymentsIpnService } from "@/lib/nowpayments/ipn/service";
import { TelegramPaymentFulfillmentService } from "@/services/fulfillment/telegram";

export const runtime = "nodejs";

const service = new NowPaymentsIpnService(
  new PrismaNowPaymentsRepository(),
  new TelegramPaymentFulfillmentService(),
  process.env.NOWPAYMENTS_IPN_SECRET,
);

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-nowpayments-sig");

  const signatureResult = service.verifySignature(rawBody, signature);
  if (!signatureResult.ok) {
    console.warn("NOWPayments IPN rejected", {
      reason: signatureResult.reason,
      detail: signatureResult.message,
      hasSignature: Boolean(signature),
    });

    return NextResponse.json(
      { ok: false, error: signatureResult.message },
      { status: 401 },
    );
  }

  const payloadResult = service.parsePayload(rawBody);
  if (!payloadResult.ok) {
    console.warn("NOWPayments IPN payload invalid", {
      error: payloadResult.message,
      issues: payloadResult.issues,
    });

    return NextResponse.json(
      {
        ok: false,
        error: payloadResult.message,
        issues: payloadResult.issues,
      },
      { status: 400 },
    );
  }

  const freshnessResult = service.validateFreshness(payloadResult.payload);
  if (!freshnessResult.ok) {
    console.warn("NOWPayments IPN rejected", {
      reason: freshnessResult.reason,
      detail: freshnessResult.message,
      payment_id: payloadResult.payload.payment_id,
      payment_status: payloadResult.payload.payment_status,
    });

    return NextResponse.json(
      { ok: false, error: freshnessResult.message },
      { status: 400 },
    );
  }

  try {
    const result = await service.processPayload(payloadResult.payload, freshnessResult.eventTimestamp);

    return NextResponse.json(
      {
        ok: true,
        result: result.kind,
        payment_id: result.paymentId,
        payment_status: result.status,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("NOWPayments IPN processing failed", {
      error: error instanceof Error ? error.message : String(error),
      payment_id: payloadResult.payload.payment_id,
    });

    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
