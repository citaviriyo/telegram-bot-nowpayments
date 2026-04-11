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
SITE_URL=https://koinity.my.id
NEXT_PUBLIC_BASE_URL=https://koinity.my.id
NOWPAYMENTS_IPN_URL=https://koinity.my.id/api/nowpayments/ipn

# Telegram
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN_HERE
TELEGRAM_GROUP_ID=YOUR_GROUP_ID_HERE
TELEGRAM_WEBHOOK_SECRET=YOUR_WEBHOOK_SECRET_HERE

# NOWPayments
NOWPAYMENTS_API_KEY=YOUR_NOWPAYMENTS_API_KEY_HERE
NOWPAYMENTS_IPN_SECRET=YOUR_IPN_SECRET_HERE  # recommended

# Database (Neon / Postgres)
DATABASE_URL=YOUR_DATABASE_URL_HERE

# Cron
CRON_SECRET=YOUR_CRON_SECRET_HERE
```

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

* `GET https://koinity.my.id/api/system/ping`

### ✅ Telegram Webhook (untuk menerima update dari Telegram)

* `POST https://koinity.my.id/api/telegram/webhook`
* `GET https://koinity.my.id/api/telegram/webhook` → test alive

### ✅ NOWPayments IPN (payment status callback)

* `POST https://koinity.my.id/api/nowpayments/ipn`

### ✅ Pay IPN (compat / entry point)

* `POST https://koinity.my.id/api/pay/ipn`
  Endpoint ini berfungsi sebagai entry point/compat dan akan meneruskan payload ke `/api/nowpayments/ipn`.

---

## 🤖 Setup Telegram Webhook

Set webhook ke endpoint production:

```bash
curl -X POST "https://api.telegram.org/botYOUR_BOT_TOKEN_HERE/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://koinity.my.id/api/telegram/webhook"}'
```

Cek status webhook:

```bash
curl "https://api.telegram.org/botYOUR_BOT_TOKEN_HERE/getWebhookInfo"
```

---

## 💳 Setup NOWPayments IPN

Di NOWPayments Dashboard:

1. Settings → IPN Settings
2. Set IPN URL:

   * `https://koinity.my.id/api/nowpayments/ipn`
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

  * `https://koinity.my.id/api/telegram/webhook`
* Cek `getWebhookInfo`
* Pastikan bot token benar dan bot tidak dibatasi

### 2) IPN tidak masuk / signature error

* Pastikan IPN URL benar:

  * `https://koinity.my.id/api/nowpayments/ipn`
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


