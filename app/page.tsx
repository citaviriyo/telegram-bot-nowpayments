import Link from "next/link";

const TG_BOT_URL = "https://t.me/koinity_bot";

export default function HomePage() {
  return (
    <main style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.headerRow}>
            <div style={styles.brand}>
              <div style={styles.brandIconWrap}>
                <img
                  src="/favicon-32x32.png"
                  alt="Koinity"
                  style={styles.brandLogo}
                />
              </div>
              <div>
                <div style={styles.brandName}>Koinity</div>
                <div style={styles.brandTag}>VIP Membership</div>
              </div>
            </div>

            <nav style={styles.nav}>
              <a href="#welcome" style={styles.navLink}>Tentang</a>
              <a href="#pricing" style={styles.navLink}>Paket</a>
              <a href="#faq" style={styles.navLink}>FAQ</a>
              {/* Success dihapus */}
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
          <div style={styles.heroWrap}>
            {/* left */}
            <div style={styles.heroLeft}>
              <div style={styles.pill}>⚡ Akses VIP via Telegram (Otomatis)</div>

              <h1 style={styles.h1}>
                Masuk VIP Koinity, <br />
                naik level di crypto{" "}
                <span style={styles.yellow}>tanpa spekulasi asal</span>.
              </h1>

              <p style={styles.lead}>
                Koinity bukan untuk semua orang. Ini tempat buat kamu yang mau
                lebih serius membangun posisi, punya sistem, dan lingkungan yang
                tepat.
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

            {/* right card */}
            <div style={styles.heroRight}>
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
                      <div style={styles.stepTitle}>Pilih paket membership</div>
                      <div style={styles.stepText}>1 bulan, 3 bulan, atau 1 tahun.</div>
                    </div>
                  </li>
                  <li style={styles.step}>
                    <div style={styles.stepNum}>2</div>
                    <div>
                      <div style={styles.stepTitle}>Selesaikan pembayaran</div>
                      <div style={styles.stepText}>Diproses otomatis via NOWPayments.</div>
                    </div>
                  </li>
                  <li style={styles.step}>
                    <div style={styles.stepNum}>3</div>
                    <div>
                      <div style={styles.stepTitle}>Klik bot → dapat akses</div>
                      <div style={styles.stepText}>Bot kirim akses VIP setelah status aktif.</div>
                    </div>
                  </li>
                </ol>

                <a href={TG_BOT_URL} style={styles.cardBtn}>
                  🚀 Masuk ke Bot Telegram VIP
                </a>

                <div style={styles.miniNote}>
                  *Jika akses belum aktif, tunggu sebentar lalu coba lagi.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome / Long Copy */}
      <section id="welcome" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionTitleWrap}>
            <h2 style={styles.h2}>✨ Selamat Datang di KOINITY BOT ✨</h2>
            <p style={styles.sectionLead}>
              Pusat akses membership & konten premium KOINITY.
            </p>
          </div>

          <div style={styles.longCard}>
            <p style={styles.pStrong}>
              <span style={styles.yellow}>Bukan untuk semua orang.</span> KOINITY dibuat
              bagi mereka yang ingin serius membangun posisi, bukan sekadar ikut
              tren dan berharap keberuntungan.
            </p>

            <p style={styles.p}>
              Kalau kamu sudah cukup lama di crypto, mungkin kamu pernah ngerasa
              seperti ini 👇
            </p>

            <ul style={styles.ul}>
              <li style={styles.li}>Chart dibuka hampir setiap hari, tapi tetap ragu ambil posisi</li>
              <li style={styles.li}>Masuk kepagian atau malah telat, lalu ujungnya nyalahin market</li>
              <li style={styles.li}>Pernah cuan, tapi sulit konsisten saat market berubah</li>
              <li style={styles.li}>Terlalu banyak opini, tapi tidak ada arah yang benar-benar jelas</li>
              <li style={styles.li}>Merasa sebenarnya bisa lebih baik… tapi selalu sendirian</li>
            </ul>

            <p style={styles.p}>
              Masalahnya sering kali bukan soal kepintaran, melainkan karena tidak
              punya sistem dan lingkungan yang tepat.
            </p>

            <p style={styles.p}>
              Di sinilah KOINITY dibangun. Bukan untuk menjanjikan hasil instan,
              tapi untuk mengisi celah yang sering tidak disadari banyak trader.
            </p>

            <p style={styles.pStrong}>Di KOINITY, kamu tidak sekadar dapat “sinyal”.</p>

            <p style={styles.p}>Kamu akan belajar:</p>

            <ul style={styles.ul}>
              <li style={styles.li}>bagaimana membaca konteks market, bukan hanya indikator</li>
              <li style={styles.li}>kapan harus agresif, dan kapan justru lebih baik menunggu</li>
              <li style={styles.li}>kenapa sebuah posisi diambil — dan kapan waktunya ditutup</li>
              <li style={styles.li}>bagaimana trader berpengalaman berpikir saat kondisi market berubah</li>
            </ul>

            <p style={styles.p}>
              Semua dibahas bersama komunitas yang satu frekuensi, dengan pendekatan yang
              lebih tenang, terukur, dan bertanggung jawab.
            </p>

            <div style={styles.divider} />

            <p style={styles.pStrong}>🔍 Lewat bot ini kamu bisa:</p>
            <ul style={styles.ul}>
              <li style={styles.li}>✅ Melihat paket membership eksklusif</li>
              <li style={styles.li}>✅ Berlangganan dengan kripto (NOWPayments)</li>
              <li style={styles.li}>✅ Mendapat akses ke grup & konten premium</li>
              <li style={styles.li}>✅ Update insight & panduan dari ekosistem KOINITY</li>
            </ul>

            <p style={styles.p}>
              Untuk kamu yang ingin naik level di crypto —{" "}
              <span style={styles.yellow}>bukan spekulasi asal.</span>
            </p>

            <div style={{ marginTop: 18 }}>
              <a href={TG_BOT_URL} style={styles.greenBtnWide}>
                🚀 Mulai dari koinity_bot
              </a>
              <div style={styles.miniNote2}> 👆 Silakan pilih menu di bot untuk mulai.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.h2}>Daftar Paket Membership KOINITY</h2>
          <p style={styles.sectionLead}>
            Semua pembayaran diproses otomatis via NOWPayments (Kripto).
          </p>

          <div style={styles.pricingWrap}>
            <div style={styles.priceCard}>
              <div style={styles.priceName}>✅ Paket 1 Bulan</div>
              <div style={styles.priceValue}>$12</div>
              <div style={styles.priceDesc}>Cocok buat mulai masuk komunitas & adaptasi sistem.</div>
              <a href={TG_BOT_URL} style={styles.priceBtnPrimary}>Buka Bot</a>
            </div>

            <div style={{ ...styles.priceCard, ...styles.priceCardFeatured }}>
              <div style={styles.featuredPill}>Lebih Hemat ✅</div>
              <div style={styles.priceName}>✅ Paket 3 Bulan</div>
              <div style={styles.priceValue}>$30</div>
              <div style={styles.priceDesc}>Lebih hemat, lebih stabil untuk ikut ritme market.</div>
              <a href={TG_BOT_URL} style={styles.priceBtnPrimary}>Buka Bot</a>
            </div>

            <div style={styles.priceCard}>
              <div style={styles.featuredPillGold}>Paling Murah 🔥</div>
              <div style={styles.priceName}>✅ Paket 1 Tahun</div>
              <div style={styles.priceValue}>$50</div>
              <div style={styles.priceDesc}>Value terbaik untuk growth & konsistensi jangka panjang.</div>
              <a href={TG_BOT_URL} style={styles.priceBtnPrimary}>Buka Bot</a>
            </div>
          </div>

          <div style={styles.noteBox}>
            <strong>Catatan:</strong> Setelah pembayaran sukses, akses VIP akan dikirim otomatis oleh bot.
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
                Tunggu beberapa saat lalu coba lagi. Aktivasi berjalan otomatis.
              </div>
            </details>

            <details style={styles.faqItem}>
              <summary style={styles.faqQ}>Setelah bayar, harus ngapain?</summary>
              <div style={styles.faqA}>
                Klik “Buka Bot”, ikuti instruksi, dan bot akan mengirim akses VIP.
              </div>
            </details>
          </div>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <a href={TG_BOT_URL} style={styles.greenBtnWide}>🚀 Mulai dari Bot</a>
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
                VIP Membership via Telegram — belajar, diskusi, dan eksekusi bareng komunitas satu frekuensi.
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
  page: { background: "#0b0f14", color: "#e5e7eb", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial' },
  container: { width: "100%", maxWidth: 1080, margin: "0 auto", padding: "0 20px" },
  yellow: { color: "#facc15" },

  header: { position: "sticky", top: 0, zIndex: 20, background: "rgba(11,15,20,0.78)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(250,204,21,0.14)" },
  headerRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", gap: 16, flexWrap: "wrap" },

  brand: { display: "flex", alignItems: "center", gap: 12 },
  brandIconWrap: { width: 42, height: 42, borderRadius: 14, background: "rgba(250,204,21,0.10)", border: "1px solid rgba(250,204,21,0.22)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  brandLogo: { width: 30, height: 30, objectFit: "contain" },
  brandName: { fontWeight: 950, lineHeight: 1.1, color: "#facc15" },
  brandTag: { fontSize: 12, color: "#94a3b8" },

  nav: { display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" },
  navLink: { color: "#e5e7eb", textDecoration: "none", fontSize: 14, opacity: 0.9 },

  headerBtn: { background: "#16a34a", color: "#fff", textDecoration: "none", padding: "10px 14px", borderRadius: 12, fontWeight: 900, fontSize: 14, boxShadow: "0 10px 20px rgba(22,163,74,0.22)", whiteSpace: "nowrap" },

  hero: { background: "radial-gradient(900px 420px at 18% 10%, rgba(250,204,21,0.18), transparent 60%), radial-gradient(900px 420px at 84% 0%, rgba(34,197,94,0.10), transparent 60%), #0b0f14", padding: "58px 0 38px" },
  heroWrap: { display: "flex", gap: 28, alignItems: "stretch", justifyContent: "space-between", flexWrap: "wrap" },
  heroLeft: { flex: "1 1 520px", minWidth: 280 },
  heroRight: { flex: "1 1 360px", minWidth: 280 },

  pill: { display: "inline-block", background: "rgba(250,204,21,0.14)", color: "#facc15", padding: "8px 12px", borderRadius: 999, fontWeight: 900, fontSize: 13, marginBottom: 14, border: "1px solid rgba(250,204,21,0.22)" },
  h1: { fontSize: 44, lineHeight: 1.05, fontWeight: 950, margin: "0 0 14px", color: "#f8fafc" },
  lead: { color: "#cbd5e1", fontSize: 16, lineHeight: 1.7, margin: "0 0 18px" },

  heroCtas: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 },
  primaryBtn: { background: "#facc15", color: "#0b0f14", textDecoration: "none", padding: "12px 16px", borderRadius: 14, fontWeight: 950 },
  secondaryBtn: { background: "rgba(255,255,255,0.04)", color: "#f8fafc", textDecoration: "none", padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(250,204,21,0.22)", fontWeight: 900 },

  trustRow: { display: "flex", gap: 14, flexWrap: "wrap", color: "#94a3b8", fontSize: 13 },
  trustItem: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(250,204,21,0.12)", padding: "8px 10px", borderRadius: 12 },

  heroCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(250,204,21,0.16)", borderRadius: 22, padding: 18, boxShadow: "0 12px 30px rgba(0,0,0,0.35)" },
  heroCardTop: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  heroCardTitle: { fontWeight: 950, color: "#f8fafc" },
  heroCardDesc: { fontSize: 12, color: "#94a3b8", marginTop: 2 },
  badgeGreen: { background: "#16a34a", color: "#fff", padding: "6px 10px", borderRadius: 999, fontWeight: 950, fontSize: 12 },

  steps: { listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 },
  step: { display: "flex", gap: 12, alignItems: "flex-start" },
  stepNum: { width: 28, height: 28, borderRadius: 10, background: "#facc15", color: "#0b0f14", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 950, flex: "0 0 auto" },
  stepTitle: { fontWeight: 950, marginBottom: 2, color: "#f8fafc" },
  stepText: { fontSize: 13, color: "#94a3b8", lineHeight: 1.5 },

  cardBtn: { marginTop: 16, display: "block", textAlign: "center", background: "#16a34a", color: "#fff", textDecoration: "none", padding: "12px 14px", borderRadius: 14, fontWeight: 950 },
  miniNote: { marginTop: 10, fontSize: 12, color: "#94a3b8", textAlign: "center" },
  miniNote2: { marginTop: 8, fontSize: 12, color: "#94a3b8" },

  section: { padding: "54px 0" },
  sectionAlt: { padding: "54px 0", background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(250,204,21,0.12)", borderBottom: "1px solid rgba(250,204,21,0.12)" },
  sectionTitleWrap: { marginBottom: 16 },

  h2: { fontSize: 30, fontWeight: 950, margin: "0 0 10px", color: "#facc15" },
  sectionLead: { margin: "0 0 22px", color: "#cbd5e1", lineHeight: 1.7 },

  longCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(250,204,21,0.16)", borderRadius: 18, padding: 18, boxShadow: "0 12px 26px rgba(0,0,0,0.35)" },
  p: { color: "#e5e7eb", lineHeight: 1.9, margin: "10px 0" },
  pStrong: { color: "#f8fafc", lineHeight: 1.9, margin: "10px 0", fontWeight: 800 },
  ul: { margin: "10px 0 10px 18px", padding: 0, color: "#e5e7eb", lineHeight: 1.9 },
  li: { margin: "6px 0" },
  divider: { height: 1, background: "rgba(250,204,21,0.14)", margin: "16px 0" },

  greenBtnWide: { display: "inline-block", background: "#16a34a", color: "#fff", textDecoration: "none", padding: "12px 18px", borderRadius: 14, fontWeight: 950 },

  pricingWrap: { display: "flex", gap: 14, flexWrap: "wrap", alignItems: "stretch" },
  priceCard: { flex: "1 1 280px", background: "rgba(0,0,0,0.25)", border: "1px solid rgba(250,204,21,0.16)", borderRadius: 18, padding: 18, minWidth: 260 },
  priceCardFeatured: { border: "1px solid rgba(22,163,74,0.40)", boxShadow: "0 16px 34px rgba(22,163,74,0.12)" },

  featuredPill: { display: "inline-block", background: "rgba(22,163,74,0.14)", color: "#86efac", padding: "6px 10px", borderRadius: 999, fontWeight: 950, fontSize: 12, marginBottom: 10, border: "1px solid rgba(22,163,74,0.25)" },
  featuredPillGold: { display: "inline-block", background: "rgba(250,204,21,0.14)", color: "#facc15", padding: "6px 10px", borderRadius: 999, fontWeight: 950, fontSize: 12, marginBottom: 10, border: "1px solid rgba(250,204,21,0.25)" },

  priceName: { fontWeight: 950, marginBottom: 6, color: "#f8fafc" },
  priceValue: { fontSize: 30, fontWeight: 950, marginBottom: 6, color: "#facc15" },
  priceDesc: { color: "#cbd5e1", lineHeight: 1.6, fontSize: 14, marginBottom: 12 },
  priceBtnPrimary: { display: "block", textAlign: "center", textDecoration: "none", padding: "11px 12px", borderRadius: 14, fontWeight: 950, color: "#fff", background: "#16a34a" },

  noteBox: { marginTop: 18, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(250,204,21,0.12)", borderRadius: 16, padding: 14, color: "#cbd5e1", lineHeight: 1.7 },

  faqGrid: { display: "grid", gap: 12, marginTop: 10 },
  faqItem: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(250,204,21,0.14)", borderRadius: 16, padding: 14 },
  faqQ: { cursor: "pointer", fontWeight: 950, color: "#f8fafc" },
  faqA: { marginTop: 10, color: "#cbd5e1", lineHeight: 1.7 },

  footer: { padding: "34px 0", background: "#070a0f", color: "#cbd5e1", borderTop: "1px solid rgba(250,204,21,0.12)" },
  footerRow: { display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" },
  footerBrand: { fontWeight: 950, color: "#facc15" },
  footerText: { marginTop: 8, color: "#94a3b8", maxWidth: 520, lineHeight: 1.7, fontSize: 14 },
  footerLinks: { display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" },
  footerLink: { color: "#e5e7eb", textDecoration: "none", fontWeight: 800, fontSize: 14, opacity: 0.9 },
  footerBottom: { marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(148,163,184,0.18)", color: "#94a3b8", fontSize: 12 },
};
