import Link from "next/link";

export default function SuccessPage() {
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
            background: "rgba(34,197,94,0.14)",
            color: "#86efac",
            border: "1px solid rgba(34,197,94,0.22)",
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
              backgroundColor: "#22c55e",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
          Payment Confirmed
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
          Pembayaran Berhasil ✅
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
          Terima kasih 🙏
        </p>

        <p
          style={{
            margin: "0 0 14px",
            color: "#cbd5e1",
            lineHeight: 1.8,
            fontSize: "15px",
          }}
        >
          Pembayaran kamu telah kami terima dan sistem sedang memproses{" "}
          <span style={{ color: "#facc15", fontWeight: 900 }}>
            aktivasi membership VIP
          </span>{" "}
          secara otomatis.
        </p>

        <p
          style={{
            margin: "0 0 22px",
            color: "#94a3b8",
            lineHeight: 1.8,
            fontSize: "14px",
          }}
        >
          Proses ini biasanya hanya membutuhkan beberapa saat. Jika akses belum
          aktif, silakan refresh halaman ini.
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
          🚀 Masuk ke Bot Telegram VIP
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
          Akses grup akan dikirim otomatis oleh bot setelah status aktif.
          <br />
          Simpan bukti transaksi (TXID) jika sewaktu-waktu dibutuhkan.
        </div>
      </div>
    </main>
  );
}
