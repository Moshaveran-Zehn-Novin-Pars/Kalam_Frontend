import { apiGet, apiPost } from '@/services/api'
import type { Escrow } from '@/types'

export const escrowService = {
    async getByOrder(orderId: string): Promise<Escrow> {
        return apiGet<Escrow>(`/escrow/${orderId}`)
    },

    async release(orderId: string): Promise<Escrow> {
        return apiPost<Escrow>(`/escrow/${orderId}/release`)
    },

    async releaseToVendor(orderId: string): Promise<Escrow> {
        return apiPost<Escrow>(`/escrow/${orderId}/release-vendor`)
    },
}
