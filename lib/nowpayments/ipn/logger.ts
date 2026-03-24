import type { NowPaymentsIpnPayload } from "@/lib/nowpayments/ipn/types";

type SafeWebhookLog = {
  payment_id?: string;
  payment_status?: string;
  order_id?: string;
  invoice_id?: string;
  price_amount?: number;
  price_currency?: string;
  pay_amount?: number;
  pay_currency?: string;
  actually_paid?: number;
  pay_time?: string | number;
  created_at?: string | number;
  updated_at?: string | number;
};

export function buildSafeWebhookLog(payload: Partial<NowPaymentsIpnPayload>): SafeWebhookLog {
  return {
    payment_id: payload.payment_id,
    payment_status: payload.payment_status,
    order_id: payload.order_id,
    invoice_id: payload.invoice_id,
    price_amount: payload.price_amount,
    price_currency: payload.price_currency,
    pay_amount: payload.pay_amount,
    pay_currency: payload.pay_currency,
    actually_paid: payload.actually_paid,
    pay_time: payload.pay_time,
    created_at: payload.created_at,
    updated_at: payload.updated_at,
  };
}
