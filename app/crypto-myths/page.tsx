// app/crypto-myths/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "15 Mitos Crypto yang Paling Sering Dipercaya (Versi Pemula) | Koinity",
  description:
    "Bongkar 15 mitos crypto untuk pemula: kenapa orang percaya, fakta versi pemula, cara bersikap. Plus anti-scam, checklist keamanan, FAQ, dan CTA ke Koinity.",
};

type Myth = {
  id: string;
  title: string;
  why: string;
  facts: string[];
  stance: string[];
};

const myths: Myth[] = [
  {
    id: "myth-1",
    title: "“Crypto pasti scam.”",
    why: "Karena banyak kasus penipuan mengatasnamakan crypto (investasi bodong, robot trading, airdrop palsu). Orang lalu menggeneralisasi: kalau ada kata “crypto”, pasti penipuan.",
    facts: [
      "Crypto itu teknologi & ekosistem aset digital. Di dalamnya ada proyek bagus, ada juga yang jelek—seperti internet: ada website bermanfaat, ada juga yang menipu.",
      "Yang sering scam biasanya bukan “Bitcoin/Ethereum”-nya, tapi pihak/produk yang mengatasnamakan crypto untuk menarik uang korban.",
      "Kunci pemula: fokus pada keamanan & proses, bukan janji cuan.",
    ],
    stance: [
      "Pisahkan ‘teknologi/asset’ vs ‘produk investasi yang ditawarkan orang’.",
      "Verifikasi sumber, cek platform resmi, dan hindari janji profit tetap/cepat.",
      "Mulai kecil dan pelan—anggap belajar dulu, bukan buru-buru cuan.",
    ],
  },
  {
    id: "myth-2",
    title: "“Crypto itu judi.”",
    why: "Karena banyak yang masuk crypto hanya untuk “tebak-tebakan harga” dan sering lihat konten pump-dump, FOMO, atau leverage ekstrem.",
    facts: [
      "Ada cara berjudi di crypto (overtrade, leverage tinggi, ikut hype), tapi crypto tidak otomatis = judi.",
      "Crypto bisa dipakai untuk belajar teknologi, diversifikasi, transfer nilai, dan memakai stablecoin untuk kebutuhan tertentu.",
      "Perilaku yang bikin ‘judi’ adalah gaya mainnya, bukan objeknya semata.",
    ],
    stance: [
      "Kalau kamu belum paham, hindari leverage dan trading agresif.",
      "Pakai pendekatan edukatif: DCA kecil, tujuan jelas, aturan uang dingin.",
      "Tulis rencana sederhana: kapan beli, berapa, dan kapan berhenti.",
    ],
  },
  {
    id: "myth-3",
    title: "“Bitcoin cuma buat kriminal.”",
    why: "Berita awal sering menyorot kasus penggunaan ilegal. Narasi itu melekat, padahal ekosistem sudah berkembang luas.",
    facts: [
      "Teknologi apa pun bisa disalahgunakan—uang tunai juga sering dipakai untuk aktivitas ilegal.",
      "Transaksi on-chain justru meninggalkan jejak publik (banyak kasus kejahatan terungkap karena jejak transaksi).",
      "Mayoritas penggunaan crypto modern bersifat legal: investasi, pembayaran tertentu, remitansi, stablecoin, dll.",
    ],
    stance: [
      "Gunakan exchange/wallet resmi dan patuhi aturan negara setempat.",
      "Jangan tergoda “cara cepat” yang meminta kamu menyamarkan dana.",
      "Jika ada yang ngajak ‘titip rekening/akun’, itu red flag besar.",
    ],
  },
  {
    id: "myth-4",
    title: "“Harus kaya dulu baru bisa mulai.”",
    why: "Orang melihat harga 1 BTC besar lalu mengira harus beli 1 koin penuh.",
    facts: [
      "Aset crypto bisa dibeli pecahan kecil (fractional).",
      "Yang penting untuk pemula adalah disiplin & manajemen risiko, bukan modal besar.",
      "Mulai kecil sering lebih sehat: belajar tanpa tekanan emosi.",
    ],
    stance: [
      "Mulai dari nominal yang kalau hilang tidak mengganggu hidup (uang dingin).",
      "Utamakan belajar proses: deposit, beli, withdraw, keamanan.",
      "Fokus konsistensi, bukan ‘sekali gebuk’.",
    ],
  },
  {
    id: "myth-5",
    title: "“Harus jago coding dulu.”",
    why: "Crypto identik dengan teknologi, jadi orang mengira semua pengguna harus teknikal.",
    facts: [
      "Kamu tidak perlu coding untuk memahami dasar: apa itu blockchain, wallet, seed phrase, dan cara transaksi.",
      "Coding berguna jika kamu mau membuat aplikasi, audit, atau eksplorasi teknis mendalam—tapi bukan syarat pemula.",
      "Banyak konsep bisa dipahami dengan analogi sederhana.",
    ],
    stance: [
      "Pelajari istilah inti: public address, private key/seed phrase, gas fee, network.",
      "Gunakan aplikasi resmi yang UX-nya jelas.",
      "Naik level pelan: paham dulu ‘cara aman’, baru ‘cara canggih’.",
    ],
  },
  {
    id: "myth-6",
    title: "“Kalau gak trading tiap hari, gak bisa untung.”",
    why: "Konten media sosial sering menonjolkan ‘trader harian’ dan hasil ekstrem.",
    facts: [
      "Banyak orang memilih strategi pasif/berkala (mis. DCA) untuk mengurangi stres.",
      "Trading aktif butuh skill, waktu, dan kontrol emosi—bukan cocok untuk semua pemula.",
      "Yang sering ‘menghabiskan saldo’ justru overtrading dan biaya transaksi yang tidak disadari.",
    ],
    stance: [
      "Kalau kamu sibuk, pilih gaya yang realistis: DCA kecil + belajar.",
      "Jika trading, batasi frekuensi, catat keputusan, dan hindari FOMO.",
      "Ingat: tidak melakukan apa-apa sering lebih baik daripada salah langkah.",
    ],
  },
  {
    id: "myth-7",
    title: "“Semua koin selain Bitcoin pasti jelek.”",
    why: "Bitcoin paling terkenal dan dianggap paling ‘mapan’, sehingga yang lain dicap tidak penting.",
    facts: [
      "Ada proyek lain yang punya fungsi berbeda (smart contract, stablecoin, infra, dsb).",
      "Namun benar juga: banyak altcoin tidak jelas atau hanya hype.",
      "Pemula perlu filter: utilitas, reputasi, transparansi, dan risiko.",
    ],
    stance: [
      "Mulai dari aset besar/lebih mapan jika kamu masih pemula.",
      "Kalau mau eksplor altcoin, kecilkan porsi dan riset lebih ketat.",
      "Waspada proyek yang “tiba-tiba viral” tanpa dasar jelas.",
    ],
  },
  {
    id: "myth-8",
    title: "“Kalau exchange besar, pasti 100% aman.”",
    why: "Brand besar memberi rasa aman. Orang lalu lalai soal keamanan akun dan risiko pihak ketiga.",
    facts: [
      "Exchange besar biasanya lebih matang secara keamanan, tapi tetap ada risiko: akun dibajak, SIM-swap, phishing, atau kebijakan platform.",
      "Custodial = kamu menitipkan aset di pihak ketiga. Kamu punya akses akun, tapi kontrol ultimate ada pada platform.",
      "Keamanan tetap tanggung jawab pengguna (2FA, anti-phishing, hygiene).",
    ],
    stance: [
      "Aktifkan 2FA dan amankan email/nomor HP.",
      "Pisahkan dana: sebagian untuk transaksi di exchange, sisanya simpan aman (sesuai kebutuhan).",
      "Jangan klik link login dari chat/grup, selalu ketik alamat resmi.",
    ],
  },
  {
    id: "myth-9",
    title: "“Self-custody selalu lebih baik untuk semua orang.”",
    why: "Narasi “not your keys, not your coins” benar secara prinsip, tapi praktiknya bisa berisiko jika pemula ceroboh.",
    facts: [
      "Self-custody memberi kontrol penuh, tapi juga tanggung jawab penuh (seed phrase hilang = aset bisa tidak kembali).",
      "Custodial lebih mudah, tetapi kamu tergantung pada platform.",
      "Yang ‘lebih baik’ tergantung profil: kemampuan, kedisiplinan, dan tujuan.",
    ],
    stance: [
      "Pemula boleh mulai custodial untuk belajar, sambil pelan-pelan memahami self-custody.",
      "Jika pindah ke self-custody, lakukan bertahap dan latihan transaksi kecil dulu.",
      "Buat SOP pribadi untuk seed phrase dan backup.",
    ],
  },
  {
    id: "myth-10",
    title: "“Stablecoin itu pasti aman karena nilainya ‘stabil’.”",
    why: "Namanya ‘stable’ membuat orang mengira tanpa risiko.",
    facts: [
      "Stablecoin biasanya mengacu ke mata uang (mis. USD), sehingga volatilitas harga lebih rendah, tapi tetap ada risiko: penerbit, jaringan, smart contract, dan platform.",
      "Ada beberapa model stablecoin (berbeda mekanisme), sehingga profil risikonya tidak sama.",
      "Stabil di harga ≠ bebas risiko operasional/keamanan.",
    ],
    stance: [
      "Gunakan stablecoin untuk kebutuhan spesifik (mis. parkir nilai sementara), bukan untuk “lupa risiko”.",
      "Pilih stablecoin yang reputasinya lebih kuat dan pahami jaringan yang kamu pakai.",
      "Selalu cek alamat & network sebelum transfer.",
    ],
  },
  {
    id: "myth-11",
    title: "“Kalau ikut influencer, pasti cuan.”",
    why: "Banyak konten menampilkan hasil fantastis dan “signal” seolah-olah selalu benar.",
    facts: [
      "Tidak ada yang bisa menjamin pasar. Banyak yang hanya memonetisasi perhatian (views, referral, paid promo).",
      "Bias: orang pamer profit, jarang pamer loss.",
      "Follower sering masuk telat setelah harga naik (exit liquidity).",
    ],
    stance: [
      "Jadikan influencer sebagai sumber ide, bukan ‘komando beli’.",
      "Cek konflik kepentingan: apakah mereka punya referral/paid promo?",
      "Kalau kamu gak paham kenapa beli, lebih baik jangan beli.",
    ],
  },
  {
    id: "myth-12",
    title: "“Kalau rugi, tinggal averaging tanpa batas.”",
    why: "Orang percaya harga ‘pasti balik’ dan menganggap tambah modal selalu solusi.",
    facts: [
      "Averaging bisa membantu jika asetnya berkualitas dan rencana kamu jelas, tapi bisa jadi jebakan kalau asetnya buruk.",
      "Menambah posisi tanpa batas bisa memperbesar kerugian dan menguras dana.",
      "Rencana risk management harus punya batas.",
    ],
    stance: [
      "Tetapkan batas risiko (berapa % uang dingin yang siap dipakai).",
      "Averaging hanya untuk aset yang kamu pahami dan masih sesuai tesis.",
      "Kalau sudah di luar rencana, berhenti dan evaluasi.",
    ],
  },
  {
    id: "myth-13",
    title: "“Crypto itu cepat kaya.”",
    why: "Cerita sukses viral lebih menarik daripada proses panjang yang membosankan.",
    facts: [
      "Crypto bisa memberi peluang, tapi juga bisa menghancurkan finansial kalau tanpa kontrol.",
      "Yang lebih realistis: crypto sebagai skill + alat diversifikasi, bukan tombol instan.",
      "Keuntungan besar biasanya datang dengan risiko besar.",
    ],
    stance: [
      "Turunkan ekspektasi, naikkan kualitas proses.",
      "Buat target belajar: keamanan, riset dasar, kebiasaan disiplin.",
      "Kalau ada yang menjanjikan ‘pasti kaya’, anggap itu alarm.",
    ],
  },
  {
    id: "myth-14",
    title: "“Kalau fee mahal, berarti pasti penipuan.”",
    why: "Pemula kaget melihat fee/gas di beberapa jaringan, lalu mengira ada yang ‘makan uang’.",
    facts: [
      "Biaya transaksi berbeda-beda tergantung jaringan dan kondisi kepadatan.",
      "Ada biaya exchange, ada biaya jaringan (network fee). Itu konsep yang berbeda.",
      "Fee bukan indikator scam, tapi scam sering memanfaatkan kebingungan tentang fee.",
    ],
    stance: [
      "Bedakan: fee exchange vs fee jaringan.",
      "Cek estimasi fee sebelum kirim, dan pilih network yang sesuai kebutuhan.",
      "Jangan percaya “admin” yang minta fee tambahan via transfer pribadi.",
    ],
  },
  {
    id: "myth-15",
    title: "“Kalau sudah untung, jangan ambil profit—tahan selamanya.”",
    why: "Komunitas sering mendorong “diamond hands” tanpa konteks tujuan pribadi.",
    facts: [
      "Tidak ada strategi universal. Keputusan harus sesuai tujuan, horizon waktu, dan toleransi risiko.",
      "Mengambil profit bukan dosa; itu bagian dari manajemen risiko.",
      "Tanpa rencana exit, kamu mudah terjebak euforia dan panik saat turun.",
    ],
    stance: [
      "Tentukan tujuan: jangka pendek / menengah / panjang.",
      "Pertimbangkan ambil sebagian profit saat sesuai rencana, bukan karena emosi.",
      "Buat aturan sederhana: mis. rebalancing berkala (bukan FOMO).",
    ],
  },
];

