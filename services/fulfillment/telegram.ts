import prisma from "@/lib/prisma.js";
import type {
  FulfillmentResult,
  NowPaymentsIpnPayload,
  PaymentFulfillmentService,
} from "@/lib/nowpayments/ipn/types";

type ParsedPaymentDetails = {
  source: "order_description" | "order_id";
  telegramId: string;
  userId: number;
  plan: string;
  planLabel: string;
  days: number;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatDate(date: Date): string {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

function parseTelegramUserId(value: string | undefined): { telegramId: string; userId: number } | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim();
  if (!/^\d+$/.test(normalized)) {
    return null;
  }

  const userId = Number(normalized);
  if (!Number.isSafeInteger(userId) || userId <= 0) {
    return null;
  }

  return {
    telegramId: normalized,
    userId,
  };
}

function parsePlan(packageLabel: string): { plan: string; planLabel: string; days: number } | null {
  const normalized = packageLabel.trim().toLowerCase();

  if (normalized.includes("1bulan") || normalized === "monthly") {
    return { plan: "vip", planLabel: "1bulan", days: 30 };
  }

  if (normalized.includes("3bulan")) {
    return { plan: "vip", planLabel: "3bulan", days: 90 };
  }

  if (
    normalized.includes("1tahun") ||
    normalized.includes("12bulan") ||
    normalized.includes("12bln") ||
    normalized === "yearly"
  ) {
    return { plan: "vip", planLabel: "1tahun", days: 365 };
  }

  return null;
}

function parseOrderDescription(description?: string): ParsedPaymentDetails | null {
  if (!description) {
    return null;
  }

  const parts = description.split("|").map((part) => part.trim());
  if (parts.length < 3) {
    return null;
  }

  const parsedUser = parseTelegramUserId(parts[1]);
  const parsedPlan = parsePlan(parts[2]);
  if (!parsedUser || !parsedPlan) {
    return null;
  }

  return {
    source: "order_description",
    telegramId: parsedUser.telegramId,
    userId: parsedUser.userId,
    plan: parsedPlan.plan,
    planLabel: parsedPlan.planLabel,
    days: parsedPlan.days,
  };
}

function parseOrderIdFallback(orderId?: string): ParsedPaymentDetails | null {
  if (!orderId) {
    return null;
  }

  const parts = orderId.split("_").map((part) => part.trim());
  if (parts.length < 2) {
    return null;
  }

  const parsedPlan = parsePlan(parts[0]);
  const parsedUser = parseTelegramUserId(parts[1]);
  if (!parsedPlan || !parsedUser) {
    return null;
  }

  return {
    source: "order_id",
    telegramId: parsedUser.telegramId,
    userId: parsedUser.userId,
    plan: parsedPlan.plan,
    planLabel: parsedPlan.planLabel,
    days: parsedPlan.days,
  };
}

function extractPaymentDetails(payload: NowPaymentsIpnPayload): ParsedPaymentDetails | null {
  const parsedFromDescription = parseOrderDescription(payload.order_description);
  if (parsedFromDescription) {
    console.info("NOWPayments parsed order_description", {
      payment_id: payload.payment_id,
      userId: parsedFromDescription.userId,
      plan: parsedFromDescription.planLabel,
    });

    return parsedFromDescription;
  }

  console.error("NOWPayments order_description missing or malformed", {
    payment_id: payload.payment_id,
    order_description: payload.order_description,
  });

  const parsedFromOrderId = parseOrderIdFallback(payload.order_id);
  if (parsedFromOrderId) {
    console.info("NOWPayments parsed order_id fallback", {
      payment_id: payload.payment_id,
      userId: parsedFromOrderId.userId,
      plan: parsedFromOrderId.planLabel,
    });

    return parsedFromOrderId;
  }

  return null;
}

async function telegramApi<T>(method: string, body: Record<string, unknown>): Promise<T> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  if (!token) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN");
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as { ok: boolean; result?: T; description?: string };
  if (!data.ok || !data.result) {
    throw new Error(data.description || `Telegram API ${method} failed`);
  }

  return data.result;
}

async function getMembershipStatus(telegramId: string): Promise<string> {
  const groupId = process.env.TELEGRAM_GROUP_ID?.trim();
  if (!groupId) {
    throw new Error("Missing TELEGRAM_GROUP_ID");
  }

  try {
    const result = await telegramApi<{ status: string }>("getChatMember", {
      chat_id: Number(groupId),
      user_id: Number(telegramId),
    });

    return result.status;
  } catch {
    return "unknown";
  }
}

