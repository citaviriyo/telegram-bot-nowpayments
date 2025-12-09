// pages/cancel.js
export default function Cancel() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <h1>⚠️ Pembayaran Dibatalkan</h1>
      <p style={{ marginTop: 12, maxWidth: 480 }}>
        Transaksi kamu belum selesai. Kalau masih ingin join{" "}
        <b>KOINITY VIP</b>, silakan kembali ke bot Telegram dan pilih paket
        lagi.
      </p>
    </main>
  );
}
