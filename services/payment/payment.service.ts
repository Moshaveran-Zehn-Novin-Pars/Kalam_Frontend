import { apiGet, apiGetPaginated, apiPost } from '@/services/api'
import type {
  Wallet,
  WalletTransaction,
  Payment,
  InitiatePaymentDto,
  WalletDepositDto,
  PaginatedResponse,
} from '@/types'

export const paymentService = {
  async getWallet(): Promise<Wallet> {
    return apiGet<Wallet>('/payments/wallet')
  },

  async getTransactions(params?: { page?: number; pageSize?: number }): Promise<PaginatedResponse<WalletTransaction>> {
    const res = await apiGetPaginated<PaginatedResponse<WalletTransaction>>(
      '/payments/wallet/transactions',
      { params }
    )
    return res.data as PaginatedResponse<WalletTransaction>
  },

  async depositToWallet(dto: WalletDepositDto): Promise<Wallet> {
    return apiPost<Wallet>('/payments/wallet/deposit', dto)
  },

  async initiatePayment(dto: InitiatePaymentDto): Promise<Payment> {
    return apiPost<Payment>('/payments/initiate', dto)
  },

  async getPaymentByOrder(orderId: string): Promise<Payment> {
    return apiGet<Payment>(`/payments/order/${orderId}`)
  },

  async releaseEscrow(orderId: string): Promise<Payment> {
    return apiPost<Payment>(`/payments/order/${orderId}/release-escrow`)
  },

  async refundPayment(orderId: string): Promise<Payment> {
    return apiPost<Payment>(`/payments/order/${orderId}/refund`)
  },
}
