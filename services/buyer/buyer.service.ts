import { apiGet, apiPatch } from '@/services/api'
import type { BuyerProfile, UpdateBuyerDto } from '@/types'

export const buyerService = {
    async getMyProfile(): Promise<BuyerProfile> {
        return apiGet<BuyerProfile>('/buyers/me')
    },

    async updateProfile(dto: UpdateBuyerDto): Promise<BuyerProfile> {
        return apiPatch<BuyerProfile>('/buyers/me', dto)
    },
}
