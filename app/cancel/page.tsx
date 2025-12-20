import Link from "next/link";

export default function CancelPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen',
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        {/* Status */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#fef2f2",
            color: "#b91c1c",
            borderRadius: "999px",
            padding: "6px 14px",
            fontSize: "14px",
            fontWeight: 600,
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#ef4444",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
          Payment Canceled
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 800,
            marginBottom: "12px",
            color: "#0f172a",
          }}
        >
          Pembayaran Tidak Berhasil ❌
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "15px",
            color: "#334155",
            lineHeight: 1.6,
            marginBottom: "12px",
          }}
        >
          Sepertinya pembayaran kamu dibatalkan atau belum selesai.
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#64748b",
            marginBottom: "24px",
          }}
        >
          Tidak apa-apa 👍  
          Kamu bisa mengulangi proses pembayaran kapan saja
          jika masih ingin bergabung dengan <strong>KOINITY VIP</strong>.
        </p>

        {/* CTA */}
        <Link
          href="https://t.me/koinity_bot"
          style={{
            display: "block",
            width: "100%",
            backgroundColor: "#16a34a",
            color: "#ffffff",
            padding: "14px",
            borderRadius: "12px",
            fontWeight: 700,
            textDecoration: "none",
            marginBottom: "16px",
          }}
        >
          🔄 Kembali ke Bot Telegram Koinity
        </Link>

        <Link
          href="/"
          style={{
            fontSize: "14px",
            color: "#64748b",
            textDecoration: "none",
          }}
        >
          Kembali ke Beranda
        </Link>

        {/* Footer */}
        <p
          style={{
            fontSize: "12px",
            color: "#94a3b8",
            marginTop: "20px",
            lineHeight: 1.5,
          }}
        >
          Jika kamu mengalami kendala saat pembayaran,
          silakan ulangi melalui bot agar proses berjalan otomatis.
        </p>
      </div>
    </main>
  );
}
