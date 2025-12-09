# Telegram Bot dengan NOWPayments untuk Vercel

Proyek Telegram bot yang menggunakan webhook untuk berlangganan grup dengan pembayaran cryptocurrency melalui NOWPayments. Didesain khusus untuk deployment di Vercel (serverless).

## 🚀 Fitur

- **Webhook-based**: Tidak perlu VPS, berjalan di serverless Vercel
- **Pembayaran Crypto**: Integrasi dengan NOWPayments untuk berbagai cryptocurrency
- **Multi-paket**: Paket bulanan ($12), Paket 3 bulan ($30) dan tahunan ($50)
- **Otomatis**: Undang user ke grup setelah pembayaran berhasil
- **Storage Abstraction**: Mudah migrasi dari in-memory ke database
- **TypeScript**: Full TypeScript untuk type safety

## 📋 Persyaratan

### Akun & API Keys
1. **Telegram Bot Token**: Dapatkan dari [@BotFather](https://t.me/botfather)
2. **NOWPayments API Key**: Dapatkan dari [NOWPayments Dashboard](https://nowpayments.io/)
3. **Telegram Group ID**: ID grup yang akan dijadikan premium

### Environment Variables
```bash
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_GROUP_ID=your_group_id_here
NOWPAYMENTS_API_KEY=your_nowpayments_api_key_here
NOWPAYMENTS_IPN_SECRET=your_ipn_secret_here  # Opsional
STORAGE_TYPE=memory  # 'memory' atau 'redis' (nanti)
```

## 🛠️ Setup Instructions

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd telegram-bot-vercel-nowpayments
npm install
```

### 2. Environment Setup
Buat file `.env.local`:
```bash
# Telegram
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_GROUP_ID=-1001234567890

# NOWPayments
NOWPAYMENTS_API_KEY=your_api_key_here
NOWPAYMENTS_IPN_SECRET=your_ipn_secret_here

# Opsional: Storage type (default: memory)
STORAGE_TYPE=memory
```

### 3. Build & Deploy ke Vercel

#### Via Vercel CLI:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Via GitHub (Recommended):
1. Push ke GitHub repository
2. Connect ke Vercel dashboard
3. Set environment variables di Vercel dashboard
4. Deploy otomatis saat push ke main branch

### 4. Setup Telegram Webhook
Setelah deploy, dapatkan URL webhook Anda:
```
https://your-project.vercel.app/api/telegram-webhook
```

Set webhook via Telegram Bot API:
```bash
curl -X POST "https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{"url": "https://your-project.vercel.app/api/telegram-webhook"}'
```

### 5. Setup NOWPayments IPN
1. Login ke NOWPayments dashboard
2. Go to Settings → IPN Settings
3. Set IPN URL: `https://your-project.vercel.app/api/nowpayments-webhook`
4. Set IPN Secret (recommended)
5. Save settings

## 📁 Struktur Proyek

```
├── api/
│   ├── telegram-webhook.ts     # Main webhook handler
│   └── nowpayments-webhook.ts  # Payment status handler
├── lib/
│   ├── telegram.ts            # Telegram Bot API helper
│   ├── nowpayments.ts         # NOWPayments API helper
│   └── storage.ts             # Storage abstraction layer
├── package.json
├── tsconfig.json
└── README.md
```

## 🔄 Flow Pengguna

1. **User ketik `/start`**
   - Bot kirim welcome message
   - Tampilkan tombol "Gas Masuk KOINITY"

2. **User klik tombol**
   - Bot tampilkan pilihan paket (Bulanan/Tahunan)
   - User klik paket yang diinginkan

3. **User ketik "bayar [paket]"**
   - Bot buat payment di NOWPayments
   - Simpan invoice data ke storage
   - Kirim payment link ke user

4. **User selesaikan pembayaran**
   - NOWPayments kirim IPN webhook
   - Bot verifikasi payment status
   - Jika berhasil: undang user ke grup

## 🗄️ Storage Options

### Default: In-Memory (Development Only)
```typescript
// Otomatis digunakan jika STORAGE_TYPE=memory
// PERINGATAN: Data hilang setiap server restart!
```

### Production: Redis (Recommended)
```typescript
// Uncomment RedisStorage class di lib/storage.ts
// Install: npm install redis
// Set: STORAGE_TYPE=redis, REDIS_URL=your_redis_url
```

### Custom Database
Implement `StorageInterface` di `lib/storage.ts`:
```typescript
export class CustomStorage implements StorageInterface {
  // Implement semua methods
}
```

## 🧪 Testing

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test endpoints
curl http://localhost:3000/api/telegram-webhook
curl http://localhost:3000/api/nowpayments-webhook
```

### Testing Webhook
Gunakan [ngrok](https://ngrok.com/) untuk testing webhook lokal:
```bash
# Start ngrok
ngrok http 3000

# Set webhook dengan ngrok URL
curl -X POST "https://api.telegram.org/botYOUR_TOKEN/setWebhook" \
     -d '{"url": "https://your-ngrok-url.ngrok.io/api/telegram-webhook"}'
```

## 📊 Monitoring

### Logs
- Vercel provides built-in logging
- Check Functions tab in Vercel dashboard
- All console.log statements appear in logs

### Error Handling
- Webhooks return `{status: "ok"}` even on errors
- Detailed errors logged to console
- Telegram users get user-friendly error messages

## 🔧 Konfigurasi Lanjutan

### Custom Package Pricing
Edit di `lib/nowpayments.ts`:
```typescript
private getPackageDetails(packageType: 'monthly' | 'yearly') {
  const packages = {
    monthly: {
      price: 12,    // Ubah harga bulanan
      name: 'Paket Bulanan',
      description: 'Akses KOINITY - 1 Bulan'
    },
    yearly: {
      price: 120,   // Ubah harga tahunan
      name: 'Paket Tahunan',
      description: 'Akses KOINITY - 1 Tahun'
    }
  };
  return packages[packageType];
}
```

### Custom Messages
Edit pesan-pesan di `api/telegram-webhook.ts`:
- `handleStartCommand()` - Welcome message
- `showPackageOptions()` - Package selection
- `handlePaymentRequest()` - Payment instructions

### Supported Cryptocurrencies
Default menggunakan BTC. Untuk menambah opsi:
```typescript
// Di createSubscriptionPayment()
pay_currency: 'BTC', // Bisa jadi dropdown atau user input
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Webhook tidak ter-set
```bash
# Cek webhook status
curl https://api.telegram.org/botYOUR_TOKEN/getWebhookInfo

# Reset webhook
curl -X POST "https://api.telegram.org/botYOUR_TOKEN/deleteWebhook"
```

#### 2. Environment variables tidak ter-load
- Pastikan nama variable benar
- Restart deployment setelah mengubah env vars
- Check Vercel dashboard → Settings → Environment Variables

#### 3. NOWPayments IPN tidak diterima
- Pastikan IPN URL benar dan accessible
- Check NOWPayments dashboard → IPN History
- Verify IPN secret jika digunakan

#### 4. User tidak bisa diundang ke grup
- Pastikan bot adalah admin di grup
- Pastikan grup privacy settings allow invitations
- Check bot permissions: must have "Invite Users" permission

### Debug Mode
Untuk debugging, tambahkan log:
```typescript
console.log('Debug info:', JSON.stringify(data, null, 2));
```

## 📝 Changelog

### v1.0.0
- Initial release
- Basic webhook functionality
- NOWPayments integration
- In-memory storage
- TypeScript support

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - feel free to use for commercial projects

## 🆘 Support

Jika mengalami masalah:
1. Check logs di Vercel dashboard
2. Verify semua environment variables
3. Pastikan webhook dan IPN URLs accessible
4. Join Telegram support group (jika ada)

---

**Happy Coding! 🚀**
