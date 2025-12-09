import axios from 'axios';

// Interface untuk request create payment
export interface CreatePaymentRequest {
  price_amount: number;
  price_currency: string;
  pay_currency: string;
  order_id?: string;
  order_description?: string;
  ipn_callback_url?: string;
  success_url?: string;
  cancel_url?: string;
}

// Interface untuk response create payment
export interface CreatePaymentResponse {
  id: string;
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  pay_currency: string;
  order_id: string;
  order_description: string;
  ipn_callback_url: string;
  created_at: string;
  updated_at: string;
  expiration_estimate_date: string;
  success_url: string;
  cancel_url: string;
}

// Interface untuk IPN callback dari NOWPayments
export interface NOWPaymentsIPN {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  actually_paid: number;
  actually_paid_currency: string;
  pay_currency: string;
  order_id: string;
  order_description: string;
  purchase_id: string;
  created_at: string;
  updated_at: string;
  network: string;
  network_precision: number;
  time_limit: number;
  burning_percent: number;
  is_fixed_rate: boolean;
  is_fee_paid_by_user: boolean;
  valid_until: string;
  partially_paid_amount: number;
  smart_contract: string;
  from_currency: string;
  to_currency: string;
}

// Interface untuk get minimum amount
export interface MinimumAmountResponse {
  currency: string;
  minimum_amount: number;
}

// Interface untuk get estimated price
export interface EstimatedPriceResponse {
  currency: string;
  estimated_amount: number;
}

/**
 * Class helper untuk NOWPayments API
 */
export class NOWPaymentsAPI {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.nowpayments.io/v1';
  }

  /**
   * Membuat payment/invoice baru
   * @param paymentData Data pembayaran
   */
  async createPayment(paymentData: CreatePaymentRequest): Promise<CreatePaymentResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/payment`, paymentData, {
        headers: {
          'x-api-key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error: any) {
      console.error('Error creating payment:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Mendapatkan status payment berdasarkan payment ID
   * @param paymentId ID payment
   */
  async getPaymentStatus(paymentId: string): Promise<CreatePaymentResponse> {
    try {
      const response = await axios.get(`${this.baseUrl}/payment/${paymentId}`, {
        headers: {
          'x-api-key': this.apiKey
        }
      });

      return response.data;
    } catch (error: any) {
      console.error('Error getting payment status:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Mendapatkan minimum amount untuk currency tertentu
   * @param currency Currency yang akan digunakan
   */
  async getMinimumAmount(currency: string): Promise<MinimumAmountResponse> {
    try {
      const response = await axios.get(`${this.baseUrl}/min-amount/${currency}`, {
        headers: {
          'x-api-key': this.apiKey
        }
      });

      return response.data;
    } catch (error: any) {
      console.error('Error getting minimum amount:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Mendapatkan estimasi harga
   * @param amount Jumlah yang ingin dikonversi
   * @param fromCurrency Currency asal
   * @param toCurrency Currency tujuan
   */
  async getEstimatedPrice(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<EstimatedPriceResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/estimate?amount=${amount}&currency_from=${fromCurrency}&currency_to=${toCurrency}`,
        {
          headers: {
            'x-api-key': this.apiKey
          }
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Error getting estimated price:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Mendapatkan list semua supported currencies
   */
  async getSupportedCurrencies(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/currencies`, {
        headers: {
          'x-api-key': this.apiKey
        }
      });

      return response.data.currencies;
    } catch (error: any) {
      console.error('Error getting supported currencies:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Membuat data pembayaran untuk paket berlangganan
   * @param packageType Tipe paket (monthly/yearly)
   * @param chatId ID chat Telegram user
   * @param ipnCallbackUrl URL untuk IPN callback
   */
  createSubscriptionPayment(
    packageType: 'monthly' | 'yearly',
    chatId: number,
    ipnCallbackUrl: string
  ): CreatePaymentRequest {
    const packageDetails = this.getPackageDetails(packageType);
    
    return {
      price_amount: packageDetails.price,
      price_currency: 'USD',
      pay_currency: 'BTC', // Default ke Bitcoin, bisa diubah
      order_id: `${packageType}_${chatId}_${Date.now()}`,
      order_description: packageDetails.description,
      ipn_callback_url: ipnCallbackUrl
    };
  }

  /**
   * Mendapatkan detail paket berlangganan
   * @param packageType Tipe paket
   */
  private getPackageDetails(packageType: 'monthly' | 'yearly') {
    const packages = {
      monthly: {
        price: 12,
        name: 'Paket Bulanan',
        description: 'Akses KOINITY - 1 Bulan'
      },
      yearly: {
        price: 120,
        name: 'Paket Tahunan',
        description: 'Akses KOINITY - 1 Tahun (Diskon 20%)'
      }
    };

    return packages[packageType];
  }

  /**
   * Mendapatkan informasi paket
   * @param packageType Tipe paket
   */
  getPackageInfo(packageType: 'monthly' | 'yearly') {
    return this.getPackageDetails(packageType);
  }
}

// Singleton instance
let nowPaymentsInstance: NOWPaymentsAPI | null = null;

/**
 * Mendapatkan instance NOWPayments API
 * @param apiKey API key (hanya diperlukan saat pertama kali)
 */
export function getNOWPaymentsAPI(apiKey?: string): NOWPaymentsAPI {
  if (!nowPaymentsInstance) {
    if (!apiKey) {
      throw new Error('NOWPayments API key is required for first initialization');
    }
    nowPaymentsInstance = new NOWPaymentsAPI(apiKey);
  }
  return nowPaymentsInstance;
}