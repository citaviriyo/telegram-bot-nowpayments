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

 if (data === "menu_paket") {
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text:
`📦 *Daftar Paket Membership KOINITY*

1️⃣ *Paket 1 Bulan*  
💵 Harga: *$12*

2️⃣ *Paket 3 Bulan*  
💵 Harga: *$30* (Lebih Hemat ✅)

3️⃣ *Paket 1 Tahun*  
💵 Harga: *$50* (Paling Murah 🔥)

Semua pembayaran diproses otomatis via *NOWPayments (Kripto)*`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "✅ Pilih 1 Bulan ($12)", callback_data: "pay_1bulan" }
        ],
        [
          { text: "✅ Pilih 3 Bulan ($30)", callback_data: "pay_3bulan" }
        ],
        [
          { text: "✅ Pilih 1 Tahun ($50)", callback_data: "pay_1tahun" }
        ],
        [
          { text: "⬅️ Kembali", callback_data: "back_home" }
        ]
      ]
    }
  });
  } else if (data === "menu_cara") {
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text:
`📖 *Cara Berlangganan KOINITY*

1️⃣ Pilih paket membership  
2️⃣ Bot akan kirim link pembayaran kripto  
3️⃣ Lakukan pembayaran sebelum waktu habis  
4️⃣ Setelah terkonfirmasi, akses premium langsung aktif 🚀

Mudah, cepat, dan otomatis ✅`,
    parse_mode: "Markdown"
  });
  } else if (data === "menu_admin") {
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text:
`💬 Untuk bantuan langsung, silakan hubungi admin:

👉 @koinity_admin  
    });
    } else if (data === "pay_1bulan") {
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text:
`✅ Kamu memilih *Paket 1 Bulan*

💵 Harga: *$12*

Silakan lanjutkan pembayaran via kripto dengan menekan link di bawah 👇
(Link pembayaran akan muncul otomatis dari NOWPayments)`,
    parse_mode: "Markdown"
  });

} else if (data === "pay_3bulan") {
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text:
`✅ Kamu memilih *Paket 3 Bulan*

💵 Harga: *$30*

Silakan lanjutkan pembayaran via kripto dengan menekan link di bawah 👇`,
    parse_mode: "Markdown"
  });

} else if (data === "pay_1tahun") {
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text:
`✅ Kamu memilih *Paket 1 Tahun*

💵 Harga: *$50*

Silakan lanjutkan pembayaran via kripto dengan menekan link di bawah 👇`,
    parse_mode: "Markdown"
  });
} else if (data === "back_home") {   
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: "🔙 Kembali ke menu utama. Ketik /start"
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
