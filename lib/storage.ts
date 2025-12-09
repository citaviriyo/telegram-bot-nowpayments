/**
 * Interface untuk data invoice/pembayaran
 */
export interface InvoiceData {
  payment_id: string;
  telegram_chat_id: number;
  username?: string;
  package_type: 'monthly' | 'yearly';
  amount: number;
  created_at: string;
  status: 'pending' | 'finished' | 'expired' | 'cancelled';
  order_id: string;
}

/**
 * Interface untuk storage abstraction
 * Ini memungkinkan penggantian implementasi storage dengan mudah
 * dari in-memory ke database seperti Redis, MongoDB, dll
 */
export interface StorageInterface {
  saveInvoice(invoice: InvoiceData): Promise<void>;
  getInvoice(paymentId: string): Promise<InvoiceData | null>;
  updateInvoiceStatus(paymentId: string, status: InvoiceData['status']): Promise<void>;
  deleteInvoice(paymentId: string): Promise<void>;
  getAllInvoices(): Promise<InvoiceData[]>;
  getInvoicesByChatId(chatId: number): Promise<InvoiceData[]>;
}

/**
 * In-Memory Storage Implementation
 * 
 * PERHATIAN: Ini hanya untuk development/testing!
 * Di production environment, Anda harus mengganti ini dengan
 * persistent storage seperti Redis, MongoDB, PostgreSQL, dll
 * 
 * Alasan tidak menggunakan in-memory storage di production:
 * 1. Data akan hilang setiap kali server restart (serverless)
 * 2. Tidak bisa sharing data antar multiple server instances
 * 3. Memory leak jika data tidak dibersihkan
 * 4. Tidak scalable untuk banyak concurrent users
 */
export class InMemoryStorage implements StorageInterface {
  private invoices: Map<string, InvoiceData> = new Map();

  async saveInvoice(invoice: InvoiceData): Promise<void> {
    this.invoices.set(invoice.payment_id, invoice);
    console.log(`Invoice saved: ${invoice.payment_id} for chat ${invoice.telegram_chat_id}`);
  }

  async getInvoice(paymentId: string): Promise<InvoiceData | null> {
    const invoice = this.invoices.get(paymentId);
    return invoice || null;
  }

  async updateInvoiceStatus(paymentId: string, status: InvoiceData['status']): Promise<void> {
    const invoice = this.invoices.get(paymentId);
    if (invoice) {
      invoice.status = status;
      this.invoices.set(paymentId, invoice);
      console.log(`Invoice ${paymentId} status updated to: ${status}`);
    }
  }

  async deleteInvoice(paymentId: string): Promise<void> {
    const deleted = this.invoices.delete(paymentId);
    if (deleted) {
      console.log(`Invoice ${paymentId} deleted`);
    }
  }

  async getAllInvoices(): Promise<InvoiceData[]> {
    return Array.from(this.invoices.values());
  }

  async getInvoicesByChatId(chatId: number): Promise<InvoiceData[]> {
    return Array.from(this.invoices.values()).filter(
      invoice => invoice.telegram_chat_id === chatId
    );
  }

  /**
   * Cleanup expired invoices (utility method)
   * Dipanggil secara periodik untuk mencegah memory leak
   */
  async cleanupExpiredInvoices(): Promise<void> {
    const now = new Date();
    const expiredInvoices: string[] = [];

    for (const [paymentId, invoice] of this.invoices.entries()) {
      const createdAt = new Date(invoice.created_at);
      // Hapus invoice yang lebih dari 24 jam
      const hoursDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff > 24 || invoice.status === 'expired' || invoice.status === 'cancelled') {
        expiredInvoices.push(paymentId);
      }
    }

    for (const paymentId of expiredInvoices) {
      this.invoices.delete(paymentId);
      console.log(`Expired invoice ${paymentId} cleaned up`);
    }

