export const dynamic = "force-dynamic";

export default function CancelPage() {
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
        ❌ Pembayaran Tidak Berhasil
      </h1>
      <p style={{ maxWidth: "420px", marginBottom: "8px" }}>
        Sepertinya pembayaran kamu dibatalkan atau belum selesai.
      </p>
      <p style={{ maxWidth: "420px", opacity: 0.8 }}>
        Silakan ulangi proses pembayaran dari awal jika masih ingin bergabung
        dengan <strong>KOINITY VIP</strong>.
      </p>
    </main>
  );
}
