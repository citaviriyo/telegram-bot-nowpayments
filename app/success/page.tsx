import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="rounded-3xl border bg-white p-8 shadow-sm text-center">

          {/* Status */}
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-sm text-green-700 bg-green-50">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Payment Confirmed
          </div>

          {/* Title */}
          <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-neutral-900">
            Pembayaran Berhasil ✅
          </h1>

          {/* Description */}
          <p className="mt-4 text-neutral-600 leading-relaxed">
            Terima kasih 🙏  
            Pembayaran kamu telah kami terima dan sistem sedang memproses
            <strong> aktivasi membership VIP </strong>secara otomatis.
          </p>

          <p className="mt-3 text-sm text-neutral-500">
            Proses ini biasanya hanya membutuhkan beberapa saat.
            Jika akses belum aktif, silakan refresh halaman ini.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-4">
            <Link
              href="https://t.me/koinity_bot"
              className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-green-700 transition"
            >
              🚀 Masuk ke Grup Telegram VIP
            </Link>

            <Link
              href="/"
              className="text-sm text-neutral-500 hover:text-neutral-700 transition"
            >
              Kembali ke Beranda
            </Link>
          </div>

          {/* Info tambahan */}
          <p className="mt-5 text-xs text-neutral-400">
            Akses grup akan dikirim otomatis oleh bot setelah status aktif.
            <br />
            Simpan bukti transaksi (TXID) jika sewaktu-waktu dibutuhkan.
          </p>

        </div>
      </div>
    </main>
  );
}
