// app/crypto-vs-bank/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Crypto vs Bank: Bedanya Apa? Panduan Netral untuk Pemula | Koinity",
  description:
    "Panduan pemula membandingkan crypto vs bank: fungsi, kontrol, jam operasional, biaya, akses global, desentralisasi, transfer internasional, self-custody vs custodial, stablecoin sebagai jembatan, risiko & tips aman.",
};

function SectionTitle({
  id,
  children,
  icon,
}: {
  id: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="scroll-mt-24" id={id}>
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-yellow-400/15 ring-1 ring-yellow-400/30 flex items-center justify-center">
          <span className="text-yellow-300 text-lg">{icon ?? "✦"}</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">{children}</h2>
      </div>
      <div className="mt-3 h-px w-full bg-white/10" />
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function Callout({
  title,
  children,
  tone = "warn",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "warn" | "note" | "safe";
}) {
  const toneStyles =
    tone === "safe"
      ? "border-emerald-500/25 bg-emerald-500/10"
      : tone === "note"
      ? "border-white/10 bg-white/5"
      : "border-yellow-400/25 bg-yellow-400/10";

  const dot =
    tone === "safe" ? "🟢" : tone === "note" ? "🟦" : tone === "warn" ? "🟡" : "🟡";

  return (
    <div className={`rounded-2xl border ${toneStyles} p-4 md:p-5`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-base">{dot}</div>
        <div>
          <div className="font-semibold text-white">{title}</div>
          <div className="mt-1 text-sm leading-relaxed text-white/80">{children}</div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({
  q,
  a,
}: {
  q: string;
  a: React.ReactNode;
}) {
  return (
    <details className="group rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-4">
          <div className="font-semibold text-white">{q}</div>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-white/70 transition group-open:rotate-180">
            <span aria-hidden>⌄</span>
          </div>
        </div>
        <div className="mt-2 text-sm text-white/60">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-300/80" />
            Klik untuk lihat jawaban
          </span>
        </div>
      </summary>
      <div className="mt-4 text-sm leading-relaxed text-white/80">{a}</div>
    </details>
  );
}

export default function Page() {
  const toc = [
    { id: "ringkasan", label: "Ringkasan 1 Menit" },
    { id: "bedanya", label: "Bedanya Crypto vs Bank (inti perbandingan)" },
    { id: "desentralisasi", label: "Apa itu Desentralisasi (analogi sehari-hari)" },
    { id: "kapan-cocok", label: "Kapan Bank Cocok, Kapan Crypto Cocok" },
    { id: "transfer-internasional", label: "Transfer Internasional: Bank vs Crypto" },
    { id: "custody", label: "Self-Custody vs Custodial" },
    { id: "stablecoin", label: "Stablecoin sebagai “Jembatan”" },
    { id: "risiko", label: "Risiko Utama (pemula wajib tahu)" },
    { id: "tips-aman", label: "Tips Aman untuk Pemula (tanpa jadi ekstrem)" },
    { id: "faq", label: "FAQ" },
    { id: "disclaimer", label: "Disclaimer" },
    { id: "lanjut", label: "Lanjut Belajar" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-120px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute right-[-120px] top-[30%] h-[360px] w-[360px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute left-[-140px] bottom-[10%] h-[420px] w-[420px] rounded-full bg-yellow-400/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
  <img
    src="/android-chrome-192x192.png"
    alt="Koinity"
    className="h-9 w-9 rounded-xl"
  />
  <span className="font-semibold tracking-tight">Koinity</span>
</Link>


          <div className="hidden md:flex items-center gap-2 text-xs text-white/70">
            <Pill>Edukatif</Pill>
            <Pill>Netral</Pill>
            <Pill>Untuk Pemula</Pill>
          </div>

          <a
            href="https://t.me/koinity_bot"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 transition"
          >
            Mulai di Telegram
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-10 md:pt-14">
        <div className="grid gap-8 md:grid-cols-12 md:items-start">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-300" />
              Panduan /crypto-vs-bank
            </div>

            <h1 className="mt-4 text-3xl md:text-5xl font-black leading-tight">
              Crypto vs Bank:
              <span className="text-yellow-300"> bedanya apa</span> dan kapan pakai yang mana?
            </h1>

            <p className="mt-4 text-white/70 leading-relaxed">
              Banyak orang mengira “crypto itu pengganti bank” atau “bank itu musuh crypto”.
              Kenyataannya lebih sederhana: <span className="text-white">bank</span> dan{" "}
              <span className="text-white">crypto</span> adalah{" "}
              <span className="text-white">alat</span> yang punya fungsi, aturan, dan risiko berbeda.
              Halaman ini bantu kamu memahami perbandingannya secara netral—biar kamu bisa memilih
              dengan lebih aman, bukan ikut-ikutan.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#ringkasan"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Mulai dari Ringkasan 1 Menit
              </a>
              <a
                href="https://t.me/koinity_bot"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black hover:bg-emerald-400 transition"
              >
                Gabung Komunitas Koinity
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>Kontrol: Kamu vs Lembaga</Pill>
              <Pill>24/7 vs Jam Operasional</Pill>
              <Pill>Global access</Pill>
              <Pill>Self-custody</Pill>
              <Pill>Stablecoin</Pill>
            </div>
          </div>

          {/* TOC Card */}
          <aside className="md:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-white/70">Table of Contents</div>
                  <div className="text-lg font-bold text-white">Lompat ke bagian</div>
                </div>
                <div className="h-10 w-10 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-yellow-300">
                  ☰
                </div>
              </div>

              <nav className="mt-4 space-y-2">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/80 hover:bg-black/50 transition"
                  >
                    <span className="truncate">{item.label}</span>
                    <span className="text-white/40 group-hover:text-yellow-300 transition">→</span>
                  </a>
                ))}
              </nav>

              <div className="mt-5">
                <Callout title="Cara pakai halaman ini" tone="note">
                  Kalau kamu benar-benar pemula, baca berurutan dari <b>Ringkasan</b> →{" "}
                  <b>Perbandingan</b> → <b>Risiko</b> → <b>Tips Aman</b>. Jangan lompat ke teknis dulu.
                </Callout>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        {/* Ringkasan */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-7" id="ringkasan">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-white/70">Ringkasan 1 Menit</div>
              <h2 className="mt-1 text-2xl md:text-3xl font-black text-white">
                Bank itu <span className="text-yellow-300">lembaga</span>, crypto itu{" "}
                <span className="text-yellow-300">teknologi + aset digital</span>
              </h2>
              <p className="mt-3 text-white/70 leading-relaxed">
                <b>Bank</b> mengelola uang lewat sistem terpusat: ada pihak yang menyimpan, memverifikasi,
                dan memberi layanan sesuai aturan (jam operasional, prosedur, kebijakan).
                <br />
                <b>Crypto</b> berjalan di jaringan blockchain: transaksi bisa terjadi{" "}
                <b>24/7</b>, lintas negara, dengan model kontrol yang bisa kamu pilih:
                <b> custodial</b> (dipegang platform) atau <b>self-custody</b> (kamu pegang sendiri).
              </p>
            </div>
            <div className="hidden md:flex flex-wrap justify-end gap-2 max-w-[220px]">
  <Pill>Netral</Pill>
  <Pill>Praktis</Pill>
  <Pill>Tanpa angka palsu</Pill>
</div>

          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Callout title="Intinya" tone="safe">
              Gunakan <b>bank</b> untuk kebutuhan hidup & transaksi resmi yang butuh stabilitas dan
              proteksi institusi. Gunakan <b>crypto</b> saat kamu butuh fleksibilitas global, 24/7,
              atau ingin belajar teknologi—dengan manajemen risiko.
            </Callout>
            <Callout title="Mindset pemula" tone="warn">
              Crypto bukan “jalan pintas kaya”. Ini alat. Kalau kamu belum paham risiko salah address,
              salah network, atau kehilangan seed phrase—mulai dari nominal kecil & belajar pelan.
            </Callout>
          </div>
        </div>

        <div className="mt-10 space-y-10">
          {/* Bedanya */}
          <div className="space-y-4">
            <SectionTitle id="bedanya" icon="⚖️">
              Bedanya Crypto vs Bank (fungsi, kontrol, jam operasional, biaya, akses global)
            </SectionTitle>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/30 p-5 md:p-6">
                <div className="text-sm text-white/70">Bank</div>
                <div className="mt-1 text-lg font-bold text-white">Sistem terpusat (institusi)</div>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>
                      <b>Fungsi:</b> simpan & kelola uang fiat (IDR, USD), pembayaran, kredit, layanan
                      resmi (rekening, mutasi, bukti transaksi).
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>
                      <b>Kontrol:</b> bank memegang sistem; kamu akses lewat rekening & kebijakan bank.
                      Ada prosedur (verifikasi, batas transaksi, compliance).
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>
                      <b>Jam operasional:</b> banyak proses mengikuti jam kerja/settlement tertentu
                      (tergantung layanan).
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>
                      <b>Biaya:</b> bisa ada biaya admin/transfer tertentu; transparansinya tergantung
                      jenis layanan.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>
                      <b>Akses global:</b> bisa, tapi biasanya melalui jaringan & aturan perbankan
                      (lebih banyak tahapan & verifikasi).
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
                <div className="text-sm text-white/70">Crypto</div>
                <div className="mt-1 text-lg font-bold text-white">Jaringan blockchain (teknologi)</div>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>
                      <b>Fungsi:</b> kirim/terima aset digital di jaringan; beberapa aset mewakili nilai,
                      utilitas, atau “token” di ekosistem tertentu.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>
                      <b>Kontrol:</b> kamu bisa pilih <b>custodial</b> (platform pegang) atau{" "}
                      <b>self-custody</b> (kamu pegang private key/seed phrase).
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>
                      <b>Jam operasional:</b> blockchain berjalan 24/7; transaksi bisa diproses kapan saja.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>
                      <b>Biaya:</b> umumnya ada fee jaringan (gas/fee) dan/atau fee platform; biaya bisa
                      berubah tergantung jaringan & kondisi.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>
                      <b>Akses global:</b> secara teknis lintas negara, cukup alamat wallet; tapi tetap perlu
                      memahami aturan, keamanan, dan risiko salah kirim.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <Callout title="Catatan penting (anti-salah paham)" tone="note">
              “Crypto” itu bukan satu aplikasi. Ia gabungan: <b>jaringan</b> (blockchain), <b>aset</b> (coin/token),
              dan <b>alat akses</b> (exchange/wallet). Jadi pengalaman orang bisa beda-beda tergantung pakai apa.
            </Callout>
          </div>

          {/* Desentralisasi */}
          <div className="space-y-4">
            <SectionTitle id="desentralisasi" icon="🧩">
              Apa itu desentralisasi (analogi sehari-hari)
            </SectionTitle>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
                <div className="text-sm text-white/70">Analogi gampang</div>
                <div className="mt-2 space-y-3 text-sm text-white/80 leading-relaxed">
                  <p>
                    Bayangkan kamu dan teman-teman punya “buku catatan hutang-piutang”.
                  </p>
                  <p>
                    <b>Model terpusat:</b> cuma ada <b>satu orang</b> yang pegang buku catatan.
                    Kalau dia salah catat, hilang, atau curang—yang lain sulit membuktikan.
                  </p>
                  <p>
                    <b>Model desentralisasi:</b> setiap orang punya <b>salinan</b> buku catatan.
                    Kalau ada transaksi baru, semua orang menyepakati dulu, lalu menulis bareng.
                    Jadi lebih sulit “diubah sepihak”.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/30 p-5 md:p-6">
                <div className="text-sm text-white/70">Terjemahan ke dunia crypto</div>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>
                      Desentralisasi berarti <b>tidak ada satu pihak</b> yang memegang “buku besar” sendirian.
                      Validasi transaksi dilakukan oleh jaringan (node/validator) sesuai aturan protokol.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>
                      Ini bisa mengurangi ketergantungan pada satu institusi, tapi juga mengubah tanggung jawab:
                      kamu harus paham cara menyimpan akses (seed/private key).
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>
                      Banyak layanan crypto yang kamu pakai sehari-hari <b>tidak 100% desentral</b>
                      (misal exchange). Jadi penting membedakan: jaringan vs layanan.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <Callout title="Kunci pemahaman" tone="safe">
              Desentralisasi bukan “lebih baik untuk semua orang”. Itu trade-off: lebih mandiri & global,
              tapi kamu perlu literasi keamanan lebih tinggi.
            </Callout>
          </div>

          {/* Kapan cocok */}
          <div className="space-y-4">
            <SectionTitle id="kapan-cocok" icon="🧭">
              Kapan bank lebih cocok, kapan crypto lebih cocok (netral, edukatif)
            </SectionTitle>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
                <div className="text-lg font-bold text-white">Bank lebih cocok jika…</div>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>Kamu butuh <b>stabilitas</b> untuk kebutuhan sehari-hari (gaji, tagihan, belanja).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>Kamu butuh <b>pencatatan resmi</b>, layanan pelanggan, dan alur yang familiar.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>Kamu ingin <b>proteksi institusi</b> dan mekanisme pemulihan tertentu (sesuai kebijakan).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>Kamu tidak mau repot mengelola private key/seed phrase.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/30 p-5 md:p-6">
                <div className="text-lg font-bold text-white">Crypto lebih cocok jika…</div>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>Kamu butuh <b>transfer lintas negara</b> yang lebih langsung (dengan pemahaman risiko).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>Kamu butuh akses <b>24/7</b> untuk kirim/terima aset digital.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>Kamu ingin belajar tentang <b>blockchain</b>, custody, dan cara kerja aset digital.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span>Kamu nyaman mulai dari nominal kecil, disiplin keamanan, dan tidak FOMO.</span>
                  </li>
                </ul>
              </div>
            </div>

            <Callout title="Cara memilih yang sehat" tone="note">
              Tanyakan ini ke diri sendiri: <b>butuh apa?</b> (stabilitas vs fleksibilitas),{" "}
              <b>siap tanggung jawab apa?</b> (custody vs kemudahan), dan <b>berapa besar risiko</b> yang kamu sanggup.
            </Callout>
          </div>

          {/* Transfer internasional */}
          <div className="space-y-4">
            <SectionTitle id="transfer-internasional" icon="🌍">
              Transfer internasional: gambaran proses bank vs crypto (tanpa angka palsu)
            </SectionTitle>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
                <div className="text-lg font-bold text-white">Proses umum via bank</div>
                <ol className="mt-4 space-y-3 text-sm text-white/80 list-decimal pl-5">
                  <li>
                    Kamu siapkan data penerima (nama, bank tujuan, rekening, kode tertentu sesuai negara/jaringan bank).
                  </li>
                  <li>
                    Bank melakukan <b>verifikasi</b> (data, kepatuhan, anti-fraud, dsb).
                  </li>
                  <li>
                    Transfer melewati <b>jaringan perbankan</b> (sering melibatkan perantara/koresponden, tergantung rute).
                  </li>
                  <li>
                    Penerima menunggu dana masuk sesuai <b>proses settlement</b> dan kebijakan bank penerima.
                  </li>
                </ol>

                <Callout title="Plus & minus" tone="note">
                  <b>Plus:</b> jalur resmi, familiar, ada dukungan institusi. <br />
                  <b>Minus:</b> tahapan lebih banyak, bisa terikat jam operasional/aturan lintas negara.
                </Callout>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/30 p-5 md:p-6">
                <div className="text-lg font-bold text-white">Proses umum via crypto</div>
                <ol className="mt-4 space-y-3 text-sm text-white/80 list-decimal pl-5">
                  <li>
                    Kamu pastikan aset & tujuan: misal kirim <b>stablecoin</b> atau aset lain, dan pilih <b>network</b> yang tepat.
                  </li>
                  <li>
                    Kamu minta <b>alamat wallet</b> penerima (dan pastikan network-nya cocok).
                  </li>
                  <li>
                    Kamu kirim transaksi; jaringan memprosesnya <b>24/7</b> sesuai aturan blockchain.
                  </li>
                  <li>
                    Penerima menerima aset di wallet (atau di exchange jika dia pakai custodial).
                  </li>
                </ol>

                <Callout title="Plus & minus" tone="warn">
                  <b>Plus:</b> secara teknis lintas negara dan bisa kapan saja. <br />
                  <b>Minus:</b> kesalahan address/network bisa fatal; transaksi umumnya sulit dibatalkan.
                </Callout>
              </div>
            </div>

            <Callout title="Kenapa dibilang ‘tanpa angka palsu’?" tone="note">
              Waktu proses dan biaya bisa berbeda-beda tergantung negara, bank, jaringan crypto, kondisi jaringan,
              dan platform yang dipakai. Fokus dulu ke <b>alur</b> dan <b>risiko</b>—itu yang paling penting untuk pemula.
            </Callout>
          </div>

          {/* Custody */}
          <div className="space-y-4">
            <SectionTitle id="custody" icon="🔐">
              Apa itu self-custody vs custodial
            </SectionTitle>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/30 p-5 md:p-6">
                <div className="text-sm text-white/70">Custodial</div>
                <div className="mt-1 text-lg font-bold text-white">“Dititipkan” ke platform</div>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">
                  Kamu menyimpan crypto di exchange/aplikasi. Platform memegang sistem keamanan & proses.
                  Biasanya lebih mudah untuk pemula (login, reset, dukungan), tapi kontrol penuh ada di pihak platform.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span><b>Pro:</b> mudah, cocok untuk belajar awal, UI familiar.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span><b>Kontra:</b> ada risiko platform (akun dibekukan, peretasan, kebijakan berubah).</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
                <div className="text-sm text-white/70">Self-custody</div>
                <div className="mt-1 text-lg font-bold text-white">Kamu pegang sendiri aksesnya</div>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">
                  Kamu menyimpan aset di wallet non-custodial. Artinya kamu memegang <b>private key/seed phrase</b>.
                  Ini memberikan kontrol lebih besar, tapi tanggung jawab juga lebih besar.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span><b>Pro:</b> kontrol penuh; aset tidak bergantung pada satu platform.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-300">•</span>
                    <span><b>Kontra:</b> jika seed phrase hilang/terbocor, kamu bisa kehilangan akses selamanya.</span>
                  </li>
                </ul>
              </div>
            </div>

            <Callout title="Aturan emas pemula" tone="safe">
              Kalau masih belajar, tidak masalah mulai custodial untuk nominal kecil.
              Pindah ke self-custody saat kamu sudah paham: seed phrase, network, address, dan kebiasaan keamanan.
            </Callout>
          </div>

          {/* Stablecoin */}
          <div className="space-y-4">
            <SectionTitle id="stablecoin" icon="🪙">
              Stablecoin sebagai “jembatan”
            </SectionTitle>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <p className="text-sm text-white/80 leading-relaxed">
                <b>Stablecoin</b> adalah aset crypto yang dirancang untuk mengikuti nilai mata uang tertentu (umumnya fiat),
                sehingga volatilitasnya cenderung lebih rendah dibanding aset crypto yang fluktuatif.
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="font-semibold text-white">Sebagai jembatan belajar</div>
                  <div className="mt-2 text-sm text-white/80">
                    Pemula bisa fokus memahami <b>alamat</b>, <b>network</b>, dan <b>cara kirim</b> tanpa terlalu pusing
                    dengan naik-turun harga ekstrem.
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="font-semibold text-white">Sebagai alat transfer</div>
                  <div className="mt-2 text-sm text-white/80">
                    Untuk beberapa use-case, stablecoin dipakai sebagai “nilai” yang relatif stabil ketika dikirim lintas
                    platform/jaringan (tetap perhatikan risiko network & biaya).
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="font-semibold text-white">Tetap ada risiko</div>
                  <div className="mt-2 text-sm text-white/80">
                    Stablecoin bukan bebas risiko. Kamu tetap perlu memahami risiko platform, jaringan, dan operasional
                    (salah kirim, salah network).
                  </div>
                </div>
              </div>

              <Callout title="Kalimat sederhana" tone="note">
                Stablecoin itu seperti “uang digital di jalur blockchain”: cocok untuk belajar alur, tapi tetap butuh kehati-hatian.
              </Callout>
            </div>
          </div>

          {/* Risiko */}
          <div className="space-y-4">
            <SectionTitle id="risiko" icon="⚠️">
              Risiko: salah kirim address, salah network, kehilangan seed phrase
            </SectionTitle>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-lg font-bold text-white">Salah address</div>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                  Crypto dikirim ke <b>alamat</b>. Kalau salah satu karakter atau salah tujuan, transaksi bisa
                  tidak bisa dibatalkan. Selalu <b>copy-paste</b> dan cek beberapa karakter awal/akhir.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-lg font-bold text-white">Salah network</div>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                  Banyak aset yang bisa ada di berbagai jaringan. Kalau kamu kirim di network yang tidak cocok dengan penerima,
                  dana bisa “nyangkut” atau butuh proses teknis untuk pemulihan (tidak selalu bisa).
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-lg font-bold text-white">Seed phrase hilang</div>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                  Seed phrase adalah “kunci utama” untuk self-custody. Kalau hilang, tidak ada “lupa password” versi blockchain.
                  Kalau bocor, orang lain bisa menguras asetmu.
                </p>
              </div>
            </div>

            <Callout title="Tambahan risiko praktis (yang sering kejadian)" tone="warn">
              Pemula sering kena karena: terburu-buru, salah pilih jaringan, klik link palsu, atau menyimpan seed phrase di tempat
              yang tidak aman (misal screenshot di galeri / cloud tanpa sadar).
            </Callout>
          </div>

          {/* Tips aman */}
          <div className="space-y-4">
            <SectionTitle id="tips-aman" icon="🛡️">
              Tips pemula agar aman memakai crypto tanpa jadi ekstrem
            </SectionTitle>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-5 md:p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="text-lg font-bold text-white">Checklist Aman (praktis)</div>
                  <ul className="space-y-3 text-sm text-white/80">
                    <li className="flex gap-3">
                      <span className="text-yellow-300">1)</span>
                      <span>
                        Mulai dari <b>nominal kecil</b> untuk belajar alur (bukan cari untung cepat).
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-yellow-300">2)</span>
                      <span>
                        Selalu lakukan <b>test transfer</b> kecil dulu sebelum kirim jumlah lebih besar.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-yellow-300">3)</span>
                      <span>
                        <b>Double-check network</b> (pengirim & penerima harus sama).
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-yellow-300">4)</span>
                      <span>
                        Jangan klik link random; waspada <b>phishing</b> dan akun tiruan.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-yellow-300">5)</span>
                      <span>
                        Untuk self-custody: simpan seed phrase <b>offline</b> (kertas/metal), jangan screenshot.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="text-lg font-bold text-white">Sikap yang sehat</div>
                  <ul className="space-y-3 text-sm text-white/80">
                    <li className="flex gap-3">
                      <span className="text-yellow-300">•</span>
                      <span>
                        Jangan “anti-bank” dan jangan “anti-crypto”. Pilih alat sesuai kebutuhan.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-yellow-300">•</span>
                      <span>
                        Pahami bahwa <b>custody</b> itu spektrum: mulai custodial untuk belajar itu wajar.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-yellow-300">•</span>
                      <span>
                        Bikin aturan: pakai hanya <b>uang dingin</b> dan punya batas risiko yang jelas.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-yellow-300">•</span>
                      <span>
                        Fokus ke literasi: alamat, jaringan, fee, dan cara menghindari kesalahan.
                      </span>
                    </li>
                  </ul>

                  <Callout title="Tips paling penting" tone="safe">
                    Kalau kamu bingung “ini network yang mana?”, berhenti dulu. Cari tahu sampai yakin.
                    Di crypto, terburu-buru adalah musuh utama.
                  </Callout>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <SectionTitle id="faq" icon="❓">
              FAQ (Pertanyaan yang paling sering ditanya pemula)
            </SectionTitle>

            <div className="grid gap-3">
              <FAQItem
                q="1) Apakah crypto itu sama seperti bank digital?"
                a={
                  <>
                    Tidak. Bank digital tetap bank (institusi terpusat) yang mengelola uang fiat dan mengikuti regulasi.
                    Crypto adalah teknologi jaringan + aset digital. Kamu bisa memakainya lewat platform, tapi konsep intinya berbeda.
                  </>
                }
              />
              <FAQItem
                q="2) Kalau crypto 24/7, berarti selalu lebih baik dari bank?"
                a={
                  <>
                    Tidak selalu. 24/7 itu keunggulan dari sisi akses jaringan, tapi kamu juga harus menanggung risiko operasional
                    (salah address/network) dan keamanan (seed phrase). Bank unggul di stabilitas dan jalur resmi.
                  </>
                }
              />
              <FAQItem
                q="3) Apa bedanya alamat wallet dengan nomor rekening?"
                a={
                  <>
                    Nomor rekening terikat ke identitas dan sistem bank. Alamat wallet adalah identitas teknis di jaringan blockchain.
                    Kesalahan penulisan alamat bisa berakibat transaksi sulit dibatalkan—makanya wajib teliti.
                  </>
                }
              />
              <FAQItem
                q="4) Exchange itu bank?"
                a={
                  <>
                    Bukan bank, tapi berperan seperti platform layanan (custodial) yang memudahkan jual-beli dan penyimpanan.
                    Karena custodial, risikonya termasuk risiko platform (akun, kebijakan, keamanan).
                  </>
                }
              />
              <FAQItem
                q="5) Apa itu self-custody dalam kalimat paling singkat?"
                a={
                  <>
                    Self-custody = kamu pegang kunci akses asetmu sendiri (private key/seed phrase), bukan dititipkan ke platform.
                  </>
                }
              />
              <FAQItem
                q="6) Apakah pemula harus langsung self-custody?"
                a={
                  <>
                    Tidak wajib. Untuk pemula, masuk akal mulai dari custodial dengan nominal kecil sambil belajar.
                    Pindah ke self-custody ketika kamu sudah paham keamanan dan siap tanggung jawab.
                  </>
                }
              />
              <FAQItem
                q="7) Kenapa stablecoin sering dipakai pemula?"
                a={
                  <>
                    Karena stabilitas nilainya relatif lebih mudah dipahami untuk belajar alur: kirim/terima, memilih network,
                    dan menghindari kesalahan. Tapi tetap ada risiko jaringan dan platform.
                  </>
                }
              />
              <FAQItem
                q="8) Salah network itu maksudnya apa?"
                a={
                  <>
                    Satu aset bisa ada di beberapa jaringan. Kalau pengirim memilih jaringan A sementara penerima hanya menerima
                    jaringan B, dana bisa tidak langsung masuk. Kadang bisa dipulihkan, kadang tidak—tergantung kasus dan platform.
                  </>
                }
              />
              <FAQItem
                q="9) Apakah transaksi crypto bisa dibatalkan seperti transfer bank?"
                a={
                  <>
                    Umumnya tidak. Begitu transaksi dikonfirmasi jaringan, pembatalan tidak bekerja seperti “void”.
                    Karena itu, test transfer kecil dan double-check data itu penting.
                  </>
                }
              />
              <FAQItem
                q="10) Apa langkah paling aman pertama kali mencoba?"
                a={
                  <>
                    (1) Pakai nominal kecil, (2) pahami perbedaan address vs network, (3) lakukan test transfer,
                    (4) jangan terburu-buru, dan (5) pakai sumber informasi yang jelas, bukan hype.
                  </>
                }
              />
              <FAQItem
                q="11) Apakah crypto legal?"
                a={
                  <>
                    Status dan aturan berbeda-beda tiap negara. Untuk pemula, anggap ini: selalu patuhi aturan setempat,
                    gunakan platform yang kredibel, dan jangan memakai crypto untuk aktivitas yang melanggar hukum.
                  </>
                }
              />
              <FAQItem
                q="12) Kalau saya cuma mau ‘belajar’, perlu ngerti semuanya sekarang?"
                a={
                  <>
                    Tidak. Mulai dari konsep: bedanya bank vs crypto, custody, address + network, dan kebiasaan aman.
                    Setelah itu baru naik level: jenis aset, manajemen risiko, dan topik lanjutan.
                  </>
                }
              />
            </div>
          </div>

          {/* Disclaimer */}
          <div className="space-y-4">
            <SectionTitle id="disclaimer" icon="📌">
              Disclaimer
            </SectionTitle>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <p className="text-sm text-white/80 leading-relaxed">
                Konten ini bersifat <b>edukasi</b> dan <b>informasi umum</b>, bukan nasihat keuangan, investasi,
                hukum, atau pajak. Keputusan menggunakan bank/crypto sepenuhnya tanggung jawab kamu.
                Selalu riset mandiri, pahami risiko, dan gunakan nominal yang kamu siap kehilangan.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <Callout title="Safety first" tone="safe">
                  Kalau kamu masih bingung soal address/network, jangan transaksi dulu.
                  Belajar pelan lebih murah daripada “belajar dari salah kirim”.
                </Callout>
                <Callout title="Anti-FOMO" tone="warn">
                  Hindari keputusan karena “katanya”, “temen cuan”, atau “takut ketinggalan”.
                  Pemula paling sering rugi karena buru-buru.
                </Callout>
              </div>
            </div>
          </div>

          {/* Lanjut belajar */}
          <div className="space-y-4">
            <SectionTitle id="lanjut" icon="➡️">
              Lanjut Belajar
            </SectionTitle>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-5 md:p-6">
              <div className="grid gap-4 md:grid-cols-12 md:items-center">
                <div className="md:col-span-8">
                  <div className="text-lg font-bold text-white">
                    Berikutnya: bongkar mitos yang sering bikin pemula salah langkah
                  </div>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">
                    Banyak kesalahan pemula bukan karena “nggak pinter”, tapi karena percaya mitos.
                    Lanjutkan ke halaman berikut:
                    <span className="text-white"> /crypto-myths</span>.
                  </p>

                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/crypto-myths"
                      className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                      Lanjut ke /crypto-myths
                    </Link>

                    <a
                      href="https://t.me/koinity_bot"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black hover:bg-emerald-400 transition"
                    >
                      Lanjut Belajar (Telegram)
                    </a>
                  </div>
                </div>

                <div className="md:col-span-4">
                  <div className="rounded-2xl border border-yellow-400/25 bg-yellow-400/10 p-4">
                    <div className="text-sm font-semibold text-yellow-200">CTA halus</div>
                    <div className="mt-2 text-sm text-white/80">
                      Mau tanya yang “relevan buat kamu” (bukan teori doang)? Klik tombol hijau, lanjut belajar bareng.
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill>Beginner friendly</Pill>
                      <Pill>No FOMO</Pill>
                      <Pill>Step-by-step</Pill>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="pt-10 text-center text-xs text-white/50">
              © {new Date().getFullYear()} Koinity • Edukasi Crypto untuk Pemula
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
}
