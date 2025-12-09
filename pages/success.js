export default function SuccessPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <h1>✅ Pembayaran Berhasil</h1>
      <p>Terima kasih, pembayaran kamu sudah kami terima.</p>
      <p>
        Undangan grup VIP akan dikirim otomatis lewat Telegram dalam beberapa
        detik.
      </p>
    </main>
  );
}
