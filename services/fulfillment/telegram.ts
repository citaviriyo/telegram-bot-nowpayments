import prisma from "@/lib/prisma.js";
import type {
  FulfillmentResult,
  NowPaymentsIpnPayload,
  PaymentFulfillmentService,
} from "@/lib/nowpayments/ipn/types";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function parseOrderDescription(description?: string): { telegramId: string; days: number; plan: string } | null {
  if (!description) {
    return null;
  }

  const parts = description.split("|").map((part) => part.trim());
  if (parts.length < 3) {
    return null;
  }

  const telegramId = parts[1];
  const packageLabel = parts[2].toLowerCase();

  if (!telegramId) {
    return null;
  }

  if (packageLabel.includes("1bulan")) {
    return { telegramId, days: 30, plan: "vip" };
  }

  if (packageLabel.includes("3bulan")) {
    return { telegramId, days: 90, plan: "vip" };
  }

  if (
    packageLabel.includes("1tahun") ||
    packageLabel.includes("12bulan") ||
    packageLabel.includes("12bln")
  ) {
    return { telegramId, days: 365, plan: "vip" };
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
    const parsedOrder = parseOrderDescription(payload.order_description);
    if (!parsedOrder) {
      return {
        ok: false,
        retryable: false,
        message: "Unable to determine Telegram user from order_description",
      };
    }

    const { telegramId, days, plan } = parsedOrder;
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
          telegramId,
          isInGroup,
        };
      });

      const message = member.isInGroup
        ? `<b>Subscription renewed successfully.</b>\n\nPlan: <b>${escapeHtml(plan.toUpperCase())}</b>\nAdded duration: <b>${days} days</b>\nActive until: <b>${formatDate(member.endsAt)}</b>\n\nYou are still in the VIP group, so no new invite link is needed.`
        : `<b>Payment received successfully.</b>\n\nPlan: <b>${escapeHtml(plan.toUpperCase())}</b>\nDuration: <b>${days} days</b>\nActive until: <b>${formatDate(member.endsAt)}</b>\n\nJoin link (single use):\n${escapeHtml(member.inviteLink || "")}\n\nIf the link expires or fails, please contact support.`;

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