const faqs = [
  {
    q: "Apakah crypto legal di Indonesia?",
    a: "Aturan bisa berubah. Secara umum, aset crypto diperlakukan sebagai aset yang bisa diperdagangkan lewat platform yang terdaftar/resmi. Untuk kepastian terkini, selalu rujuk pengumuman regulator dan gunakan platform resmi.",
  },
  {
    q: "Apa bedanya coin dan token?",
    a: "Sederhananya: coin biasanya aset native dari sebuah jaringan (punya blockchain sendiri). Token biasanya dibuat di atas jaringan lain. Untuk pemula, fokus ke fungsi dan risikonya dulu.",
  },
  {
    q: "Kalau pemula, lebih baik mulai dari apa?",
    a: "Mulai dari belajar konsep dasar + keamanan. Jika mau mencoba, mulai kecil, hindari leverage, dan pilih aset yang lebih mapan serta mudah dipahami.",
  },
  {
    q: "Apakah harus punya wallet non-custodial?",
    a: "Tidak harus di awal. Custodial (di exchange) lebih mudah, tapi kamu bergantung pada platform. Non-custodial memberi kontrol, tapi tanggung jawab lebih besar. Pilih sesuai kemampuan.",
  },
  {
    q: "Apa itu seed phrase, dan kenapa penting?",
    a: "Seed phrase adalah kunci pemulihan wallet. Siapa pun yang punya seed phrase bisa menguasai aset. Karena itu, seed phrase tidak boleh dibagikan dan harus dibackup dengan aman.",
  },
  {
    q: "Apakah stablecoin 100% aman?",
    a: "Tidak. Harga bisa lebih stabil, tapi tetap ada risiko penerbit, platform, jaringan, dan smart contract. Tetap perlu manajemen risiko dan kebiasaan aman.",
  },
  {
    q: "Bagaimana cara menghindari scam yang paling efektif?",
    a: "Jangan klik link sembarangan, jangan percaya “admin” yang DM duluan, gunakan 2FA, verifikasi domain resmi, dan biasakan transaksi uji coba kecil sebelum transfer besar.",
  },
  {
    q: "Kenapa ada orang yang rugi besar di crypto?",
    a: "Umumnya karena: masuk karena FOMO, pakai leverage, all-in, ikut proyek tidak jelas, tidak punya rencana, dan lalai keamanan.",
  },
  {
    q: "Apakah saya perlu hardware wallet?",
    a: "Biasanya relevan saat nilai aset sudah cukup besar untuk kamu, atau kamu ingin menyimpan jangka panjang dengan kontrol sendiri. Untuk pemula, yang utama adalah kebiasaan aman dulu.",
  },
  {
    q: "Boleh gak ikut sinyal dari grup?",
    a: "Boleh sebagai referensi belajar, tapi jangan jadi keputusan utama. Kalau kamu tidak paham alasan beli/jual, risikonya besar. Utamakan edukasi dan rencana pribadi.",
  },
];

