import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-2xl border bg-white shadow-sm">
              <span className="text-sm font-black">K</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-tight">Koinity</div>
              <div className="text-[11px] text-neutral-500">VIP access & membership</div>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <a
              href="#benefits"
              className="hidden rounded-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 md:inline-flex"
            >
              Benefit
            </a>
            <a
              href="#how"
              className="hidden rounded-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 md:inline-flex"
            >
              Cara Kerja
            </a>
            <a
              href="#faq"
              className="hidden rounded-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 md:inline-flex"
            >
              FAQ
            </a>

            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-neutral-50"
            >
              Lihat Paket
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-neutral-100 blur-3xl" />
          <div className="absolute -bottom-24 left-1/4 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-neutral-100 blur-3xl" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-neutral-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Pembayaran otomatis • Akses instan
              </div>

              <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                Akses VIP Koinity
                <span className="block text-neutral-500">
                  setelah pembayaran berhasil
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600">
                Pilih paket, lakukan pembayaran, lalu sistem akan memproses status
                membership kamu. Setelah itu, kamu bisa lanjut ke langkah berikutnya
                untuk masuk ke VIP.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800"
                >
                  Mulai & Pilih Paket
                </Link>
                <a
                  href="#how"
                  className="inline-flex items-center justify-center rounded-2xl border bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50"
                >
                  Lihat Cara Kerja
                </a>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                  <div className="text-xs text-neutral-500">Metode</div>
                  <div className="mt-1 text-sm font-semibold">Crypto</div>
                </div>
                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                  <div className="text-xs text-neutral-500">Aktivasi</div>
                  <div className="mt-1 text-sm font-semibold">Otomatis</div>
                </div>
                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                  <div className="text-xs text-neutral-500">Support</div>
                  <div className="mt-1 text-sm font-semibold">Responsif</div>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="md:justify-self-end">
              <div className="rounded-3xl border bg-white p-7 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold">Status Membership</div>
                    <div className="mt-1 text-sm text-neutral-600">
                      Cek langkah cepat setelah bayar
                    </div>
                  </div>
                  <span className="rounded-full border bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
                    Panduan
                  </span>
                </div>

                <ol className="mt-6 space-y-3">
                  {[
                    {
                      t: "Pilih paket",
                      d: "Sesuaikan durasi membership yang kamu mau.",
                    },
                    {
                      t: "Selesaikan pembayaran",
                      d: "Ikuti instruksi pembayaran sampai sukses.",
                    },
                    {
                      t: "Masuk VIP",
                      d: "Setelah sukses, klik tombol lanjut / kembali.",
                    },
                  ].map((x, i) => (
                    <li
                      key={x.t}
                      className="flex gap-3 rounded-2xl border bg-white p-4"
                    >
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border bg-neutral-50 text-sm font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{x.t}</div>
                        <div className="mt-0.5 text-sm text-neutral-600">
                          {x.d}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/pricing"
                    className="inline-flex flex-1 items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
                  >
                    Pilih Paket
                  </Link>
                  <Link
                    href="/success"
                    className="inline-flex flex-1 items-center justify-center rounded-2xl border bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                  >
                    Lihat Halaman Sukses
                  </Link>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-neutral-500">
                  Jika pembayaran sudah berhasil tapi akses belum masuk, biasanya
                  butuh beberapa saat untuk sinkronisasi. Coba refresh atau kembali
                  ke halaman ini.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="border-t bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Kenapa Koinity?
          </h2>
          <p className="mt-2 max-w-2xl text-neutral-600">
            Dibuat biar proses membership simpel: jelas langkahnya, rapih tampilannya,
            dan user gak bingung habis bayar.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "UI jelas & rapi",
                d: "Copywriting singkat, to the point, gak bikin user nyasar.",
              },
              {
                t: "Proses otomatis",
                d: "Status membership diproses otomatis setelah pembayaran sukses.",
              },
              {
                t: "Langkah lanjut jelas",
                d: "Ada tombol & panduan yang ngarahin user setelah transaksi.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="text-sm font-bold">{x.t}</div>
                <div className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {x.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t bg-neutral-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-extrabold tracking-tight">Cara Kerja</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "1) Bayar",
                d: "Selesaikan pembayaran sampai status sukses.",
              },
              {
                t: "2) Konfirmasi",
                d: "Sistem memverifikasi transaksi dan mengaktifkan membership.",
              },
              {
                t: "3) Lanjut",
                d: "Kamu diarahkan kembali untuk langkah masuk VIP.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="text-sm font-bold">{x.t}</div>
                <div className="mt-2 text-sm text-neutral-600">{x.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-bold">Butuh lanjut cepat?</div>
                <div className="mt-1 text-sm text-neutral-600">
                  Setelah pembayaran sukses, buka halaman sukses untuk tombol aksi.
                </div>
              </div>
              <Link
                href="/success"
                className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                Buka Halaman Sukses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-extrabold tracking-tight">FAQ</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Pembayaran sudah sukses, tapi akses belum masuk?",
                a: "Biasanya butuh beberapa saat untuk sinkronisasi. Coba refresh halaman /success, atau kembali ke homepage.",
              },
              {
                q: "Gimana kalau salah pilih paket?",
                a: "Pilih ulang paket yang sesuai dan lakukan pembayaran sesuai instruksi. Pastikan alamat wallet & network benar.",
              },
              {
                q: "Apakah ada bukti pembayaran?",
                a: "Kamu akan dapat status sukses dari gateway pembayaran. Simpan TXID / bukti transaksi bila diperlukan.",
              },
              {
                q: "Gimana cara lanjut setelah sukses?",
                a: "Buka /success lalu klik tombol 'Kembali ke Beranda' atau tombol aksi yang tersedia.",
              },
            ].map((x) => (
              <div key={x.q} className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="text-sm font-bold">{x.q}</div>
                <div className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {x.a}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-sm text-neutral-500">
            © {new Date().getFullYear()} Koinity. All rights reserved.
          </div>
        </div>
      </section>
    </main>
  );
}
