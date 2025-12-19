import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto w-full max-w-2xl px-4 py-16">
        <div className="rounded-3xl border bg-white p-7 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-neutral-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Payment Confirmed
          </div>

          <h1 className="mt-4 text-2xl font-extrabold tracking-tight">
            Pembayaran berhasil ✅
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Pembayaran kamu sudah terkonfirmasi. Sistem akan memproses akses membership dan
            mengirim undangan VIP Telegram secara otomatis.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://t.me/koinity_bot"
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              🚀 Buka Telegram
            </a>

            <Link
              href="/"
              className="inline-flex justify-center rounded-2xl border px-6 py-3 text-sm font-semibold hover:bg-neutral-50"
            >
              Kembali ke Home
            </Link>
          </div>

          <p className="mt-6 text-xs text-neutral-500">
            Jika dalam beberapa menit kamu belum menerima akses, silakan kembali ke Telegram atau hubungi admin.
          </p>
        </div>
      </div>
    </main>
  );
}
