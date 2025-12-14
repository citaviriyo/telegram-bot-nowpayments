import { NextRequest, NextResponse } from 'next/server';
import { getTelegramBot } from '../lib/telegram';
import { getStorage } from '../lib/storage';
import { NOWPaymentsIPN } from '../lib/nowpayments';

/**
 * API Endpoint untuk NOWPayments IPN (Instant Payment Notification)
 * 
 * Endpoint ini menerima callback dari NOWPayments ketika status pembayaran berubah
 * dan memproses aksi yang sesuai (mengundang user ke grup, mengirim notifikasi, dll)
 */

// Environment variables yang diperlukan
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID;

// Validasi environment variables
if (!TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN environment variable is required');
}

if (!TELEGRAM_GROUP_ID) {
  throw new Error('TELEGRAM_GROUP_ID environment variable is required');
}

/**
 * IPN Secret untuk verifikasi (opsional tapi direkomendasikan)
 * Anda bisa set ini di NOWPayments dashboard dan di environment variables
 */
const IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET;

/**
 * Handler utama untuk NOWPayments IPN webhook
 */
export async function POST(request: NextRequest) {
  try {
    console.log('NOWPayments IPN received');

    // Parse IPN data dari NOWPayments
    const ipnData: NOWPaymentsIPN = await request.json();
    console.log('IPN Data:', JSON.stringify(ipnData, null, 2));

    // Verifikasi IPN (jika secret di-set)
    if (IPN_SECRET) {
      const signature = request.headers.get('x-nowpayments-sig');
      if (!signature) {
        console.error('Missing IPN signature');
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }

      // Implementasi verifikasi signature sesuai dokumentasi NOWPayments
      // Untuk sekarang kita skip verifikasi, tapi di production Anda harus implementasikan
      console.log('IPN signature received (verification skipped in this example)');
    }

    // Proses IPN berdasarkan payment status
    await processIPN(ipnData);

    // Return success response ASAP (NOWPayments mengharapkan response cepat)
    return NextResponse.json({ status: 'ok' });

  } catch (error: any) {
    console.error('Error processing NOWPayments IPN:', error);
    
    // Tetap return success untuk避免 NOWPayments mengirim ulang
    // Tapi log error untuk debugging
    return NextResponse.json({ status: 'ok' });
  }
}

/**
 * Proses IPN data berdasarkan payment status
 */
async function processIPN(ipnData: NOWPaymentsIPN) {
  const { payment_id, payment_status, actually_paid, pay_currency } = ipnData;

  console.log(`Processing payment ${payment_id} with status: ${payment_status}`);

  const telegramBot = getTelegramBot(TELEGRAM_BOT_TOKEN);
  const storage = await getStorage();
  const groupId = parseInt(TELEGRAM_GROUP_ID!);

  try {
    // Ambil invoice data dari storage
    const invoice = await storage.getInvoice(payment_id);
    
    if (!invoice) {
      console.error(`Invoice not found for payment_id: ${payment_id}`);
      return;
    }

    console.log(`Invoice found: ${JSON.stringify(invoice)}`);

    // Handle berdasarkan payment status
    switch (payment_status) {
      case 'finished':
        await handleFinishedPayment(invoice, ipnData, telegramBot, groupId, storage);
        break;

      case 'confirmed':
        await handleConfirmedPayment(invoice, ipnData, telegramBot);
        break;

      case 'sending':
      case 'partially_paid':
        await handlePendingPayment(invoice, ipnData, telegramBot);
        break;

      case 'failed':
      case 'expired':
      case 'refunded':
        await handleFailedPayment(invoice, ipnData, telegramBot, storage);
        break;

      default:
        console.log(`Unhandled payment status: ${payment_status}`);
    }

  } catch (error: any) {
    console.error(`Error processing IPN for payment ${payment_id}:`, error);
  }
}

/**
 * Handle pembayaran yang selesai (finished)
 * Ini adalah status akhir yang berarti pembayaran berhasil sepenuhnya
 */
