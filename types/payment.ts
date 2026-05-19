import type { PaymentMethod, PaymentStatus, TransactionType } from './enums'

export interface Payment {
    id: string
    orderId: string
    method: PaymentMethod
    amount: string
    status: PaymentStatus
    gateway: string | null
    gatewayRef: string | null
    transactionId: string | null
    paidAt: string | null
    failureReason: string | null
    receiptImage: string | null
    createdAt: string
    updatedAt: string
}

export interface PaymentWallet {
    id: string
    userId: string
    balance: string
    heldBalance: string
    currency: string
    createdAt: string
    updatedAt: string
}

export interface PaymentWalletTransaction {
    id: string
    paymentWalletId: string
    type: TransactionType
    amount: string
    balanceAfter: string
    reference: string | null
    description: string | null
    createdAt: string
}

export interface InitiatePaymentDto {
    orderId: string
    method: PaymentMethod
}

export interface WalletDepositDto {
    amount: number
    gateway?: string
}
