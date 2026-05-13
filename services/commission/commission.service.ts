import { apiGet, apiPost, apiPatch } from '@/services/api'
import type { CreateCommissionRuleDto, UpdateCommissionRuleDto } from '@/types'

export const commissionService = {
    async findAll(): Promise<any[]> { return apiGet('/commissions') },
    async createRule(dto: CreateCommissionRuleDto): Promise<any> { return apiPost('/commissions', dto) },
    async getStats(from: string, to: string): Promise<any> { return apiGet('/commissions/stats', { params: { from, to } }) },
    async updateRule(id: string, dto: UpdateCommissionRuleDto): Promise<any> { return apiPatch(`/commissions/${id}`, dto) },
}
