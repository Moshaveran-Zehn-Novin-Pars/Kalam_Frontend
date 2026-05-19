import { apiGet, apiPatch, apiPost } from '@/services/api'
import type { BuyerProfile, UpdateBuyerDto, UpdateCreditLimitDto, UpdatePaymentTermsDto, BlockCreditDto } from '@/types'

export const buyerService = {
    async getAll(params?: { page?: number; pageSize?: number }): Promise<BuyerProfile[]> {
        return apiGet<BuyerProfile[]>('/buyers', { params })
    },

    async getById(id: string): Promise<BuyerProfile> {
        return apiGet<BuyerProfile>(`/buyers/${id}`)
    },

    async getMyProfile(): Promise<BuyerProfile> {
        return apiGet<BuyerProfile>('/buyers/me')
    },

    async updateProfile(dto: UpdateBuyerDto): Promise<BuyerProfile> {
        return apiPatch<BuyerProfile>('/buyers/me', dto)
    },

    async updateCreditLimit(id: string, dto: UpdateCreditLimitDto): Promise<BuyerProfile> {
        return apiPatch<BuyerProfile>(`/buyers/${id}/credit-limit`, dto)
    },

    async updatePaymentTerms(id: string, dto: UpdatePaymentTermsDto): Promise<BuyerProfile> {
        return apiPatch<BuyerProfile>(`/buyers/${id}/payment-terms`, dto)
    },

    async blockCredit(id: string, dto: BlockCreditDto): Promise<void> {
        return apiPost(`/buyers/${id}/block-credit`, dto)
    },
}
