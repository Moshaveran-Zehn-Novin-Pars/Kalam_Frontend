import { apiGet, apiPatch } from '@/services/api'
import type { FarmerProfile, UpdateFarmerDto } from '@/types'

export const farmerService = {
    async findAll(params?: { page?: number; pageSize?: number; search?: string }): Promise<FarmerProfile[]> {
        return apiGet<FarmerProfile[]>('/farmers', { params })
    },

    async getMyProfile(): Promise<FarmerProfile> {
        return apiGet<FarmerProfile>('/farmers/me')
    },

    async updateProfile(dto: UpdateFarmerDto): Promise<FarmerProfile> {
        return apiPatch<FarmerProfile>('/farmers/me', dto)
    },

    async findById(id: string): Promise<FarmerProfile> {
        return apiGet<FarmerProfile>(`/farmers/${id}`)
    },

    async verifyFarmer(id: string): Promise<FarmerProfile> {
        return apiPatch<FarmerProfile>(`/farmers/${id}/verify`)
    },
}