function clsx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-6">
      {kicker ? (
        <div className="mb-3">
          <Badge>{kicker}</Badge>
        </div>
      ) : null}
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {desc ? (
        <p className="mt-2 text-white/70 leading-relaxed">{desc}</p>
      ) : null}
    </div>
  );
}

function Divider() {
  return <div className="my-10 h-px w-full bg-white/10" />;
}

function MiniCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="mt-2 text-sm text-white/70 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function ChecklistItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f5c400]/15 text-[#f5c400]">
        ✓
      </span>
      <span className="text-white/75 leading-relaxed">{children}</span>
    </li>
  );
}

function ScamsTable() {
  const rows = [
    {
      modus: "Phishing (link login palsu)",
      ciri: "Link mirip domain asli, DM ‘warning akun’, halaman login terlihat “persis”.",
      aman: "Ketik alamat manual, bookmark domain resmi, aktifkan anti-phishing code (jika ada), cek URL + sertifikat.",
    },
    {
      modus: "Airdrop palsu / claim token",
      ciri: "Disuruh connect wallet lalu ‘approve’, atau diminta seed phrase/OTP.",
      aman: "Jangan pernah input seed phrase. Jangan approve random. Gunakan wallet terpisah untuk eksperimen.",
    },
    {
      modus: "Investasi bodong (profit tetap)",
      ciri: "Janji “fix” per hari/minggu, ada pressure ‘slot terbatas’, minta transfer ke rekening pribadi.",
      aman: "Anggap scam. Hindari. Tidak ada profit tetap tanpa risiko.",
    },
    {
      modus: "Robot trading palsu",
      ciri: "Pamer hasil, minta deposit, dashboard profit “selalu hijau”.",
      aman: "Cek transparansi & izin. Kalau tidak jelas, jangan setor dana.",
    },
    {
      modus: "Impersonation (ngaku admin/CS)",
      ciri: "Akun palsu DM duluan, minta OTP/QR/seed phrase, minta “verifikasi”.",
      aman: "Admin resmi tidak DM duluan minta data rahasia. Hubungi CS via kanal resmi.",
    },
    {
      modus: "“Recovery service” / bantuan balik modal",
      ciri: "Mengaku bisa balikin dana yang hilang asal bayar fee.",
      aman: "Hati-hati penipuan lanjutan. Jangan bayar fee ke pihak random.",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-b border-white/10 bg-black/30">
        <div className="p-4 text-sm font-semibold text-white md:col-span-1">
          Modus
        </div>
        <div className="p-4 text-sm font-semibold text-white md:col-span-2">
          Ciri umum
        </div>
        <div className="p-4 text-sm font-semibold text-white md:col-span-1">
          Cara aman
        </div>
      </div>

      {rows.map((r, idx) => (
        <div
          key={r.modus}
          className={clsx(
            "grid grid-cols-1 md:grid-cols-4 gap-0",
            idx !== rows.length - 1 && "border-b border-white/10"
          )}
        >
          <div className="p-4 md:col-span-1">
            <div className="text-white font-medium">{r.modus}</div>
          </div>
          <div className="p-4 md:col-span-2">
            <div className="text-white/75 text-sm leading-relaxed">{r.ciri}</div>
          </div>
          <div className="p-4 md:col-span-1">
            <div className="text-white/75 text-sm leading-relaxed">{r.aman}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AnchorLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
    >
      <span className="font-medium">{label}</span>
      <span className="text-[#f5c400] group-hover:translate-x-0.5 transition">
        →
      </span>
    </a>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Subtle grid/glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(245,196,0,0.18),transparent_40%),radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.06),transparent_45%),radial-gradient(circle_at_60%_80%,rgba(34,197,94,0.10),transparent_40%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex flex-wrap gap-2 mb-4">
              <Badge>Untuk pemula</Badge>
              <Badge>Mitos vs Fakta</Badge>
              <Badge>Anti-scam</Badge>
              <Badge>Checklist keamanan</Badge>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              <span className="text-white">Crypto itu</span>{" "}
              <span className="text-[#f5c400]">bukan</span>{" "}
              <span className="text-white">sihir.</span>
              <br className="hidden md:block" />
              Ini{" "}
              <span className="text-[#f5c400]">15 mitos</span>{" "}
              <span className="text-white">yang paling sering bikin pemula salah langkah.</span>
            </h1>

            <p className="mt-4 text-white/75 leading-relaxed">
              Halaman ini membantu kamu membedakan <span className="text-white">narasi</span> vs{" "}
              <span className="text-white">realita</span>—tanpa angka palsu, tanpa hype, dan
              fokus ke langkah yang aman. Setiap mitos punya:{" "}
              <span className="text-white">kenapa orang percaya</span>,{" "}
              <span className="text-white">fakta versi pemula</span>, dan{" "}
              <span className="text-white">cara bersikap</span>.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#toc"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Lihat daftar isi
              </a>

              <Link
                href="/crypto-and-koinity"
                className="inline-flex items-center justify-center rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black hover:bg-green-400 transition"
              >
                Mulai dari “Crypto & Koinity” →
              </Link>

              <a
                href="https://t.me/koinity_bot"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-3 text-sm font-semibold text-green-300 hover:bg-green-500/15 transition"
              >
                Buka Koinity Bot (Telegram)
              </a>
            </div>

            <p className="mt-3 text-xs text-white/55">
              Catatan: Ini konten edukasi umum, bukan ajakan beli/jual dan bukan nasihat finansial.
            </p>
          </div>

          {/* Right card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">
                    Ringkasan 60 Detik
                  </div>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    Kalau kamu hanya ingat 5 hal ini, peluang kamu selamat dari blunder pemula naik drastis.
                  </p>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5c400]/15 text-[#f5c400] font-bold">
                  !
                </span>
              </div>

              <ul className="mt-4 space-y-3 text-sm text-white/75">
                <li className="flex gap-3">
                  <span className="text-[#f5c400]">1)</span>
                  <span>
                    <span className="text-white font-medium">Jangan percaya DM “admin”.</span>{" "}
                    Verifikasi lewat kanal resmi.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f5c400]">2)</span>
                  <span>
                    <span className="text-white font-medium">Seed phrase = kunci utama.</span>{" "}
                    Tidak pernah diketik ke situs, tidak dibagikan ke siapa pun.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f5c400]">3)</span>
                  <span>
                    <span className="text-white font-medium">Mulai kecil.</span>{" "}
                    Belajar proses lebih penting daripada “tebak harga”.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f5c400]">4)</span>
                  <span>
                    <span className="text-white font-medium">Hindari leverage</span>{" "}
                    sampai benar-benar paham.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f5c400]">5)</span>
                  <span>
                    <span className="text-white font-medium">Checklist keamanan dulu,</span>{" "}
                    baru eksplorasi.
                  </span>
                </li>
              </ul>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="#anti-scam"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  Anti-scam cepat →
                </a>
                <a
                  href="#security"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  Checklist keamanan →
                </a>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* TOC */}
        <section id="toc" className="scroll-mt-24">
          <SectionTitle
            kicker="Navigasi"
            title="Table of Contents"
            desc="Pilih bagian yang kamu butuhkan dulu. Semua section dibuat untuk pemula dan fokus ke cara berpikir yang aman."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <AnchorLink href="#myths" label="15 Mitos Crypto (lengkap)" />
            <AnchorLink href="#anti-scam" label="Anti-Scam: Modus Populer" />
            <AnchorLink href="#security" label="Checklist Keamanan" />
            <AnchorLink href="#faq" label="FAQ (10+)" />
            <AnchorLink href="#next" label="Langkah Berikutnya" />
            <AnchorLink href="#disclaimer" label="Disclaimer" />
          </div>
        </section>

        <Divider />

        {/* 15 MYTHS */}
        <section id="myths" className="scroll-mt-24">
          <SectionTitle
            kicker="Mitos vs Fakta"
            title="15 Mitos Crypto yang Paling Sering Menjebak Pemula"
            desc="Format tiap mitos: kenapa orang percaya → fakta versi pemula → cara bersikap. Baca pelan, ambil intinya, dan terapkan ke kebiasaan kamu."
          />

          <div className="space-y-4">
            {myths.map((m, idx) => (
              <div
                key={m.id}
                id={m.id}
                className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5c400]/15 text-[#f5c400] font-bold">
                      {idx + 1}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      {m.title}
                    </h3>
                  </div>
                  <a
                    href="#toc"
                    className="text-sm text-white/60 hover:text-white transition"
                  >
                    ↑ kembali ke TOC
                  </a>
                </div>

                <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <MiniCard title="Kenapa orang percaya?">{m.why}</MiniCard>

                  <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                    <div className="text-sm font-semibold text-white">
                      Fakta versi pemula
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-white/75">
                      {m.facts.map((f, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-[#f5c400]">•</span>
                          <span className="leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                    <div className="text-sm font-semibold text-white">
                      Cara bersikap (praktis)
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-white/75">
                      {m.stance.map((s, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-green-300">•</span>
                          <span className="leading-relaxed">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ANTI-SCAM */}
        <section id="anti-scam" className="scroll-mt-24">
          <SectionTitle
            kicker="Anti-scam"
            title="Modus Penipuan Populer di Crypto (yang sering kena pemula)"
            desc="Penipu memanfaatkan kebingungan pemula: istilah teknis, rasa takut, dan FOMO. Gunakan tabel ini sebagai “filter cepat” sebelum kamu klik apa pun."
          />

          <ScamsTable />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <MiniCard title="Kalimat jebakan yang sering dipakai penipu">
              <ul className="mt-1 space-y-2">
                <li>
                  <span className="text-white">“Akun kamu bermasalah, klik link ini sekarang.”</span>{" "}
                  <span className="text-white/60">(panic)</span>
                </li>
                <li>
                  <span className="text-white">“Klaim airdrop, tinggal connect wallet.”</span>{" "}
                  <span className="text-white/60">(curiosity)</span>
                </li>
                <li>
                  <span className="text-white">“Profit fix harian, aman, sudah terbukti.”</span>{" "}
                  <span className="text-white/60">(greed)</span>
                </li>
                <li>
                  <span className="text-white">“Admin/CS, kirim OTP biar dibantu.”</span>{" "}
                  <span className="text-white/60">(authority)</span>
                </li>
              </ul>
            </MiniCard>

            <MiniCard title="Aturan emas anti-scam (ingat ini)">
              <ul className="mt-1 space-y-2">
                <li>
                  <span className="text-[#f5c400] font-semibold">1)</span>{" "}
                  <span className="text-white">Jangan pernah bagikan seed phrase / OTP.</span>
                </li>
                <li>
                  <span className="text-[#f5c400] font-semibold">2)</span>{" "}
                  <span className="text-white">Jangan login lewat link dari chat.</span>{" "}
                  Ketik domain sendiri.
                </li>
                <li>
                  <span className="text-[#f5c400] font-semibold">3)</span>{" "}
                  <span className="text-white">Jika ditekan buru-buru, stop.</span>{" "}
                  Tekanan waktu = red flag.
                </li>
                <li>
                  <span className="text-[#f5c400] font-semibold">4)</span>{" "}
                  <span className="text-white">Transaksi uji coba kecil dulu.</span>{" "}
                  Baru naikkan nominal.
                </li>
              </ul>
            </MiniCard>
          </div>
        </section>

        <Divider />

        {/* SECURITY CHECKLIST */}
        <section id="security" className="scroll-mt-24">
          <SectionTitle
            kicker="Keamanan"
            title="Checklist Keamanan untuk Pemula (praktis, bisa langsung dipakai)"
            desc="Tujuan checklist ini bukan bikin kamu paranoid—tapi bikin kamu punya kebiasaan aman. Crypto itu unforgiving: salah alamat / salah klik bisa susah dibalik."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
              <div className="text-sm font-semibold text-white">
                Checklist inti (wajib)
              </div>
              <ul className="mt-4 space-y-4">
                <ChecklistItem>
                  <span className="text-white font-medium">Aktifkan 2FA</span>{" "}
                  (lebih baik aplikasi authenticator). Jangan bergantung ke SMS saja jika bisa.
                </ChecklistItem>
                <ChecklistItem>
                  <span className="text-white font-medium">Amankan email utama</span>{" "}
                  (password kuat + 2FA). Email biasanya “kunci reset” akun.
                </ChecklistItem>
                <ChecklistItem>
                  <span className="text-white font-medium">Seed phrase ditulis offline</span>{" "}
                  (kertas/metal backup). Jangan screenshot, jangan simpan di chat, jangan di cloud.
                </ChecklistItem>
                <ChecklistItem>
                  <span className="text-white font-medium">Bookmark alamat resmi</span>{" "}
                  exchange/wallet. Hindari link dari komentar/DM.
                </ChecklistItem>
                <ChecklistItem>
                  <span className="text-white font-medium">Cek network & alamat</span>{" "}
                  sebelum transfer. Salah network bisa bikin dana nyangkut/hilang.
                </ChecklistItem>
                <ChecklistItem>
                  <span className="text-white font-medium">Uji coba transfer kecil dulu</span>{" "}
                  untuk alamat baru. Setelah aman, baru kirim nominal besar.
                </ChecklistItem>
                <ChecklistItem>
                  <span className="text-white font-medium">Pisahkan “wallet eksperimen”</span>{" "}
                  untuk connect ke website/airdrop. Jangan pakai wallet simpanan utama.
                </ChecklistItem>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
              <div className="text-sm font-semibold text-white">
                Kapan perlu hardware wallet?
              </div>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">
                Hardware wallet umumnya mulai relevan saat:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                <li className="flex gap-3">
                  <span className="text-[#f5c400]">•</span>
                  <span>
                    Kamu menyimpan aset{" "}
                    <span className="text-white font-medium">jangka panjang</span>{" "}
                    dan ingin kontrol sendiri.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f5c400]">•</span>
                  <span>
                    Nilai aset sudah “cukup besar” menurut kamu, sehingga{" "}
                    <span className="text-white font-medium">biaya hardware</span>{" "}
                    terasa masuk akal sebagai proteksi.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f5c400]">•</span>
                  <span>
                    Kamu sering pakai perangkat umum / sering install macam-macam dan ingin isolasi kunci.
                  </span>
                </li>
              </ul>

              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold text-white">Reminder</div>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  Hardware wallet tetap butuh seed phrase yang aman. Hardware bukan “anti semua masalah” kalau seed phrase bocor.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* NEXT STEPS / CTA */}
        <section id="next" className="scroll-mt-24">
          <SectionTitle
            kicker="Langkah berikutnya"
            title="Mau belajar lebih terstruktur?"
            desc="Kalau kamu sudah paham mitos & keamanan, langkah berikutnya adalah bikin rute belajar yang rapi—tanpa kebanyakan istilah, tanpa panik."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-white font-semibold">Saran rute (ringkas)</div>
              <ol className="mt-3 space-y-2 text-sm text-white/75">
                <li className="flex gap-3">
                  <span className="text-[#f5c400] font-semibold">1)</span>
                  <span>
                    Baca <span className="text-white font-medium">konsep dasar</span> (blockchain, wallet, stablecoin).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f5c400] font-semibold">2)</span>
                  <span>
                    Terapkan <span className="text-white font-medium">checklist keamanan</span> (2FA, seed phrase, domain resmi).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f5c400] font-semibold">3)</span>
                  <span>
                    Coba transaksi kecil dan pahami <span className="text-white font-medium">network</span>.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f5c400] font-semibold">4)</span>
                  <span>
                    Baru setelah itu: pikirkan strategi sederhana (mis. DCA kecil) sesuai profil risiko kamu.
                  </span>
                </li>
              </ol>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-black/40 p-6">
              <div className="text-white font-semibold">Gabung komunitas Koinity</div>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Lanjutkan ke halaman yang menjelaskan cara belajar crypto secara tertib dan bagaimana Koinity
                menempatkan edukasi & keamanan sebagai prioritas.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/crypto-and-koinity"
                  className="inline-flex items-center justify-center rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black hover:bg-green-400 transition"
                >
                  Baca: Crypto & Koinity →
                </Link>
                <a
                  href="https://t.me/koinity_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-3 text-sm font-semibold text-green-300 hover:bg-green-500/15 transition"
                >
                  Buka Koinity Bot (Telegram)
                </a>
              </div>
              <p className="mt-3 text-xs text-white/55">
                Tip: Kalau kamu masih ragu, mulai dari pertanyaan paling dasar di bot dulu.
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24">
          <SectionTitle
            kicker="FAQ"
            title="Pertanyaan yang Sering Ditanyakan Pemula"
            desc="Jawaban singkat, jelas, dan fokus ke kebiasaan aman."
          />

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 open:bg-white/10 transition"
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-white font-semibold">{f.q}</div>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#f5c400]/15 text-[#f5c400] group-open:rotate-45 transition">
                      +
                    </span>
                  </div>
                </summary>
                <div className="mt-3 text-sm text-white/75 leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        <Divider />

        {/* DISCLAIMER */}
        <section id="disclaimer" className="scroll-mt-24">
          <SectionTitle
            kicker="Disclaimer"
            title="Penting dibaca sebelum kamu ambil keputusan apa pun"
            desc="Crypto punya risiko. Tujuan halaman ini adalah edukasi, bukan memerintah kamu melakukan transaksi."
          />

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <ul className="space-y-3 text-sm text-white/75 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#f5c400]">•</span>
                <span>
                  Konten ini bersifat{" "}
                  <span className="text-white font-medium">edukasi umum</span> dan tidak
                  merupakan nasihat finansial, hukum, atau pajak.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#f5c400]">•</span>
                <span>
                  Semua keputusan transaksi adalah tanggung jawab kamu.{" "}
                  <span className="text-white font-medium">Risiko kehilangan dana</span>{" "}
                  selalu ada.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#f5c400]">•</span>
                <span>
                  Selalu gunakan platform resmi, cek domain, dan jangan bagikan data rahasia (seed phrase/OTP).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#f5c400]">•</span>
                <span>
                  Jika kamu merasa tertekan untuk “cepat masuk”, itu tanda untuk{" "}
                  <span className="text-white font-medium">berhenti</span> dan evaluasi.
                </span>
              </li>
            </ul>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#toc"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Kembali ke TOC
              </a>
              <Link
                href="/crypto-and-koinity"
                className="inline-flex items-center justify-center rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black hover:bg-green-400 transition"
              >
                Lanjut: Crypto & Koinity →
              </Link>
              <a
                href="https://t.me/koinity_bot"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-3 text-sm font-semibold text-green-300 hover:bg-green-500/15 transition"
              >
                Telegram: @koinity_bot
              </a>
            </div>
          </div>
        </section>

        <footer className="mt-12 pb-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Koinity — Edukasi crypto untuk pemula, fokus keamanan & kebiasaan yang benar.
        </footer>
      </div>
    </main>
  );
}
