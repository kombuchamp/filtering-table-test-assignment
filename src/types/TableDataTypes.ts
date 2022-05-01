export type Status = 'NEW' | 'LIVE' | 'OFFLINE';

export type PaymentMode = 'CREDIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER';

export type TableEntry = {
    id: string;
    name: string;
    status: Status;
    paymentModes: PaymentMode[];
};