    if (expiredInvoices.length > 0) {
      console.log(`Cleaned up ${expiredInvoices.length} expired invoices`);
    }
  }
}

/**
 * Redis Storage Implementation (Contoh untuk production)
 * 
 * Ini adalah contoh implementasi dengan Redis yang bisa Anda gunakan
 * di production environment. Anda perlu menambahkan dependency redis
 * ke package.json: "redis": "^4.6.0"
 * 
 * Cara penggunaan:
 * import { RedisStorage } from './storage';
 * import { createClient } from 'redis';
 * 
 * const redisClient = await createClient({ url: process.env.REDIS_URL }).connect();
 * const storage = new RedisStorage(redisClient);
 */
/*
export class RedisStorage implements StorageInterface {
  private redis: any; // Redis client
  private keyPrefix = 'telegram_bot_invoice:';

  constructor(redisClient: any) {
    this.redis = redisClient;
  }

  private getKey(paymentId: string): string {
    return `${this.keyPrefix}${paymentId}`;
  }

  async saveInvoice(invoice: InvoiceData): Promise<void> {
    const key = this.getKey(invoice.payment_id);
    await this.redis.setEx(key, 86400, JSON.stringify(invoice)); // Expire dalam 24 jam
  }

  async getInvoice(paymentId: string): Promise<InvoiceData | null> {
    const key = this.getKey(paymentId);
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async updateInvoiceStatus(paymentId: string, status: InvoiceData['status']): Promise<void> {
    const invoice = await this.getInvoice(paymentId);
    if (invoice) {
      invoice.status = status;
      await this.saveInvoice(invoice);
    }
  }

  async deleteInvoice(paymentId: string): Promise<void> {
    const key = this.getKey(paymentId);
    await this.redis.del(key);
  }

  async getAllInvoices(): Promise<InvoiceData[]> {
    const keys = await this.redis.keys(`${this.keyPrefix}*`);
    const invoices: InvoiceData[] = [];
    
    for (const key of keys) {
      const data = await this.redis.get(key);
      if (data) {
        invoices.push(JSON.parse(data));
      }
    }
    
    return invoices;
  }

  async getInvoicesByChatId(chatId: number): Promise<InvoiceData[]> {
    const allInvoices = await this.getAllInvoices();
    return allInvoices.filter(invoice => invoice.telegram_chat_id === chatId);
  }
}
*/

/**
 * Storage Manager - Factory untuk storage instance
 */
export class StorageManager {
  private static instance: StorageInterface | null = null;

  /**
   * Mendapatkan storage instance
   * @param type Tipe storage ('memory' | 'redis')
   * @param options Opsi tambahan (redis client, dll)
   */
  static async getInstance(
    type: 'memory' | 'redis' = 'memory',
    options?: any
  ): Promise<StorageInterface> {
    if (!this.instance) {
      switch (type) {
        case 'memory':
          this.instance = new InMemoryStorage();
          break;
        case 'redis':
          // Uncomment dan import RedisStorage jika ingin menggunakan Redis
          // if (!options?.redisClient) {
          //   throw new Error('Redis client is required for Redis storage');
          // }
          // this.instance = new RedisStorage(options.redisClient);
          throw new Error('Redis storage not implemented. Please uncomment RedisStorage class and import it.');
        default:
          throw new Error(`Unsupported storage type: ${type}`);
      }
    }
    return this.instance;
  }

  /**
   * Reset instance (untuk testing)
   */
  static resetInstance(): void {
    this.instance = null;
  }
}

/**
 * Helper function untuk mendapatkan storage instance
 * dengan otomatis mendeteksi dari environment variables
 */
export async function getStorage(): Promise<StorageInterface> {
  // Di production, Anda bisa menggunakan environment variable untuk menentukan storage type
  const storageType = (process.env.STORAGE_TYPE as 'memory' | 'redis') || 'memory';
  
  return await StorageManager.getInstance(storageType);
}