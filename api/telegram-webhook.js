// api/telegram-webhook.js
const axios = require("axios");

// Axios instance biar lebih stabil + timeout (hindari bengong kelamaan)
const http = axios.create({
  timeout: 15000,
  headers: { "Content-Type": "application/json" }
});

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ✅ fallback ipn URL kalau env kosong/typo (ini yang bikin error invalid uri)
const IPN_URL_FALLBACK = "https://www.koinity.online/api/nowpayments/ipn";

function cleanUrl(u) {
  return String(u || "").trim();
}

function isValidHttpUrl(u) {
  try {
    const x = new URL(u);
    return x.protocol === "https:" || x.protocol === "http:";
  } catch {
    return false;
  }
}

async function tg(method, payload) {
  return http.post(`${TELEGRAM_API}/${method}`, payload);
}

async function createInvoice(amountUsd, description) {
  const ipnEnv = cleanUrl(process.env.NOWPAYMENTS_IPN_URL);
  const ipnUrl = isValidHttpUrl(ipnEnv) ? ipnEnv : IPN_URL_FALLBACK;

  const res = await http.post(
    "https://api.nowpayments.io/v1/invoice",
    {
      price_amount: amountUsd,
      price_currency: "usd",
      pay_currency: "usdtbsc",
      order_description: description,

      // NOTE: lo minta kalimat/flow tetap, jadi gue gak ubah ke /success
      success_url: "https://koinity.online/success.html",
      cancel_url: "https://koinity.online/cancel.html",

      // ✅ FIX utama: pastikan ini selalu valid URI
      ipn_callback_url: ipnUrl
    },
    {
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data.invoice_url;
}

/**
 * Vercel Node.js Serverless Function
 * URL: https://www.koinity.online/api/telegram-webhook
 */
module.exports = async (req, res) => {
  // Telegram akan kirim POST, kalau GET kita cuma balas ok
  if (req.method !== "POST") {
    return res.status(200).json({ ok: true, message: "telegram webhook alive" });
  }

  try {
    const update = req.body || {};

    // === ANTI NYAMBER GROUP (WAJIB DI SINI) ===
    const msg = update.message || update.edited_message;

    if (msg) {
      const chatType = msg.chat?.type; // private | group | supergroup | channel
      // DIAM TOTAL di group/channel (termasuk command /start /rules dll)
      if (chatType !== "private") {
        return res.status(200).json({ ok: true, ignored: "all group/channel" });
      }
    }
    // === END ANTI NYAMBER ===

    // 1) Handle /start dari user
    if (update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text.trim();

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
                { text: "📖 Cara Berlangganan", callback_data: "menu_cara" }
              ],
              [
                { text: "💬 Chat Admin", callback_data: "menu_admin" }
              ]
            ]
          }
        });
      } else {
        // Balasan default kalau user kirim teks lain
        await tg("sendMessage", {
          chat_id: chatId,
          text: "Perintah tidak dikenal. Coba ketik /start ya 👌"
        });
      }

      return res.status(200).json({ ok: true });
    }

    // 2) Handle klik tombol (callback_query)
    if (update.callback_query) {
      const cq = update.callback_query;
      const data = cq.data;
      const chatId = cq.message.chat.id;

      console.log("CALLBACK:", { data, chatId });

      // Wajib jawab callback supaya tombol nggak loading terus
      // (Ini cepat, tapi kita TETAP proses di request yang sama, bukan async background)
      try {
        await tg("answerCallbackQuery", {
          callback_query_id: cq.id
        });
      } catch (e) {
        // kalau gagal jawab callback, tetap lanjut (biar user tetap dapat message)
        console.error("answerCallbackQuery error:", e.response?.data || e.message || e);
      }

      // === MENU: LIHAT PAKET ===
      if (data === "menu_paket") {
        await tg("sendMessage", {
          chat_id: chatId,
          text:
            "*Daftar Paket Membership KOINITY*\n\n" +
            "✅ *Paket 1 Bulan*\n" +
            "   Harga: *$12*\n\n" +
            "✅ *Paket 3 Bulan*\n" +
            "   Harga: *$30* (Lebih Hemat ✅)\n\n" +
            "✅ *Paket 1 Tahun*\n" +
            "   Harga: *$50* (Paling Murah 🔥)\n\n" +
            "Semua pembayaran diproses otomatis via *NOWPayments (Kripto)*",
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [{ text: "✅ 1 Bulan - $12", callback_data: "pay_1bulan" }],
              [{ text: "✅ 3 Bulan - $30", callback_data: "pay_3bulan" }],
              [{ text: "✅ 1 Tahun - $50", callback_data: "pay_1tahun" }],
              [{ text: "⬅️ Kembali", callback_data: "back_home" }]
            ]
          }
        });

        return res.status(200).json({ ok: true });
      }

      // === MENU: CARA BERLANGGANAN ===
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
            inline_keyboard: [
              [{ text: "⬅️ Kembali", callback_data: "back_home" }]
            ]
          }
        });

        return res.status(200).json({ ok: true });
      }

      // === MENU: CHAT ADMIN ===
      if (data === "menu_admin") {
        await tg("sendMessage", {
          chat_id: chatId,
          text:
            "👋 Untuk bantuan langsung, silakan hubungi admin:\n\n" +
            "@koinity_admin"
        });

        return res.status(200).json({ ok: true });
      }

      // === BAYAR 1 BULAN ===
      if (data === "pay_1bulan") {
        try {
          const description = `KOINITY|${chatId}|1bulan`;
          const invoiceUrl = await createInvoice(12, description);

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
                [{ text: "⬅️ Kembali", callback_data: "menu_paket" }]
              ]
            }
          });
        } catch (e) {
          console.error("CALLBACK PAY_1BULAN ERROR:", e.response?.data || e.message || e);
          await tg("sendMessage", {
            chat_id: chatId,
            text: "⚠️ Maaf, sistem pembayaran sedang error. Coba klik lagi beberapa saat ya."
          });
        }

        return res.status(200).json({ ok: true });
      }

      // === BAYAR 3 BULAN ===
      if (data === "pay_3bulan") {
        try {
          const description = `KOINITY|${chatId}|3bulan`;
          const invoiceUrl = await createInvoice(30, description);

          await tg("sendMessage", {
            chat_id: chatId,
            text:
              "✅ *Paket 3 Bulan Dipilih*\n\n" +
              "💰 Harga: *$30* (Lebih Hemat ✅)\n\n" +
              "💱 Metode bayar: *USDT jaringan BSC (BEP-20)*\n" +
              "⚠️ Kirim sesuai jumlah yang tertera di halaman pembayaran (termasuk angka di belakang koma).\n" +
              "⚠️ Biaya network dari exchange ditanggung pengirim.\n\n" +
              "Klik tombol di bawah ini untuk melakukan pembayaran 👇",
            parse_mode: "Markdown",
            reply_markup: {
              inline_keyboard: [
                [{ text: "💳 Bayar Sekarang", url: invoiceUrl }],
                [{ text: "⬅️ Kembali", callback_data: "menu_paket" }]
              ]
            }
          });
        } catch (e) {
          console.error("CALLBACK PAY_3BULAN ERROR:", e.response?.data || e.message || e);
          await tg("sendMessage", {
            chat_id: chatId,
            text: "⚠️ Maaf, sistem pembayaran sedang error. Coba klik lagi beberapa saat ya."
          });
        }

        return res.status(200).json({ ok: true });
      }

      // === BAYAR 1 TAHUN ===
      if (data === "pay_1tahun") {
        try {
          const description = `KOINITY|${chatId}|1tahun`;
          const invoiceUrl = await createInvoice(50, description);

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
                [{ text: "⬅️ Kembali", callback_data: "menu_paket" }]
              ]
            }
          });
        } catch (e) {
          console.error("CALLBACK PAY_1TAHUN ERROR:", e.response?.data || e.message || e);
          await tg("sendMessage", {
            chat_id: chatId,
            text: "⚠️ Maaf, sistem pembayaran sedang error. Coba klik lagi beberapa saat ya."
          });
        }

        return res.status(200).json({ ok: true });
      }

      // === BACK KE MENU UTAMA ===
      if (data === "back_home") {
        await tg("sendMessage", {
          chat_id: chatId,
          text: "🔙 Kembali ke menu utama. Ketik /start"
        });

        return res.status(200).json({ ok: true });
      }

      // === FALLBACK ===
      await tg("sendMessage", {
        chat_id: chatId,
        text: `Kamu pilih: ${data}`
      });

      return res.status(200).json({ ok: true });
    }

    // Kalau semua aman, balas 200 ke Telegram
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("TELEGRAM WEBHOOK ERROR:", err.response?.data || err.message || err);
    return res.status(500).json({ ok: false });
  }
};
