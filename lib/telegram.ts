import axios from 'axios';

// Interface untuk update dari Telegram
export interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      first_name: string;
      username?: string;
      language_code?: string;
    };
    chat: {
      id: number;
      first_name: string;
      username?: string;
      type: 'private' | 'group' | 'supergroup' | 'channel';
    };
    date: number;
    text: string;
  };
  callback_query?: {
    id: string;
    from: {
      id: number;
      first_name: string;
      username?: string;
    };
    message: {
      message_id: number;
      from: {
        id: number;
        first_name: string;
        username?: string;
      };
      chat: {
        id: number;
        first_name: string;
        username?: string;
        type: 'private';
      };
      date: number;
      text: string;
    };
    data: string;
  };
}

// Interface untuk tombol inline keyboard
export interface InlineKeyboardButton {
  text: string;
  callback_data?: string;
  url?: string;
}

export interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

// Interface untuk response API Telegram
export interface TelegramApiResponse {
  ok: boolean;
  result?: any;
  description?: string;
}

// Class helper untuk Telegram Bot API
export class TelegramBot {
  private token: string;
  private baseUrl: string;

  constructor(token: string) {
    this.token = token;
    this.baseUrl = `https://api.telegram.org/bot${token}`;
  }

  /**
   * Mengirim pesan ke user
   * @param chatId ID chat Telegram
   * @param text Isi pesan
   * @param replyMarkup Opsi keyboard inline (opsional)
   */
  async sendMessage(
    chatId: number,
    text: string,
    replyMarkup?: InlineKeyboardMarkup
  ): Promise<TelegramApiResponse> {
    try {
      const payload: any = {
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML'
      };

      if (replyMarkup) {
        payload.reply_markup = replyMarkup;
      }

      const response = await axios.post(`${this.baseUrl}/sendMessage`, payload);
      return response.data;
    } catch (error: any) {
      console.error('Error sending message:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Menjawab callback query untuk menghilangkan loading state
   * @param callbackId ID callback query
   * @param text Teks yang akan ditampilkan sebagai toast (opsional)
   */
  async answerCallbackQuery(
    callbackId: string,
    text?: string
  ): Promise<TelegramApiResponse> {
    try {
      const payload: any = {
        callback_query_id: callbackId
      };

      if (text) {
        payload.text = text;
        payload.show_alert = false;
      }

      const response = await axios.post(`${this.baseUrl}/answerCallbackQuery`, payload);
      return response.data;
    } catch (error: any) {
      console.error('Error answering callback query:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Mengundang user ke grup (unban jika user sebelumnya di-ban)
   * @param groupId ID grup Telegram
   * @param userId ID user yang akan diundang
   */
  async unbanChatMember(
    groupId: number,
    userId: number
  ): Promise<TelegramApiResponse> {
    try {
      const payload = {
        chat_id: groupId,
        user_id: userId,
        only_if_banned: true
      };

      const response = await axios.post(`${this.baseUrl}/unbanChatMember`, payload);
      return response.data;
    } catch (error: any) {
      console.error('Error unbanning chat member:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Mendapatkan info chat (untuk debugging)
   * @param chatId ID chat
   */
  async getChat(chatId: number): Promise<TelegramApiResponse> {
    try {
      const response = await axios.get(`${this.baseUrl}/getChat?chat_id=${chatId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting chat info:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Membuat inline keyboard dengan tombol-tombol
   * @param buttons Array dari array tombol (baris per baris)
   */
  static createInlineKeyboard(buttons: InlineKeyboardButton[][]): InlineKeyboardMarkup {
    return {
      inline_keyboard: buttons
    };
  }

  /**
   * Membuat tombol inline sederhana
   * @param text Teks tombol
   * @param callbackData Callback data
   */
  static createInlineButton(text: string, callbackData: string): InlineKeyboardButton {
    return {
      text,
      callback_data: callbackData
    };
  }

  /**
   * Membuat tombol link
   * @param text Teks tombol
   * @param url URL tujuan
   */
  static createUrlButton(text: string, url: string): InlineKeyboardButton {
    return {
      text,
      url
    };
  }
}

// Singleton instance
let telegramBotInstance: TelegramBot | null = null;

/**
 * Mendapatkan instance Telegram bot
 * @param token Bot token (hanya diperlukan saat pertama kali)
 */
export function getTelegramBot(token?: string): TelegramBot {
  if (!telegramBotInstance) {
    if (!token) {
      throw new Error('Telegram bot token is required for first initialization');
    }
    telegramBotInstance = new TelegramBot(token);
  }
  return telegramBotInstance;
}