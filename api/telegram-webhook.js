// api/telegram-webhook.js
const axios = require("axios");
async function createInvoice(amountUsd, description) {
  const res = await axios.post(
    "https://api.nowpayments.io/v1/invoice",
    {
      price_amount: amountUsd,
      price_currency: "usd",
      pay_currency: "usdtbsc",
      order_description: description,
      success_url: "https://koinity.online/success.html",
      cancel_url: "https://koinity.online/cancel.html",
      ipn_callback_url: process.env.NOWPAYMENTS_IPN_URL
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

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

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
  const text = msg.text || "";

  // Jangan respon chat biasa di group / channel
  if (chatType !== "private" && !text.startsWith("/")) {
    return res.status(200).json({ ok: true, ignored: "group non-command" });
  }
}
// === END ANTI NYAMBER ===
    // 1) Handle /start dari user
    if (update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text.trim();

    if (text === "/start") {
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text:
`✨ Selamat Datang di KOINITY BOT ✨

Di sini kamu bisa:
✅ Lihat paket membership
✅ Bayar pakai kripto via NOWPayments
✅ Dapat akses grup & konten premium

Silakan pilih menu di bawah untuk mulai ⬇️`,
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
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
          chat_id: chatId,
          text: "Perintah tidak dikenal. Coba ketik /start ya 👌"
        });
      }
    }

     // 2) Handle klik tombol (callback_query)
  if (update.callback_query) {
    const cq = update.callback_query;
    const data = cq.data;
    const chatId = cq.message.chat.id;

    // Wajib jawab callback supaya tombol nggak loading terus
    await axios.post(`${TELEGRAM_API}/answerCallbackQuery`, {
      callback_query_id: cq.id
    });

    // === MENU: LIHAT PAKET ===
    if (data === "menu_paket") {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
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
            [
              { text: "✅ 1 Bulan - $12", callback_data: "pay_1bulan" }
            ],
            [
              { text: "✅ 3 Bulan - $30", callback_data: "pay_3bulan" }
            ],
            [
              { text: "✅ 1 Tahun - $50", callback_data: "pay_1tahun" }
            ],
            [
              { text: "⬅️ Kembali", callback_data: "back_home" }
            ]
          ]
        }
      });

    // === MENU: CARA BERLANGGANAN ===
    } else if (data === "menu_cara") {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
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
            [
              { text: "⬅️ Kembali", callback_data: "back_home" }
            ]
          ]
        }
      });

    // === MENU: CHAT ADMIN ===
    } else if (data === "menu_admin") {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text:
          "👋 Untuk bantuan langsung, silakan hubungi admin:\n\n" +
          "@koinity_admin"
      });

    // === BAYAR 1 BULAN ===
   } else if (data === "pay_1bulan") {
 const description = `KOINITY|${chatId}|1bulan`;
  const invoiceUrl = await createInvoice(12, description);
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
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


    // === BAYAR 3 BULAN ===
   } else if (data === "pay_3bulan") {
  const description = `KOINITY|${chatId}|3bulan`;
const invoiceUrl = await createInvoice(30, description);
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
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


    // === BAYAR 1 TAHUN ===
   } else if (data === "pay_1tahun") {
  const description = `KOINITY|${chatId}|1tahun`;
const invoiceUrl = await createInvoice(50, description);
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
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


    // === BACK KE MENU UTAMA ===
    } else if (data === "back_home") {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: "🔙 Kembali ke menu utama. Ketik /start"
      });

    // === FALLBACK ===
    } else {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: `Kamu pilih: ${data}`
      });
    }
  }


    // Kalau semua aman, balas 200 ke Telegram
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("TELEGRAM WEBHOOK ERROR:", err.response?.data || err.message || err);
    return res.status(500).json({ ok: false });
  }
};
