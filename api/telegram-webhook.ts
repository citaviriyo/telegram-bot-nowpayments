import { NextRequest, NextResponse } from 'next/server';
import { getTelegramBot, TelegramUpdate } from '@/lib/telegram';
import { getNOWPaymentsAPI } from '@/lib/nowpayments';
import { getStorage, InvoiceData } from '@/lib/storage';

/**
 * API Endpoint untuk Telegram Webhook
 * 
 * Endpoint ini menerima update dari Telegram Bot API
 * dan memproses berbagai jenis interaksi user:
 * - /start command
 * - Callback query dari tombol inline
 * - Pesan text untuk pembayaran
 */

// Environment variables yang diperlukan
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY;
const BASE_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Validasi environment variables
if (!TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN environment variable is required');
}

if (!NOWPAYMENTS_API_KEY) {
  throw new Error('NOWPAYMENTS_API_KEY environment variable is required');
}

/**
 * Handler utama untuk Telegram webhook
 */
export async function POST(request: NextRequest) {
  try {
    // Parse update dari Telegram
    const update: TelegramUpdate = await request.json();
    console.log('Received Telegram update:', JSON.stringify(update, null, 2));

    const telegramBot = getTelegramBot(TELEGRAM_BOT_TOKEN);
    const nowPayments = getNOWPaymentsAPI(NOWPAYMENTS_API_KEY);
    const storage = await getStorage();

    // Handle callback query (tombol inline ditekan)
    if (update.callback_query) {
      await handleCallbackQuery(update.callback_query, telegramBot);
      return NextResponse.json({ status: 'ok' });
    }

    // Handle message (text, command, dll)
    if (update.message) {
      await handleMessage(update.message, telegramBot, nowPayments, storage);
      return NextResponse.json({ status: 'ok' });
    }

    // Jika tidak ada message atau callback query, return ok
    return NextResponse.json({ status: 'ok' });

  } catch (error: any) {
    console.error('Error in telegram webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Handle callback query dari tombol inline
 */
async function handleCallbackQuery(
  callbackQuery: TelegramUpdate['callback_query'],
  telegramBot: any
) {
  const { id: callbackId, from, data, message } = callbackQuery;
  const chatId = message.chat.id;

  console.log(`Callback query received: ${data} from user ${from.first_name}`);

  try {
    // Jawab callback query untuk menghilangkan loading state
    await telegramBot.answerCallbackQuery(callbackId);

    switch (data) {
      case 'accept_terms':
        // User menyetujui syarat, tampilkan pilihan paket
        await showPackageOptions(chatId, telegramBot);
        break;

      case 'package_monthly':
        // User memilih paket bulanan
        await handlePackageSelection(chatId, 'monthly', telegramBot);
        break;

      case 'package_yearly':
        // User memilih paket tahunan
        await handlePackageSelection(chatId, 'yearly', telegramBot);
        break;

      default:
        console.log(`Unknown callback data: ${data}`);
    }
  } catch (error: any) {
    console.error('Error handling callback query:', error);
    await telegramBot.sendMessage(
      chatId,
      '❌ Terjadi kesalahan. Silakan coba lagi.'
    );
  }
}

/**
 * Handle regular message dari user
 */
async function handleMessage(
  message: TelegramUpdate['message'],
  telegramBot: any,
  nowPayments: any,
  storage: any
) {
  const { text, from, chat } = message;
  const chatId = chat.id;
  const username = from.username;
  const firstName = from.first_name;

  console.log(`Message received: "${text}" from ${firstName}`);

  try {
    // Handle /start command
    if (text === '/start') {
      await handleStartCommand(chatId, firstName, telegramBot);
      return;
    }

    // Handle pesan yang mengandung kata "bayar" (case insensitive)
    if (text.toLowerCase().includes('bayar')) {
      await handlePaymentRequest(chatId, username, text, telegramBot, nowPayments, storage);
      return;
    }

    // Handle pesan lainnya
    await handleOtherMessages(chatId, text, telegramBot);

  } catch (error: any) {
    console.error('Error handling message:', error);
    await telegramBot.sendMessage(
      chatId,
      '❌ Terjadi kesalahan. Silakan coba lagi.'
    );
  }
}

/**
 * Handle /start command
 */
async function handleStartCommand(
  chatId: number,
  firstName: string,
  telegramBot: any
) {
  const welcomeMessage = `
🎉 <b>Selamat datang di KOINITY, ${firstName}!</b>

🤖 Bot ini akan membantu Anda mendapatkan akses ke grup eksklusif kami dengan pembayaran cryptocurrency.

📋 <b>Syarat & Ketentuan:</b>
• Pembayaran menggunakan cryptocurrency via NOWPayments
• Akses grup berlaku sesuai paket yang dipilih
• Tidak ada refund setelah pembayaran berhasil
• Keputusan admin bersifat final

Klik tombol di bawah untuk melanjutkan 👇
  `;

  const keyboard = telegramBot.constructor.createInlineKeyboard([
    [telegramBot.constructor.createInlineButton('🚀 Gas Masuk KOINITY', 'accept_terms')]
  ]);

  await telegramBot.sendMessage(chatId, welcomeMessage, keyboard);
}

/**
 * Menampilkan pilihan paket berlangganan
 */
async function showPackageOptions(chatId: number, telegramBot: any) {
  const packageMessage = `
💰 <b>Pilih Paket Berlangganan Anda:</b>

📦 <b>Paket Bulanan - $12</b>
• Akses grup selama 1 bulan
• Support 24/7
• Update konten harian

📦 <b>Paket Tahunan - $120</b>
• Akses grup selama 1 tahun
• Hemat 20% (diskon $24)
• Support priority
• Exclusive content bonus
• Early access to new features

Pilih paket yang Anda inginkan 👇
  `;

  const keyboard = telegramBot.constructor.createInlineKeyboard([
    [telegramBot.constructor.createInlineButton('📅 Paket Bulanan ($12)', 'package_monthly')],
    [telegramBot.constructor.createInlineButton('📅 Paket Tahunan ($120)', 'package_yearly')]
  ]);

  await telegramBot.sendMessage(chatId, packageMessage, keyboard);
}

/**
 * Handle pemilihan paket
 */
async function handlePackageSelection(
  chatId: number,
  packageType: 'monthly' | 'yearly',
  telegramBot: any
) {
  const packageInfo = telegramBot.constructor ? 
    getNOWPaymentsAPI(NOWPAYMENTS_API_KEY).getPackageInfo(packageType) :
    { name: packageType === 'monthly' ? 'Paket Bulanan' : 'Paket Tahunan', price: packageType === 'monthly' ? 12 : 120 };

  const confirmationMessage = `
✅ <b>Anda memilih: ${packageInfo.name}</b>

💵 <b>Harga: $${packageInfo.price}</b>

📝 <b>Cara Pembayaran:</b>
1. Ketik "<b>bayar ${packageType}</b>" untuk membuat invoice
2. Anda akan menerima link pembayaran dari NOWPayments
3. Selesaikan pembayaran menggunakan cryptocurrency pilihan Anda
4. Akses grup akan diberikan otomatis setelah pembayaran konfirmasi

Contoh: ketik <code>bayar ${packageType}</code>

⏳ Invoice berlaku selama 1 jam
  `;

  await telegramBot.sendMessage(chatId, confirmationMessage);
}

/**
 * Handle permintaan pembayaran
 */
async function handlePaymentRequest(
  chatId: number,
  username: string | undefined,
  text: string,
  telegramBot: any,
  nowPayments: any,
  storage: any
) {
  try {
    // Parse package type dari pesan
    let packageType: 'monthly' | 'yearly' | null = null;
    
    if (text.toLowerCase().includes('bulanan') || text.toLowerCase().includes('monthly')) {
      packageType = 'monthly';
    } else if (text.toLowerCase().includes('tahunan') || text.toLowerCase().includes('yearly')) {
      packageType = 'yearly';
    } else {
      // Jika tidak spesifik, default ke monthly
      packageType = 'monthly';
    }

    if (!packageType) {
      await telegramBot.sendMessage(
        chatId,
        '❌ Paket tidak valid. Pilih: bulanan atau tahunan'
      );
      return;
    }

    // Cek apakah user memiliki pending payment
    const existingInvoices = await storage.getInvoicesByChatId(chatId);
    const pendingInvoice = existingInvoices.find(inv => inv.status === 'pending');

    if (pendingInvoice) {
      await telegramBot.sendMessage(
        chatId,
        `⚠️ Anda memiliki pembayaran pending:\n\nPayment ID: ${pendingInvoice.payment_id}\nStatus: ${pendingInvoice.status}\n\nSilakan selesaikan pembayaran yang ada atau tunggu beberapa menit.`,
        telegramBot.constructor.createInlineKeyboard([
          [telegramBot.constructor.createUrlButton('🔗 Lihat Pembayaran', `https://nowpayments.io/payment/?iid=${pendingInvoice.payment_id}`)]
        ])
      );
      return;
    }

    // Buat payment baru
    const ipnCallbackUrl = `${BASE_URL}/api/nowpayments-webhook`;
    const paymentData = nowPayments.createSubscriptionPayment(packageType, chatId, ipnCallbackUrl);
    
    const payment = await nowPayments.createPayment(paymentData);
    
    // Simpan invoice data ke storage
    const invoiceData: InvoiceData = {
      payment_id: payment.payment_id,
      telegram_chat_id: chatId,
      username: username,
      package_type: packageType,
      amount: payment.price_amount,
      created_at: payment.created_at,
      status: 'pending',
      order_id: payment.order_id
    };

    await storage.saveInvoice(invoiceData);

    // Kirim payment link ke user
    const paymentMessage = `
💳 <b>Invoice Pembayaran Dibuat!</b>

📋 <b>Detail Pembayaran:</b>
• Payment ID: <code>${payment.payment_id}</code>
• Paket: ${packageType === 'monthly' ? 'Bulanan' : 'Tahunan'}
• Jumlah: $${payment.price_amount} USD
• Status: Menunggu Pembayaran

🔗 <b>Link Pembayaran:</b>
${payment.pay_address}

⚡ <b>Cara Bayar:</b>
1. Klik link pembayaran di atas
2. Pilih cryptocurrency yang Anda inginkan
3. Transfer sesuai jumlah yang tertera
4. Tunggu konfirmasi (biasanya 5-30 menit)

📱 <b>Link Langsung:</b>
https://nowpayments.io/payment/?iid=${payment.payment_id}

⏰ Invoice akan kadaluarsa dalam 1 jam
    `;

    const keyboard = telegramBot.constructor.createInlineKeyboard([
      [telegramBot.constructor.createUrlButton('💳 Bayar Sekarang', `https://nowpayments.io/payment/?iid=${payment.payment_id}`)],
      [telegramBot.constructor.createUrlButton('📊 Cek Status', `https://nowpayments.io/payment/?iid=${payment.payment_id}`)]
    ]);

    await telegramBot.sendMessage(chatId, paymentMessage, keyboard);

  } catch (error: any) {
    console.error('Error creating payment:', error);
    await telegramBot.sendMessage(
      chatId,
      '❌ Gagal membuat pembayaran. Silakan coba lagi beberapa saat.'
    );
  }
}

/**
 * Handle pesan lainnya
 */
async function handleOtherMessages(
  chatId: number,
  text: string,
  telegramBot: any
) {
  const helpMessage = `
🤖 <b>Bot KOINITY</b>

📝 <b>Perintah yang tersedia:</b>
/start - Menampilkan pesan selamat datang
bayar [paket] - Membuat pembayaran (contoh: "bayar bulanan")

💡 <b>Contoh penggunaan:</b>
• Ketik "bayar bulanan" untuk berlangganan 1 bulan
• Ketik "bayar tahunan" untuk berlangganan 1 tahun

❓ <b>Butuh bantuan?</b>
Hubungi admin jika mengalami kendala.
  `;

  await telegramBot.sendMessage(chatId, helpMessage);
}

/**
 * GET handler untuk testing
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Telegram webhook endpoint is running',
    timestamp: new Date().toISOString()
  });
}