async function createInviteLink(): Promise<string> {
  const groupId = process.env.TELEGRAM_GROUP_ID?.trim();
  if (!groupId) {
    throw new Error("Missing TELEGRAM_GROUP_ID");
  }

  const result = await telegramApi<{ invite_link: string }>("createChatInviteLink", {
    chat_id: Number(groupId),
    name: "KOINITY VIP Invite (1x)",
    member_limit: 1,
    expire_date: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    creates_join_request: false,
  });

  return result.invite_link;
}

async function sendHtmlMessage(telegramId: string, html: string): Promise<void> {
  await telegramApi("sendMessage", {
    chat_id: Number(telegramId),
    text: html,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

export class TelegramPaymentFulfillmentService implements PaymentFulfillmentService {
  async fulfillPayment(payload: NowPaymentsIpnPayload): Promise<FulfillmentResult> {
    const paymentDetails = extractPaymentDetails(payload);
    if (!paymentDetails) {
      console.error("NOWPayments fulfillment skipped due to malformed order data", {
        payment_id: payload.payment_id,
        order_description: payload.order_description,
        order_id: payload.order_id,
      });

      return {
        ok: false,
        retryable: false,
        message: "Unable to determine Telegram user and plan from order_description or order_id",
      };
    }

    const { telegramId, days, plan, planLabel } = paymentDetails;
    const now = new Date();

    try {
      const membershipStatus = await getMembershipStatus(telegramId);
      const isInGroup = ["member", "administrator", "creator"].includes(membershipStatus);
      const inviteLink = isInGroup ? null : await createInviteLink();

      const member = await prisma.$transaction(async (tx) => {
        const lastActiveSubscription = await tx.subscription.findFirst({
          where: {
            member: { telegramId },
            plan,
            status: "active",
          },
          orderBy: { endsAt: "desc" },
        });

        const baseTime =
          lastActiveSubscription?.endsAt && lastActiveSubscription.endsAt.getTime() > now.getTime()
            ? lastActiveSubscription.endsAt
            : now;

        const endsAt = new Date(baseTime.getTime() + days * 24 * 60 * 60 * 1000);

        const memberRecord = await tx.member.upsert({
          where: { telegramId },
          create: {
            telegramId,
            expiredAt: endsAt,
            status: "ACTIVE",
            inviteLink: inviteLink ?? undefined,
          },
          update: {
            expiredAt: endsAt,
            status: "ACTIVE",
            inviteLink: inviteLink ?? undefined,
          },
        });

        const currentSubscription = await tx.subscription.findFirst({
          where: {
            memberId: memberRecord.id,
            plan,
            status: "active",
          },
          orderBy: { endsAt: "desc" },
        });

        if (currentSubscription) {
          await tx.subscription.update({
            where: { id: currentSubscription.id },
            data: {
              endsAt,
              status: "active",
              lastCheckedAt: now,
            },
          });
        } else {
          await tx.subscription.create({
            data: {
              memberId: memberRecord.id,
              plan,
              startsAt: now,
              endsAt,
              status: "active",
              lastCheckedAt: now,
            },
          });
        }

        return {
          endsAt,
          inviteLink,
          isInGroup,
        };
      });

      const message = member.isInGroup
        ? `\u{1F389} <b>Pembayaran berhasil diterima</b>\n\n\u{1F4E6} <b>Paket:</b> ${escapeHtml(planLabel.toUpperCase())}\n\u{23F3} <b>Durasi:</b> ${days} hari\n\u{1F4C5} <b>Berlaku sampai:</b> ${escapeHtml(formatDate(member.endsAt))}\n\n\u{26A0}\u{FE0F} Kamu masih berada di grup VIP, jadi tidak perlu link undangan baru. Jika ada kendala, silakan hubungi admin: @koinity_admin.`
        : `\u{1F389} <b>Pembayaran berhasil diterima</b>\n\n\u{1F4E6} <b>Paket:</b> ${escapeHtml(planLabel.toUpperCase())}\n\u{23F3} <b>Durasi:</b> ${days} hari\n\u{1F4C5} <b>Berlaku sampai:</b> ${escapeHtml(formatDate(member.endsAt))}\n\n\u{1F517} <b>Link undangan (sekali pakai):</b>\n${escapeHtml(member.inviteLink || "")}\n\n\u{1F449} Klik link di atas untuk bergabung ke grup.\n\n\u{26A0}\u{FE0F} Jika link kadaluarsa atau tidak berfungsi, silakan hubungi admin: @koinity_admin.`;

      try {
        await sendHtmlMessage(telegramId, message);
      } catch (error) {
        console.error("Telegram fulfillment message failed", {
          payment_id: payload.payment_id,
          telegram_id: telegramId,
          error: error instanceof Error ? error.message : String(error),
        });
      }

      return { ok: true, retryable: false };
    } catch (error) {
      return {
        ok: false,
        retryable: true,
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
