import { apiGet, apiPost, apiPatch } from '@/services/api'
import type { PreHarvestOrder, CreatePreHarvestOrderDto, PayDepositDto } from '@/types'

export const preHarvestOrdersService = {
    async getAll(params?: { status?: string }): Promise<PreHarvestOrder[]> {
        return apiGet<PreHarvestOrder[]>('/pre-harvest-orders', { params })
    },

    async getById(id: string): Promise<PreHarvestOrder> {
        return apiGet<PreHarvestOrder>(`/pre-harvest-orders/${id}`)
    },

    async create(dto: CreatePreHarvestOrderDto): Promise<PreHarvestOrder> {
        return apiPost<PreHarvestOrder>('/pre-harvest-orders', dto)
    },

    async cancel(id: string): Promise<PreHarvestOrder> {
        return apiPatch<PreHarvestOrder>(`/pre-harvest-orders/${id}/cancel`)
    },

    async markGrowing(id: string): Promise<PreHarvestOrder> {
        return apiPost<PreHarvestOrder>(`/pre-harvest-orders/${id}/mark-growing`)
    },

    async markHarvested(id: string): Promise<PreHarvestOrder> {
        return apiPost<PreHarvestOrder>(`/pre-harvest-orders/${id}/mark-harvested`)
    },

    async payDeposit(id: string, dto: PayDepositDto): Promise<PreHarvestOrder> {
        return apiPost<PreHarvestOrder>(`/pre-harvest-orders/${id}/pay-deposit`, dto)
    },
}
