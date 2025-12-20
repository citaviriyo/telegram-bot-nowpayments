import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto w-full max-w-2xl px-4 py-16">
        <div className="rounded-3xl border bg-white p-7 shadow-sm">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-neutral-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Payment Confirmed
          </div>

          {/* Title */}
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight">
            Pembayaran berhasil ✅
          </h1>

          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Terima kasih! Pembayaran kamu sudah kami terima. Sistem akan memproses
            aktivasi membership secara otomatis.
          </p>

          {/* Info box */}
          <div className="mt-6 rounded-2xl border bg-neutral-50 p-4">
            <div className="text-sm font-semibold">Langkah selanjutnya</div>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-neutral-600">
              <li>Jika akses belum aktif, tunggu beberapa saat lalu refresh.</li>
              <li>Setelah itu, kembali ke beranda untuk lanjut masuk VIP.</li>
              <li>Simpan bukti transaksi (TXID) bila dibutuhkan.</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Kembali ke Beranda
            </Link>

            <Link
              href="/pricing"
              className="inline-flex flex-1 items-center justify-center rounded-2xl border bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Lihat Paket
            </Link>
          </div>

          {/* Small note */}
          <p className="mt-5 text-xs leading-relaxed text-neutral-500">
            Jika kamu merasa pembayaran sukses tapi sistem belum mengaktifkan membership,
            coba buka ulang halaman ini atau kembali ke beranda.
          </p>
        </div>
      </div>
    </main>
  );
}
