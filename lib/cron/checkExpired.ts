import prisma from "../prisma";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const VIP_GROUP_ID = process.env.TELEGRAM_GROUP_ID;
const TG_API = BOT_TOKEN ? `https://api.telegram.org/bot${BOT_TOKEN}` : null;

type RunOpts = {
  dryRun?: boolean;
  writeDb?: boolean;
};

type ChatMemberResult = {
  status?: string;
  leftGroup: boolean;
};

type MemberWithActiveSubscriptions = any;

type CandidateUser = {
  telegramId: string;
  member: MemberWithActiveSubscriptions | null;
  source: "member" | "payment";
};

function assertEnv() {
  if (!BOT_TOKEN) throw new Error("Missing TELEGRAM_BOT_TOKEN");
  if (!VIP_GROUP_ID) throw new Error("Missing TELEGRAM_GROUP_ID");
  if (!TG_API) throw new Error("Missing TG_API");
}

function toTgId(telegramId: string) {
  const n = Number(telegramId);
  if (!Number.isFinite(n)) throw new Error(`Invalid telegramId: ${telegramId}`);
  return n;
}

function isAdminOrOwner(status?: string) {
  return status === "creator" || status === "administrator";
}

function isAlreadyLeftStatus(status?: string) {
  return status === "left" || status === "kicked";
}

function isAlreadyLeftError(message: string) {
  return /user not found|member not found|participant_id_invalid|user_not_participant/i.test(message);
}

function extractTelegramIdFromOrderDescription(raw: unknown): string | null {
  const orderDescription =
    raw && typeof raw === "object" && "order_description" in raw
      ? (raw as { order_description?: unknown }).order_description
      : undefined;

  if (typeof orderDescription !== "string") {
    return null;
  }

  const parts = orderDescription.split("|").map((part) => part.trim());
  if (parts.length < 3) {
    return null;
  }

  const telegramId = parts[1];
  return /^\d+$/.test(telegramId) ? telegramId : null;
}

