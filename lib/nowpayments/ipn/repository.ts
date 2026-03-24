import prisma from "@/lib/prisma.js";
import { Prisma } from "@prisma/client";
import type { NowPaymentsIpnPayload } from "@/lib/nowpayments/ipn/types";

type PaymentRecord = {
  paymentId: string;
  status: string;
  processedAt: Date | null;
};

const CLAIMED_AT_SENTINEL = new Date(0);

export interface PaymentRepository {
  findByPaymentId(paymentId: string): Promise<PaymentRecord | null>;
  saveWebhookEvent(payload: NowPaymentsIpnPayload): Promise<void>;
  registerReplayFingerprint(fingerprint: string, payload: NowPaymentsIpnPayload, eventTimestamp: Date): Promise<boolean>;
  claimForFulfillment(paymentId: string): Promise<boolean>;
  markFulfillmentCompleted(paymentId: string): Promise<void>;
  releaseFulfillmentClaim(paymentId: string): Promise<void>;
}

export class PrismaNowPaymentsRepository implements PaymentRepository {
  async findByPaymentId(paymentId: string): Promise<PaymentRecord | null> {
    const payment = await prisma.payment.findUnique({
      where: { paymentId },
      select: {
        paymentId: true,
        status: true,
        inviteSentAt: true,
      },
    });

    if (!payment) {
      return null;
    }

    return {
      paymentId: payment.paymentId,
      status: payment.status,
      processedAt: payment.inviteSentAt,
    };
  }

  async saveWebhookEvent(payload: NowPaymentsIpnPayload): Promise<void> {
    const raw = payload as Prisma.InputJsonValue;

    await prisma.payment.upsert({
      where: { paymentId: payload.payment_id },
      create: {
        paymentId: payload.payment_id,
        status: payload.payment_status,
        raw,
      },
      update: {
        status: payload.payment_status,
        raw,
      },
    });
  }

  async registerReplayFingerprint(
    fingerprint: string,
    payload: NowPaymentsIpnPayload,
    eventTimestamp: Date,
  ): Promise<boolean> {
    try {
      await prisma.paymentWebhookEvent.create({
        data: {
          fingerprint,
          paymentId: payload.payment_id,
          paymentStatus: payload.payment_status,
          eventTimestamp,
        },
      });

      return true;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return false;
      }

      throw error;
    }
  }

  async claimForFulfillment(paymentId: string): Promise<boolean> {
    const result = await prisma.payment.updateMany({
      where: {
        paymentId,
        inviteSentAt: null,
      },
      data: {
        inviteSentAt: CLAIMED_AT_SENTINEL,
      },
    });

    return result.count === 1;
  }

  async markFulfillmentCompleted(paymentId: string): Promise<void> {
    await prisma.payment.update({
      where: { paymentId },
      data: { inviteSentAt: new Date() },
    });
  }

  async releaseFulfillmentClaim(paymentId: string): Promise<void> {
    await prisma.payment.update({
      where: { paymentId },
      data: { inviteSentAt: null },
    });
  }
}
