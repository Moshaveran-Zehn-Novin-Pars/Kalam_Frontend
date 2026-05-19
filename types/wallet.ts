export interface Wallet {
    id: string
    userId: string
    balance: string
    currency: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface WalletTransaction {
    id: string
    walletId: string
    type: 'deposit' | 'withdrawal' | 'transfer_in' | 'transfer_out' | 'payment' | 'refund'
    amount: string
    balanceBefore: string
    balanceAfter: string
    description: string | null
    referenceId: string | null
    createdAt: string
}

export interface DepositDto {
    amount: number
    paymentMethod?: string
    description?: string
}

export interface WithdrawDto {
    amount: number
    iban: string
    description?: string
}

export interface TransferDto {
    amount: number
    toUserId: string
    description?: string
}
