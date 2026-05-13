import { apiGet, apiPost, apiPatch } from '@/services/api'
import type { Dispute, CreateDisputeDto, ResolveDisputeDto } from '@/types'

export const disputeService = {
    async findAll(params?: { status?: string }): Promise<Dispute[]> {
        return apiGet<Dispute[]>('/disputes', { params })
    },

    async create(dto: CreateDisputeDto): Promise<Dispute> {
        return apiPost<Dispute>('/disputes', dto)
    },

    async getMyDisputes(): Promise<Dispute[]> {
        return apiGet<Dispute[]>('/disputes/my')
    },

    async findById(id: string): Promise<Dispute> {
        return apiGet<Dispute>(`/disputes/${id}`)
    },

    async updateStatus(id: string, status: string): Promise<Dispute> {
        return apiPatch<Dispute>(`/disputes/${id}/status`, null, { params: { status } })
    },

    async resolveDispute(id: string, dto: ResolveDisputeDto): Promise<Dispute> {
        return apiPost<Dispute>(`/disputes/${id}/resolve`, dto)
    },
}