async function tgPost(method: string, body: Record<string, unknown>) {
  const response = await fetch(`${TG_API}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || (data && data.ok === false)) {
    throw new Error(`Telegram API error ${method}: ${JSON.stringify(data)}`);
  }

  return data;
}

async function tgSendMessage(chatId: number, text: string) {
  return tgPost("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

async function tgKick(groupId: string, userId: number) {
  await tgPost("banChatMember", {
    chat_id: Number(groupId),
    user_id: Number(userId),
    revoke_messages: false,
  });

  await tgPost("unbanChatMember", {
    chat_id: Number(groupId),
    user_id: Number(userId),
    only_if_banned: true,
  });
}

async function tgGetChatMemberSafe(groupId: string, userId: number): Promise<ChatMemberResult> {
  try {
    const data = await tgPost("getChatMember", {
      chat_id: Number(groupId),
      user_id: Number(userId),
    });

    const status = data?.result?.status as string | undefined;
    return {
      status,
      leftGroup: isAlreadyLeftStatus(status),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (isAlreadyLeftError(message)) {
      return { status: "left", leftGroup: true };
    }

    throw error;
  }
}

async function connectWithRetry(retries = 3, delayMs = 1500) {
  for (let i = 1; i <= retries; i++) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return;
    } catch (error) {
      console.warn(`Prisma connect attempt ${i} failed`);
      if (i === retries) throw error;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

export async function runCheckExpired(opts: RunOpts = {}) {
  assertEnv();
  await connectWithRetry();

  const dryRun = Boolean(opts.dryRun);
  const writeDb = Boolean(opts.writeDb);

  const now = new Date();
  console.log("NOW", now.toISOString());
  const in3Days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const in1Day = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);

  const stats = {
    warnH3: 0,
    warnH1: 0,
    expiredFound: 0,
    kicked: 0,
    skippedAdminOwner: 0,
    alreadyLeft: 0,
    dryRun,
    errors: [] as Array<{
      subId: string;
      telegramId?: string;
      step: string;
      error: string;
    }>,
  };

  async function safeStep(
    subId: string,
    telegramId: string | undefined,
    step: string,
    fn: () => Promise<void>,
  ) {
    try {
      await fn();
    } catch (error) {
      const message = String((error as Error)?.message || error);
      console.warn(`CRON WARN step=${step}`, { subId, telegramId, error: message });
      stats.errors.push({ subId, telegramId, step, error: message });
    }
  }

  async function processBatches(
    findManyArgs: Record<string, unknown>,
    handler: (subscription: any) => Promise<void>,
  ) {
    let loop = 0;
    while (loop < 50) {
      loop += 1;
      const list = await prisma.subscription.findMany({
        ...findManyArgs,
        take: 100,
        orderBy: { endsAt: "asc" },
      });

      if (!list.length) {
        break;
      }

      for (const subscription of list) {
        await handler(subscription);
      }
    }
  }

  try {
    await processBatches(
      {
        where: {
          status: "active",
          warn3SentAt: null,
          endsAt: { gt: now, lte: in3Days },
        },
        include: { member: true },
      },
      async (subscription) => {
        const telegramId = subscription?.member?.telegramId;
        if (!telegramId) {
          return;
        }

        stats.warnH3 += 1;
        const chatId = toTgId(telegramId);

        if (!dryRun) {
          await safeStep(subscription.id, telegramId, "H3_SEND", () =>
            tgSendMessage(
              chatId,
              `<b>Reminder H-3</b>\n\nLangganan VIP kamu akan <b>berakhir dalam 3 hari</b>.\nSilakan segera perpanjang.`,
            ),
          );
        }

        if (!dryRun || writeDb) {
          await safeStep(subscription.id, telegramId, "H3_DB", async () => {
            await prisma.subscription.update({
              where: { id: subscription.id },
              data: { warn3SentAt: now },
            });
          });
        }
      },
    );

    await processBatches(
      {
        where: {
          status: "active",
          warn1SentAt: null,
          endsAt: { gt: now, lte: in1Day },
        },
        include: { member: true },
      },
      async (subscription) => {
        const telegramId = subscription?.member?.telegramId;
        if (!telegramId) {
          return;
        }

        stats.warnH1 += 1;
        const chatId = toTgId(telegramId);

        if (!dryRun) {
          await safeStep(subscription.id, telegramId, "H1_SEND", () =>
            tgSendMessage(
              chatId,
              `<b>Reminder H-1</b>\n\nLangganan VIP akan <b>berakhir dalam 24 jam</b>.\nJika tidak diperpanjang, kamu akan dikeluarkan dari grup.`,
            ),
          );
        }

        if (!dryRun || writeDb) {
          await safeStep(subscription.id, telegramId, "H1_DB", async () => {
            await prisma.subscription.update({
              where: { id: subscription.id },
              data: { warn1SentAt: now, lastCheckedAt: now },
            });
          });
        }
      },
    );

    const membersForExpiredCheck = await prisma.member.findMany({
      include: {
        subscriptions: {
          where: { status: "active" },
          orderBy: [{ endsAt: "desc" }, { id: "desc" }],
        },
      },
      orderBy: { updatedAt: "asc" },
    });

    const paymentCandidates = await prisma.payment.findMany({
      select: {
        id: true,
        raw: true,
      },
      orderBy: { createdAt: "asc" },
    });

    const candidateUserMap = new Map<string, CandidateUser>();

    for (const member of membersForExpiredCheck) {
      candidateUserMap.set(member.telegramId, {
        telegramId: member.telegramId,
        member,
        source: "member",
      });
    }

    for (const payment of paymentCandidates) {
      const telegramId = extractTelegramIdFromOrderDescription(payment.raw);
      if (!telegramId || candidateUserMap.has(telegramId)) {
        continue;
      }

      candidateUserMap.set(telegramId, {
        telegramId,
        member: null,
        source: "payment",
      });
    }

    for (const candidate of candidateUserMap.values()) {
      const telegramId = candidate.telegramId;
      const member = candidate.member;
      const activeSubscription = member?.subscriptions[0] ?? null;
      const subscriptionId = activeSubscription?.id ?? member?.id ?? `unauthorized:${telegramId}`;
      const endsAt = activeSubscription ? new Date(activeSubscription.endsAt) : null;
      const nowMs = Date.now();
      const endsAtMs = endsAt ? endsAt.getTime() : null;
      const isExpired = !activeSubscription || (endsAtMs !== null && endsAtMs < nowMs);

      if (endsAt) {
        console.log("COMPARE", {
          telegramId,
          endsAtISO: endsAt.toISOString(),
          nowISO: new Date(nowMs).toISOString(),
          endsAtMs,
          nowMs,
          isExpired,
        });
      } else {
        console.log("COMPARE", {
          telegramId,
          endsAtISO: null,
          nowISO: new Date(nowMs).toISOString(),
          endsAtMs: null,
          nowMs,
          isExpired,
        });
      }

      console.log("expired user check", {
        telegramId,
        endsAt: endsAt?.toISOString() ?? null,
        isExpired,
      });

      if (!member) {
        console.log("user not found in DB, treating as unauthorized", {
          telegramId,
          source: candidate.source,
        });
      }

      if (!activeSubscription) {
        console.log("no subscription found, treating as expired", { telegramId });
      }

      if (!isExpired) {
        continue;
      }

      console.info("expired or missing subscription", {
        telegramId,
        subscriptionId: activeSubscription?.id ?? null,
        endsAt: endsAt?.toISOString() ?? null,
        missingMember: !member,
      });

      stats.expiredFound += 1;
      console.info("expired user detected", {
        subId: subscriptionId,
        telegramId,
        endsAt: endsAt?.toISOString() ?? null,
      });

      const chatId = toTgId(telegramId);

      console.log("checking user", { telegramId });

      let memberState: ChatMemberResult;
      try {
        memberState = await tgGetChatMemberSafe(String(VIP_GROUP_ID), chatId);
      } catch (error) {
        await safeStep(subscriptionId, telegramId, "ROLE_CHECK", async () => {
          throw error;
        });
        continue;
      }

      const isAdmin = isAdminOrOwner(memberState.status);
      console.log("admin status", { telegramId, isAdmin });

      if (isAdmin) {
        stats.skippedAdminOwner += 1;
        console.info("user is admin, skipping", {
          subId: subscriptionId,
          telegramId,
          roleStatus: memberState.status,
        });
        continue;
      }

      if (memberState.leftGroup) {
        stats.alreadyLeft += 1;
        console.info("expired user already left group, skipping", {
          subId: subscriptionId,
          telegramId,
          roleStatus: memberState.status,
        });

        if (member && (!dryRun || writeDb)) {
          await safeStep(subscriptionId, telegramId, "EXPIRED_DB_LEFT", async () => {
            if (activeSubscription) {
              await prisma.subscription.update({
                where: { id: activeSubscription.id },
                data: {
                  status: "expired",
                  lastCheckedAt: now,
                },
              });
            }

            await prisma.member.update({
              where: { id: member.id },
              data: { status: "EXPIRED" },
            });
          });
        }

        continue;
      }

      if (!dryRun) {
        console.log("attempting kick", { telegramId });
        try {
          await tgKick(String(VIP_GROUP_ID), chatId);
          stats.kicked += 1;
          console.log("kicked expired user", { telegramId });
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          if (isAlreadyLeftError(message)) {
            stats.alreadyLeft += 1;
            console.info("expired user already left group, skipping", {
              subId: subscriptionId,
              telegramId,
            });
          } else {
            console.error("failed to kick", { telegramId, error: message });
            await safeStep(subscriptionId, telegramId, "KICK", async () => {
              throw error;
            });
            continue;
          }
        }
      }

      if (member && (!dryRun || writeDb)) {
        await safeStep(subscriptionId, telegramId, "EXPIRED_DB", async () => {
          if (activeSubscription) {
            await prisma.subscription.update({
              where: { id: activeSubscription.id },
              data: {
                status: "expired",
                lastCheckedAt: now,
              },
            });
          }

          await prisma.member.update({
            where: { id: member.id },
            data: { status: "EXPIRED" },
          });
        });
      }
    }

    return stats;
  } finally {
    await prisma.$disconnect();
  }
}

export async function checkExpired(opts: RunOpts = {}) {
  return runCheckExpired(opts);
}
