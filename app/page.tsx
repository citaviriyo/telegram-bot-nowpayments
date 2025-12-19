// app/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KOINITY — Official Membership Access",
  description:
    "Official landing page for KOINITY bot. Membership access, secure payments via NOWPayments, and automated community access.",
  openGraph: {
    title: "KOINITY — Official Membership Access",
    description:
      "Access KOINITY membership via Telegram bot. Secure payment via NOWPayments and automated community access.",
    type: "website",
  },
};

const BOT_USERNAME = "@koinity_bot"; // ganti kalau beda
const BOT_LINK = "https://t.me/koinity_bot"; // ganti kalau beda
const SUPPORT_USERNAME = "@KoinityCS"; // opsional: ganti atau kosongkan
const SUPPORT_LINK = "https://t.me/KoinityCS"; // opsional

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white font-semibold">
              K
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">KOINITY</div>
              <div className="text-xs text-slate-600">Official Membership Access</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={BOT_LINK}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
              target="_blank"
              rel="noreferrer"
            >
              Open Telegram Bot
            </a>

            {SUPPORT_USERNAME ? (
              <a
                href={SUPPORT_LINK}
                className="hidden rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 sm:inline-flex"
                target="_blank"
                rel="noreferrer"
              >
                Contact Support
              </a>
            ) : null}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Official page • Secure access via Telegram
              </div>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
                KOINITY Membership
                <span className="block text-slate-600">Access, Community, and Learning — in one place.</span>
              </h1>

              <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg">
                KOINITY adalah ekosistem membership berbasis Telegram untuk membantu member memahami market crypto
                dengan lebih <span className="font-semibold">terarah</span>, <span className="font-semibold">tenang</span>,
                dan <span className="font-semibold">terukur</span>.
                <br className="hidden sm:block" />
                <span className="mt-2 block text-slate-600">
                  Ini bukan “janji cuan cepat”. Fokusnya adalah sistem, proses belajar, dan komunitas yang satu frekuensi.
                </span>
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={BOT_LINK}
                  className="rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                  target="_blank"
                  rel="noreferrer"
                >
                  Start via {BOT_USERNAME}
                </a>

                <a
                  href="#how"
                  className="rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  How it works
                </a>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <FeaturePill title="Automated Access" desc="Membership & invite flow lebih rapi." />
                <FeaturePill title="Secure Payment" desc="Pembayaran via NOWPayments." />
                <FeaturePill title="Community First" desc="Belajar + diskusi bareng." />
              </div>
            </div>

            {/* Right card */}
            <div className="relative">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">KOINITY BOT</div>
                    <div className="mt-1 text-xs text-slate-600">Official access channel</div>
                  </div>
                  <div className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                    Verified
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <InfoRow label="Bot" value={BOT_USERNAME} />
                  <InfoRow label="Payment" value="NOWPayments gateway" />
                  <InfoRow label="Purpose" value="Membership access & premium content" />
                  <InfoRow label="Support" value={SUPPORT_USERNAME || "Available in bot menu"} />
                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Apa yang biasanya bikin trader stuck?</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900" />
                      Kebanyakan opini, tapi tidak punya kerangka keputusan yang jelas.
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900" />
                      Entry/exit tidak konsisten, akhirnya emosional saat market berubah.
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900" />
                      Belajar sendirian tanpa review dan diskusi yang terarah.
                    </li>
                  </ul>
                  <p className="mt-3 text-sm text-slate-600">
                    KOINITY dirancang untuk membantu member membangun proses yang lebih rapi dan bertanggung jawab.
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={BOT_LINK}
                    className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Bot
                  </a>
                  {SUPPORT_USERNAME ? (
                    <a
                      href={SUPPORT_LINK}
                      className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-slate-50"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Chat Support
                    </a>
                  ) : null}
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  Catatan: Informasi di halaman ini bersifat edukatif. Tidak ada jaminan hasil, dan setiap keputusan
                  trading adalah tanggung jawab masing-masing.
                </p>
              </div>

              {/* subtle background blob */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">How it works</h2>
            <p className="mt-3 text-slate-700">
              Sederhana, cepat, dan rapi. Semua flow dibuat untuk mengurangi kebingungan dan meningkatkan kepercayaan.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <StepCard
              step="01"
              title="Start di Telegram Bot"
              desc="Buka bot resmi KOINITY untuk melihat paket membership, panduan, dan akses menu yang tersedia."
            />
            <StepCard
              step="02"
              title="Pilih Paket & Checkout"
              desc="Lanjutkan pembayaran melalui gateway NOWPayments. Proses payment tercatat dan terverifikasi."
            />
            <StepCard
              step="03"
              title="Akses Komunitas & Konten"
              desc="Setelah aktif, akses komunitas/konten premium akan terbuka sesuai paket dan status membership."
            />
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">Kenapa dibuat berbasis bot?</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <CheckItem title="Lebih cepat" desc="Tidak perlu proses manual yang lama untuk verifikasi." />
              <CheckItem title="Lebih konsisten" desc="Flow membership rapi, jelas, dan minim salah langkah." />
              <CheckItem title="Lebih transparan" desc="Status membership bisa dicek lewat bot sesuai aturan." />
              <CheckItem title="Lebih aman" desc="Bot mengelola akses, bukan menyimpan wallet pribadi user." />
            </div>
          </div>
        </div>
      </section>

      {/* Trust & FAQ */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Trust & clarity</h2>
              <p className="mt-3 text-slate-700">
                Yang membuat sebuah membership terasa “beneran” biasanya bukan sekadar desain, tapi kejelasan aturan,
                flow yang rapi, dan komunikasi yang konsisten.
              </p>

              <div className="mt-6 space-y-4">
                <TrustCard
                  title="Tidak menjual mimpi"
                  desc="Fokus kami adalah edukasi, proses berpikir, dan diskusi yang bertanggung jawab — bukan klaim hasil instan."
                />
                <TrustCard
                  title="Payment gateway pihak ketiga"
                  desc="Transaksi dilakukan via NOWPayments, sehingga proses checkout tercatat di sistem gateway."
                />
                <TrustCard
                  title="Akses sesuai status"
                  desc="Akses komunitas/konten mengikuti status membership. Jika masa aktif habis, akses mengikuti kebijakan yang berlaku."
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-bold">FAQ singkat</h3>
              <div className="mt-4 space-y-4">
                <Faq
                  q="Ini bot resmi?"
                  a="Ya. Halaman ini dibuat sebagai landing resmi untuk mengarahkan user ke bot yang benar."
                />
                <Faq
                  q="Apakah bot meminta akses wallet pribadi?"
                  a="Tidak. Bot hanya mengatur proses membership dan akses komunitas, bukan mengelola wallet pribadi user."
                />
                <Faq
                  q="Kalau butuh bantuan?"
                  a={SUPPORT_USERNAME ? `Silakan hubungi support di Telegram: ${SUPPORT_USERNAME}` : "Support tersedia melalui menu di bot."}
                />
                <Faq
                  q="Apakah ada jaminan profit?"
                  a="Tidak ada. Konten bersifat edukatif. Trading memiliki risiko, keputusan tetap di tangan masing-masing."
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={BOT_LINK}
                  className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800"
                  target="_blank"
                  rel="noreferrer"
                >
                  Go to {BOT_USERNAME}
                </a>
                {SUPPORT_USERNAME ? (
                  <a
                    href={SUPPORT_LINK}
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-slate-50"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ask Support
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-600">
              <div className="font-semibold text-slate-900">KOINITY</div>
              <div className="mt-1">Official landing page • Telegram-first membership access</div>
            </div>

            <div className="flex flex-col gap-2 text-sm sm:items-end">
              <a
                href={BOT_LINK}
                className="font-semibold text-slate-900 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {BOT_USERNAME}
              </a>
              {SUPPORT_USERNAME ? (
                <a
                  href={SUPPORT_LINK}
                  className="text-slate-700 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Support: {SUPPORT_USERNAME}
                </a>
              ) : null}
              <div className="text-xs text-slate-500">
                © {new Date().getFullYear()} KOINITY. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeaturePill({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-bold">{title}</div>
      <div className="mt-1 text-xs text-slate-600">{desc}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
      <div className="text-xs font-semibold text-slate-600">{label}</div>
      <div className="text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function StepCard({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-xs font-extrabold text-slate-500">STEP {step}</div>
      <div className="mt-2 text-lg font-bold">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{desc}</p>
    </div>
  );
}

function CheckItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-slate-900 text-white text-xs">
          ✓
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900">{title}</div>
          <div className="mt-1 text-sm text-slate-700">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function TrustCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-bold">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-slate-700">{desc}</div>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-sm font-bold text-slate-900">{q}</div>
      <div className="mt-2 text-sm leading-relaxed text-slate-700">{a}</div>
    </div>
  );
}
