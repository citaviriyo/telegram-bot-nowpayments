// app/crypto-risk-vs-reward/page.tsx
import Link from "next/link";

export default function CryptoRiskVsRewardPage() {
  const toc = [
    { id: "konsep", label: "Konsep Risk vs Reward (Analogi Sederhana)" },
    { id: "jenis-risiko", label: "Jenis Risiko di Crypto (Lengkap)" },
    { id: "kenapa-masuk", label: "Kenapa Orang Tetap Masuk Crypto (Reward)" },
    { id: "manajemen-risiko", label: "Manajemen Risiko Praktis (Untuk Pemula)" },
    { id: "skenario-1juta", label: "Contoh Skenario Pemula: Modal 1 Juta (Edukasi)" },
    { id: "checklist", label: "Checklist Anti-Babak Belur (Red Flags)" },
    { id: "faq", label: "FAQ + Disclaimer" },
    { id: "lanjutan", label: "Lanjut Belajar: Crypto vs Bank" },
  ];

  const risks = [
    {
      title: "Volatilitas",
      desc: "Harga bisa naik-turun cepat dalam hitungan menit/jam. Ini bisa bikin profit besar, tapi juga bisa bikin rugi besar kalau masuk tanpa rencana.",
      examples: [
        "Koin A naik 20% pagi, turun 18% sore.",
        "Berita kecil/rumor bisa bikin market panik (FUD) atau euforia (FOMO).",
      ],
    },
    {
      title: "Likuiditas",
      desc: "Kalau likuiditas tipis, kamu bisa susah jual di harga yang kamu mau. Saat panik, harga bisa “jatuh” karena pembeli sedikit.",
      examples: [
        "Altcoin kecil: kamu klik sell, harga langsung turun karena order book dangkal.",
        "Spread (selisih bid-ask) jadi lebar → biaya “tak terlihat” membesar.",
      ],
    },
    {
      title: "Leverage",
      desc: "Leverage memperbesar hasil… dan memperbesar kerugian. Ini juga bisa memicu likuidasi (posisi ditutup paksa) ketika harga bergerak sedikit melawanmu.",
      examples: [
        "Pakai 10x: turun 10% bisa habis (tergantung margin/maintenance).",
        "Market ‘nyentil’ sebentar → posisi hilang, padahal arah akhirnya benar.",
      ],
      note: "Untuk pemula, pahami konsepnya dulu. Tidak perlu dipakai untuk belajar dasar.",
    },
    {
      title: "Rug Pull / Scam",
      desc: "Proyek dibuat untuk mengumpulkan uang lalu ditinggal kabur, atau likuiditas ditarik sehingga harga ambruk.",
      examples: [
        "Token baru viral, tim anonim, tiba-tiba LP ditarik.",
        "Janji profit tetap, referral agresif, komunitas toxic.",
      ],
    },
    {
      title: "Smart Contract Risk",
      desc: "Bug atau celah pada smart contract bisa dimanfaatkan hacker. Sekalipun proyek ‘terlihat keren’, kontraknya bisa bermasalah.",
      examples: [
        "Exploit DeFi → dana di pool disedot.",
        "Kontrak punya fungsi tersembunyi (mint tanpa batas, blacklist, dll).",
      ],
    },
    {
      title: "Custody Risk",
      desc: "Risiko terkait penyimpanan aset: exchange bisa kena hack, dibekukan, error, atau kamu sendiri kehilangan akses (password/2FA/seed phrase).",
      examples: [
        "Lupa seed phrase → aset non-custodial tidak bisa dipulihkan.",
        "Exchange maintenance saat market crash → kamu nggak bisa jual/beli.",
      ],
    },
    {
      title: "Regulasi",
      desc: "Aturan pemerintah bisa berubah: pajak, pembatasan platform, larangan produk tertentu, atau kewajiban KYC yang lebih ketat.",
      examples: [
        "Aset tertentu dilarang diperdagangkan di negara tertentu.",
        "Perubahan aturan bisa memengaruhi akses deposit/withdraw.",
      ],
    },
    {
      title: "Psikologi",
      desc: "Sering jadi risiko terbesar: FOMO, panik jual, revenge trade, overconfidence, dan ikut-ikutan influencer tanpa paham.",
      examples: [
        "Beli karena “kata grup”, bukan karena kamu paham risikonya.",
        "Nggak sanggup lihat merah 10% → panik, padahal rencananya jangka panjang.",
      ],
    },
  ];

  const faqs = [
    {
      q: "Crypto itu pasti lebih berisiko daripada investasi lain?",
      a: "Umumnya crypto lebih volatil daripada aset tradisional (misal deposito/obligasi), jadi terasa lebih “liar”. Tapi risiko itu spektrum: BTC/ETH cenderung lebih mapan dibanding token baru yang belum jelas.",
    },
    {
      q: "Apa beda risk vs reward dengan “untung vs rugi”?",
      a: "Risk vs reward itu cara berpikir sebelum masuk: kamu menimbang kemungkinan rugi (risk) dibanding potensi hasil (reward) dan apakah kamu sanggup menanggungnya. Untung/rugi adalah hasil akhirnya.",
    },
    {
      q: "Kalau aku pemula, apakah harus trading harian?",
      a: "Tidak. Banyak pemula justru lebih cocok belajar dasar, pakai nominal kecil, dan fokus strategi sederhana seperti DCA atau beli bertahap (bila kamu memilih masuk).",
    },
    {
      q: "Stop loss itu wajib?",
      a: "Stop loss adalah konsep manajemen risiko untuk membatasi kerugian. Untuk pemula, yang penting paham idenya: kamu tentukan batas kerugian yang masih bisa diterima. Implementasinya bisa berbeda tergantung instrumen dan gaya.",
    },
    {
      q: "Lebih aman simpan di exchange atau wallet?",
      a: "Exchange lebih praktis tapi punya custody risk (platform). Wallet non-custodial memberi kontrol penuh, tapi tanggung jawab keamanan ada di kamu (seed phrase, backup, phishing). Pilih sesuai kebutuhan dan kemampuan menjaga keamanan.",
    },
    {
      q: "DCA selalu lebih bagus daripada lump sum?",
      a: "Nggak selalu. DCA membantu mengurangi risiko timing (beli di puncak), sedangkan lump sum bisa lebih optimal kalau harga ternyata naik terus. Untuk pemula yang belum nyaman dengan volatilitas, DCA sering terasa lebih “tenang”.",
    },
    {
      q: "Gimana cara tahu proyek itu scam?",
      a: "Tidak ada cara 100% pasti, tapi ada red flags yang kuat: tim anonim tanpa rekam jejak, janji profit tetap, tokenomics aneh, likuiditas dikunci tidak jelas, audit abal-abal, komunitas hanya ngomong “to the moon”.",
    },
    {
      q: "Apa itu likuiditas dan kenapa penting?",
      a: "Likuiditas itu “seberapa mudah” aset dibeli/dijual tanpa mengubah harga terlalu besar. Likuiditas tinggi biasanya membuat transaksi lebih stabil; likuiditas rendah bisa bikin harga gampang “ditarik-tarik”.",
    },
    {
      q: "Leverage itu cara cepat kaya?",
      a: "Leverage memperbesar peluang hasil, tapi juga memperbesar peluang habis. Banyak orang pemula kehilangan modal bukan karena salah aset, tapi karena salah mengelola leverage dan emosi.",
    },
    {
      q: "Kalau aku cuma punya modal kecil, apakah masih bisa belajar?",
      a: "Bisa. Untuk belajar, yang penting bukan besar modal, tapi disiplin: pakai uang dingin, catat keputusan, pahami risiko, dan belajar bertahap.",
    },
    {
      q: "Apakah halaman ini saran finansial?",
      a: "Tidak. Ini konten edukasi umum untuk membantu kamu memahami konsep risiko dan reward. Keputusan akhir tetap di kamu, dan bila perlu konsultasikan dengan penasihat keuangan berlisensi.",
    },
    {
      q: "Berapa persen ideal alokasi crypto di portofolio?",
      a: "Tidak ada angka universal. Banyak orang memakai prinsip: semakin tinggi volatilitas, semakin kecil porsi yang masuk kategori “uang dingin” dan tidak mengganggu kebutuhan hidup. Mulai dari kecil dan naikkan hanya jika kamu paham risikonya.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Subtle background */}
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(245,196,0,0.16),transparent_45%),radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.10),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(245,196,0,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.95))]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 overflow-hidden rounded-xl border border-white/10 bg-black">
  <img
    src="/android-chrome-192x192.png"
    alt="Koinity"
    className="h-full w-full object-cover"
  />
