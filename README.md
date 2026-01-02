# Koinity — Telegram Bot + NOWPayments (Next.js on Vercel)

Proyek Telegram bot berbasis **webhook** untuk membership grup VIP dengan pembayaran crypto via **NOWPayments**.  
Didesain untuk deployment di **Vercel** menggunakan **Next.js App Router** (`app/api/...`) + Prisma (Neon).

## 🚀 Fitur Utama

- **Webhook-based (Serverless)**: Tanpa VPS, berjalan di Vercel Functions
- **Pembayaran Crypto**: NOWPayments invoice + IPN (Instant Payment Notification)
- **Multi Paket**: 1 bulan ($12), 3 bulan ($30), 1 tahun ($50)
- **Otomatis & Aman**:
  - Verifikasi IPN signature (HMAC sha512) jika `NOWPAYMENTS_IPN_SECRET` diisi
  - **Idempotency lock** untuk mencegah invite dobel
- **Invite Otomatis**: Generate link invite Telegram (1x pakai)
- **DB Ready**: Prisma + Neon (Member/Subscription/Payment)

---

## 📋 Persyaratan

### Akun & API Keys
1. **Telegram Bot Token** (dari @BotFather)
2. **NOWPayments API Key**
3. **Telegram Group ID** (grup VIP target)
4. (Opsional tapi direkomendasikan) **NOWPayments IPN Secret**

---

## 🔐 Environment Variables

Set di Vercel (Project → Settings → Environment Variables) dan untuk lokal pakai `.env.local`.

```bash
# Site
SITE_URL=https://www.koinity.online

# Telegram
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_GROUP_ID=-1001234567890

# NOWPayments
NOWPAYMENTS_API_KEY=your_nowpayments_api_key_here
NOWPAYMENTS_IPN_SECRET=your_ipn_secret_here  # recommended

# Database (Neon / Postgres)
DATABASE_URL=postgresql://...
````

> Catatan:
>
> * `SITE_URL` dipakai agar callback/forwarding konsisten ke domain production.
> * Pastikan bot jadi **admin** di grup dan punya permission **Invite Users**.

---

## 🛠️ Setup Lokal

### 1) Install

```bash
npm install
```

### 2) Jalankan Dev

```bash
npm run dev
```

### 3) Test endpoint lokal

```bash
# Healthcheck
curl http://localhost:3000/api/system/ping

# Telegram webhook (GET test)
curl http://localhost:3000/api/telegram/webhook

# Pay IPN forwarder health (GET test)
curl http://localhost:3000/api/pay/ipn
```

> IPN NOWPayments biasanya **POST-only**, jadi kalau dibuka di browser bisa 405, itu normal.

---

## 🌐 Deploy ke Vercel

### Via GitHub (Recommended)

1. Push repo ke GitHub
2. Import project di Vercel
3. Set env vars di Vercel
4. Deploy otomatis saat push ke branch main

---

## 🔗 Endpoint Penting (Production)

Berikut endpoint yang digunakan sistem saat ini (App Router):

### ✅ Healthcheck

* `GET https://www.koinity.online/api/system/ping`

### ✅ Telegram Webhook (untuk menerima update dari Telegram)

* `POST https://www.koinity.online/api/telegram/webhook`
* `GET https://www.koinity.online/api/telegram/webhook` → test alive

### ✅ NOWPayments IPN (payment status callback)

* `POST https://www.koinity.online/api/nowpayments/ipn`

### ✅ Pay IPN (compat / entry point)

* `POST https://www.koinity.online/api/pay/ipn`
  Endpoint ini berfungsi sebagai entry point/compat dan akan meneruskan payload ke `/api/nowpayments/ipn`.

---

## 🤖 Setup Telegram Webhook

Set webhook ke endpoint production:

```bash
curl -X POST "https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.koinity.online/api/telegram/webhook"}'
```

Cek status webhook:

```bash
curl "https://api.telegram.org/botYOUR_BOT_TOKEN/getWebhookInfo"
```

---

## 💳 Setup NOWPayments IPN

Di NOWPayments Dashboard:

1. Settings → IPN Settings
2. Set IPN URL:

   * `https://www.koinity.online/api/nowpayments/ipn`
3. Set IPN Secret (recommended)
4. Save

Cek IPN History di NOWPayments jika butuh debug.

---

## 🔄 Flow Pengguna

1. User chat bot → `/start`
2. User pilih paket → bot kirim **invoice URL**
3. User bayar di NOWPayments
4. NOWPayments kirim IPN ke `/api/nowpayments/ipn`
5. Server:

   * simpan/update Payment
   * kalau status `confirmed/finished` → claim lock (anti double)
   * update Member/Subscription
   * buat **invite link (1x)** → kirim ke user

---

## ✅ Redirect Pages (Backward Compatibility)

Akses lama tetap diarahkan:

* `/success.html` → `/success`
* `/cancel.html` → `/cancel`

---

## 🧪 Monitoring

* Gunakan Vercel Logs untuk melihat:

  * Telegram webhook requests
  * IPN status (`IPN OK`, `NOT PAID (ignored)`, `already processed`)

---

## 🚨 Troubleshooting

### 1) Telegram webhook tidak masuk

* Pastikan webhook URL benar:

  * `https://www.koinity.online/api/telegram/webhook`
* Cek `getWebhookInfo`
* Pastikan bot token benar dan bot tidak dibatasi

### 2) IPN tidak masuk / signature error

* Pastikan IPN URL benar:

  * `https://www.koinity.online/api/nowpayments/ipn`
* Pastikan `NOWPAYMENTS_IPN_SECRET` sama persis dengan di dashboard
* Cek NOWPayments IPN History

### 3) Invite gagal

* Pastikan bot admin di grup
* Permission: Invite Users
* Pastikan `TELEGRAM_GROUP_ID` benar (biasanya negatif untuk supergroup)

---

## 📄 License

MIT

```

---

## ✅ Commit name
Pakai ini:
```

docs(readme): update endpoints for app router and remove legacy api references

```


