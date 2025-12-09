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
      "✨ *Selamat datang di KOINITY BOT* ✨\n\n" +
      "Di sini kamu bisa:\n" +
      "• Lihat daftar paket membership 💳\n" +
      "• Bayar pakai kripto via NOWPayments 💰\n" +
      "• Dapat akses ke grup & konten premium 🔒\n\n" +
      "Silakan pilih menu di bawah ini untuk mulai 👇",
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "📋 Lihat Paket", callback_data: "menu_paket" },
          { text: "💳 Cara Berlangganan", callback_data: "menu_cara" }
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

  if (data === "menu_paket") {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text:
        "📋 *Daftar Paket Membership KOINITY*\n\n" +
        "1️⃣ *Paket Bulanan* – cocok buat coba dulu\n" +
        "2️⃣ *Paket 3 Bulan* – lebih hemat dari bulanan\n" +
        "3️⃣ *Paket Tahunan* – paling murah per bulan 🔥\n\n" +
        "Semua pembayaran diproses otomatis via *NOWPayments (kripto).*",
      parse_mode: "Markdown"
    });
  } else if (data === "menu_cara") {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text:
        "💳 *Cara Berlangganan KOINITY*\n\n" +
        "1. Pilih paket membership yang kamu mau\n" +
        "2. Bot akan kirim link pembayaran kripto (NOWPayments)\n" +
        "3. Lakukan pembayaran sebelum waktu habis\n" +
        "4. Setelah terkonfirmasi, kamu akan dapat akses ke grup premium 🚀",
      parse_mode: "Markdown"
    });
  } else if (data === "menu_admin") {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text:
        "Kalau ada pertanyaan atau kendala, silakan chat admin di:\n" +
        "@koinity_admin\n\n" +
        "(Ganti dulu username ini di kode sesuai akun admin asli ya bro 😁)"
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
