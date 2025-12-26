// app/all-about-crypto/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All About Crypto (Pemula) — Panduan Lengkap Crypto & Blockchain | Koinity VIP",
  description:
    "Halaman edukasi crypto untuk pemula: definisi crypto, blockchain, coin vs token, exchange vs wallet, stablecoin vs Bitcoin vs altcoin, istilah wajib, penyebab harga naik turun, checklist mulai aman, dan FAQ. Bahasa Indonesia super jelas.",
};

const ACCENT_YELLOW = "#f5c400";

const toc = [
  { id: "apa-itu-crypto", label: "Apa itu crypto" },
  { id: "apa-itu-blockchain", label: "Apa itu blockchain" },
  { id: "coin-vs-token", label: "Coin vs Token" },
  { id: "exchange-vs-wallet", label: "Exchange vs Wallet" },
  { id: "stablecoin-vs-bitcoin-vs-altcoin", label: "Stablecoin vs Bitcoin vs Altcoin" },
  { id: "kenapa-crypto-bernilai", label: "Kenapa crypto ada nilainya" },
  { id: "kenapa-harga-naik-turun", label: "Apa yang membuat harga naik-turun" },
  { id: "istilah-wajib", label: "Istilah wajib pemula" },
  { id: "kesalahan-pemula", label: "Kesalahan pemula paling sering" },
  { id: "checklist-pemula", label: "Checklist pemula sebelum mulai" },
  { id: "faq", label: "FAQ singkat" },
  { id: "disclaimer", label: "Disclaimer edukasi" },
  { id: "cta-lanjut", label: "Lanjut baca & gabung komunitas" },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/85"
      style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.02) inset" }}
    >
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
    <div className="space-y-2">
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-widest text-white/60">{eyebrow.toUpperCase()}</p>
      ) : null}
      <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{title}</h2>
      {desc ? <p className="max-w-3xl text-white/70">{desc}</p> : null}
    </div>
  );
}

function Callout({
  title,
  children,
  tone = "neutral",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "neutral" | "warn" | "tip";
}) {
  const toneStyles =
    tone === "warn"
      ? "border-yellow-400/25 bg-yellow-400/10"
      : tone === "tip"
        ? "border-emerald-400/25 bg-emerald-400/10"
        : "border-white/15 bg-white/5";
  return (
    <div className={`rounded-2xl border p-4 md:p-5 ${toneStyles}`}>
      <p className="font-semibold text-white">{title}</p>
      <div className="mt-2 text-sm leading-relaxed text-white/80">{children}</div>
    </div>
  );
}

