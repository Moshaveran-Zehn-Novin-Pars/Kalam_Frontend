import { apiGet, apiPost, apiPatch } from '@/services/api'
import type { VendorProfile, VendorBranch, CreateBranchDto, UpdateBranchDto } from '@/types'

export const vendorsService = {
    async getAll(params?: { page?: number; pageSize?: number }): Promise<VendorProfile[]> {
        return apiGet<VendorProfile[]>('/vendors', { params })
    },

    async getMe(): Promise<VendorProfile> {
        return apiGet<VendorProfile>('/vendors/me')
    },

    async getById(id: string): Promise<VendorProfile> {
        return apiGet<VendorProfile>(`/vendors/${id}`)
    },

    async verify(id: string): Promise<VendorProfile> {
        return apiPatch<VendorProfile>(`/vendors/${id}/verify`)
    },

    async getBranches(vendorId: string): Promise<VendorBranch[]> {
        return apiGet<VendorBranch[]>(`/vendors/${vendorId}/branches`)
    },

    async addBranch(vendorId: string, dto: CreateBranchDto): Promise<VendorBranch> {
        return apiPost<VendorBranch>(`/vendors/${vendorId}/branches`, dto)
    },

    async updateBranch(branchId: string, dto: UpdateBranchDto): Promise<VendorBranch> {
        return apiPatch<VendorBranch>(`/vendors/branches/${branchId}`, dto)
    },
}
