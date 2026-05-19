import { apiGet, apiPost } from '@/services/api'
import type { Wallet, WalletTransaction, DepositDto, WithdrawDto, TransferDto } from '@/types'

export const walletService = {
    async getWallet(): Promise<Wallet> {
        return apiGet<Wallet>('/wallet')
    },

    async getBalance(): Promise<{ balance: string }> {
        return apiGet<{ balance: string }>('/wallet/balance')
    },

    async getTransactions(params?: { page?: number; pageSize?: number }): Promise<WalletTransaction[]> {
        return apiGet<WalletTransaction[]>('/wallet/transactions', { params })
    },

    async deposit(dto: DepositDto): Promise<Wallet> {
        return apiPost<Wallet>('/wallet/deposit', dto)
    },

    async transfer(dto: TransferDto): Promise<Wallet> {
        return apiPost<Wallet>('/wallet/transfer', dto)
    },

    async withdraw(dto: WithdrawDto): Promise<Wallet> {
        return apiPost<Wallet>('/wallet/withdraw', dto)
    },
}
