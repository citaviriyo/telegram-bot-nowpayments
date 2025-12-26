// app/crypto-for-beginners/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Crypto for Beginners: Panduan Lengkap Pemula (Step-by-Step) | Koinity",
  description:
    "Panduan crypto untuk pemula: tujuan belajar (bukan FOMO), profil pemula, rencana 7 hari, memilih exchange, membuat wallet, order pertama (market vs limit), DCA, baca chart dasar, watchlist & jurnal, aturan keamanan, checklist sebelum klik Buy, FAQ, dan disclaimer.",
  keywords: [
    "crypto untuk pemula",
    "belajar crypto",
    "cara mulai crypto",
    "exchange terbaik",
    "wallet crypto",
    "seed phrase",
    "market order",
    "limit order",
    "DCA crypto",
    "support resistance",
    "keamanan crypto",
    "anti scam",
    "Koinity",
  ],
  alternates: { canonical: "/crypto-for-beginners" },
  openGraph: {
    title: "Crypto for Beginners (Step-by-Step) | Koinity",
    description:
      "Panduan lengkap pemula: rencana 7 hari, exchange & wallet, order pertama, DCA, chart dasar, jurnal, keamanan anti-scam, checklist Buy, FAQ.",
    url: "/crypto-for-beginners",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const YELLOW = "#f5c400";

type TocItem = { label: string; href: string };

const toc: TocItem[] = [
  { label: "Ringkasan 1 Menit", href: "#ringkasan-1-menit" },
  { label: "Tujuan Belajar Crypto (Bukan FOMO)", href: "#tujuan-belajar" },
  { label: "3 Profil Pemula & Cara Mulai", href: "#profil-pemula" },
  { label: "Cara Aman Mulai + Timeline 7 Hari", href: "#timeline-7-hari" },
  { label: "Cara Memilih Exchange (Keamanan & Biaya)", href: "#memilih-exchange" },
  { label: "Cara Bikin Wallet (Seed Phrase & Keamanan)", href: "#bikin-wallet" },
  { label: "Cara Beli Pertama: Market vs Limit", href: "#beli-pertama" },
  { label: "DCA: Kapan Dipakai & Contohnya", href: "#dca" },
  { label: "Cara Baca Chart Dasar (Tanpa Ribet)", href: "#chart-dasar" },
  { label: "Watchlist & Jurnal (Biar Nggak Ngasal)", href: "#watchlist-jurnal" },
  { label: "Aturan Keamanan Anti-Scam", href: "#aturan-keamanan" },
  { label: 'Checklist "Sebelum Klik Buy"', href: "#checklist-buy" },
  { label: "FAQ", href: "#faq" },
  { label: "Disclaimer", href: "#disclaimer" },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow ? (
        <div className="mb-2 flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: YELLOW }}
            aria-hidden="true"
          />
          <p className="text-xs font-semibold tracking-wide text-white/70">
            {eyebrow}
          </p>
        </div>
      ) : null}
      <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
        {title}
      </h2>
      {desc ? <p className="mt-2 text-white/70">{desc}</p> : null}
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function CTAButton({
  href,
  label,
  variant = "green",
}: {
  href: string;
  label: string;
  variant?: "green" | "yellow" | "ghost";
}) {
  const base =
    "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-0";
  const styles =
    variant === "green"
      ? "bg-emerald-500 text-black hover:bg-emerald-400 focus:ring-emerald-300"
      : variant === "yellow"
      ? "bg-yellow-400 text-black hover:bg-yellow-300 focus:ring-yellow-200"
      : "border border-white/15 bg-white/5 text-white hover:bg-white/10 focus:ring-white/30";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {label}
      <span aria-hidden="true" className="text-base">
        →
      </span>
    </Link>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-black/60 px-2 py-1 text-[0.95em] text-white/90 ring-1 ring-white/10">
      {children}
    </code>
  );
}

function ChecklistItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span
        className="mt-1.5 h-2.5 w-2.5 flex-none rounded-full"
        style={{ backgroundColor: YELLOW }}
        aria-hidden="true"
      />
      <div className="text-white/80">{children}</div>
    </li>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top accent */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-48 opacity-40"
        style={{
          background:
            "radial-gradient(600px 200px at 20% 10%, rgba(245,196,0,0.35), transparent 60%), radial-gradient(600px 200px at 80% 0%, rgba(16,185,129,0.22), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-6 md:pt-14">
        {/* Breadcrumb / mini header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Link className="hover:text-white" href="/">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80">Crypto for Beginners</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Belajar</Badge>
            <Badge>Pahami</Badge>
            <Badge>Step-by-step</Badge>
          </div>
        </div>

        {/* HERO + SIDE CARD */}
        <section className="grid gap-6 md:grid-cols-12 md:items-start">
          {/* Hero left */}
          <div className="md:col-span-7">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: YELLOW }}
                aria-hidden="true"
              />
              Panduan Pemula • Aman • Jangan FOMO
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Crypto for Beginners
              <span className="block text-white/80">
                Belajar dari tehnik analisis, money management, risk & reward dan yang terpenting adalah mind set.
              </span>
            </h1>

            <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
              Halaman ini dibuat untuk kamu yang baru mulai: ingin paham konsep,
              tahu langkah yang benar, dan punya sistem biar nggak gampang panik
              atau ketipu. Fokusnya <span className="text-white">fondasi</span>{" "}
              dulu—bukan “cepat kaya”.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#toc"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/25"
              >
                Lihat TOC
                <span aria-hidden="true">↓</span>
              </Link>
              <Link
                href="/crypto-risk-vs-reward"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/25"
              >
                Lanjut: Risk vs Reward
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Card className="p-4">
                <p className="text-xs font-semibold text-white/60">
                  Target Pemula
                </p>
                <p className="mt-2 text-sm text-white/80">
                  Punya langkah aman, bukan ikut-ikutan.
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-xs font-semibold text-white/60">
                  Output Praktis
                </p>
                <p className="mt-2 text-sm text-white/80">
                  Timeline 7 hari + checklist “Buy”.
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-xs font-semibold text-white/60">
                  Fokus Keamanan
                </p>
                <p className="mt-2 text-sm text-white/80">
                  2FA, anti-phishing, anti-scam.
                </p>
              </Card>
            </div>
          </div>

          {/* Right sticky card */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-6">
              <Card className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Panduan Cepat
                    </p>
                    <p className="mt-1 text-sm text-white/65">
                      Mulai dari yang paling penting dulu.
                    </p>
                  </div>
                  <span
                    className="rounded-lg px-3 py-1 text-xs font-semibold text-black"
                    style={{ backgroundColor: YELLOW }}
                  >
                    Beginner
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <p className="text-xs font-semibold text-white/60">
                      3 langkah super aman
                    </p>
                    <ol className="mt-2 space-y-2 text-sm text-white/80">
                      <li>1) Tentukan tujuan + profil risiko (bukan FOMO).</li>
                      <li>2) Pilih exchange aman + aktifkan 2FA.</li>
                      <li>3) Beli kecil dulu (uji proses), lalu catat.</li>
                    </ol>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <p className="text-xs font-semibold text-white/60">
                      Nominal latihan (contoh)
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                      Anggap ini “biaya belajar” agar paham alur:{" "}
                      <InlineCode>Rp50.000–Rp200.000</InlineCode> (sesuaikan
                      kemampuan). Tujuannya bukan untung besar, tapi menguasai
                      proses tanpa panik.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <CTAButton href="https://t.me/koinity_bot" label="Buka Bot" variant="green" />
                    <CTAButton href="https://t.me/koinity_bot" label="Lihat Paket" variant="yellow" />
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold text-white/60">
                      Next step yang disarankan
                    </p>
                    <p className="mt-2 text-sm text-white/75">
                      Kalau kamu sudah paham dasar, lanjut ke{" "}
                      <Link
                        className="text-emerald-300 hover:text-emerald-200"
                        href="/crypto-risk-vs-reward"
                      >
                        /crypto-risk-vs-reward
                      </Link>{" "}
                      untuk memahami risiko, ekspektasi, dan cara tidak
                      “overconfident”.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* TOC */}
        <section id="toc" className="mt-12 scroll-mt-24">
          <SectionTitle
            eyebrow="NAVIGASI"
            title="Table of Contents"
            desc="Klik untuk lompat ke bagian yang kamu butuhkan."
          />
          <Card className="p-5">
            <div className="grid gap-2 sm:grid-cols-2">
              {toc.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/80 hover:bg-white/5"
                >
                  <span className="group-hover:text-white">{item.label}</span>
                  <span className="text-white/35 group-hover:text-white/60" aria-hidden="true">
                    →
                  </span>
                </a>
              ))}
            </div>
          </Card>
        </section>

        {/* RINGKASAN */}
        <section id="ringkasan-1-menit" className="mt-14 scroll-mt-24">
          <SectionTitle
            eyebrow="START HERE"
            title="Ringkasan 1 Menit"
            desc="Kalau kamu cuma punya 60 detik, baca ini dulu."
          />
          <Card className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <ul className="space-y-3 text-white/80">
                  <li className="flex gap-3">
                    <span
                      className="mt-2 h-2.5 w-2.5 flex-none rounded-full"
                      style={{ backgroundColor: YELLOW }}
                      aria-hidden="true"
                    />
                    <p>
                      Tujuan belajar crypto: <span className="text-white">paham</span>{" "}
                      (konsep + proses + keamanan), bukan ikut hype. Keuntungan itu
                      efek samping dari keputusan yang benar.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span
                      className="mt-2 h-2.5 w-2.5 flex-none rounded-full"
                      style={{ backgroundColor: YELLOW }}
                      aria-hidden="true"
                    />
                    <p>
                      Mulai kecil: <InlineCode>Rp50k–Rp200k</InlineCode> untuk latihan
                      alur: deposit → beli → simpan → catat.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span
                      className="mt-2 h-2.5 w-2.5 flex-none rounded-full"
                      style={{ backgroundColor: YELLOW }}
                      aria-hidden="true"
                    />
                    <p>Utamakan keamanan: 2FA, verifikasi link, jangan share seed phrase.</p>
                  </li>
                  <li className="flex gap-3">
                    <span
                      className="mt-2 h-2.5 w-2.5 flex-none rounded-full"
                      style={{ backgroundColor: YELLOW }}
                      aria-hidden="true"
                    />
                    <p>
                      Strategi pemula paling waras:{" "}
                      <span className="text-white">DCA</span> + jurnal + aturan “sebelum klik buy”.
                    </p>
                  </li>
                </ul>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
                  <p className="text-sm font-semibold text-white">Prinsip emas pemula</p>
                  <p className="mt-2 text-white/75">
                    Kalau kamu belum bisa jelasin alasan beli dalam 2 kalimat, berarti kamu
                    belum siap klik <span className="font-semibold text-white">Buy</span>.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm font-semibold text-white">Mini target 7 hari</p>
                <ol className="mt-3 space-y-2 text-sm text-white/80">
                  <li>Hari 1–2: paham tujuan + profil</li>
                  <li>Hari 3: pilih exchange + 2FA</li>
                  <li>Hari 4: bikin wallet + backup</li>
                  <li>Hari 5: order pertama kecil</li>
                  <li>Hari 6: watchlist + jurnal</li>
                  <li>Hari 7: evaluasi + risk vs reward</li>
                </ol>

                <div className="mt-5">
                  <CTAButton href="/crypto-risk-vs-reward" label="Pelajari Risk vs Reward" variant="green" />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* TUJUAN */}
        <section id="tujuan-belajar" className="mt-14 scroll-mt-24">
          <SectionTitle
            eyebrow="FOUNDATION"
            title="Tujuan Belajar Crypto (Bukan FOMO)"
            desc="Crypto itu alat. Kalau tujuannya salah, langkahnya pasti kacau."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <p className="text-sm font-semibold text-white">Tujuan yang sehat</p>
              <ul className="mt-4 space-y-3">
                <ChecklistItem>
                  Paham cara kerja dasar: aset digital, exchange, wallet, order, dan biaya.
                </ChecklistItem>
                <ChecklistItem>
                  Bisa bedakan “investasi terukur” vs “spekulasi emosional”.
                </ChecklistItem>
                <ChecklistItem>
                  Punya sistem: rencana, ukuran posisi, jurnal, dan aturan keamanan.
                </ChecklistItem>
                <ChecklistItem>Belajar mengelola risiko: bukan menghilangkan risiko.</ChecklistItem>
              </ul>
            </Card>

            <Card className="p-6">
              <p className="text-sm font-semibold text-white">Tanda kamu sedang FOMO</p>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="font-semibold text-white/90">1) Beli karena “temen ngomong”</p>
                  <p className="mt-1 text-white/70">
                    Kamu nggak tahu apa yang dibeli, cuma takut ketinggalan.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="font-semibold text-white/90">2) Semua uang masuk sekaligus</p>
                  <p className="mt-1 text-white/70">
                    Ini bikin emosi meledak saat harga turun sedikit.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="font-semibold text-white/90">3) Nggak punya aturan keluar</p>
                  <p className="mt-1 text-white/70">Kalau naik bingung, kalau turun panik.</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="mt-6 p-6">
            <p className="text-sm font-semibold text-white">Kalimat pegangan</p>
            <p className="mt-2 text-white/75">
              “Saya belajar crypto untuk <span className="font-semibold text-white">membangun skill</span>: memahami risiko,
              memahami proses, dan mengambil keputusan dengan tenang.”
            </p>
          </Card>
        </section>

        {/* PROFIL PEMULA */}
        <section id="profil-pemula" className="mt-14 scroll-mt-24">
          <SectionTitle
            eyebrow="PERSONAL FIT"
            title="3 Profil Pemula & Cara Mulai yang Cocok"
            desc="Kamu tidak perlu meniru orang lain. Pilih gaya yang sesuai mental & uangmu."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-base font-bold text-white">Konservatif</p>
                <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Fokus aman
                </span>
              </div>
              <p className="mt-3 text-sm text-white/75">
                Kamu lebih pilih stabil, nggak kuat lihat grafik naik-turun ekstrem.
              </p>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4">
                <p className="text-xs font-semibold text-white/60">Cara mulai</p>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  <li>• Belajar dulu, beli kecil sebagai latihan.</li>
                  <li>• Pakai DCA (jadwal rutin), jangan sering “ngejar”.</li>
                  <li>• Buat aturan: hanya uang “dingin”, bukan uang kebutuhan.</li>
                </ul>
              </div>
              <p className="mt-4 text-sm text-white/70">Cocok kalau tujuanmu: disiplin + konsisten.</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-base font-bold text-white">Moderat</p>
                <span
                  className="rounded-lg px-3 py-1 text-xs font-semibold text-black"
                  style={{ backgroundColor: YELLOW }}
                >
                  Paling umum
                </span>
              </div>
              <p className="mt-3 text-sm text-white/75">
                Kamu bisa terima naik turun asal ada rencana dan batasan.
              </p>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4">
                <p className="text-xs font-semibold text-white/60">Cara mulai</p>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  <li>• DCA untuk inti, plus sisihkan kecil untuk belajar chart.</li>
                  <li>• Punya watchlist & jurnal (wajib).</li>
                  <li>• Gunakan limit order untuk latihan disiplin entry.</li>
                </ul>
              </div>
              <p className="mt-4 text-sm text-white/70">
                Cocok kalau kamu ingin belajar sambil jalan, tapi tetap rapi.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-base font-bold text-white">Agresif</p>
                <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Emosi kuat
                </span>
              </div>
              <p className="mt-3 text-sm text-white/75">
                Kamu tertarik trading aktif dan bisa tahan volatilitas tinggi.
              </p>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4">
                <p className="text-xs font-semibold text-white/60">Cara mulai (tetap aman)</p>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  <li>• Pisahkan “akun belajar” nominal kecil.</li>
                  <li>• Fokus 1–2 aset dulu, jangan kebanyakan.</li>
                  <li>• Pahami risk management sebelum tambah modal.</li>
                </ul>
              </div>
              <p className="mt-4 text-sm text-white/70">Catatan: agresif tanpa aturan = cepat habis.</p>
            </Card>
          </div>

          <Card className="mt-6 p-6">
            <p className="text-sm font-semibold text-white">Tes cepat: kamu masuk yang mana?</p>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
                <p className="font-semibold text-white/90">Kalau harga turun 10%…</p>
                <p className="mt-1 text-white/70">Konservatif: panik / nggak bisa tidur</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
                <p className="font-semibold text-white/90">Kalau harga turun 10%…</p>
                <p className="mt-1 text-white/70">Moderat: tenang, cek rencana</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
                <p className="font-semibold text-white/90">Kalau harga turun 10%…</p>
                <p className="mt-1 text-white/70">Agresif: lihat peluang, tapi tetap batasan</p>
              </div>
            </div>
          </Card>
        </section>

        {/* TIMELINE 7 HARI */}
        <section id="timeline-7-hari" className="mt-14 scroll-mt-24">
          <SectionTitle
            eyebrow="SAFE START"
            title="Cara Aman Mulai + Timeline 7 Hari Belajar"
            desc="Ini rute yang paling minim drama untuk pemula."
          />

          <Card className="p-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-white">Aturan “mulai kecil”</p>
                <ul className="mt-4 space-y-3">
                  <ChecklistItem>
                    Anggap awal itu <span className="font-semibold text-white">latihan alur</span> bukan “mencari untung besar”.
                  </ChecklistItem>
                  <ChecklistItem>
                    Jangan pakai uang kebutuhan (makan, sekolah, cicilan). Pakai uang yang kalau turun kamu masih tenang.
                  </ChecklistItem>
                  <ChecklistItem>
                    Fokus proses: deposit → beli → tarik ke wallet (opsional) → catat biaya.
                  </ChecklistItem>
                </ul>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
                  <p className="text-sm font-semibold text-white">Nominal latihan (contoh aman)</p>
                  <p className="mt-2 text-white/75">
                    Mulai dari <InlineCode>Rp50k</InlineCode> dulu untuk mencoba order. Jika sudah nyaman,
                    naikkan perlahan sesuai profil dan rencana.
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">Timeline 7 hari (praktis)</p>
                <div className="mt-4 space-y-3 text-sm">
                  {[
                    {
                      day: "Hari 1",
                      title: "Tujuan + profil risiko",
                      desc: "Tulis tujuan 1 kalimat. Tentukan kamu konservatif/moderat/agresif.",
                    },
                    {
                      day: "Hari 2",
                      title: "Dasar exchange, wallet, biaya",
                      desc: "Paham istilah: fee, spread, network fee, deposit/withdraw.",
                    },
                    {
                      day: "Hari 3",
                      title: "Pilih exchange + keamanan",
                      desc: "Buat akun, aktifkan 2FA, amankan email, simpan recovery.",
                    },
                    {
                      day: "Hari 4",
                      title: "Bikin wallet (opsional tapi disarankan)",
                      desc: "Pahami seed phrase & cara backup yang benar.",
                    },
                    {
                      day: "Hari 5",
                      title: "Beli pertama kecil",
                      desc: "Coba market vs limit. Catat harga, fee, alasan beli.",
                    },
                    {
                      day: "Hari 6",
                      title: "Watchlist + jurnal",
                      desc: "Susun watchlist, tentukan alasan entry/exit, disiplin catat.",
                    },
                    {
                      day: "Hari 7",
                      title: "Evaluasi + risk vs reward",
                      desc: "Review kesalahan & perbaiki aturan. Lanjut ke risk vs reward.",
                    },
                  ].map((x) => (
                    <div key={x.day} className="rounded-xl border border-white/10 bg-black/40 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-white">
                          {x.day}: {x.title}
                        </p>
                        <span
                          className="rounded-lg px-2.5 py-1 text-xs font-semibold text-black"
                          style={{ backgroundColor: YELLOW }}
                        >
                          Fokus
                        </span>
                      </div>
                      <p className="mt-2 text-white/70">{x.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <CTAButton href="/crypto-risk-vs-reward" label="Lanjut ke Risk vs Reward" variant="green" />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* EXCHANGE */}
        <section id="memilih-exchange" className="mt-14 scroll-mt-24">
          <SectionTitle
            eyebrow="SETUP"
            title="Cara Memilih Exchange (Kriteria Keamanan + Biaya)"
            desc="Exchange itu “tempat transaksi”. Pilih yang aman dulu, baru fitur."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <p className="text-sm font-semibold text-white">Kriteria keamanan (wajib)</p>
              <ul className="mt-4 space-y-3">
                <ChecklistItem>
                  <span className="font-semibold text-white">Reputasi & transparansi</span>: jelas siapa perusahaannya, ada riwayat yang bisa dicek, dan komunikasinya rapi.
                </ChecklistItem>
                <ChecklistItem>
                  <span className="font-semibold text-white">Fitur keamanan akun</span>: 2FA (authenticator), anti-phishing code, whitelist address (kalau ada), notifikasi login.
                </ChecklistItem>
                <ChecklistItem>
                  <span className="font-semibold text-white">Proses deposit/withdraw jelas</span>: biaya, estimasi waktu, dan status transaksi mudah dipantau.
                </ChecklistItem>
                <ChecklistItem>
                  <span className="font-semibold text-white">Support responsif</span>: ada pusat bantuan dan kanal yang jelas.
                </ChecklistItem>
              </ul>
            </Card>

            <Card className="p-6">
              <p className="text-sm font-semibold text-white">Kriteria biaya (biar nggak “bocor halus”)</p>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="font-semibold text-white/90">1) Trading fee</p>
                  <p className="mt-1 text-white/70">
                    Biaya saat kamu beli/jual. Biasanya berbeda antara market dan limit (maker/taker).
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="font-semibold text-white/90">2) Spread</p>
                  <p className="mt-1 text-white/70">
                    Selisih harga beli vs harga jual. Kalau spread besar, kamu rugi “diam-diam”.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="font-semibold text-white/90">3) Deposit/Withdraw fee</p>
                  <p className="mt-1 text-white/70">
                    Biaya masuk/keluar dana dan biaya jaringan saat kirim crypto.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="mt-6 p-6">
            <p className="text-sm font-semibold text-white">Checklist memilih exchange (praktis)</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                <p className="text-xs font-semibold text-white/60">Cek ini dulu</p>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  <li>• Bisa 2FA Authenticator (bukan SMS saja)</li>
                  <li>• Ada anti-phishing code (kalau tersedia)</li>
                  <li>• UI jelas untuk fee & riwayat transaksi</li>
                  <li>• Withdraw mudah dilacak statusnya</li>
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                <p className="text-xs font-semibold text-white/60">Hindari</p>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  <li>• Janji profit pasti</li>
                  <li>• “Admin” minta kode OTP / 2FA</li>
                  <li>• Link login aneh, domain mirip-mirip</li>
                  <li>• Grup random yang nyuruh deposit cepat</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* WALLET */}
        <section id="bikin-wallet" className="mt-14 scroll-mt-24">
          <SectionTitle
            eyebrow="SELF CUSTODY"
            title="Cara Bikin Wallet (Seed Phrase & Keamanan)"
            desc="Wallet itu “dompet” untuk menyimpan aset. Kamu pegang kuncinya."
          />

          <Card className="p-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-white">Bedanya exchange vs wallet (simpelnya)</p>
                <div className="mt-4 space-y-3 text-sm text-white/80">
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <p className="font-semibold text-white/90">Exchange</p>
                    <p className="mt-1 text-white/70">
                      Tempat transaksi. Praktis, tapi kamu “titip” aset pada platform.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <p className="font-semibold text-white/90">Wallet</p>
                    <p className="mt-1 text-white/70">
                      Dompet pribadi. Kamu pegang kunci (seed phrase/private key). Lebih mandiri, tapi tanggung jawab lebih besar.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-sm font-semibold text-white">Seed phrase itu apa?</p>
                  <p className="mt-2 text-white/75">
                    Seed phrase adalah rangkaian kata (biasanya 12/24 kata) yang bisa mengembalikan akses wallet kamu.
                    Anggap seperti <span className="font-semibold text-white">kunci master</span>.
                  </p>
                  <p className="mt-3 text-white/75">
                    Aturan keras:{" "}
                    <span className="font-semibold text-emerald-300">tidak pernah</span>{" "}
                    difoto, tidak dikirim chat, tidak disimpan di cloud, dan tidak diberikan ke siapa pun.
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">Langkah bikin wallet (aman)</p>
                <ol className="mt-4 space-y-3 text-sm text-white/80">
                  <li className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <p className="font-semibold text-white/90">1) Install dari sumber resmi</p>
                    <p className="mt-1 text-white/70">
                      Pastikan aplikasi/extension dari store resmi. Jangan dari link random.
                    </p>
                  </li>
                  <li className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <p className="font-semibold text-white/90">2) Buat wallet baru</p>
                    <p className="mt-1 text-white/70">
                      Kamu akan dapat seed phrase. Tulis manual di kertas (minimal 2 salinan, simpan terpisah).
                    </p>
                  </li>
                  <li className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <p className="font-semibold text-white/90">3) Buat password lokal</p>
                    <p className="mt-1 text-white/70">
                      Password ini untuk membuka wallet di perangkat (bukan pengganti seed phrase).
                    </p>
                  </li>
                  <li className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <p className="font-semibold text-white/90">4) Tes recovery (opsional tapi bagus)</p>
                    <p className="mt-1 text-white/70">
                      Pastikan kamu benar-benar bisa restore dengan seed phrase (di perangkat aman).
                    </p>
                  </li>
                </ol>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-5">
                  <p className="text-sm font-semibold text-white">Kesalahan pemula yang sering kejadian</p>
                  <ul className="mt-3 space-y-2 text-sm text-white/80">
                    <li>• Simpan seed phrase di Notes/WhatsApp/Google Drive.</li>
                    <li>• Foto seed phrase untuk “biar gampang”.</li>
                    <li>• Klik “airdrop” atau “claim” dari link random.</li>
                    <li>• Install extension palsu dengan nama mirip.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* BUY PERTAMA */}
        <section id="beli-pertama" className="mt-14 scroll-mt-24">
          <SectionTitle
            eyebrow="FIRST TRADE"
            title="Cara Beli Pertama: Market vs Limit Order"
            desc="Beli itu bukan cuma klik Buy. Kamu perlu paham jenis order biar nggak kaget."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <p className="text-sm font-semibold text-white">Market Order</p>
              <p className="mt-3 text-white/75">
                <span className="font-semibold text-white">Langsung kebeli</span> di harga terbaik yang tersedia saat itu.
                Cocok untuk pemula saat latihan alur (asal nominal kecil).
              </p>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4">
                <p className="text-xs font-semibold text-white/60">Kelebihan</p>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  <li>• Cepat & simpel</li>
                  <li>• Cocok untuk coba pertama kali</li>
                </ul>
                <p className="mt-4 text-xs font-semibold text-white/60">Risiko</p>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  <li>• Bisa kebeli di harga sedikit lebih tinggi (tergantung likuiditas & spread)</li>
                </ul>
              </div>
            </Card>

            <Card className="p-6">
              <p className="text-sm font-semibold text-white">Limit Order</p>
              <p className="mt-3 text-white/75">
                Kamu tentukan harga beli. Order akan tereksekusi jika harga menyentuh level itu.
                Cocok untuk belajar disiplin entry.
              </p>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4">
                <p className="text-xs font-semibold text-white/60">Kelebihan</p>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  <li>• Kamu kontrol harga</li>
                  <li>• Latih disiplin & rencana</li>
                </ul>
                <p className="mt-4 text-xs font-semibold text-white/60">Risiko</p>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  <li>• Bisa tidak kebeli jika harga tidak turun ke levelmu</li>
                </ul>
              </div>
            </Card>
          </div>

          <Card className="mt-6 p-6">
            <p className="text-sm font-semibold text-white">Contoh gampang (biar kebayang)</p>
            <p className="mt-2 text-white/75">Harga aset sekarang Rp100.000.</p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>• Market: kamu klik Buy → kebeli sekitar Rp100.000 (bisa sedikit beda).</li>
              <li>• Limit: kamu set Buy di Rp95.000 → baru kebeli kalau harga turun ke Rp95.000.</li>
            </ul>
            <p className="mt-4 text-white/75">
              Pemula biasanya aman mulai: <span className="font-semibold text-white">market kecil</span> untuk latihan,
              lalu belajar <span className="font-semibold text-white">limit</span> untuk disiplin.
            </p>
          </Card>
        </section>

        {/* DCA */}
        <section id="dca" className="mt-14 scroll-mt-24">
          <SectionTitle
            eyebrow="STRATEGY"
            title="DCA (Dollar Cost Averaging) dan Kapan Dipakai"
            desc="Strategi pemula paling “waras” untuk mengurangi stres timing."
          />

          <Card className="p-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-white">Apa itu DCA?</p>
                <p className="mt-3 text-white/75">
                  DCA artinya kamu beli rutin dengan nominal yang sama di jadwal tertentu.
                  Tujuannya bukan menebak harga paling bawah, tapi membangun kebiasaan dan rata-rata harga beli.
                </p>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-5">
                  <p className="text-sm font-semibold text-white">Contoh DCA</p>
                  <p className="mt-2 text-white/75">
                    Setiap minggu beli <InlineCode>Rp100.000</InlineCode> selama 12 minggu.
                    Saat harga naik kamu dapat lebih sedikit unit, saat harga turun kamu dapat lebih banyak unit.
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">Kapan DCA cocok?</p>
                <ul className="mt-4 space-y-3">
                  <ChecklistItem>Kamu pemula dan tidak ingin stres melihat harga setiap jam.</ChecklistItem>
                  <ChecklistItem>Kamu punya pemasukan rutin dan ingin disiplin.</ChecklistItem>
                  <ChecklistItem>Kamu ingin mengurangi efek “salah timing”.</ChecklistItem>
                </ul>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-sm font-semibold text-white">Kapan DCA kurang cocok?</p>
                  <p className="mt-2 text-white/75">
                    Kalau kamu belum paham dasar risiko dan memakai uang kebutuhan. DCA bukan “jimat anti rugi”—tetap ada risiko.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-5">
              <p className="text-sm font-semibold text-white">Tips DCA pemula</p>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li>• Tentukan jadwal (mis. mingguan) dan jangan sering diubah.</li>
                <li>• Pilih nominal yang tidak mengganggu cashflow.</li>
                <li>• Tetap catat: tanggal, nominal, harga, fee.</li>
              </ul>
            </div>
          </Card>
        </section>

        {/* CHART */}
        <section id="chart-dasar" className="mt-14 scroll-mt-24">
          <SectionTitle
            eyebrow="BASIC TECHNICAL"
            title="Cara Baca Chart Dasar (Trend, Support/Resistance) Tanpa Ribet"
            desc="Kamu tidak perlu jadi analis. Yang penting paham gambaran besar."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <p className="text-sm font-semibold text-white">1) Pahami trend dulu</p>
              <p className="mt-3 text-white/75">Trend itu arah besar pergerakan harga.</p>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="font-semibold text-white/90">Uptrend</p>
                  <p className="mt-1 text-white/70">
                    Harga cenderung bikin puncak lebih tinggi dan lembah lebih tinggi.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="font-semibold text-white/90">Downtrend</p>
                  <p className="mt-1 text-white/70">Puncak makin rendah, lembah makin rendah.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="font-semibold text-white/90">Sideways</p>
                  <p className="mt-1 text-white/70">
                    Harga bergerak di range (naik turun dalam kotak).
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <p className="text-sm font-semibold text-white">2) Support & Resistance</p>
              <p className="mt-3 text-white/75">
                Anggap seperti “lantai” (support) dan “plafon” (resistance) yang sering disentuh harga.
              </p>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
                <p className="font-semibold text-white/90">Cara cepat menandai</p>
                <ul className="mt-2 space-y-2">
                  <li>• Zoom out (timeframe lebih besar) agar kelihatan area penting.</li>
                  <li>• Cari area yang berkali-kali memantul (bukan 1 titik saja).</li>
                  <li>• Anggap itu zona, bukan garis super presisi.</li>
                </ul>
              </div>
            </Card>
          </div>

          <Card className="mt-6 p-6">
            <p className="text-sm font-semibold text-white">Aturan chart pemula (anti pusing)</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
                <p className="font-semibold text-white/90">Zoom out dulu</p>
                <p className="mt-1 text-white/70">Jangan cuma lihat 5 menit terakhir.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
                <p className="font-semibold text-white/90">Cari area</p>
                <p className="mt-1 text-white/70">Support/resistance itu zona.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
                <p className="font-semibold text-white/90">Jangan over-indicator</p>
                <p className="mt-1 text-white/70">Pemula cukup: trend + zona.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* WATCHLIST & JURNAL */}
        <section id="watchlist-jurnal" className="mt-14 scroll-mt-24">
          <SectionTitle
            eyebrow="SYSTEM"
            title="Cara Menyusun Watchlist dan Jurnal"
            desc="Ini yang bikin kamu beda dari orang yang cuma “tebak-tebakan”."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <p className="text-sm font-semibold text-white">Watchlist (daftar pantauan)</p>
              <p className="mt-3 text-white/75">
                Watchlist itu bukan “koleksi koin banyak”. Untuk pemula, justru lebih baik sedikit tapi paham.
              </p>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
                <p className="font-semibold text-white/90">Cara buat watchlist pemula</p>
                <ul className="mt-2 space-y-2">
                  <li>• Pilih 5–12 aset maksimum (biar fokus).</li>
                  <li>• Kelompokkan: inti (lebih stabil) vs belajar (lebih volatil).</li>
                  <li>• Tulis alasan masuk watchlist (2 kalimat).</li>
                </ul>
              </div>
            </Card>

            <Card className="p-6">
              <p className="text-sm font-semibold text-white">Jurnal (wajib kalau mau rapi)</p>
              <p className="mt-3 text-white/75">Jurnal membuat kamu belajar dari data, bukan dari emosi.</p>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
                <p className="font-semibold text-white/90">Kolom jurnal minimal</p>
                <ul className="mt-2 space-y-2">
                  <li>• Tanggal & jam</li>
                  <li>• Aset</li>
                  <li>• Harga masuk</li>
                  <li>• Jenis order (market/limit)</li>
                  <li>• Alasan beli (maks 2–3 poin)</li>
                  <li>• Rencana keluar (profit / cut loss / invalidasi)</li>
                  <li>• Fee</li>
                  <li>• Catatan emosi (tenang/panik/serakah)</li>
                </ul>
              </div>
            </Card>
          </div>

          <Card className="mt-6 p-6">
            <p className="text-sm font-semibold text-white">Aturan jurnal yang bikin kamu cepat naik level</p>
            <ul className="mt-4 space-y-3">
              <ChecklistItem>Kalau nggak sempat nulis jurnal, jangan entry.</ChecklistItem>
              <ChecklistItem>
                Setelah 10 transaksi, review: mana yang “sesuai rencana” dan mana yang “asal klik”.
              </ChecklistItem>
              <ChecklistItem>Perbaiki 1 hal tiap minggu (misal: selalu pakai limit untuk entry tertentu).</ChecklistItem>
            </ul>
          </Card>
        </section>

        {/* SECURITY */}
        <section id="aturan-keamanan" className="mt-14 scroll-mt-24">
          <SectionTitle
            eyebrow="SECURITY"
            title="Aturan Keamanan: 2FA, Anti-Scam, Verifikasi Link, Anti-Phishing"
            desc="Mayoritas kerugian pemula bukan karena market—tapi karena salah klik dan salah percaya."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <p className="text-sm font-semibold text-white">Keamanan akun (wajib)</p>
              <ul className="mt-4 space-y-3">
                <ChecklistItem>
                  Aktifkan <span className="font-semibold text-white">2FA Authenticator</span> (lebih kuat daripada SMS).
                </ChecklistItem>
                <ChecklistItem>Email yang dipakai untuk exchange harus juga diamankan (password kuat + 2FA).</ChecklistItem>
                <ChecklistItem>Jangan simpan password di chat. Gunakan password manager jika bisa.</ChecklistItem>
                <ChecklistItem>Aktifkan notifikasi login/withdraw agar kamu cepat sadar jika ada aktivitas aneh.</ChecklistItem>
              </ul>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-5">
                <p className="text-sm font-semibold text-white">Kunci sederhana</p>
                <p className="mt-2 text-white/75">
                  Kalau ada yang minta <span className="font-semibold text-white">OTP / kode 2FA / seed phrase</span>,
                  itu bukan bantuan—itu pencurian.
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <p className="text-sm font-semibold text-white">Anti-scam & anti-phishing</p>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="font-semibold text-white/90">1) Verifikasi link</p>
                  <p className="mt-1 text-white/70">
                    Biasakan buka situs dari bookmark, bukan dari DM/iklan. Periksa domain dengan teliti.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="font-semibold text-white/90">2) Waspada “hadiah”</p>
                  <p className="mt-1 text-white/70">
                    Airdrop/claim/reward yang minta konek wallet dan approve izin bisa berbahaya.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="font-semibold text-white/90">3) Jangan percaya “admin” random</p>
                  <p className="mt-1 text-white/70">
                    Pelaku sering pakai foto & nama mirip. Selalu cek channel resmi.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="font-semibold text-white/90">4) Double-check alamat</p>
                  <p className="mt-1 text-white/70">
                    Saat withdraw, cek alamat tujuan 2–3 kali. Salah kirim biasanya tidak bisa dibatalkan.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="mt-6 p-6">
            <p className="text-sm font-semibold text-white">Kebiasaan anti-nyesel</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
                <p className="font-semibold text-white/90">Bookmark</p>
                <p className="mt-1 text-white/70">Situs penting simpan sebagai bookmark.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
                <p className="font-semibold text-white/90">Slow down</p>
                <p className="mt-1 text-white/70">Scammer selalu buru-buruin.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
                <p className="font-semibold text-white/90">Test kecil</p>
                <p className="mt-1 text-white/70">Transfer pertama selalu nominal kecil.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* CHECKLIST BUY */}
        <section id="checklist-buy" className="mt-14 scroll-mt-24">
          <SectionTitle
            eyebrow="ACTION"
            title='Checklist "Sebelum Klik Buy"'
            desc="Kalau checklist ini belum beres, jangan klik Buy."
          />

          <Card className="p-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-white">Checklist inti</p>
                <ul className="mt-4 space-y-3">
                  <ChecklistItem>
                    Saya tahu alasan beli (maks 2–3 poin) dan bisa jelasin ke orang awam.
                  </ChecklistItem>
                  <ChecklistItem>Ini uang dingin (kalau turun, hidup saya tidak kacau).</ChecklistItem>
                  <ChecklistItem>
                    Saya tahu jenis order yang dipakai (market/limit) dan paham konsekuensinya.
                  </ChecklistItem>
                  <ChecklistItem>Saya sudah cek biaya: fee trading + spread + biaya withdraw (kalau ada).</ChecklistItem>
                  <ChecklistItem>
                    Saya punya rencana keluar: target realistis dan batas rugi (cut loss / invalidasi).
                  </ChecklistItem>
                  <ChecklistItem>Saya tidak sedang emosi (panik, serakah, dendam) saat mengambil keputusan.</ChecklistItem>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">Checklist keamanan</p>
                <ul className="mt-4 space-y-3">
                  <ChecklistItem>2FA sudah aktif dan email sudah aman.</ChecklistItem>
                  <ChecklistItem>Saya masuk lewat link resmi/bookmark (bukan dari DM).</ChecklistItem>
                  <ChecklistItem>Tidak ada pihak yang meminta OTP/2FA/seed phrase.</ChecklistItem>
                  <ChecklistItem>
                    Jika withdraw: alamat tujuan sudah dicek 2–3 kali dan test kecil terlebih dulu.
                  </ChecklistItem>
                  <ChecklistItem>Saya catat transaksi ke jurnal setelah eksekusi.</ChecklistItem>
                </ul>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-5">
                  <p className="text-sm font-semibold text-white">Shortcut aturan pemula</p>
                  <p className="mt-2 text-white/75">
                    Kalau kamu ragu, turunkan ukuran posisi atau tunda 24 jam. Market selalu ada besok.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <CTAButton href="/crypto-risk-vs-reward" label="Baca Risk vs Reward" variant="green" />
              <CTAButton href="https://t.me/koinity_bot" label="Buka Bot" variant="ghost" />
              <CTAButton href="https://t.me/koinity_bot" label="Lihat Paket" variant="yellow" />
            </div>
          </Card>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-14 scroll-mt-24">
          <SectionTitle
            eyebrow="FAQ"
            title="Pertanyaan yang Sering Ditanya Pemula"
            desc="Jawaban singkat, jelas, dan nggak bikin pusing."
          />

          <div className="grid gap-4">
            {[
              {
                q: "1) Berapa modal minimal untuk mulai crypto?",
                a: "Mulai dari nominal kecil yang kamu rela untuk belajar. Fokus awal: memahami proses (deposit, order, fee, keamanan), bukan mengejar untung besar.",
              },
              {
                q: "2) Lebih baik simpan di exchange atau wallet?",
                a: "Exchange itu praktis untuk transaksi. Wallet memberi kontrol lebih besar (kamu pegang kunci). Pemula bisa mulai di exchange, lalu belajar wallet untuk kemandirian dan keamanan.",
              },
              {
                q: "3) Apa itu seed phrase dan kenapa penting?",
                a: "Seed phrase adalah kunci master untuk memulihkan wallet. Kalau hilang, kamu bisa kehilangan akses. Kalau bocor, orang lain bisa mengambil asetmu. Jangan simpan digital.",
              },
              {
                q: "4) Market order itu bahaya?",
                a: "Tidak selalu. Market order simpel dan cocok untuk latihan pertama dengan nominal kecil. Untuk disiplin harga, limit order lebih baik.",
              },
              {
                q: "5) Kapan saya sebaiknya pakai DCA?",
                a: "Saat kamu pemula dan ingin disiplin tanpa stres timing. DCA membantu membangun kebiasaan, tapi tetap butuh pemahaman risiko.",
              },
              {
                q: "6) Kenapa harga crypto bisa naik turun ekstrem?",
                a: "Karena pasar bisa sangat sensitif terhadap sentimen, berita, likuiditas, dan psikologi massa. Itulah kenapa manajemen risiko penting.",
              },
              {
                q: "7) Apa yang harus dipelajari sebelum mulai trading aktif?",
                a: "Minimal: trend, support/resistance, jenis order, ukuran posisi, dan aturan cut loss. Kalau belum siap, fokus dulu DCA + jurnal.",
              },
              {
                q: "8) Bagaimana cara menghindari scam yang paling umum?",
                a: "Jangan klik link dari DM, pakai bookmark, aktifkan 2FA, dan jangan pernah berikan OTP/2FA/seed phrase. Scammer selalu pakai urgensi dan janji profit.",
              },
              {
                q: "9) Apakah saya harus cek chart setiap hari?",
                a: "Tidak wajib. Kalau kamu DCA, cukup cek berkala untuk belajar. Yang penting sistem dan konsistensi, bukan menatap chart terus.",
              },
              {
                q: "10) Berapa banyak aset yang ideal untuk pemula?",
                a: "Sedikit tapi paham. Mulai 5–12 aset di watchlist agar fokus. Terlalu banyak bikin keputusan berantakan.",
              },
              {
                q: "11) Apa itu watchlist dan jurnal, kenapa wajib?",
                a: "Watchlist menjaga fokus aset yang kamu pantau. Jurnal melatih kamu belajar dari data, bukan dari emosi—ini pembeda terbesar pemula vs yang serius.",
              },
              {
                q: "12) Gimana kalau saya takut telat (ketinggalan)?",
                a: "Itu FOMO. Market selalu memberi peluang baru. Lebih baik telat tapi benar daripada cepat tapi berantakan.",
              },
            ].map((item) => (
              <Card key={item.q} className="p-6">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="text-base font-semibold text-white">{item.q}</span>

                    <span className="flex items-center gap-2">
                      <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 group-open:bg-white/10">
                        <span className="group-open:hidden">Buka</span>
                        <span className="hidden group-open:inline">Tutup</span>
                      </span>
                      <ChevronIcon className="text-white/60 transition-transform duration-200 group-open:rotate-180" />
                    </span>
                  </summary>

                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-white/75">{item.a}</p>
                  </div>
                </details>
              </Card>
            ))}
          </div>

          <Card className="mt-6 p-6">
            <p className="text-sm font-semibold text-white">Masih bingung?</p>
            <p className="mt-2 text-white/75">
              Kalau kamu sudah beres halaman ini, langkah yang paling enak adalah lanjut ke{" "}
              <Link className="text-emerald-300 hover:text-emerald-200" href="/crypto-risk-vs-reward">
                /crypto-risk-vs-reward
              </Link>{" "}
              agar kamu paham ekspektasi dan batas risiko secara realistis.
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <CTAButton href="/crypto-risk-vs-reward" label="Lanjut Risk vs Reward" variant="green" />
              <CTAButton href="https://t.me/koinity_bot" label="Buka Bot" variant="ghost" />
              <CTAButton href="https://t.me/koinity_bot" label="Lihat Paket" variant="yellow" />
            </div>
          </Card>
        </section>

        {/* DISCLAIMER */}
        <section id="disclaimer" className="mt-14 scroll-mt-24">
          <SectionTitle
            eyebrow="IMPORTANT"
            title="Disclaimer"
            desc="Baca ini biar ekspektasi kamu sehat."
          />
          <Card className="p-6">
            <div className="space-y-3 text-sm text-white/75">
              <p>
                Konten di halaman ini bersifat edukasi umum untuk pemula dan{" "}
                <span className="font-semibold text-white">bukan</span> nasihat keuangan pribadi.
                Keputusan investasi/trading adalah tanggung jawab masing-masing.
              </p>
              <p>
                Crypto memiliki volatilitas tinggi dan risiko kehilangan sebagian atau seluruh dana.
                Mulailah dengan nominal kecil, pahami produk, dan gunakan sistem manajemen risiko.
              </p>
              <p>
                Waspadai penipuan. Koinity tidak pernah meminta OTP/2FA/seed phrase.
                Selalu pastikan kamu menggunakan link resmi dan verifikasi sebelum melakukan transaksi.
              </p>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <CTAButton href="/crypto-risk-vs-reward" label="Baca Risk vs Reward" variant="green" />
              <CTAButton href="https://t.me/koinity_bot" label="Buka Bot" variant="ghost" />
              <CTAButton href="https://t.me/koinity_bot" label="Lihat Paket" variant="yellow" />
            </div>
          </Card>
        </section>

        {/* Footer CTA (soft) */}
        <section className="mt-16">
          <Card className="p-6">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-lg font-bold text-white">
                  Sudah paham dasar? Jangan lompat tanpa paham risiko.
                </p>
                <p className="mt-2 text-white/70">
                  Lanjut pelan-pelan ke halaman berikutnya:{" "}
                  <Link className="text-emerald-300 hover:text-emerald-200" href="/crypto-risk-vs-reward">
                    /crypto-risk-vs-reward
                  </Link>
                  .
                </p>
              </div>
              <div className="grid w-full gap-3 md:w-auto md:grid-cols-2">
                <CTAButton href="/crypto-risk-vs-reward" label="Lanjut Belajar" variant="green" />
                <CTAButton href="https://t.me/koinity_bot" label="Lihat Paket" variant="yellow" />
              </div>
            </div>
          </Card>

          <p className="mt-6 text-center text-xs text-white/45">
            © {new Date().getFullYear()} Koinity • Edukasi Crypto Pemula
          </p>
        </section>
      </div>
    </main>
  );
}
