// /api/nowpayments-ipn.js

const axios = require("axios");

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
const VIP_GROUP_ID = -1002592772128; // KOINITY VIP
const CHANNEL_ID = -1002781803104;      // KOINITY Channel (broadcast/signal)
module.exports = async (req, res) => {
  try {
    const data = req.body;

    console.log("✅ IPN MASUK:", JSON.stringify(data, null, 2));

    // ✅ Hanya proses kalau benar-benar selesai
    if (data.payment_status !== "finished") {
      console.log("ℹ️ Payment status bukan 'finished', diabaikan.");
      return res.status(200).json({ status: "ignored" });
    }

    // ✅ Ambil chat_id dari order_description
    // Format WAJIB: KOINITY|<TELEGRAM_ID>|<PAKET>
    const desc = data.order_description || "";
    console.log("ℹ️ order_description:", desc);

    const parts = desc.split("|");
    console.log("ℹ️ parts:", parts);

    if (parts.length < 2) {
      console.log("❌ GAGAL PARSE CHAT ID, FORMAT SALAH");
      return res.status(200).json({ status: "invalid_description" });
    }

    const rawChatId = parts[1];
    const chatId = parseInt(rawChatId, 10);

    if (isNaN(chatId)) {
      console.log("❌ CHAT ID BUKAN ANGKA:", rawChatId);
      return res.status(200).json({ status: "invalid_chat_id" });
    }

    console.log("✅ CHAT ID TERBACA:", chatId);

     // ✅ BUAT INVITE LINK 1x PAKAI UNTUK GRUP VIP
    const vipInvite = await axios.post(
      `${TELEGRAM_API}/createChatInviteLink`,
      {
        chat_id: VIP_GROUP_ID,
        member_limit: 1,
      }
    );

    console.log("✅ INVITE LINK GRUP VIP:", vipInvite.data);

    const vipInviteLink = vipInvite.data.result.invite_link;

   

    // ✅ KIRIM PESAN KE USER (1 LINK )
   await axios.post(`${TELEGRAM_API}/sendMessage`, {
  chat_id: chatId,
  text:
    `🎉 Pembayaran Berhasil!\n\n` +
    `✨ Selamat, kamu resmi menjadi member KOINITY VIP.\n\n` +
    `💬 Akses KOINITY VIP (semua forum & broadcast):\n` +
    `${vipInviteLink}\n\n` +
    `Catatan: Link hanya bisa dipakai 1x per orang. Jangan dibagikan ke orang lain.`,
});


    console.log("✅ PESAN TERKIRIM KE USER:", chatId);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ IPN ERROR DETAIL:", err.response?.data || err.message);

    // Supaya gateway nggak retry terus, tetap balas 200
    return res.status(200).json({ error: "telegram_failed" });
  }
};