async function handleFinishedPayment(
  invoice: any,
  ipnData: NOWPaymentsIPN,
  telegramBot: any,
  groupId: number,
  storage: any
) {
  const { telegram_chat_id, username, package_type } = invoice;
  const { actually_paid, pay_currency } = ipnData;

  console.log(`Payment finished for user ${username} (${telegram_chat_id})`);

  try {
    // Update invoice status
    await storage.updateInvoiceStatus(invoice.payment_id, 'finished');

    // Kirim notifikasi sukses ke user
    const successMessage = `
🎉 <b>Pembayaran Berhasil!</b>

✅ <b>Detail Pembayaran:</b>
• Payment ID: <code>${invoice.payment_id}</code>
• Paket: ${package_type === 'monthly' ? 'Bulanan' : 'Tahunan'}
• Jumlah Dibayar: ${actually_paid} ${pay_currency}
• Status: Selesai

🚀 <b>Akses Grup:</b>
Anda sekarang memiliki akses ke grup KOINITY!
Cek grup Anda sekarang juga 👇

📱 <b>Link Grup:</b>
[Join KOINITY Group](https://t.me/${TELEGRAM_GROUP_ID})

🎯 <b>Benefit Anda:</b>
• Konten eksklusif
• Support 24/7
• Update harian
• Community access

Terima kasih telah berlangganan! 🙏
    `;

    await telegramBot.sendMessage(telegram_chat_id, successMessage);

    // Invite user ke grup (unban jika sebelumnya di-ban)
    try {
      console.log(`Inviting user ${telegram_chat_id} to group ${groupId}`);
      await telegramBot.unbanChatMember(groupId, telegram_chat_id);
      
      console.log(`Successfully invited user ${telegram_chat_id} to group`);
      
      // Kirim konfirmasi bahwa user sudah diundang
      await telegramBot.sendMessage(
        telegram_chat_id,
        '✅ Anda telah diundang ke grup KOINITY! Cek tab grup di Telegram Anda.'
      );
      
    } catch (groupError: any) {
      console.error('Error inviting user to group:', groupError);
      
      // Kirim pesan error tapi tetap konfirmasi pembayaran berhasil
      await telegramBot.sendMessage(
        telegram_chat_id,
        '⚠️ Pembayaran berhasil, tetapi ada kendala teknis mengundang Anda ke grup. Silakan hubungi admin untuk manual invitation.'
      );
    }

    // Log untuk admin monitoring
    console.log(`Payment completed and user invited: ${username} (${telegram_chat_id}) - Package: ${package_type}`);

  } catch (error: any) {
    console.error('Error handling finished payment:', error);
  }
}

/**
 * Handle pembayaran yang confirmed (menunggu konfirmasi network)
 */
async function handleConfirmedPayment(
  invoice: any,
  ipnData: NOWPaymentsIPN,
  telegramBot: any
) {
  const { telegram_chat_id, package_type } = invoice;
  const { actually_paid, pay_currency } = ipnData;

  console.log(`Payment confirmed for user ${telegram_chat_id}`);

  try {
    const confirmMessage = `
⏳ <b>Pembayaran Sedang Diproses</b>

📋 <b>Status Pembayaran:</b>
• Payment ID: <code>${invoice.payment_id}</code>
• Paket: ${package_type === 'monthly' ? 'Bulanan' : 'Tahunan'}
• Jumlah: ${actually_paid} ${pay_currency}
• Status: Menunggu Konfirmasi Network

⏱️ Estimasi waktu: 5-30 menit
Akses grup akan diberikan setelah konfirmasi selesai.

Mohon menunggu ya... 🙏
    `;

    await telegramBot.sendMessage(telegram_chat_id, confirmMessage);

  } catch (error: any) {
    console.error('Error handling confirmed payment:', error);
  }
}

/**
 * Handle pembayaran yang pending (sending/partially_paid)
 */
async function handlePendingPayment(
  invoice: any,
  ipnData: NOWPaymentsIPN,
  telegramBot: any
) {
  const { telegram_chat_id, package_type } = invoice;
  const { actually_paid, pay_currency } = ipnData;

  console.log(`Payment pending for user ${telegram_chat_id}`);

  // Untuk status pending, kita tidak perlu mengirim notifikasi ke user
  // karena ini adalah proses normal dan bisa mengganggu user
  console.log(`Payment ${invoice.payment_id} is ${ipnData.payment_status}`);
}

/**
 * Handle pembayaran yang gagal (failed/expired/refunded)
 */
async function handleFailedPayment(
  invoice: any,
  ipnData: NOWPaymentsIPN,
  telegramBot: any,
  storage: any
) {
  const { telegram_chat_id, package_type } = invoice;
  const { payment_status } = ipnData;

  console.log(`Payment failed for user ${telegram_chat_id}: ${payment_status}`);

  try {
    // Update invoice status
    await storage.updateInvoiceStatus(invoice.payment_id, payment_status as any);

    let statusMessage = '';
    let statusTitle = '';

    switch (payment_status) {
      case 'expired':
        statusTitle = 'Kadaluarsa';
        statusMessage = 'Invoice pembayaran Anda telah kadaluarsa. Silakan buat pembayaran baru.';
        break;
      case 'failed':
        statusTitle = 'Gagal';
        statusMessage = 'Pembayaran gagal. Silakan coba lagi dengan metode yang berbeda.';
        break;
      case 'refunded':
        statusTitle = 'Dikembalikan';
        statusMessage = 'Pembayaran Anda telah dikembalikan. Hubungi admin untuk info lebih lanjut.';
        break;
      default:
        statusTitle = 'Dibatalkan';
        statusMessage = 'Pembayaran dibatalkan. Silakan buat pembayaran baru jika masih berminat.';
    }

    const failedMessage = `
❌ <b>Pembayaran ${statusTitle}</b>

📋 <b>Detail:</b>
• Payment ID: <code>${invoice.payment_id}</code>
• Paket: ${package_type === 'monthly' ? 'Bulanan' : 'Tahunan'}
• Status: ${statusTitle}

💬 <b>Pesan:</b>
${statusMessage}

🔄 Jika masih ingin berlangganan, ketik "bayar ${package_type}" untuk membuat invoice baru.
    `;

    await telegramBot.sendMessage(telegram_chat_id, failedMessage);

  } catch (error: any) {
    console.error('Error handling failed payment:', error);
  }
}

/**
 * GET handler untuk testing
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'NOWPayments IPN endpoint is running',
    timestamp: new Date().toISOString(),
    groupId: TELEGRAM_GROUP_ID
  });
}