function MiniDef({
  term,
  meaning,
  extra,
}: {
  term: string;
  meaning: string;
  extra?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/5 p-4">
      <p className="text-sm font-semibold text-white">
        {term}
        <span className="ml-2 text-xs font-medium text-white/50">— versi pemula</span>
      </p>
      <p className="mt-2 text-sm text-white/75">{meaning}</p>
      {extra ? <p className="mt-2 text-xs text-white/60">{extra}</p> : null}
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top glow */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 -z-10">
        <div
          className="mx-auto h-56 max-w-6xl opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(600px 240px at 20% 20%, rgba(245,196,0,0.22), transparent 60%), radial-gradient(520px 220px at 75% 15%, rgba(255,255,255,0.10), transparent 60%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-white">
            Beranda
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white/85">All About Crypto</span>
        </nav>

        {/* HERO: left content, right card */}
        <section className="grid gap-6 md:grid-cols-12 md:items-start">
          {/* Left */}
          <div className="md:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Untuk pemula 100%</Badge>
              <Badge>Bahasa Indonesia</Badge>
              <Badge>Mudah dipahami</Badge>
              <span
                className="ml-1 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                title="Aksen kuning khas Koinity"
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                Catatan penting
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
              All About Crypto
              <span className="block text-white/70">Panduan super jelas untuk kamu yang baru mulai.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              Crypto itu sering terdengar “rumit” karena banyak istilah. Di halaman ini, kita pecah jadi konsep sederhana:
              <span className="font-semibold text-white"> apa itu crypto</span>,{" "}
              <span className="font-semibold text-white">blockchain</span>, cara menyimpan aset, sampai{" "}
              <span className="font-semibold text-white">kenapa harganya naik-turun</span>.
              Targetnya: kamu paham pondasinya dulu sebelum klik “Buy”.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Callout title="🎯 Tujuan halaman ini" tone="tip">
                Kamu bisa menjelaskan crypto ke temanmu <b>dengan kata-kata sederhana</b>, dan tahu langkah aman yang
                perlu dilakukan sebelum mulai.
              </Callout>
              <Callout title="⚠️ Yang tidak kita lakukan di sini" tone="warn">
                Kita <b>tidak</b> kasih “sinyal”, “prediksi”, atau janji cuan. Fokus edukasi biar kamu lebih kebal
                FOMO/FUD.
              </Callout>
            </div>
          </div>

          {/* Right Card */}
          <aside className="md:col-span-5">
            <div className="sticky top-6 rounded-3xl border border-white/12 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">Ringkasan 1 Menit</p>
                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/65">
                  estimasi baca: 8–12 menit
                </span>
              </div>

              <ul className="mt-4 space-y-3 text-sm text-white/75">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                  Crypto = aset digital + sistem transfer nilai (mirip uang digital), tapi tanpa satu pihak yang
                  “menguasai” semuanya.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                  Blockchain = buku catatan transaksi bersama; sulit diubah sepihak.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                  Exchange itu tempat “jual-beli”; wallet itu tempat “nyimpen akses” aset kamu.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                  Harga naik-turun dipengaruhi supply-demand, berita, likuiditas, dan leverage.
                </li>
              </ul>

              <div className="mt-5 grid gap-3">
                <Link
                  href="#toc"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-white/90"
                >
                  Mulai dari Table of Contents
                </Link>

                <Link
                  href="/crypto-for-beginners"
                  className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-black"
                  style={{
                    backgroundColor: "#22c55e", // CTA hijau
                  }}
                >
                  Lanjut: Crypto for Beginners →
                </Link>

                <p className="text-center text-xs text-white/55">
                  Tip: baca dari atas ke bawah. Tapi kalau mau cepat, pakai TOC.
                </p>
              </div>
            </div>
          </aside>
        </section>

        {/* TOC */}
        <section
          id="toc"
          className="mt-10 rounded-3xl border border-white/12 bg-white/5 p-5 md:p-7"
        >
          <SectionTitle
            eyebrow="Navigasi"
            title="Table of Contents"
            desc="Klik untuk lompat ke bagian yang kamu butuhkan. Semua section dibuat ramah pemula."
          />
          <div className="mt-5 grid gap-2 md:grid-cols-2">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/80 hover:border-white/20 hover:bg-black/40"
              >
                <span className="truncate">{item.label}</span>
                <span className="text-white/40 group-hover:text-white/60">↘</span>
              </a>
            ))}
          </div>
        </section>

        {/* CONTENT */}
        <div className="mt-10 space-y-10">
          {/* Apa itu crypto */}
          <section id="apa-itu-crypto" className="scroll-mt-24">
            <SectionTitle
              eyebrow="Dasar 1"
              title="Apa itu crypto"
              desc="Definisi sederhana + analogi supaya cepat kebayang."
            />

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <MiniDef
                term="Crypto (Cryptocurrency)"
                meaning="Aset digital yang bisa dipindah/ditransfer lewat internet, biasanya memakai teknologi blockchain. Ibaratnya seperti “uang digital”, tapi aturan mainnya dijaga oleh jaringan (bukan satu bank/perusahaan)."
                extra="Catatan: crypto bukan hanya untuk “uang”. Ada juga token untuk akses layanan, game, identitas, dll."
              />
              <MiniDef
                term="Analogi paling gampang"
                meaning="Bayangin kamu punya “koin digital” di game online. Bedanya, crypto bisa dipindah ke siapa pun, kapan pun, lintas negara, dan pencatatannya transparan di jaringan."
                extra="Yang kamu pegang bukan koin fisik, tapi bukti kepemilikan di sistem (ledger)."
              />
              <MiniDef
                term="Hal yang sering bikin orang salah paham"
                meaning="Crypto bukan berarti anonim 100%, bukan mesin uang otomatis, dan bukan selalu cepat kaya. Ini teknologi + pasar. Ada peluang, tapi juga risiko."
              />
            </div>

            <Callout title="Kalimat singkat yang bisa kamu pakai" tone="neutral">
              Crypto itu <b>aset digital</b> yang bisa kamu kirim/terima langsung lewat internet, dan kepemilikannya
              dicatat di jaringan (blockchain), bukan di satu pihak.
            </Callout>
          </section>

          {/* Blockchain */}
          <section id="apa-itu-blockchain" className="scroll-mt-24">
            <SectionTitle
              eyebrow="Dasar 2"
              title="Apa itu blockchain"
              desc="Tanpa rumus. Pakai contoh yang realistis."
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/12 bg-white/5 p-5 md:p-6">
                <p className="text-sm font-semibold text-white">Versi manusia</p>
                <p className="mt-3 text-white/75">
                  Blockchain itu seperti <b>buku catatan transaksi bersama</b> yang disalin ke banyak komputer (node).
                  Setiap kali ada transaksi baru, jaringan “sepakat” dulu, lalu catatan baru ditambahkan.
                  Karena catatannya tersebar dan saling mengecek, mengubah data lama jadi susah banget.
                </p>

                <div className="mt-5 space-y-3 text-sm text-white/75">
                  <p className="font-semibold text-white">Contoh sederhana:</p>
                  <ul className="space-y-2">
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                      Kamu kirim 100 ribu (setara crypto) ke teman.
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                      Jaringan mengecek: “bener nggak kamu punya saldo cukup?”
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                      Kalau valid, transaksi masuk ke “blok” dan dicatat permanen.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-3xl border border-white/12 bg-black/30 p-5 md:p-6">
                <p className="text-sm font-semibold text-white">Kenapa disebut “block-chain”?</p>
                <p className="mt-3 text-white/75">
                  Karena data transaksi dikelompokkan jadi “blok”, lalu tiap blok tersambung ke blok sebelumnya seperti
                  rantai. Jadi kalau ada orang coba “utak-atik” blok lama, rantainya jadi tidak cocok dan ketahuan.
                </p>

                <div className="mt-5 grid gap-3">
                  <Callout title="Apa manfaatnya?" tone="tip">
                    <ul className="list-disc space-y-1 pl-5">
                      <li>Transfer nilai bisa lintas negara tanpa ribet.</li>
                      <li>Catatan transparan (bisa dicek publik, tergantung chain-nya).</li>
                      <li>Aturan bisa otomatis lewat smart contract (di beberapa blockchain).</li>
                    </ul>
                  </Callout>
                  <Callout title="Apa kekurangannya?" tone="warn">
                    <ul className="list-disc space-y-1 pl-5">
                      <li>Salah kirim address bisa fatal (tidak seperti “refund” mudah).</li>
                      <li>Biaya transaksi (gas fee) bisa naik saat ramai.</li>
                      <li>Tetap perlu edukasi keamanan (seed phrase, scam).</li>
                    </ul>
                  </Callout>
                </div>
              </div>
            </div>
          </section>

          {/* Coin vs Token */}
          <section id="coin-vs-token" className="scroll-mt-24">
            <SectionTitle
              eyebrow="Konsep penting"
              title="Coin vs Token"
              desc="Ini sering bikin bingung, padahal gampang kalau pakai patokan: punya “jalan tol” sendiri atau numpang."
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/12 bg-white/5 p-5 md:p-6">
                <p className="text-base font-semibold text-white">Coin</p>
                <p className="mt-2 text-white/75">
                  <b>Coin</b> adalah aset asli dari suatu blockchain. Ibaratnya: blockchain itu “jalan tol”, coin itu
                  “mata uang resmi” di jalan tol tersebut.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                    Contoh: BTC (Bitcoin) di jaringan Bitcoin
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                    Contoh: ETH (Ether) di jaringan Ethereum
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-white/12 bg-black/30 p-5 md:p-6">
                <p className="text-base font-semibold text-white">Token</p>
                <p className="mt-2 text-white/75">
                  <b>Token</b> itu “aset yang numpang” di blockchain lain (biasanya lewat smart contract). Ibaratnya:
                  token itu seperti “kartu member / voucher / poin” yang berjalan di jalan tol milik orang lain.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                    Token bisa punya fungsi: akses layanan, governance (vote), utilitas di app, dll.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                    Banyak token berjalan di Ethereum, BSC, Solana, dll.
                  </li>
                </ul>
              </div>
            </div>

            <Callout title="Ringkasnya" tone="neutral">
              <b>Coin</b> = aset asli dari blockchain-nya. <b>Token</b> = aset “numpang” di blockchain lain via smart
              contract.
            </Callout>
          </section>

          {/* Exchange vs Wallet */}
          <section id="exchange-vs-wallet" className="scroll-mt-24">
            <SectionTitle
              eyebrow="Praktis"
              title="Exchange vs Wallet"
              desc="Bedakan tempat beli-jual vs tempat pegang kendali aset."
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/12 bg-white/5 p-5 md:p-6">
                <p className="text-base font-semibold text-white">Exchange (CEX/DEX)</p>
                <p className="mt-2 text-white/75">
                  Exchange adalah tempat untuk <b>tukar</b> (beli/jual) crypto. Mirip “money changer”, tapi versi aset
                  digital.
                </p>

                <div className="mt-4 grid gap-3">
                  <Callout title="CEX (Centralized Exchange)" tone="neutral">
                    Platform terpusat (ada perusahaan). Biasanya mudah untuk pemula, login, KYC, deposit rupiah, dll.
                    Kekurangannya: kamu bergantung pada platform.
                  </Callout>
                  <Callout title="DEX (Decentralized Exchange)" tone="neutral">
                    Exchange di blockchain (pakai wallet). Kamu pegang kunci sendiri. Kekurangannya: lebih teknis,
                    rawan salah langkah kalau belum paham.
                  </Callout>
                </div>
              </div>

              <div className="rounded-3xl border border-white/12 bg-black/30 p-5 md:p-6">
                <p className="text-base font-semibold text-white">Wallet</p>
                <p className="mt-2 text-white/75">
                  Wallet itu bukan “dompet berisi koin”, tapi alat untuk <b>mengelola akses</b> ke aset kamu di
                  blockchain. Kuncinya ada di “private key / seed phrase”.
                </p>

                <div className="mt-4 grid gap-3">
                  <Callout title="Hot wallet" tone="neutral">
                    Terhubung internet (app/extension). Praktis untuk transaksi, tapi harus ekstra hati-hati terhadap
                    phishing dan malware.
                  </Callout>
                  <Callout title="Cold wallet" tone="neutral">
                    Lebih “offline” (misalnya hardware wallet). Cocok untuk simpan jangka panjang karena lebih aman dari
                    serangan online.
                  </Callout>
                </div>

                <Callout title="Prinsip penting" tone="warn">
                  Kalau asetmu disimpan di exchange, secara teknis kamu tidak memegang kunci sepenuhnya. Istilahnya:
                  <b> “Not your keys, not your coins.”</b>
                </Callout>
              </div>
            </div>
          </section>

          {/* Stablecoin vs Bitcoin vs Altcoin */}
          <section id="stablecoin-vs-bitcoin-vs-altcoin" className="scroll-mt-24">
            <SectionTitle
              eyebrow="Kategori"
              title="Stablecoin vs Bitcoin vs Altcoin"
              desc="Biar kamu nggak campur aduk fungsi masing-masing."
            />

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <MiniDef
                term="Stablecoin"
                meaning="Crypto yang nilainya dibuat stabil (biasanya mendekati 1 USD). Dipakai untuk “parkir” dana, transfer cepat, atau menghindari volatilitas."
                extra="Contoh umum: USDT, USDC (catatan: tetap ada risiko — misalnya risiko penerbit, regulasi, depeg)."
              />
              <MiniDef
                term="Bitcoin (BTC)"
                meaning="Aset crypto paling dikenal. Banyak orang melihatnya sebagai “emas digital” karena suplai terbatas dan fokusnya sebagai penyimpan nilai."
                extra="Bitcoin punya ekosistem sendiri dan narasi yang kuat, tapi tetap volatil."
              />
              <MiniDef
                term="Altcoin"
                meaning="Semua crypto selain Bitcoin. Bisa berupa platform smart contract, token utilitas, token governance, meme coin, dan lain-lain."
                extra="Altcoin bisa tumbuh cepat, tapi biasanya risikonya juga lebih tinggi."
              />
            </div>

            <Callout title="Cara berpikir cepat" tone="tip">
              Stablecoin = stabil untuk “parkir”; Bitcoin = narasi penyimpan nilai; Altcoin = inovasi/eksperimen (potensi
              tinggi, risiko juga tinggi).
            </Callout>
          </section>

          {/* Kenapa crypto bernilai */}
          <section id="kenapa-crypto-bernilai" className="scroll-mt-24">
            <SectionTitle
              eyebrow="Logika nilai"
              title="Kenapa crypto ada nilainya?"
              desc="Nilai bukan cuma dari ‘rame’—ada faktor utilitas, kepercayaan, dan jaringan."
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/12 bg-white/5 p-5 md:p-6">
                <p className="text-sm font-semibold text-white">Sumber nilai yang paling umum</p>
                <ul className="mt-4 space-y-3 text-sm text-white/75">
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                    <b>Utilitas</b>: dipakai untuk bayar gas fee, akses layanan, staking, governance, dll.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                    <b>Kelangkaan</b>: suplai terbatas atau mekanisme yang mengurangi suplai.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                    <b>Kepercayaan & adopsi</b>: makin banyak orang/pelaku industri pakai, biasanya makin kuat demand.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                    <b>Network effect</b>: nilai jaringan naik karena pengguna, developer, dan aplikasi makin banyak.
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-white/12 bg-black/30 p-5 md:p-6">
                <p className="text-sm font-semibold text-white">Analogi simpel</p>
                <p className="mt-3 text-white/75">
                  Bayangin sebuah aplikasi chat yang dipakai 2 orang vs 2 miliar orang. Fungsinya sama, tapi nilainya
                  berbeda karena <b>jaringan & kepercayaan</b>. Crypto dan blockchain juga mirip: nilai sering tumbuh
                  saat ekosistem dan pemakaiannya meluas.
                </p>

                <Callout title="Tetap ingat" tone="warn">
                  Tidak semua token punya utilitas nyata. Ada yang cuma “ramai sesaat”. Makanya pemula perlu fokus pada
                  pondasi, bukan sekadar hype.
                </Callout>
              </div>
            </div>
          </section>

          {/* Harga naik turun */}
          <section id="kenapa-harga-naik-turun" className="scroll-mt-24">
            <SectionTitle
              eyebrow="Pasar"
              title="Apa yang membuat harga crypto naik-turun?"
              desc="Volatilitas itu normal. Yang penting kamu paham penyebabnya."
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/12 bg-white/5 p-5 md:p-6">
                <p className="text-sm font-semibold text-white">4 penyebab utama (versi pemula)</p>
                <div className="mt-4 space-y-3 text-sm text-white/75">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="font-semibold text-white">1) Supply & Demand</p>
                    <p className="mt-1">
                      Kalau banyak yang mau beli dan yang jual sedikit → harga cenderung naik. Kalau banyak yang jual →
                      turun. Sesederhana itu, tapi detailnya bisa kompleks.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="font-semibold text-white">2) Berita & Sentimen</p>
                    <p className="mt-1">
                      Berita regulasi, hack, listing exchange, partnership, atau statement tokoh bisa memicu FOMO/FUD.
                      Pasar crypto cepat bereaksi.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="font-semibold text-white">3) Likuiditas</p>
                    <p className="mt-1">
                      Koin yang likuiditasnya rendah bisa “gampang digoyang” oleh order besar. Makanya ada istilah
                      “pump-dump” di aset kecil.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="font-semibold text-white">4) Leverage</p>
                    <p className="mt-1">
                      Leverage (pinjam modal untuk trading) bisa memperbesar gerakan harga karena liquidation (posisi
                      dipaksa tutup). Ini salah satu sumber “turun tajam mendadak”.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/12 bg-black/30 p-5 md:p-6">
                <p className="text-sm font-semibold text-white">Kalimat yang perlu kamu hafal (biar aman)</p>
                <div className="mt-4 grid gap-3">
                  <Callout title="Volatilitas ≠ penipuan" tone="neutral">
                    Crypto bisa naik-turun tajam karena market-nya global dan cepat. Volatilitas itu “sifat pasar”—bukan
                    bukti otomatis bahwa semuanya scam. Yang scam adalah proyek/penawaran tertentu.
                  </Callout>
                  <Callout title="FOMO & FUD adalah musuh pemula" tone="warn">
                    FOMO (takut ketinggalan) bikin beli di puncak. FUD (takut/ketidakpastian) bikin panik jual di dasar.
                    Solusi: pakai checklist + rencana.
                  </Callout>
                  <Callout title="Mulai dari ukuran kecil" tone="tip">
                    Kalau masih belajar, mulai dari nominal kecil untuk “biaya belajar”. Fokus proses: paham wallet,
                    transaksi, biaya, dan keamanan.
                  </Callout>
                </div>
              </div>
            </div>
          </section>

          {/* Istilah wajib */}
          <section id="istilah-wajib" className="scroll-mt-24">
            <SectionTitle
              eyebrow="Kamus pemula"
              title="Istilah wajib pemula"
              desc="Kalau kamu ngerti 10 istilah ini, kamu udah jauh lebih siap."
            />

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <MiniDef
                term="Market Cap"
                meaning="Nilai total “ukuran” aset: harga per koin × jumlah koin beredar. Bukan jaminan bagus, tapi membantu membandingkan skala."
              />
              <MiniDef
                term="Volume"
                meaning="Seberapa ramai transaksi dalam periode tertentu (misal 24 jam). Volume besar biasanya berarti minat pasar tinggi."
              />
              <MiniDef
                term="Liquidity (Likuiditas)"
                meaning="Seberapa mudah aset dibeli/dijual tanpa mengubah harga terlalu besar. Likuiditas rendah = harga mudah ‘digoyang’."
              />
              <MiniDef
                term="Gas Fee"
                meaning="Biaya transaksi di blockchain (seperti ongkos kirim). Saat jaringan ramai, biaya bisa naik."
              />
              <MiniDef
                term="Address"
                meaning="Alamat tujuan kirim crypto. Mirip nomor rekening, tapi formatnya biasanya deretan huruf/angka panjang."
                extra="Selalu cek jaringan/chain yang benar. Salah chain bisa bikin dana nyangkut/hilang."
              />
              <MiniDef
                term="Seed Phrase"
                meaning="12/24 kata rahasia untuk memulihkan wallet. Ini ‘kunci utama’. Siapa pun yang pegang seed phrase, bisa ambil asetmu."
                extra="Jangan foto/simpan di cloud/chat. Tulis manual dan simpan aman."
              />
              <MiniDef
                term="CEX"
                meaning="Centralized Exchange: exchange terpusat (perusahaan) dengan login dan fitur mudah untuk pemula."
              />
              <MiniDef
                term="DEX"
                meaning="Decentralized Exchange: pertukaran lewat smart contract. Kamu pakai wallet dan pegang kunci sendiri."
              />
            </div>

            <Callout title="Quick tip" tone="tip">
              Untuk pemula, pahami dulu: <b>Address</b>, <b>Seed Phrase</b>, dan <b>Gas Fee</b>. Ini tiga hal yang paling
              sering bikin “salah kirim” dan panik.
            </Callout>
          </section>

          {/* Kesalahan pemula */}
          <section id="kesalahan-pemula" className="scroll-mt-24">
            <SectionTitle
              eyebrow="Anti-blunder"
              title="Kesalahan pemula yang paling sering"
              desc="Kalau kamu menghindari ini, kamu sudah selangkah lebih aman."
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/12 bg-white/5 p-5 md:p-6">
                <ul className="space-y-3 text-sm text-white/75">
                  {[
                    "Beli karena ikut-ikutan (FOMO), tanpa paham apa yang dibeli.",
                    "Masuk pakai uang kebutuhan hidup (harusnya pakai dana yang siap risiko).",
                    "Salah pilih jaringan saat withdraw (misal token sama nama tapi chain beda).",
                    "Klik link sembarangan (phishing) dan kasih seed phrase ke orang/website palsu.",
                    "Terlalu cepat pakai leverage / futures tanpa paham liquidation.",
                    "Tidak punya rencana: kapan beli, kapan stop, kapan ambil profit, kapan cut loss.",
                    "Kaget lihat fee/gas, lalu panik salah transaksi.",
                    "Menyimpan semua aset di satu tempat (tidak diversifikasi risiko platform).",
                  ].map((text) => (
                    <li key={text} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 flex-none rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/12 bg-black/30 p-5 md:p-6">
                <Callout title="Pola umum yang bikin rugi" tone="warn">
                  Pemula sering rugi bukan karena “nggak pintar”, tapi karena <b>terburu-buru</b>. Crypto memberi kamu
                  kebebasan, tapi kebebasan itu butuh disiplin: cek address, cek jaringan, dan jangan bagi seed phrase.
                </Callout>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-sm font-semibold text-white">Aturan emas (simple)</p>
                  <p className="mt-2 text-sm text-white/75">
                    Kalau ada yang minta <b>seed phrase</b> atau menyuruh kamu “connect wallet” ke link random → anggap
                    itu <b>bahaya</b> sampai terbukti aman.
                  </p>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-sm font-semibold text-white">Sebelum transaksi pertama</p>
                  <p className="mt-2 text-sm text-white/75">
                    Biasakan kirim <b>uji coba kecil</b> dulu (test transfer) untuk memastikan chain & address benar.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Checklist pemula */}
          <section id="checklist-pemula" className="scroll-mt-24">
            <SectionTitle
              eyebrow="Langkah aman"
              title="Checklist pemula sebelum mulai"
              desc="Checklist ini dibuat supaya kamu tidak ‘loncat’ ke beli sebelum siap."
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/12 bg-white/5 p-5 md:p-6">
                <p className="text-sm font-semibold text-white">Checklist keamanan (wajib)</p>
                <ul className="mt-4 space-y-3 text-sm text-white/75">
                  {[
                    "Pakai password kuat + aktifkan 2FA (authenticator, bukan SMS kalau bisa).",
                    "Pahami seed phrase: tulis manual, simpan aman, jangan foto, jangan kirim chat.",
                    "Belajar bedain domain asli vs palsu (phishing sering mirip 99%).",
                    "Mulai dari nominal kecil untuk latihan transaksi & fee.",
                    "Selalu cek chain saat deposit/withdraw (misal ERC-20 vs BEP-20).",
                    "Pisahkan wallet untuk ‘transaksi’ dan ‘simpan’ bila perlu.",
                  ].map((text) => (
                    <li key={text} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 flex-none rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/12 bg-black/30 p-5 md:p-6">
                <p className="text-sm font-semibold text-white">Checklist belajar (biar paham, bukan nebak)</p>
                <ul className="mt-4 space-y-3 text-sm text-white/75">
                  {[
                    "Tahu bedanya coin vs token, exchange vs wallet.",
                    "Tahu fungsi stablecoin, dan kapan dipakai.",
                    "Paham istilah market cap, volume, likuiditas (minimal konsep).",
                    "Punya rencana: tujuan, jangka waktu, dan batas risiko.",
                    "Kenal risiko: volatilitas, scam, regulasi, risiko platform.",
                    "Catat transaksi dan evaluasi (jangan asal ingat).",
                  ].map((text) => (
                    <li key={text} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 flex-none rounded-full" style={{ backgroundColor: ACCENT_YELLOW }} />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>

                <Callout title="Saran praktis yang aman" tone="tip">
                  Kalau kamu baru mulai: fokus <b>paham alur</b> (beli → simpan → kirim → fee) dulu. Profit itu bonus,
                  pondasi itu wajib.
                </Callout>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-24">
            <SectionTitle
              eyebrow="Tanya jawab"
              title="FAQ singkat (pemula)"
              desc="Pertanyaan yang paling sering muncul saat pertama kenal crypto."
            />

            <div className="mt-5 space-y-3">
              {[
                {
                  q: "Crypto itu legal atau ilegal?",
                  a: "Tergantung aturan di negara masing-masing. Umumnya, crypto bisa diperdagangkan sebagai aset, tapi bukan berarti jadi “alat pembayaran resmi”. Cek aturan lokal dan platform yang kamu pakai.",
                },
                {
                  q: "Kalau salah kirim address, bisa dibatalkan?",
                  a: "Biasanya tidak bisa. Transaksi blockchain cenderung final. Karena itu biasakan test transfer kecil, cek address, dan pastikan chain benar.",
                },
                {
                  q: "Kenapa ada banyak blockchain? Kok nggak satu aja?",
                  a: "Karena tiap blockchain punya fokus berbeda: kecepatan, biaya, keamanan, kompatibilitas aplikasi, dan desain teknis. Ibaratnya: ada banyak jalan tol dengan aturan & tarif berbeda.",
                },
                {
                  q: "Stablecoin benar-benar aman karena nilainya stabil?",
                  a: "Lebih stabil dari BTC/altcoin, tapi tetap ada risiko: risiko penerbit/cadangan, risiko regulasi, dan risiko depeg (harga lepas dari patokan).",
                },
                {
                  q: "Simpan di exchange aman nggak?",
                  a: "Untuk pemula, exchange bisa lebih praktis. Tapi tetap ada risiko platform (misal pembekuan, hack, masalah operasional). Jika aset makin besar, belajar wallet & keamanan jadi penting.",
                },
                {
                  q: "Apa beda investasi vs trading di crypto?",
                  a: "Investasi biasanya jangka lebih panjang dengan fokus fundamental & manajemen risiko. Trading lebih pendek, fokus timing, dan sering lebih emosional. Pemula biasanya lebih aman belajar pelan dulu.",
                },
                {
                  q: "Perlu modal besar untuk mulai?",
                  a: "Tidak. Banyak orang mulai dari nominal kecil untuk belajar. Yang penting bukan besarnya modal, tapi pemahaman alur dan disiplin risiko.",
                },
                {
                  q: "Leverage/futures cocok untuk pemula?",
                  a: "Umumnya tidak disarankan untuk pemula. Leverage bisa memperbesar untung, tapi juga memperbesar rugi dan bisa liquidasi cepat.",
                },
                {
                  q: "Apa itu gas fee kok bisa mahal?",
                  a: "Gas fee adalah biaya untuk memproses transaksi. Saat jaringan ramai, orang ‘berebut slot’ sehingga biaya naik. Ini mirip biaya tol yang macet—tarif efektifnya naik karena permintaan tinggi.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-white/12 bg-white/5 p-4 open:bg-black/30"
                >
                  <summary className="cursor-pointer list-none select-none">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">{item.q}</p>
                      <span className="text-white/50 group-open:rotate-45 transition-transform">+</span>
                    </div>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Disclaimer */}
          <section id="disclaimer" className="scroll-mt-24">
            <SectionTitle
              eyebrow="Catatan penting"
              title="Disclaimer edukasi"
              desc="Biar kamu nyaman: ini bukan paksaan, bukan ajakan ‘wajib beli’."
            />
            <div className="mt-5 rounded-3xl border border-white/12 bg-black/30 p-5 md:p-6">
              <p className="text-sm leading-relaxed text-white/75">
                Konten di halaman ini dibuat untuk <b>edukasi</b> dan memperjelas konsep dasar crypto. Ini{" "}
                <b>bukan saran finansial</b>, bukan rekomendasi membeli/menjual aset tertentu, dan bukan jaminan hasil.
                Keputusan tetap ada di kamu. Kalau kamu ragu, belajar lebih dulu, gunakan nominal kecil untuk latihan,
                dan pertimbangkan konsultasi profesional sesuai kebutuhan.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section id="cta-lanjut" className="scroll-mt-24">
            <div className="rounded-3xl border border-white/12 bg-white/5 p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-white/60">LANJUTAN BELAJAR</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                    Siap lanjut ke langkah berikutnya?
                  </h3>
                  <p className="mt-2 max-w-2xl text-white/75">
                    Kalau kamu sudah paham pondasinya, lanjut ke halaman{" "}
                    <span className="font-semibold text-white">Crypto for Beginners</span> untuk alur yang lebih
                    praktis: mulai dari setup aman, cara menghindari scam, sampai kebiasaan yang bikin kamu lebih tenang.
                  </p>
                </div>

                <div className="grid w-full gap-3 md:w-auto md:min-w-[320px]">
                  <Link
                    href="/crypto-for-beginners"
                    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-black"
                    style={{ backgroundColor: "#22c55e" }} // CTA hijau
                  >
                    Buka /crypto-for-beginners →
                  </Link>
                  <a
  href="https://t.me/koinity_bot"
  target="_blank"
  rel="noopener noreferrer"
  className="
    inline-flex items-center justify-center gap-2
    rounded-2xl px-5 py-3
    bg-black text-yellow-400
    border border-yellow-500
    font-semibold
    hover:bg-yellow-400 hover:text-black
    transition-all duration-200
  "
>
  🚀 Gabung Komunitas Koinity
</a>

                  <p className="text-center text-xs text-white/55">
                    Nggak wajib. Kalau kamu nyaman belajar pelan-pelan, itu sudah bagus.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Badge>Belajar pelan</Badge>
                <Badge>Keamanan dulu</Badge>
                <Badge>Anti FOMO</Badge>
                <Badge>Anti scam</Badge>
              </div>
            </div>
          </section>
        </div>

        {/* Footer mini */}
        <footer className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} Koinity VIP Membership — Edukasi crypto untuk pemula.{" "}
            <span className="text-white/35">Versi halaman: /all-about-crypto</span>
          </p>
        </footer>
      </div>
    </main>
  );
}
