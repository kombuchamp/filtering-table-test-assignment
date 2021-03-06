import { PaymentMode } from '../types/TableDataTypes';

export const PAYMENT_MODE_RENDER_TEXTS: Record<PaymentMode, string> = {
    BANK_TRANSFER: 'Bank transfer',
    CREDIT_CARD: 'Credit card',
    PAYPAL: 'PayPal',
};
