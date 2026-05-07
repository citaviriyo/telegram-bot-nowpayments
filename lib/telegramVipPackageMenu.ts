export function buildVipPackageMenuMessage(chatId: number | string): Record<string, unknown> {
  return {
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
  };
}
