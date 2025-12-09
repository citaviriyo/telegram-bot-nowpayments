// api/telegram-webhook.js
const axios = require("axios");

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

    // 1) Handle /start dari user
    if (update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text.trim();

      if (text === "/start") {
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
          chat_id: chatId,
          text:
            "Halo 👋\n\n" +
            "Bot Koinity sudah AKTIF.\n" +
            "Silakan pilih menu di bawah ini untuk mulai.",
          reply_markup: {
            inline_keyboard: [
              [
                { text: "📋 Lihat Paket", callback_data: "menu_paket" },
                { text: "💬 Hubungi Admin", callback_data: "menu_admin" }
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

      // Wajib jawab callback supaya tidak muter loading di Telegram
      await axios.post(`${TELEGRAM_API}/answerCallbackQuery`, {
        callback_query_id: cq.id
      });

      if (data === "menu_paket") {
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
          chat_id: chatId,
          text:
            "📋 *Daftar Paket Premium*\n\n" +
            "1️⃣ Paket Bulanan\n" +
            "2️⃣ Paket 3 Bulan\n" +
            "3️⃣ Paket Tahunan\n\n" +
            "Untuk sementara ini contoh dulu bro, nanti kita sambung ke NOWPayments.",
          parse_mode: "Markdown"
        });
      } else if (data === "menu_admin") {
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
          chat_id: chatId,
          text: "Silakan chat admin di @username_admin (contoh, nanti bisa diganti)."
        });
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
