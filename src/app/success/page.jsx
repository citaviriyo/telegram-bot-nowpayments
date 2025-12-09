export default function SuccessPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        padding: "16px",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "12px" }}>
        ✅ Pembayaran Berhasil
      </h1>
      <p style={{ maxWidth: "420px", marginBottom: "8px" }}>
        Terima kasih, pembayaran kamu sudah kami terima.
      </p>
      <p style={{ maxWidth: "420px", opacity: 0.8 }}>
        Silakan cek Telegram kamu, bot{" "}
        <strong>@koinity_bot</strong> sudah mengirim link untuk masuk ke grup
        <strong> KOINITY VIP</strong>.
      </p>
    </main>
  );
}
