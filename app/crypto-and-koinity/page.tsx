// app/crypto-and-koinity/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Crypto & Koinity: Kenapa Pemula Butuh Sistem & Lingkungan | Koinity",
  description:
    "Halaman edukasi untuk pemula: kenapa butuh sistem & lingkungan belajar crypto (tanpa janji profit). Kenalan dengan Koinity: struktur belajar, risk management, komunitas terarah, dan bot otomatis untuk akses membership.",
  alternates: { canonical: "/crypto-and-koinity" },
  openGraph: {
    title: "Crypto & Koinity: Kenapa Pemula Butuh Sistem & Lingkungan | Koinity",
    description:
      "Edukasi pemula: keluar dari info overload & FOMO dengan sistem belajar yang rapi dan lingkungan yang terarah. Koinity membantu disiplin, bukan spekulasi asal.",
    url: "/crypto-and-koinity",
    siteName: "Koinity",
    type: "website",
  },
};

const CTA_BOT = "https://t.me/koinity_bot";

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name:
    | "spark"
    | "shield"
    | "list"
    | "users"
    | "bolt"
    | "check"
    | "warn"
    | "book"
    | "bot"
    | "arrow"
    | "x";
  className?: string;
}) {
  const common = className;
  switch (name) {
    case "spark":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M12 2l1.2 5.1L18 8.5l-4.3 2.6L12 16l-1.7-4.9L6 8.5l4.8-1.4L12 2z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M19.5 12.5l.7 3 2.8.8-2.5 1.5-.9 2.7-1-2.7-2.5-1.5 2.8-.8.6-3z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M12 2l8 4v6c0 5.5-3.4 9.9-8 10-4.6-.1-8-4.5-8-10V6l8-4z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 12.2l2.1 2.1 5-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "list":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M9 6h12M9 12h12M9 18h12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M4.5 6h.01M4.5 12h.01M4.5 18h.01"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "users":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M16 11a4 4 0 10-8 0 4 4 0 008 0z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M4 20c1.6-3.6 4.4-5 8-5s6.4 1.4 8 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M13 2L4 14h7l-1 8 10-14h-7l0-6z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "warn":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M12 3l10 18H2L12 3z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M12 9v5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M12 17.5h.01"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M4 5.5C4 4.1 5.1 3 6.5 3H20v18H6.5C5.1 21 4 19.9 4 18.5V5.5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M8 7h8M8 11h8M8 15h6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "bot":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M12 3v3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M8 6h8a4 4 0 014 4v7a3 3 0 01-3 3H7a3 3 0 01-3-3v-7a4 4 0 014-4z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9 12h.01M15 12h.01"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M9 16c1.5 1.2 4.5 1.2 6 0"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "arrow":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M5 12h12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
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
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-yellow-300/90">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

export default function CryptoAndKoinityPage() {
  const problems = [
    {
      title: "Info overload (kebanyakan teori & konten)",
      desc: "Pemula kebanjiran istilah, thread, video, dan “tutorial cepat” sampai bingung mulai dari mana.",
    },
    {
      title: "FOMO & keputusan impulsif",
      desc: "Lihat orang cuan → ikut-ikutan, padahal belum paham risiko dan belum punya rencana.",
    },
    {
      title: "Ikut sinyal random / grup noise",
      desc: "Masuk grup sana-sini, tiap hari “buy this” tanpa konteks. Akhirnya belajar tidak naik level.",
    },
    {
      title: "Tidak punya sistem (cara belajar & cara bertindak)",
      desc: "Belajar loncat-loncat: hari ini chart, besok altcoin, lusa airdrop. Tidak ada checklist, tidak ada evaluasi.",
    },
  ];

  const solution = [
    {
      icon: "book" as const,
      title: "Belajar step-by-step (terstruktur)",
      points: [
        "Materi dari fondasi → praktik → review",
        "Definisi jelas + contoh sederhana",
        "Biar kamu paham “kenapa”, bukan cuma “ikut”",
      ],
    },
    {
      icon: "shield" as const,
      title: "Risk management (cara bertahan dulu)",
      points: [
        "Aturan uang dingin & batas risiko",
        "Checklist sebelum ambil keputusan",
        "Fokus proses: disiplin > sensasi",
      ],
    },
    {
      icon: "users" as const,
      title: "Komunitas terarah (lingkungan itu penting)",
      points: [
        "Diskusi lebih rapi, lebih fokus",
        "Bisa tanya & minta koreksi mindset",
        "Mengurangi noise & godaan FOMO",
      ],
    },
    {
      icon: "list" as const,
      title: "Rutinitas & evaluasi (biar konsisten)",
      points: [
        "Rencana mingguan yang realistis",
        "Catatan keputusan (biar belajar dari data)",
        "Naik level pelan tapi stabil",
      ],
    },
  ];

  const koinityHelps = [
    {
      icon: "spark" as const,
      title: "Struktur belajar yang jelas",
      desc: "Kamu tidak perlu mulai dari nol sendirian. Ada alur belajar yang bikin kamu tahu langkah berikutnya.",
    },
    {
      icon: "bolt" as const,
      title: "Pembahasan market (untuk pemahaman, bukan hype)",
      desc: "Tujuannya membantu kamu membaca konteks dan kebiasaan berpikir yang lebih sehat—bukan janji hasil.",
    },
    {
      icon: "list" as const,
      title: "Checklist & template keputusan",
      desc: "Biar keputusan kamu punya alasan, bukan karena panic-buy/panic-sell.",
    },
    {
      icon: "users" as const,
      title: "Komunitas VIP yang lebih terarah",
      desc: "Lingkungan yang membantu kamu konsisten belajar, bertanya, dan mengurangi noise.",
    },
    {
      icon: "bot" as const,
      title: "Bot otomatis untuk akses membership",
      desc: "Akses VIP lebih praktis: alur join/akses dikelola via bot (tanpa ribet manual).",
    },
  ];

  const forWho = [
    "Pemula yang ingin belajar crypto dengan cara rapi & realistis",
    "Kamu yang capek ikut-ikutan tren tapi tidak paham dasar",
    "Kamu yang ingin fokus disiplin & proses (bukan “instan”)",
    "Kamu yang ingin lingkungan yang lebih terarah daripada grup random",
  ];

  const notForWho = [
    "Yang cari janji profit, “pasti cuan”, atau sinyal tanpa belajar",
    "Yang tidak siap mengatur risiko dan masih suka all-in impulsif",
    "Yang tidak mau belajar dasar dan maunya shortcut terus",
    "Yang ingin spekulasi ekstrem tanpa tanggung jawab",
  ];

  const steps = [
    {
      step: "1",
      title: "Buka bot Koinity",
      desc: "Mulai dari bot untuk lihat alur membership dan navigasi yang paling cepat.",
      cta: { label: "Buka Bot", href: CTA_BOT, tone: "green" as const },
    },
    {
      step: "2",
      title: "Lihat paket & pilih yang cocok",
      desc: "Pilih paket sesuai kebutuhan belajar kamu (mulai dari yang sederhana dulu).",
      cta: { label: "Lihat Paket", href: CTA_BOT, tone: "yellow" as const },
    },
    {
      step: "3",
      title: "Akses VIP & mulai rutinitas belajar",
      desc: "Masuk komunitas, ikuti struktur, pakai checklist, dan konsisten evaluasi.",
      cta: { label: "Mulai Sekarang", href: CTA_BOT, tone: "green" as const },
    },
  ];

  const faqs: Array<{ q: string; a: string }> = [
    {
      q: "Apakah Koinity menjanjikan profit atau hasil tertentu?",
      a: "Tidak. Koinity fokus edukasi dan pembentukan sistem belajar/discipline. Hasil tiap orang berbeda karena dipengaruhi keputusan, risiko, waktu belajar, dan kondisi masing-masing.",
    },
    {
      q: "Saya pemula banget—boleh join?",
      a: "Boleh. Justru halaman ini dibuat untuk pemula yang ingin mulai dengan fondasi yang benar: dari dasar, langkah kecil, dan kebiasaan yang sehat.",
    },
    {
      q: "Apakah ini grup sinyal / “tinggal ikut”?",
      a: "Bukan. Fokusnya membangun pemahaman, kebiasaan, dan sistem. Kalau pun ada pembahasan market, arahnya untuk konteks dan belajar berpikir, bukan hype atau paksaan ikut.",
    },
    {
      q: "Saya sibuk. Harus online terus?",
      a: "Tidak perlu. Yang penting konsisten. Kamu bisa ikut struktur belajar step-by-step dan ambil ritme yang realistis, misalnya 20–40 menit per hari.",
    },
    {
      q: "Apakah ada panduan risk management untuk pemula?",
      a: "Ada fokus pada kebiasaan aman: konsep uang dingin, batas risiko, checklist sebelum bertindak, dan cara menghindari keputusan impulsif. Ini edukasi, bukan instruksi trading agresif.",
    },
    {
      q: "Gimana cara akses VIP-nya?",
      a: "Lewat bot. Bot membantu alur membership supaya lebih rapi dan otomatis, jadi kamu tidak perlu proses manual yang bikin lama.",
    },
    {
      q: "Kalau saya belum punya exchange atau wallet, gimana?",
      a: "Tidak masalah. Kamu bisa mulai dari dasar: memahami konsep, keamanan, dan alur yang benar. Nanti kamu pelan-pelan siapin kebutuhan teknisnya sesuai tingkat nyaman kamu.",
    },
    {
      q: "Apakah Koinity cocok untuk yang suka spekulasi ekstrem?",
      a: "Tidak. Koinity lebih cocok untuk pemula yang ingin belajar rapi dan mengutamakan kontrol risiko serta proses. Kalau kamu cari sensasi cepat, kemungkinan tidak cocok.",
    },
    {
      q: "Saya takut kena scam. Koinity bantu apa?",
      a: "Fokusnya membangun kebiasaan aman (cek sumber, hindari link aneh, 2FA, dan disiplin checklist). Tujuannya mengurangi keputusan impulsif yang sering jadi pintu masuk scam.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_10%_10%,rgba(245,196,0,0.18),transparent_55%),radial-gradient(700px_500px_at_90%_15%,rgba(34,197,94,0.12),transparent_55%),radial-gradient(700px_500px_at_50%_100%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.95))]" />
      </div>

      {/* Top bar */}
      <header className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 overflow-hidden">
  <img
    src="/android-chrome-192x192.png"
    alt="Koinity"
    className="h-8 w-8 object-contain"
  />
</div>

            <div>
              <div className="text-sm font-semibold text-white/90">Koinity</div>
              <div className="text-xs text-white/60">Edukasi • Sistem • Disiplin</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/all-about-crypto"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
            >
              All About Crypto
            </Link>
            <Link
              href="/crypto-for-beginners"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
            >
              Crypto for Beginners
            </Link>
            <Link
              href="/crypto-myths"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
            >
              Crypto Myths
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-2 md:px-6 md:pb-16">
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <div className="flex flex-wrap gap-2">
              <Badge>Tanpa janji profit</Badge>
              <Badge>Untuk pemula awam</Badge>
              <Badge>Sistem & lingkungan</Badge>
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-5xl">
              Kenapa Pemula Butuh <span className="text-yellow-300">Sistem</span> &{" "}
              <span className="text-yellow-300">Lingkungan</span>
              <br className="hidden md:block" />
              (Bukan Sekadar “Ikut Tren”)
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              Banyak pemula bukan gagal karena “kurang pintar”, tapi karena belajar
              tanpa arah: info overload, FOMO, ikut sinyal random, dan tidak punya
              sistem. Koinity diposisikan sebagai tempat belajar dan melatih disiplin
              — supaya kamu paham proses, mengatur risiko, dan bertumbuh pelan tapi
              lebih waras.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={CTA_BOT}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-bold text-black hover:bg-green-400"
              >
                <Icon name="arrow" className="h-5 w-5" />
                Buka Bot
              </Link>
              <Link
                href={CTA_BOT}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-300 px-5 py-3 text-sm font-bold text-black hover:bg-yellow-200"
              >
                <Icon name="list" className="h-5 w-5" />
                Lihat Paket
              </Link>
              <div className="text-xs text-white/60">
                Gabung bersama Komunitas Koinity
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { k: "Fokus", v: "Edukasi & kebiasaan" },
                { k: "Arah", v: "Step-by-step" },
                { k: "Mindset", v: "Disiplin > sensasi" },
              ].map((it) => (
                <div
                  key={it.k}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="text-xs font-semibold text-white/60">{it.k}</div>
                  <div className="mt-1 text-sm font-bold text-white">{it.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right card */}
          <div className="md:col-span-5">
            <div className="sticky top-6 rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-yellow-300/90">
                    Ringkasan 1 Menit
                  </div>
                  <div className="mt-2 text-xl font-black tracking-tight">
                    “Sistem menang lawan chaos.”
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/30">
                  <Icon name="shield" className="h-5 w-5 text-yellow-300" />
                </div>
              </div>

              <ul className="mt-5 space-y-3 text-sm text-white/75">
                {[
                  "Pemula sering kalah oleh FOMO + info overload.",
                  "Yang dibutuhkan: struktur belajar + kebiasaan risk management.",
                  "Lingkungan yang tepat mengurangi noise dan membantu disiplin.",
                  "Koinity membantu proses belajar yang rapi (tanpa janji hasil).",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-0.5 text-yellow-300">
                      <Icon name="check" className="h-5 w-5" />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid gap-3">
                <Link
                  href={CTA_BOT}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-bold text-black hover:bg-green-400"
                >
                  <Icon name="bot" className="h-5 w-5" />
                  Buka Bot
                </Link>
                <Link
                  href={CTA_BOT}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-300 px-5 py-3 text-sm font-bold text-black hover:bg-yellow-200"
                >
                  <Icon name="list" className="h-5 w-5" />
                  Lihat Paket
                </Link>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/65">
                <span className="font-semibold text-white/80">Catatan:</span>{" "}
                Halaman ini edukasi. Fokus membangun sistem dan lingkungan belajar,
                bukan memicu spekulasi.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <SectionTitle
          eyebrow="Masalah umum pemula"
          title="Kenapa banyak pemula “kehabisan tenaga” sebelum paham?"
          desc="Pola yang sering terjadi: terlalu banyak input, terlalu sedikit struktur. Akhirnya keputusan dibuat dari emosi, bukan sistem."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {problems.map((p) => (
            <div
              key={p.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-yellow-300">
                  <Icon name="warn" className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-white">{p.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">
                    {p.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <SectionTitle
          eyebrow="Solusi yang lebih waras"
          title="Yang dibutuhkan pemula: sistem belajar + kebiasaan aman + lingkungan"
          desc="Bukan janji cepat. Bukan ikut sinyal. Tapi proses yang bisa diulang."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {solution.map((s) => (
            <div
              key={s.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-yellow-300">
                  <Icon name={s.icon} className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-black tracking-tight text-white">
                    {s.title}
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-white/75">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <span className="mt-0.5 text-yellow-300">
                          <Icon name="check" className="h-4 w-4" />
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What Koinity helps */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <SectionTitle
          eyebrow="Peran Koinity"
          title="Apa yang Koinity bantu (tanpa klaim berlebihan)"
          desc="Koinity bukan “mesin uang”. Koinity adalah sistem dan lingkungan untuk belajar, latihan disiplin, dan membangun kebiasaan yang lebih sehat."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {koinityHelps.map((h) => (
            <div
              key={h.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-yellow-300">
                  <Icon name={h.icon} className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-white">{h.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">
                    {h.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-3xl border border-white/10 bg-black/30 p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-yellow-300">
              <Icon name="shield" className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-bold text-white">
                Prinsip utama Koinity
              </div>
              <p className="mt-1 text-sm leading-relaxed text-white/70">
                <span className="font-semibold text-white/80">
                  Kurangi noise → naikkan kualitas keputusan.
                </span>{" "}
                Kita fokus bikin kamu paham proses: belajar, membangun checklist,
                mengelola risiko, dan disiplin. Itu yang bisa dikontrol.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For who / not for who */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <SectionTitle
          eyebrow="Kecocokan"
          title="Untuk siapa — dan bukan untuk siapa"
          desc="Biar ekspektasi tetap sehat sejak awal."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-2">
              <span className="text-yellow-300">
                <Icon name="check" className="h-5 w-5" />
              </span>
              <div className="text-lg font-black">Cocok untuk</div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {forWho.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-0.5 text-yellow-300">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-2">
              <span className="text-yellow-300">
                <Icon name="x" className="h-5 w-5" />
              </span>
              <div className="text-lg font-black">Kurang cocok untuk</div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {notForWho.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-0.5 text-yellow-300">
                    <Icon name="x" className="h-4 w-4" />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3 steps */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <SectionTitle
          eyebrow="Cara join VIP"
          title="3 langkah join VIP (ringkas dan rapi)"
          desc="Alur sederhana supaya kamu cepat masuk sistemnya."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s) => {
            const isGreen = s.cta.tone === "green";
            return (
              <div
                key={s.step}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-yellow-300 text-sm font-black text-black">
                      {s.step}
                    </span>
                    <div className="text-base font-black">{s.title}</div>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {s.desc}
                </p>

                <div className="mt-5">
                  <Link
                    href={s.cta.href}
                    className={[
                      "inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold",
                      isGreen
                        ? "bg-green-500 text-black hover:bg-green-400"
                        : "bg-yellow-300 text-black hover:bg-yellow-200",
                    ].join(" ")}
                  >
                    <Icon name={isGreen ? "arrow" : "list"} className="h-5 w-5" />
                    {s.cta.label}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA strip */}
      <section className="mx-auto max-w-6xl px-4 pb-6 md:px-6">
        <div className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(245,196,0,0.12),rgba(34,197,94,0.10))] p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <div className="text-xs font-semibold uppercase tracking-widest text-yellow-300/90">
                CTA halus
              </div>
              <div className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
                Mulai dari langkah paling mudah:{" "}
                <span className="text-yellow-300">buka bot</span> dan lihat alurnya.
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/70 md:text-base">
                Kamu tidak perlu “langsung jago”. Yang penting kamu punya sistem,
                belajar pelan tapi konsisten, dan berada di lingkungan yang mendukung.
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="grid gap-3">
                <Link
                  href={CTA_BOT}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-bold text-black hover:bg-green-400"
                >
                  <Icon name="bot" className="h-5 w-5" />
                  Buka Bot
                </Link>
                <Link
                  href={CTA_BOT}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-300 px-5 py-3 text-sm font-bold text-black hover:bg-yellow-200"
                >
                  <Icon name="list" className="h-5 w-5" />
                  Lihat Paket
                </Link>
              </div>
              <div className="mt-3 text-center text-xs text-white/60">
                Klik = menuju Telegram bot Koinity.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <SectionTitle
          eyebrow="FAQ Membership"
          title="Pertanyaan yang sering ditanya"
          desc="Biar jelas dari awal: Koinity fokus edukasi, disiplin, dan sistem."
        />

        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-xs font-black text-yellow-300">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-bold text-white md:text-base">
                    {f.q}
                  </span>
                </div>
                <span className="shrink-0 rounded-xl border border-white/10 bg-black/30 p-2 text-yellow-300 transition-transform group-open:rotate-180">
                  <Icon name="arrow" className="h-4 w-4 rotate-90" />
                </span>
              </summary>
              <div className="mt-3 pl-10 text-sm leading-relaxed text-white/70">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-6xl px-4 pb-14 md:px-6">
        <div className="rounded-3xl border border-yellow-300/25 bg-yellow-300/10 p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border border-yellow-300/30 bg-black/30 text-yellow-300">
              <Icon name="warn" className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-black text-white">Disclaimer</div>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-white/75">
                <li className="flex gap-2">
                  <span className="mt-0.5 text-yellow-300">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <span>
                    Konten di halaman ini bersifat <span className="font-semibold">edukasi</span>,
                    bukan ajakan investasi dan bukan rekomendasi membeli/menjual aset tertentu.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-yellow-300">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <span>
                    Hasil tiap orang bisa berbeda tergantung keputusan, manajemen risiko,
                    konsistensi belajar, dan kondisi masing-masing.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-yellow-300">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <span>
                    Selalu lakukan riset mandiri, pahami risiko, dan gunakan uang dingin
                    sesuai kemampuan kamu.
                  </span>
                </li>
              </ul>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={CTA_BOT}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-bold text-black hover:bg-green-400"
                >
                  <Icon name="bot" className="h-5 w-5" />
                  Buka Bot
                </Link>
                <Link
                  href={CTA_BOT}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-300 px-5 py-3 text-sm font-bold text-black hover:bg-yellow-200"
                >
                  <Icon name="list" className="h-5 w-5" />
                  Lihat Paket
                </Link>
              </div>

              <div className="mt-3 text-xs text-white/60">
                Kalau kamu pengin mulai pelan-pelan, buka bot dulu dan lihat alurnya.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-white/60">
              © {new Date().getFullYear()} Koinity • Edukasi & disiplin untuk pemula
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={CTA_BOT}
                className="rounded-full bg-green-500 px-4 py-2 text-xs font-bold text-black hover:bg-green-400"
              >
                Buka Bot
              </Link>
              <Link
                href={CTA_BOT}
                className="rounded-full bg-yellow-300 px-4 py-2 text-xs font-bold text-black hover:bg-yellow-200"
              >
                Lihat Paket
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
