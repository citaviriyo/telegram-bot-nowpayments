import { NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs";

/** Prisma (safe for dev hot-reload) */
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}
const prisma = global.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

/** Axios instance biar stabil + timeout */
const http = axios.create({
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = BOT_TOKEN ? `https://api.telegram.org/bot${BOT_TOKEN}` : "";
const TELEGRAM_WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

// fallback IPN URL kalau env kosong/typo
const IPN_URL_FALLBACK = "https://www.koinity.online/api/nowpayments/ipn";

function cleanUrl(u: string | undefined) {
  return String(u || "").trim();
}

function isValidHttpUrl(u: string) {
  try {
    const x = new URL(u);
    return x.protocol === "https:" || x.protocol === "http:";
  } catch {
    return false;
  }
}

function buildOrderDescription(telegramUserId: string | number, plan: string) {
  const normalizedUserId = String(telegramUserId).trim();
  const normalizedPlan = String(plan).trim();

  if (!normalizedUserId) {
    throw new Error("telegramUserId is required for order_description");
  }

  if (!normalizedPlan) {
    throw new Error("plan is required for order_description");
  }

  return `KOINITY | ${normalizedUserId} | ${normalizedPlan}`;
}

async function tg(method: string, payload: any) {
  if (!TELEGRAM_API) throw new Error("Missing TELEGRAM_BOT_TOKEN");
  return http.post(`${TELEGRAM_API}/${method}`, payload);
}

async function createInvoice(amountUsd: number, telegramUserId: string | number, plan: string) {
  const ipnEnv = cleanUrl(process.env.NOWPAYMENTS_IPN_URL);
  const ipnUrl = isValidHttpUrl(ipnEnv) ? ipnEnv : IPN_URL_FALLBACK;
  const orderDescription = buildOrderDescription(telegramUserId, plan);

  console.log("creating payment with order_description", {
    telegramUserId: String(telegramUserId),
    plan,
    order_description: orderDescription,
  });

  const res = await http.post(
    "https://api.nowpayments.io/v1/invoice",
    {
      price_amount: amountUsd,
      price_currency: "usd",
      pay_currency: "usdtbsc",
      order_description: orderDescription,

      // tetap sesuai flow lama
      success_url: "https://koinity.online/success.html",
      cancel_url: "https://koinity.online/cancel.html",

      ipn_callback_url: ipnUrl,
    },
    {
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.invoice_url as string;
}

/** Helper ambil update dari request */
async function readUpdate(req: Request) {
  // Telegram kirim JSON
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) return await req.json();
  // fallback
  const text = await req.text();
  return text ? JSON.parse(text) : {};
}

/** Format tanggal WIB lengkap (dengan tanggal, bulan, tahun, jam-menit) */
function fmtJakartaFull(d: Date) {
  try {
    const s = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d);
    return `${s} WIB`;
  } catch {
    // fallback aman
    return `${d.toISOString()} (UTC)`;
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "telegram webhook alive (app router)" });
}

export async function POST(req: Request) {
  try {
    const secretHeader = req.headers.get("x-telegram-bot-api-secret-token") || "";
    if (!TELEGRAM_WEBHOOK_SECRET || secretHeader !== TELEGRAM_WEBHOOK_SECRET) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const update: any = await readUpdate(req);

    // === ANTI NYAMBER GROUP (WAJIB DI SINI) ===
    const msg = update.message || update.edited_message;
    if (msg) {
      const chatType = msg.chat?.type; // private | group | supergroup | channel
      if (chatType !== "private") {
        return NextResponse.json({ ok: true, ignored: "all group/channel" });
      }
    }
    // === END ANTI NYAMBER ===

    // 1) Handle /start /status /help dari user
    if (update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const text = String(update.message.text || "").trim();

      if (text === "/start") {
        await tg("sendMessage", {
          chat_id: chatId,
          text:
`✨ Selamat Datang di KOINITY BOT ✨

Bukan untuk semua orang.
KOINITY dibuat bagi mereka yang ingin serius membangun posisi,
bukan sekadar ikut tren dan berharap keberuntungan.

Kalau kamu sudah cukup lama di crypto,
mungkin kamu pernah ngerasa seperti ini 👇

• Chart dibuka hampir setiap hari, tapi tetap ragu ambil posisi  
• Masuk kepagian atau malah telat, lalu ujungnya nyalahin market  
• Pernah cuan, tapi sulit konsisten saat market berubah  
• Terlalu banyak opini, tapi tidak ada arah yang benar-benar jelas  
• Merasa sebenarnya bisa lebih baik… tapi selalu sendirian  

Masalahnya sering kali bukan soal kepintaran,
melainkan karena tidak punya sistem dan lingkungan yang tepat.

Di sinilah KOINITY dibangun.
Bukan untuk menjanjikan hasil instan,
tapi untuk mengisi celah yang sering tidak disadari banyak trader.

Di KOINITY, kamu tidak sekadar dapat “sinyal”.

Kamu akan belajar:
• bagaimana membaca konteks market, bukan hanya indikator  
• kapan harus agresif, dan kapan justru lebih baik menunggu  
• kenapa sebuah posisi diambil — dan kapan waktunya ditutup  
• bagaimana trader berpengalaman berpikir saat kondisi market berubah  

Semua dibahas bersama komunitas yang satu frekuensi,
dengan pendekatan yang lebih tenang, terukur, dan bertanggung jawab.

🔍 Lewat bot ini kamu bisa:
✅ Melihat paket membership eksklusif  
✅ Berlangganan dengan kripto (NOWPayments)  
✅ Mendapat akses ke grup & konten premium  
✅ Update insight & panduan dari ekosistem KOINITY  

Pusat akses membership & konten premium KOINITY,
untuk kamu yang ingin naik level di crypto —
bukan spekulasi asal.

👇 Silakan pilih menu di bawah untuk mulai`,
          reply_markup: {
            inline_keyboard: [
              [
                { text: "📦 Lihat Paket", callback_data: "menu_paket" },
                { text: "📖 Cara Berlangganan", callback_data: "menu_cara" },
              ],
              [{ text: "💬 Chat Admin", callback_data: "menu_admin" }],
            ],
          },
        });

        return NextResponse.json({ ok: true });
      }

      // ✅ FIXED: /help (plain text, no parse_mode)
      if (text === "/help") {
        await tg("sendMessage", {
          chat_id: chatId,
          text:
`🆘 Bantuan KOINITY Bot

Perintah:
- /start  → Menu utama
- /status → Cek masa aktif membership (tanggal & tahun lengkap)
- /help   → Bantuan penggunaan bot

Kalau butuh bantuan admin:
@koinity_admin`,
        });

        return NextResponse.json({ ok: true });
      }

      // ✅ FIXED: /status (plain text, no parse_mode)
      if (text === "/status") {
        try {
          const telegramId = String(chatId);

          // Ambil subscription aktif terbaru (plan vip, status active)
          const activeSub = await prisma.subscription.findFirst({
            where: {
              status: "active",
              plan: "vip",
              member: { telegramId },
            },
            orderBy: { endsAt: "desc" },
            select: {
              endsAt: true,
              plan: true,
              status: true,
            },
          });

          // Fallback ke member.expiredAt kalau subscription tidak ketemu
          const member = await prisma.member.findUnique({
            where: { telegramId },
            select: { expiredAt: true, status: true },
          });

          const now = new Date();
          const exp = activeSub?.endsAt ?? member?.expiredAt ?? null;

          if (!exp) {
            await tg("sendMessage", {
              chat_id: chatId,
              text:
`📌 Status Membership

Belum ada membership aktif di akun ini.

Ketik /start → pilih paket untuk berlangganan.`,
            });
            return NextResponse.json({ ok: true });
          }

          const expDate = new Date(exp);
          const isActive = expDate.getTime() > now.getTime();

          // hitung sisa waktu (hari / jam / menit)
const diffMs = expDate.getTime() - now.getTime();
const diffMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));

let remainText = "";

if (diffMinutes < 60) {
  // < 1 jam → menit
  remainText = `${diffMinutes} menit`;
} else if (diffMinutes < 1440) {
  // < 24 jam → jam (+ menit)
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  remainText =
    minutes > 0
      ? `${hours} jam ${minutes} menit`
      : `${hours} jam`;
} else {
  // ≥ 1 hari → hari
  const days = Math.ceil(diffMinutes / 1440);
  remainText = `${days} hari`;
}

if (!isActive) {
  await tg("sendMessage", {
    chat_id: chatId,
    text:
`⚠️ Membership Tidak Aktif / Sudah Expired

Berlaku sampai: ${fmtJakartaFull(expDate)}

Ketik /start untuk berlangganan lagi.`,
  });
  return NextResponse.json({ ok: true });
}

await tg("sendMessage", {
  chat_id: chatId,
  text:
`✅ Membership Aktif

Berlaku sampai: ${fmtJakartaFull(expDate)}
Sisa: ${remainText}

Kalau ada kendala, hubungi admin:
@koinity_admin`,
});


          return NextResponse.json({ ok: true });
        } catch (e: any) {
          console.error("STATUS ERROR:", e?.response?.data || e?.message || e);
          await tg("sendMessage", {
            chat_id: chatId,
            text: "⚠️ Gagal cek status. Coba lagi beberapa saat ya.",
          });
          return NextResponse.json({ ok: true });
        }
      }

      // selain /start /help /status
      await tg("sendMessage", {
        chat_id: chatId,
        text: "Perintah tidak dikenal. Coba ketik /start ya 👌 (atau /help)",
      });

      return NextResponse.json({ ok: true });
    }

    // 2) Handle klik tombol (callback_query)
    if (update.callback_query) {
      const cq = update.callback_query;
      const data = cq.data;
      const chatId = cq.message.chat.id;

      console.log("CALLBACK:", { data, chatId });

      // wajib jawab callback
      try {
        await tg("answerCallbackQuery", { callback_query_id: cq.id });
      } catch (e: any) {
        console.error("answerCallbackQuery error:", e?.response?.data || e?.message || e);
      }

      if (data === "menu_paket") {
        await tg("sendMessage", {
          chat_id: chatId,
          text:
            "*Daftar Paket Membership KOINITY*\n\n" +
            "✅ *Paket 1 Bulan*\n" +
            "   Harga: *$12*\n\n" +
            "✅ *Paket 3 Bulan*\n" +
            "   Harga: *$30* (Lebih Hemat ✅ )\n\n" +
            "✅ *Paket 1 Tahun*\n" +
            "   Harga: *$50* (Paling Murah 🔥)\n\n" +
            "Semua pembayaran diproses otomatis via *NOWPayments (Kripto)*",
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [{ text: "✅ 1 Bulan - $12", callback_data: "pay_1bulan" }],
              [{ text: "✅ 3 Bulan - $30", callback_data: "pay_3bulan" }],
              [{ text: "✅ 1 Tahun - $50", callback_data: "pay_1tahun" }],
              [{ text: "⬅️ Kembali", callback_data: "back_home" }],
            ],
          },
        });

        return NextResponse.json({ ok: true });
      }

      if (data === "menu_cara") {
        await tg("sendMessage", {
          chat_id: chatId,
          text:
            "📌 *Cara Berlangganan KOINITY*\n\n" +
            "1️⃣ Pilih paket membership yang kamu mau.\n" +
            "2️⃣ Bot akan kirim link pembayaran kripto (NOWPayments).\n" +
            "3️⃣ Lakukan pembayaran sebelum waktu habis.\n" +
            "4️⃣ Setelah terkonfirmasi, kamu akan dapat akses ke grup premium 🚀",
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [[{ text: "⬅️ Kembali", callback_data: "back_home" }]],
          },
        });

        return NextResponse.json({ ok: true });
      }

      if (data === "menu_admin") {
        await tg("sendMessage", {
          chat_id: chatId,
          text: "👋 Untuk bantuan langsung, silakan hubungi admin:\n\n@koinity_admin",
        });

        return NextResponse.json({ ok: true });
      }

      if (data === "pay_1bulan") {
        try {
          const invoiceUrl = await createInvoice(12, chatId, "1bulan");

          await tg("sendMessage", {
            chat_id: chatId,
            text:
              "✅ *Paket 1 Bulan Dipilih*\n\n" +
              "💰 Harga: *$12*\n\n" +
              "💱 Metode bayar: *USDT jaringan BSC (BEP-20)*\n" +
              "⚠️ Kirim sesuai jumlah yang tertera di halaman pembayaran (termasuk angka di belakang koma).\n" +
              "⚠️ Biaya network dari exchange ditanggung pengirim.\n\n" +
              "Klik tombol di bawah ini untuk melakukan pembayaran 👇",
            parse_mode: "Markdown",
            reply_markup: {
              inline_keyboard: [
                [{ text: "💳 Bayar Sekarang", url: invoiceUrl }],
                [{ text: "⬅️ Kembali", callback_data: "menu_paket" }],
              ],
            },
          });
        } catch (e: any) {
          console.error("CALLBACK PAY_1BULAN ERROR:", e?.response?.data || e?.message || e);
          await tg("sendMessage", {
            chat_id: chatId,
            text: "⚠️ Maaf, sistem pembayaran sedang error. Coba klik lagi beberapa saat ya.",
          });
        }

        return NextResponse.json({ ok: true });
      }

      if (data === "pay_3bulan") {
        try {
          const invoiceUrl = await createInvoice(30, chatId, "3bulan");

          await tg("sendMessage", {
            chat_id: chatId,
            text:
              "✅ *Paket 3 Bulan Dipilih*\n\n" +
              "💰 Harga: *$30* (Lebih Hemat ✅ )\n\n" +
              "💱 Metode bayar: *USDT jaringan BSC (BEP-20)*\n" +
              "⚠️ Kirim sesuai jumlah yang tertera di halaman pembayaran (termasuk angka di belakang koma).\n" +
              "⚠️ Biaya network dari exchange ditanggung pengirim.\n\n" +
              "Klik tombol di bawah ini untuk melakukan pembayaran 👇",
            parse_mode: "Markdown",
            reply_markup: {
              inline_keyboard: [
                [{ text: "💳 Bayar Sekarang", url: invoiceUrl }],
                [{ text: "⬅️ Kembali", callback_data: "menu_paket" }],
              ],
            },
          });
        } catch (e: any) {
          console.error("CALLBACK PAY_3BULAN ERROR:", e?.response?.data || e?.message || e);
          await tg("sendMessage", {
            chat_id: chatId,
            text: "⚠️ Maaf, sistem pembayaran sedang error. Coba klik lagi beberapa saat ya.",
          });
        }

        return NextResponse.json({ ok: true });
      }

      if (data === "pay_1tahun") {
        try {
          const invoiceUrl = await createInvoice(50, chatId, "1tahun");

          await tg("sendMessage", {
            chat_id: chatId,
            text:
              "✅ *Paket 1 Tahun Dipilih*\n\n" +
              "💰 Harga: *$50* (Paling Murah per bulan 🔥)\n\n" +
              "💱 Metode bayar: *USDT jaringan BSC (BEP-20)*\n" +
              "⚠️ Kirim sesuai jumlah yang tertera di halaman pembayaran (termasuk angka di belakang koma).\n" +
              "⚠️ Biaya network dari exchange ditanggung pengirim.\n\n" +
              "Klik tombol di bawah ini untuk melakukan pembayaran 👇",
            parse_mode: "Markdown",
            reply_markup: {
              inline_keyboard: [
                [{ text: "💳 Bayar Sekarang", url: invoiceUrl }],
                [{ text: "⬅️ Kembali", callback_data: "menu_paket" }],
              ],
            },
          });
        } catch (e: any) {
          console.error("CALLBACK PAY_1TAHUN ERROR:", e?.response?.data || e?.message || e);
          await tg("sendMessage", {
            chat_id: chatId,
            text: "⚠️ Maaf, sistem pembayaran sedang error. Coba klik lagi beberapa saat ya.",
          });
        }

        return NextResponse.json({ ok: true });
      }

      if (data === "back_home") {
        await tg("sendMessage", {
          chat_id: chatId,
          text: "🔙 Kembali ke menu utama. Ketik /start",
        });

        return NextResponse.json({ ok: true });
      }

      // fallback
      await tg("sendMessage", { chat_id: chatId, text: `Kamu pilih: ${data}` });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("TELEGRAM WEBHOOK ERROR:", err?.response?.data || err?.message || err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
