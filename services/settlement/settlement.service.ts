import { apiGet, apiPost } from '@/services/api'
import type { Settlement, CreateSettlementDto } from '@/types'

export const settlementService = {
    async findAll(params?: { status?: string }): Promise<Settlement[]> { return apiGet('/settlements', { params }) },
    async createSettlement(dto: CreateSettlementDto): Promise<Settlement> { return apiPost('/settlements', dto) },
    async getMySettlements(): Promise<Settlement[]> { return apiGet('/settlements/my') },
    async calculate(farmerId: string, from: string, to: string): Promise<any> { return apiGet('/settlements/calculate', { params: { farmerId, from, to } }) },
    async processPayout(id: string): Promise<any> { return apiPost(`/settlements/${id}/payout`) },
}
