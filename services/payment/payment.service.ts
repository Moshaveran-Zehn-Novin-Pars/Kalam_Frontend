import { apiGet, apiGetPaginated, apiPost } from '@/services/api'
import type {
  PaymentWallet,
  PaymentWalletTransaction,
  Payment,
  InitiatePaymentDto,
  WalletDepositDto,
  PaginatedResponse,
} from '@/types'

export const paymentService = {
  async getWallet(): Promise<PaymentWallet> {
    return apiGet<PaymentWallet>('/payments/wallet')
  },

  async getTransactions(params?: { page?: number; pageSize?: number }): Promise<PaginatedResponse<PaymentWalletTransaction>> {
    const res = await apiGetPaginated<PaymentWalletTransaction[]>(
      '/payments/wallet/transactions',
      { params }
    )
    return { items: res.data, meta: res.meta! }
  },

  async depositToWallet(dto: WalletDepositDto): Promise<PaymentWallet> {
    return apiPost<PaymentWallet>('/payments/wallet/deposit', dto)
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
