// /api/nowpayments-ipn.js

const axios = require("axios");

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
const VIP_GROUP_ID = -1002592772128; // KOINITY VIP

module.exports = async (req, res) => {
  try {
    const data = req.body;

    console.log("✅ IPN MASUK:", data);

    // ✅ Hanya proses kalau benar-benar selesai
    if (data.payment_status !== "finished") {
      return res.status(200).json({ status: "ignored" });
    }

    // ✅ Ambil chat_id dari order_description
    // Format: KOINITY|7203940011|1bulan
    const desc = data.order_description || "";
    const parts = desc.split("|");

    if (parts.length < 2) {
      console.log("❌ GAGAL PARSE CHAT ID");
      return res.status(200).json({ status: "invalid_description" });
    }

    const chatId = parts[1];

    // ✅ BUAT INVITE LINK 1x PAKAI
    const invite = await axios.post(
      `${TELEGRAM_API}/createChatInviteLink`,
      {
        chat_id: VIP_GROUP_ID,
        member_limit: 1
      }
    );

    const inviteLink = invite.data.result.invite_link;

    // ✅ KIRIM KE USER
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text:
        `✅ *Pembayaran Berhasil!*\n\n` +
        `🎉 Selamat, kamu resmi menjadi member *KOINITY VIP*\n\n` +
        `🔗 Silakan masuk lewat link di bawah ini (hanya bisa dipakai 1x):\n` +
        `${inviteLink}`,
      parse_mode: "Markdown"
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ IPN ERROR:", err.response?.data || err.message);
    return res.status(500).json({ error: "IPN failed" });
  }
};
