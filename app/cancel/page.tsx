import Link from "next/link";

export default function CancelPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0f14",
        color: "#e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial',
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(250,204,21,0.16)",
          borderRadius: "22px",
          padding: "32px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
          textAlign: "center",
        }}
      >
        {/* Status */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(239,68,68,0.12)",
            color: "#fecaca",
            border: "1px solid rgba(239,68,68,0.22)",
            borderRadius: "999px",
            padding: "6px 14px",
            fontSize: "13px",
            fontWeight: 800,
            marginBottom: "18px",
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
            fontSize: "26px",
            fontWeight: 950,
            margin: "0 0 10px",
            color: "#facc15",
            letterSpacing: "-0.02em",
          }}
        >
          Pembayaran Tidak Berhasil ❌
        </h1>

        {/* Description (kata-kata TIDAK diubah) */}
        <p
          style={{
            margin: "0 0 14px",
            color: "#cbd5e1",
            lineHeight: 1.8,
            fontSize: "15px",
          }}
        >
          Sepertinya pembayaran kamu dibatalkan atau belum selesai.
        </p>

        <p
          style={{
            margin: "0 0 22px",
            color: "#94a3b8",
            lineHeight: 1.8,
            fontSize: "14px",
          }}
        >
          Tidak apa-apa 👍 Kamu bisa mengulangi proses pembayaran kapan saja jika
          masih ingin bergabung dengan <strong>KOINITY VIP</strong>.
        </p>

        {/* CTA */}
        <a
          href="https://t.me/koinity_bot"
          style={{
            display: "block",
            width: "100%",
            background: "#16a34a",
            color: "#ffffff",
            padding: "14px 16px",
            borderRadius: "14px",
            fontWeight: 950,
            textDecoration: "none",
            boxShadow: "0 12px 26px rgba(22,163,74,0.25)",
            marginBottom: "14px",
          }}
        >
          🔄 Kembali ke Bot Telegram Koinity
        </a>

        <Link
          href="/"
          style={{
            display: "inline-block",
            color: "#cbd5e1",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 700,
            opacity: 0.9,
          }}
        >
          Kembali ke Beranda
        </Link>

        <div
          style={{
            marginTop: "18px",
            color: "#94a3b8",
            fontSize: "12px",
            lineHeight: 1.6,
          }}
        >
          Jika kamu mengalami kendala saat pembayaran, silakan ulangi melalui bot
          agar proses berjalan otomatis.
        </div>
      </div>
    </main>
  );
}