</div>

            <div className="leading-tight">
              <p className="text-sm text-white/70">Koinity • Edukasi Pemula</p>
              <h1 className="text-lg font-semibold tracking-tight">
                Crypto: Risk vs Reward
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/all-about-crypto"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
            >
              ← All About Crypto
            </Link>
            <a
              href="https://t.me/koinity_bot"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
            >
              Chat di Koinity Bot
            </a>
          </div>
        </div>

        {/* Hero + Summary card */}
        <section className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f5c400]/30 bg-[#f5c400]/10 px-3 py-1 text-xs font-medium text-[#f5c400]">
                ⚠️ Untuk pemula • Fokus edukasi, bukan ajakan spekulasi
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Pahami <span className="text-[#f5c400]">Risiko</span> sebelum mengejar{" "}
                <span className="text-[#f5c400]">Reward</span>.
              </h2>

              <p className="mt-4 text-white/80 leading-relaxed">
                Crypto bisa memberi peluang besar, tapi juga bisa “menghajar” orang yang
                masuk tanpa rencana. Di halaman ini kamu akan belajar konsep{" "}
                <span className="font-semibold text-white">risk vs reward</span> dengan
                bahasa pemula: jenis-jenis risiko, kenapa reward tetap menarik, serta
                cara manajemen risiko yang lebih masuk akal untuk pemula.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="https://t.me/koinity_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black hover:bg-emerald-400"
                >
                  Gabung ekosistem Koinity (via Bot)
                </a>
                <Link
                  href="/crypto-vs-bank"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Lanjut: Crypto vs Bank →
                </Link>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-xs text-white/60">Tujuan halaman</p>
                  <p className="mt-1 text-sm font-semibold">
                    Bikin kamu <span className="text-[#f5c400]">nggak kaget</span> saat market liar
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-xs text-white/60">Kunci pemula</p>
                  <p className="mt-1 text-sm font-semibold">
                    Uang dingin + ukuran posisi kecil + disiplin
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-xs text-white/60">Anti-babak belur</p>
                  <p className="mt-1 text-sm font-semibold">
                    Hindari proyek “cepat kaya”, fokus belajar
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <h3 className="text-lg font-bold">Ringkasan 1 Menit</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#f5c400]" />
                  <span>
                    <span className="font-semibold text-white">Risk</span> = kemungkinan rugi / kehilangan akses / tertipu / panic decision.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#f5c400]" />
                  <span>
                    <span className="font-semibold text-white">Reward</span> = potensi pertumbuhan, akses global, inovasi teknologi.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#f5c400]" />
                  <span>
                    Pemula paling sering kalah bukan karena “salah koin”, tapi karena
                    <span className="font-semibold text-white"> ukuran posisi kebesaran</span> + emosi.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#f5c400]" />
                  <span>
                    Mulai dari kecil, pakai uang dingin, dan punya plan sebelum klik buy.
                  </span>
                </li>
              </ul>

              <div className="mt-6 rounded-2xl border border-[#f5c400]/25 bg-[#f5c400]/10 p-4">
                <p className="text-xs font-semibold text-[#f5c400]">Mindset aman</p>
                <p className="mt-1 text-sm text-white/85">
                  “Kalau ini turun 30–50%, apakah hidupku tetap aman?”  
                  Kalau jawabannya <span className="font-semibold">tidak</span>, berarti porsinya kebesaran.
                </p>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-white">Table of Contents</h4>
                <div className="mt-3 grid gap-2">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/85 hover:bg-white/5"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/crypto-vs-bank"
                  className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
                >
                  Crypto vs Bank →
                </Link>
                <a
                  href="https://t.me/koinity_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-2xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-black hover:bg-emerald-400"
                >
                  Join via Bot
                </a>
              </div>
            </div>
          </aside>
        </section>

        {/* Content */}
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-6">
            {/* Konsep */}
            <section
              id="konsep"
              className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold">
                Konsep Risiko vs Reward (Analogi Sederhana)
              </h3>

              <p className="mt-4 text-white/80 leading-relaxed">
                Bayangkan kamu lagi memilih kendaraan untuk perjalanan jauh:
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                  <p className="text-sm font-semibold text-white">Opsi A: Motor balap</p>
                  <p className="mt-2 text-sm text-white/80">
                    Bisa sampai cepat (reward besar), tapi risikonya juga tinggi: mudah tergelincir,
                    capek, dan butuh skill.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                  <p className="text-sm font-semibold text-white">Opsi B: Mobil keluarga</p>
                  <p className="mt-2 text-sm text-white/80">
                    Sampai lebih stabil dan aman (risk lebih rendah), tapi mungkin lebih lambat.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-white/80 leading-relaxed">
                Nah, <span className="font-semibold text-white">risk vs reward</span> itu
                cara menimbang: “Seberapa besar peluang hasil yang aku kejar” dibanding
                “seberapa besar risiko yang aku sanggup tanggung”.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-sm font-semibold text-[#f5c400]">Prinsip yang sehat untuk pemula</p>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#f5c400]" />
                    <span>
                      Reward yang “kelihatan besar” biasanya datang dengan risk yang “nggak kelihatan”
                      (likuiditas, scam, psikologi).
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#f5c400]" />
                    <span>
                      Kalau kamu belum paham risikonya, anggap risikonya{" "}
                      <span className="font-semibold text-white">lebih besar</span> dari yang kamu kira.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#f5c400]" />
                    <span>
                      Tujuan awal belajar: <span className="font-semibold text-white">selamat dulu</span>, baru berkembang.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Risiko */}
            <section
              id="jenis-risiko"
              className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold">Jenis Risiko di Crypto (Lengkap)</h3>
              <p className="mt-4 text-white/80 leading-relaxed">
                Risiko di crypto itu bukan cuma “harga turun”. Ada banyak lapisan. Di bawah ini
                daftar yang paling penting untuk pemula.
              </p>

              <div className="mt-6 space-y-4">
                {risks.map((r) => (
                  <div
                    key={r.title}
                    className="rounded-2xl border border-white/10 bg-black/40 p-5"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-semibold text-white">{r.title}</p>
                      <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        Risiko
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-white/80 leading-relaxed">{r.desc}</p>

                    {r.examples?.length ? (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-white/70">Contoh:</p>
                        <ul className="mt-2 space-y-1 text-sm text-white/80">
                          {r.examples.map((ex) => (
                            <li key={ex} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f5c400]" />
                              <span>{ex}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {"note" in r && (r as any).note ? (
                      <div className="mt-4 rounded-xl border border-[#f5c400]/20 bg-[#f5c400]/10 p-4">
                        <p className="text-xs font-semibold text-[#f5c400]">Catatan pemula</p>
                        <p className="mt-1 text-sm text-white/85">{(r as any).note}</p>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-sm font-semibold text-white">Ringkasnya:</p>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                  Risiko crypto itu campuran antara <span className="font-semibold text-white">risiko pasar</span> (volatilitas),
                  <span className="font-semibold text-white"> risiko teknis</span> (smart contract),
                  <span className="font-semibold text-white"> risiko platform</span> (custody),
                  <span className="font-semibold text-white"> risiko sosial</span> (scam/pompom),
                  dan <span className="font-semibold text-white"> risiko diri sendiri</span> (psikologi).
                </p>
              </div>
            </section>

            {/* Reward */}
            <section
              id="kenapa-masuk"
              className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold">Kenapa Orang Tetap Masuk Crypto (Reward)</h3>
              <p className="mt-4 text-white/80 leading-relaxed">
                Kalau risikonya banyak, kenapa orang masih tertarik? Karena ada beberapa “reward”
                yang dianggap bernilai (terutama untuk jangka panjang).
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                  <p className="text-sm font-semibold text-[#f5c400]">Teknologi</p>
                  <p className="mt-2 text-sm text-white/80">
                    Blockchain membuka cara baru menyimpan dan memindahkan nilai, membangun aplikasi
                    tanpa server tunggal, dan transparansi transaksi.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                  <p className="text-sm font-semibold text-[#f5c400]">Akses global</p>
                  <p className="mt-2 text-sm text-white/80">
                    Kamu bisa akses aset digital lintas negara 24/7. Untuk sebagian orang, ini nilai
                    penting (meski tetap ada aturan & risiko).
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                  <p className="text-sm font-semibold text-[#f5c400]">Peluang pertumbuhan</p>
                  <p className="mt-2 text-sm text-white/80">
                    Aset dengan volatilitas tinggi punya potensi pertumbuhan tinggi. Tapi ingat:
                    potensi besar = risiko besar.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-sm font-semibold text-white">Pola yang sering terjadi</p>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                  Orang yang masuk dengan mindset “belajar + bertahap” biasanya bertahan lebih lama
                  daripada yang masuk dengan mindset “kejar cepat kaya”.
                </p>
              </div>
            </section>

            {/* Manajemen Risiko */}
            <section
              id="manajemen-risiko"
              className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold">Manajemen Risiko Praktis (Untuk Pemula)</h3>
              <p className="mt-4 text-white/80 leading-relaxed">
                Ini bagian yang paling penting. Manajemen risiko bukan bikin kamu “anti rugi”,
                tapi bikin kamu <span className="font-semibold text-white">nggak hancur</span> kalau rugi terjadi.
              </p>

              <div className="mt-6 space-y-4">
                {/* Position sizing */}
                <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                  <h4 className="text-sm font-semibold text-white">1) Position sizing (ukuran posisi)</h4>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">
                    Intinya: <span className="font-semibold text-white">jangan taruh terlalu besar</span> di satu aset atau satu keputusan.
                    Position sizing membantu kamu tetap tenang saat harga bergerak liar.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-semibold text-white/70">Contoh prinsip</p>
                      <p className="mt-1 text-sm text-white/80">
                        “Kalau aset ini turun 30–50%, aku tetap bisa tidur.”
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-semibold text-white/70">Kesalahan umum</p>
                      <p className="mt-1 text-sm text-white/80">
                        Masuk besar karena yakin “pasti naik”, lalu panik ketika turun.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stop loss konsep */}
                <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                  <h4 className="text-sm font-semibold text-white">2) Konsep stop loss (tanpa trading agresif)</h4>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">
                    Stop loss itu konsep “batas sakit”. Kamu menentukan sejak awal:{" "}
                    <span className="font-semibold text-white">kalau salah, aku keluar di titik X</span> supaya kerugian tidak melebar.
                  </p>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">
                    Untuk pemula, kamu bisa memaknai stop loss sebagai:
                    <span className="font-semibold text-white"> aturan disiplin</span> agar tidak menahan rugi tanpa batas.
                    Kamu tidak harus trading cepat—yang penting paham idenya.
                  </p>

                  <div className="mt-4 rounded-xl border border-[#f5c400]/20 bg-[#f5c400]/10 p-4">
                    <p className="text-xs font-semibold text-[#f5c400]">Kalimat kunci</p>
                    <p className="mt-1 text-sm text-white/85">
                      “Kalau rencana awalnya salah, aku tidak memaksa market untuk benar.”
                    </p>
                  </div>
                </div>

                {/* Diversifikasi */}
                <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                  <h4 className="text-sm font-semibold text-white">3) Diversifikasi yang masuk akal</h4>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">
                    Diversifikasi bukan berarti “beli 30 koin”. Untuk pemula, seringnya lebih masuk akal:
                    fokus pada sedikit aset yang lebih dikenal, dibanding kebanyakan aset kecil yang kamu nggak paham.
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-white/80">
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f5c400]" />
                      <span>
                        <span className="font-semibold text-white">Diversifikasi antar jenis</span>: misal mayor (lebih mapan) + porsi kecil eksperimen.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f5c400]" />
                      <span>
                        <span className="font-semibold text-white">Diversifikasi waktu</span>: beli bertahap (DCA) supaya tidak “all-in di puncak”.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* DCA vs Lump sum */}
                <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                  <h4 className="text-sm font-semibold text-white">4) DCA vs Lump Sum</h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-semibold text-white/70">DCA (bertahap)</p>
                      <p className="mt-1 text-sm text-white/80 leading-relaxed">
                        Cocok untuk pemula yang ingin mengurangi stres timing. Kamu beli dengan jadwal
                        tetap (misal mingguan/bulanan) dengan nominal kecil.
                      </p>
                      <p className="mt-2 text-xs text-white/60">
                        Kelebihan: lebih “tenang”. Kekurangan: kalau market naik terus, rata-rata harga bisa lebih tinggi.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-semibold text-white/70">Lump sum (sekali besar)</p>
                      <p className="mt-1 text-sm text-white/80 leading-relaxed">
                        Kamu masuk sekaligus. Bisa optimal kalau timing pas, tapi lebih berisiko secara emosi
                        karena kamu langsung “kena” volatilitas penuh.
                      </p>
                      <p className="mt-2 text-xs text-white/60">
                        Untuk pemula: biasanya lebih berat mentalnya.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Uang dingin */}
                <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                  <h4 className="text-sm font-semibold text-white">5) Aturan “uang dingin”</h4>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">
                    “Uang dingin” = uang yang <span className="font-semibold text-white">kalau hilang</span> tidak mengganggu
                    kebutuhan hidup: makan, sewa/cicilan, sekolah anak, dana darurat, kesehatan.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-semibold text-white/70">Tanda uang dingin</p>
                      <p className="mt-1 text-sm text-white/80">
                        Kamu tidak perlu tarik dalam waktu dekat.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-semibold text-white/70">Bukan uang dingin</p>
                      <p className="mt-1 text-sm text-white/80">
                        Uang belanja, bayar sekolah, dana darurat.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-semibold text-white/70">Efeknya</p>
                      <p className="mt-1 text-sm text-white/80">
                        Keputusan jadi lebih rasional, bukan panik.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#f5c400]/25 bg-[#f5c400]/10 p-5">
                <p className="text-sm font-semibold text-[#f5c400]">Reminder pemula</p>
                <p className="mt-2 text-sm text-white/85 leading-relaxed">
                  Manajemen risiko bukan soal “maksimalin profit”, tapi soal{" "}
                  <span className="font-semibold text-white">bertahan cukup lama</span> untuk belajar dan membaik.
                </p>
              </div>
            </section>

            {/* Skenario 1 juta */}
            <section
              id="skenario-1juta"
              className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold">Contoh Skenario Pemula: 1 Juta → Strategi Aman (Edukasi)</h3>
              <p className="mt-4 text-white/80 leading-relaxed">
                Ini <span className="font-semibold text-white">bukan saran finansial</span>. Ini contoh cara berpikir
                “aman dulu” agar kamu tidak all-in, tidak FOMO, dan punya struktur belajar.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-sm font-semibold text-white">Tujuan contoh ini:</p>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f5c400]" />
                    <span>Belajar mekanisme exchange, biaya, dan cara simpan aset.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f5c400]" />
                    <span>Mengalami volatilitas tanpa “trauma modal besar”.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f5c400]" />
                    <span>Membentuk kebiasaan disiplin (catat keputusan, cek risiko, bukan ikut grup).</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                  <p className="text-sm font-semibold text-[#f5c400]">Langkah A: pecah jadi 4 kali</p>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">
                    Alih-alih 1 juta langsung masuk, kamu bagi jadi 4 bagian (misal 250k x 4).
                    Ini meniru pola DCA dan mengurangi risiko beli di puncak.
                  </p>
                  <p className="mt-3 text-xs text-white/60">
                    Catatan: angka hanya contoh. Intinya adalah “bertahap”.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                  <p className="text-sm font-semibold text-[#f5c400]">Langkah B: fokus belajar, bukan kejar 10x</p>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">
                    Kamu pilih aset yang lebih dikenal untuk belajar dasar (misal aset mayor),
                    dan kalau pun mau “eksperimen”, porsinya kecil dan siap hilang.
                  </p>
                  <p className="mt-3 text-xs text-white/60">
                    Tujuan: paham dulu volatilitas & biaya.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-sm font-semibold text-white">Contoh struktur yang “lebih tenang”</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold text-white/70">70–90%</p>
                    <p className="mt-1 text-sm text-white/80">
                      Belajar aset mayor / yang kamu pahami risikonya lebih dulu.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold text-white/70">0–20%</p>
                    <p className="mt-1 text-sm text-white/80">
                      Eksperimen kecil (jika kamu benar-benar ingin), dengan red flags ketat.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold text-white/70">Sisa dana</p>
                    <p className="mt-1 text-sm text-white/80">
                      Tahan dulu untuk kesempatan atau sekadar menjaga emosi tetap dingin.
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/80 leading-relaxed">
                  Fokusnya bukan angka “pasti benar”, tapi pola pikir:{" "}
                  <span className="font-semibold text-white">pecah modal, kurangi stres, dan tingkatkan kualitas keputusan</span>.
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-[#f5c400]/25 bg-[#f5c400]/10 p-5">
                <p className="text-sm font-semibold text-[#f5c400]">Kebiasaan yang bikin pemula cepat naik level</p>
                <ul className="mt-3 space-y-2 text-sm text-white/85">
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f5c400]" />
                    <span>Tiap transaksi tulis alasan: “kenapa beli”, “risikonya apa”, “kapan keluar”.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f5c400]" />
                    <span>Hindari keputusan karena FOMO: kalau ketinggalan, ya ketinggalan.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f5c400]" />
                    <span>Utamakan keamanan akun: 2FA, anti-phishing, backup yang benar.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Checklist */}
            <section
              id="checklist"
              className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold">Checklist Anti-Babak Belur (Red Flags)</h3>
              <p className="mt-4 text-white/80 leading-relaxed">
                Pakai checklist ini sebelum tergoda “cuan cepat”. Semakin banyak yang kena,
                semakin besar kemungkinan kamu sedang diarahkan ke keputusan buruk.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                  <p className="text-sm font-semibold text-white">Tanda bahaya proyek</p>
                  <ul className="mt-3 space-y-2 text-sm text-white/80">
                    {[
                      "Tim anonim tanpa rekam jejak yang bisa diverifikasi",
                      "Janji profit tetap / “pasti naik” / “anti rugi”",
                      "Tokenomics tidak jelas (supply bisa dicetak tanpa batas)",
                      "Likuiditas tidak jelas atau tidak dikunci",
                      "Audit tidak jelas/asal tempel logo, atau tidak ada laporan detail",
                      "Website & dokumen penuh buzzword tapi minim fakta",
                    ].map((x) => (
                      <li key={x} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f5c400]" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                  <p className="text-sm font-semibold text-white">Tanda bahaya influencer/grup pompom</p>
                  <ul className="mt-3 space-y-2 text-sm text-white/80">
                    {[
                      "Narasi: “masuk sekarang atau nyesel seumur hidup”",
                      "Dilarang tanya risiko, yang boleh cuma ‘bullish’",
                      "Screenshot profit doang (nggak ada loss, nggak ada proses)",
                      "Admin mendorong leverage tanpa edukasi manajemen risiko",
                      "Ada tekanan setor cepat: “slot terbatas”, “private group premium”",
                      "Kalau harga turun, disalahkan kamu karena “tangan lemah”",
                    ].map((x) => (
                      <li key={x} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f5c400]" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-sm font-semibold text-white">Kalimat pelindung diri (pakai sebelum klik buy)</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {[
                    "“Aku paham risiko terburuknya?”",
                    "“Kalau ini turun 50%, aku masih aman?”",
                    "“Keputusan ini karena data atau karena FOMO?”",
                  ].map((x) => (
                    <div key={x} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-white/85">{x}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section
              id="faq"
              className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold">FAQ (Pemula) + Disclaimer</h3>
              <p className="mt-4 text-white/80 leading-relaxed">
                Jawaban singkat yang sering ditanya pemula. Kalau kamu masih bingung,
                lanjutkan ke halaman berikutnya atau tanya lewat bot.
              </p>

              <div className="mt-6 space-y-3">
                {faqs.map((item, idx) => (
                  <details
                    key={idx}
                    className="group rounded-2xl border border-white/10 bg-black/40 p-5"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-white">
                        {item.q}
                      </span>
                      <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 group-open:bg-white/10">
                        {/** Toggle label */}
                        <span className="group-open:hidden">Buka</span>
                        <span className="hidden group-open:inline">Tutup</span>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-white/80 leading-relaxed">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-[#f5c400]/25 bg-[#f5c400]/10 p-5">
                <p className="text-sm font-semibold text-[#f5c400]">Disclaimer</p>
                <p className="mt-2 text-sm text-white/85 leading-relaxed">
                  Konten ini bersifat edukasi umum dan tidak merupakan saran keuangan, saran investasi,
                  atau ajakan membeli/menjual aset tertentu. Crypto berisiko tinggi dan dapat menyebabkan
                  kerugian total. Lakukan riset mandiri, gunakan uang dingin, dan pertimbangkan konsultasi
                  dengan penasihat keuangan berlisensi jika dibutuhkan.
                </p>
              </div>
            </section>

            {/* Lanjutan */}
            <section
              id="lanjutan"
              className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold">Lanjut Belajar: Crypto vs Bank</h3>
              <p className="mt-4 text-white/80 leading-relaxed">
                Setelah paham risk vs reward, langkah berikutnya adalah memahami perbedaan filosofi
                crypto dibanding sistem perbankan: custody, settlement, jam operasional, dan peran pihak ketiga.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/crypto-vs-bank"
                  className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Buka halaman /crypto-vs-bank →
                </Link>
                <a
                  href="https://t.me/koinity_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black hover:bg-emerald-400"
                >
                  Tanya & gabung via Koinity Bot
                </a>
              </div>

              <p className="mt-4 text-xs text-white/60">
                CTA halus: kalau kamu ingin belajar bertahap dan rapi, kamu bisa masuk ekosistem Koinity via bot—tanpa hard sell,
                kamu tetap pegang kontrol keputusanmu.
              </p>
            </section>
          </div>

          {/* Sticky side helper */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-6 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h4 className="text-sm font-bold">Quick Checklist (Sebelum Masuk)</h4>
                <div className="mt-4 space-y-3 text-sm text-white/80">
                  {[
                    "Aku pakai uang dingin?",
                    "Aku paham risiko terburuknya?",
                    "Aku masuk bertahap (bukan all-in)?",
                    "Aku tahu cara amankan akun & seed phrase?",
                    "Aku tidak ikut grup pompom/influencer tanpa data?",
                  ].map((x) => (
                    <div key={x} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#f5c400]" />
                      <span>{x}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <a
                    href="https://t.me/koinity_bot"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-black hover:bg-emerald-400"
                  >
                    Masuk via Koinity Bot
                  </a>
                  <Link
                    href="/crypto-vs-bank"
                    className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Lanjut ke Crypto vs Bank →
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h4 className="text-sm font-bold">Catatan Keamanan Pemula</h4>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  {[
                    "Aktifkan 2FA dan simpan backup codes.",
                    "Waspadai link palsu (phishing) dan DM yang menawarkan “profit pasti”.",
                    "Jangan pernah bagikan seed phrase ke siapa pun.",
                    "Mulai dari nominal kecil sambil belajar biaya & mekanisme.",
                  ].map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f5c400]" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer nav */}
        <footer className="relative mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Belajar rapi, pelan tapi aman.</p>
              <p className="mt-1 text-sm text-white/70">
                Kalau kamu ingin lanjut, mulai dari perbandingan sistem:{" "}
                <span className="text-white">Crypto vs Bank</span>.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href="/crypto-vs-bank"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
              >
                /crypto-vs-bank →
              </Link>
              <a
                href="https://t.me/koinity_bot"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-black hover:bg-emerald-400"
              >
                Gabung via Koinity Bot
              </a>
            </div>
          </div>

          <div className="mt-6 text-xs text-white/55 leading-relaxed">
            © {new Date().getFullYear()} Koinity. Konten edukasi — bukan nasihat finansial.
          </div>
        </footer>
      </div>
    </main>
  );
}
