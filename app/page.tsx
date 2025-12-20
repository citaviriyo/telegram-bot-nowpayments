import Link from "next/link";

const TG_BOT_URL = "https://t.me/koinity_bot";

export default function HomePage() {
  return (
    <main style={styles.page}>
      {/* Top Bar */}
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.headerRow}>
            <div style={styles.brand}>
              <div style={styles.logo}>K</div>
              <div>
                <div style={styles.brandName}>Koinity</div>
                <div style={styles.brandTag}>VIP Membership</div>
              </div>
            </div>

            <nav style={styles.nav}>
              <a href="#benefits" style={styles.navLink}>Benefit</a>
              <a href="#pricing" style={styles.navLink}>Paket</a>
              <a href="#faq" style={styles.navLink}>FAQ</a>
              <Link href="/success" style={styles.navLink}>Success</Link>
            </nav>

            <a href={TG_BOT_URL} style={styles.headerBtn}>
              Buka Bot
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <div style={styles.heroGrid}>
            <div>
              <div style={styles.pill}>⚡ Akses VIP via Telegram (Otomatis)</div>
              <h1 style={styles.h1}>
                Masuk VIP Koinity, <br />
                akses komunitas & fitur premium dalam hitungan menit.
              </h1>
              <p style={styles.lead}>
                Pembayaran terverifikasi otomatis. Setelah aktif, bot akan mengirim
                akses VIP tanpa perlu chat admin.
              </p>

              <div style={styles.heroCtas}>
                <a href="#pricing" style={styles.primaryBtn}>Lihat Paket</a>
                <a href={TG_BOT_URL} style={styles.secondaryBtn}>Buka koinity_bot</a>
              </div>

              <div style={styles.trustRow}>
                <div style={styles.trustItem}>✅ Aktivasi otomatis</div>
                <div style={styles.trustItem}>🔒 Grup private (akses via bot)</div>
                <div style={styles.trustItem}>⏱️ Cepat & transparan</div>
              </div>
            </div>

            {/* Hero Card */}
            <div style={styles.heroCard}>
              <div style={styles.heroCardTop}>
                <div>
                  <div style={styles.heroCardTitle}>Cara Join VIP</div>
                  <div style={styles.heroCardDesc}>3 langkah simpel</div>
                </div>
                <div style={styles.badgeGreen}>Live</div>
              </div>

              <ol style={styles.steps}>
                <li style={styles.step}>
                  <div style={styles.stepNum}>1</div>
                  <div>
                    <div style={styles.stepTitle}>Pilih paket VIP</div>
                    <div style={styles.stepText}>Sesuaikan kebutuhan & durasi.</div>
                  </div>
                </li>
                <li style={styles.step}>
                  <div style={styles.stepNum}>2</div>
                  <div>
                    <div style={styles.stepTitle}>Selesaikan pembayaran</div>
                    <div style={styles.stepText}>Konfirmasi otomatis oleh sistem.</div>
                  </div>
                </li>
                <li style={styles.step}>
                  <div style={styles.stepNum}>3</div>
                  <div>
                    <div style={styles.stepTitle}>Klik bot → dapat akses</div>
                    <div style={styles.stepText}>
                      Bot akan kirim akses VIP setelah status aktif.
                    </div>
                  </div>
                </li>
              </ol>

              <a href={TG_BOT_URL} style={styles.cardBtn}>
                🚀 Masuk ke Bot Telegram VIP
              </a>

              <div style={styles.miniNote}>
                *Jika akses belum aktif, tunggu beberapa saat lalu coba lagi.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.h2}>Kenapa Koinity?</h2>
          <p style={styles.sectionLead}>
            Dibuat untuk yang mau akses VIP secara rapi, cepat, dan aman.
          </p>

          <div style={styles.cardsGrid}>
            <div style={styles.card}>
              <div style={styles.cardIcon}>⚙️</div>
              <div style={styles.cardTitle}>Otomatis</div>
              <div style={styles.cardText}>
                Aktivasi & akses VIP diproses otomatis setelah pembayaran.
              </div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardIcon}>🔐</div>
              <div style={styles.cardTitle}>Private & Aman</div>
              <div style={styles.cardText}>
                Link grup tidak disebar publik. Akses masuk lewat bot saja.
              </div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardIcon}>📌</div>
              <div style={styles.cardTitle}>Jelas</div>
              <div style={styles.cardText}>
                Alur join jelas: pilih paket → bayar → bot kirim akses.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.h2}>Pilih Paket</h2>
          <p style={styles.sectionLead}>
            Mulai dari paket yang paling cocok. Aktivasi otomatis setelah pembayaran.
          </p>

          <div style={styles.pricingGrid}>
            <div style={styles.priceCard}>
              <div style={styles.priceName}>VIP Basic</div>
              <div style={styles.priceValue}>—</div>
              <div style={styles.priceDesc}>Untuk mulai masuk komunitas VIP.</div>
              <a href={TG_BOT_URL} style={styles.priceBtn}>Buka Bot</a>
            </div>

            <div style={{ ...styles.priceCard, ...styles.priceCardFeatured }}>
              <div style={styles.featuredPill}>Paling Populer</div>
              <div style={styles.priceName}>VIP Pro</div>
              <div style={styles.priceValue}>—</div>
              <div style={styles.priceDesc}>
                Akses lebih lengkap + prioritas fitur.
              </div>
              <a href={TG_BOT_URL} style={styles.priceBtnPrimary}>Buka Bot</a>
            </div>

            <div style={styles.priceCard}>
              <div style={styles.priceName}>VIP Premium</div>
              <div style={styles.priceValue}>—</div>
              <div style={styles.priceDesc}>Untuk yang butuh akses maksimal.</div>
              <a href={TG_BOT_URL} style={styles.priceBtn}>Buka Bot</a>
            </div>
          </div>

          <div style={styles.noteBox}>
            <strong>Catatan:</strong> Harga & pilihan paket ditampilkan di Telegram bot.
            Setelah pembayaran sukses, akses VIP akan dikirim otomatis.
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.h2}>FAQ</h2>

          <div style={styles.faqGrid}>
            <details style={styles.faqItem}>
              <summary style={styles.faqQ}>Kenapa akses lewat bot?</summary>
              <div style={styles.faqA}>
                Karena grup VIP private. Bot jadi pintu masuk resmi biar aman dan rapi.
              </div>
            </details>

            <details style={styles.faqItem}>
              <summary style={styles.faqQ}>Kalau status belum aktif?</summary>
              <div style={styles.faqA}>
                Tunggu beberapa saat lalu refresh / coba lagi. Sistem aktivasi berjalan otomatis.
              </div>
            </details>

            <details style={styles.faqItem}>
              <summary style={styles.faqQ}>Setelah bayar, harus ngapain?</summary>
              <div style={styles.faqA}>
                Klik tombol “Buka Bot” dan ikuti instruksi. Bot akan mengirim akses VIP.
              </div>
            </details>
          </div>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <a href={TG_BOT_URL} style={styles.primaryBtn}>🚀 Mulai dari Bot</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerRow}>
            <div>
              <div style={styles.footerBrand}>Koinity</div>
              <div style={styles.footerText}>
                VIP Membership via Telegram — akses otomatis, aman, dan cepat.
              </div>
            </div>
            <div style={styles.footerLinks}>
              <a href="#pricing" style={styles.footerLink}>Paket</a>
              <a href="#faq" style={styles.footerLink}>FAQ</a>
              <a href={TG_BOT_URL} style={styles.footerLink}>koinity_bot</a>
            </div>
          </div>

          <div style={styles.footerBottom}>
            © {new Date().getFullYear()} Koinity. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: "#ffffff",
    color: "#0f172a",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Arial',
  },
  container: { width: "100%", maxWidth: 1080, margin: "0 auto", padding: "0 20px" },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #eef2f7",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 0",
    gap: 16,
  },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 12,
    background: "#0f172a",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },
  brandName: { fontWeight: 900, lineHeight: 1.1 },
  brandTag: { fontSize: 12, color: "#64748b" },

  nav: { display: "flex", gap: 16, alignItems: "center" },
  navLink: { color: "#334155", textDecoration: "none", fontSize: 14 },
  headerBtn: {
    background: "#16a34a",
    color: "#fff",
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: 12,
    fontWeight: 800,
    fontSize: 14,
    boxShadow: "0 10px 20px rgba(22,163,74,0.18)",
    whiteSpace: "nowrap",
  },

  hero: {
    background:
      "radial-gradient(900px 400px at 20% 10%, rgba(22,163,74,0.12), transparent 60%), radial-gradient(900px 400px at 80% 0%, rgba(37,99,235,0.10), transparent 60%), #ffffff",
    padding: "58px 0 38px",
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1.25fr 0.95fr",
    gap: 28,
    alignItems: "start",
  },
  pill: {
    display: "inline-block",
    background: "#ecfdf5",
    color: "#047857",
    padding: "8px 12px",
    borderRadius: 999,
    fontWeight: 800,
    fontSize: 13,
    marginBottom: 14,
  },
  h1: { fontSize: 44, lineHeight: 1.05, fontWeight: 950, margin: "0 0 14px" },
  lead: { color: "#475569", fontSize: 16, lineHeight: 1.7, margin: "0 0 18px" },

  heroCtas: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 },
  primaryBtn: {
    background: "#0f172a",
    color: "#fff",
    textDecoration: "none",
    padding: "12px 16px",
    borderRadius: 14,
    fontWeight: 900,
  },
  secondaryBtn: {
    background: "#ffffff",
    color: "#0f172a",
    textDecoration: "none",
    padding: "12px 16px",
    borderRadius: 14,
    border: "1px solid #e2e8f0",
    fontWeight: 900,
  },

  trustRow: { display: "flex", gap: 14, flexWrap: "wrap", color: "#64748b", fontSize: 13 },
  trustItem: { background: "#ffffff", border: "1px solid #eef2f7", padding: "8px 10px", borderRadius: 12 },

  heroCard: {
    background: "#fff",
    border: "1px solid #eef2f7",
    borderRadius: 22,
    padding: 18,
    boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
  },
  heroCardTop: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  heroCardTitle: { fontWeight: 950 },
  heroCardDesc: { fontSize: 12, color: "#64748b", marginTop: 2 },
  badgeGreen: {
    background: "#16a34a",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 12,
  },

  steps: { listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 },
  step: { display: "flex", gap: 12, alignItems: "flex-start" },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 10,
    background: "#0f172a",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    flex: "0 0 auto",
  },
  stepTitle: { fontWeight: 900, marginBottom: 2 },
  stepText: { fontSize: 13, color: "#64748b", lineHeight: 1.5 },

  cardBtn: {
    marginTop: 16,
    display: "block",
    textAlign: "center",
    background: "#16a34a",
    color: "#fff",
    textDecoration: "none",
    padding: "12px 14px",
    borderRadius: 14,
    fontWeight: 950,
  },
  miniNote: { marginTop: 10, fontSize: 12, color: "#94a3b8", textAlign: "center" },

  section: { padding: "54px 0" },
  sectionAlt: { padding: "54px 0", background: "#f8fafc", borderTop: "1px solid #eef2f7", borderBottom: "1px solid #eef2f7" },

  h2: { fontSize: 30, fontWeight: 950, margin: "0 0 10px" },
  sectionLead: { margin: "0 0 22px", color: "#64748b", lineHeight: 1.7 },

  cardsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 },
  card: { background: "#fff", border: "1px solid #eef2f7", borderRadius: 18, padding: 18, boxShadow: "0 10px 22px rgba(15,23,42,0.04)" },
  cardIcon: { fontSize: 22, marginBottom: 10 },
  cardTitle: { fontWeight: 950, marginBottom: 6 },
  cardText: { color: "#64748b", lineHeight: 1.7, fontSize: 14 },

  pricingGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 10 },
  priceCard: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 18, padding: 18 },
  priceCardFeatured: { border: "1px solid rgba(22,163,74,0.35)", boxShadow: "0 16px 34px rgba(22,163,74,0.10)" },
  featuredPill: { display: "inline-block", background: "#ecfdf5", color: "#047857", padding: "6px 10px", borderRadius: 999, fontWeight: 950, fontSize: 12, marginBottom: 10 },
  priceName: { fontWeight: 950, marginBottom: 6 },
  priceValue: { fontSize: 26, fontWeight: 950, marginBottom: 6 },
  priceDesc: { color: "#64748b", lineHeight: 1.6, fontSize: 14, marginBottom: 12 },
  priceBtn: { display: "block", textAlign: "center", textDecoration: "none", padding: "11px 12px", borderRadius: 14, border: "1px solid #e2e8f0", fontWeight: 950, color: "#0f172a" },
  priceBtnPrimary: { display: "block", textAlign: "center", textDecoration: "none", padding: "11px 12px", borderRadius: 14, fontWeight: 950, color: "#fff", background: "#16a34a" },

  noteBox: { marginTop: 18, background: "#ffffff", border: "1px solid #eef2f7", borderRadius: 16, padding: 14, color: "#475569", lineHeight: 1.7 },

  faqGrid: { display: "grid", gap: 12, marginTop: 10 },
  faqItem: { background: "#fff", border: "1px solid #eef2f7", borderRadius: 16, padding: 14 },
  faqQ: { cursor: "pointer", fontWeight: 950 },
  faqA: { marginTop: 10, color: "#64748b", lineHeight: 1.7 },

  footer: { padding: "34px 0", background: "#0b1220", color: "#cbd5e1" },
  footerRow: { display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" },
  footerBrand: { fontWeight: 950, color: "#fff" },
  footerText: { marginTop: 8, color: "#94a3b8", maxWidth: 520, lineHeight: 1.7, fontSize: 14 },
  footerLinks: { display: "flex", gap: 14, alignItems: "center" },
  footerLink: { color: "#cbd5e1", textDecoration: "none", fontWeight: 700, fontSize: 14 },
  footerBottom: { marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(148,163,184,0.18)", color: "#94a3b8", fontSize: 12 },
};
