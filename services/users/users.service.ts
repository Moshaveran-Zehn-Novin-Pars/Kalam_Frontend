import { apiGet, apiPatch, apiDelete } from '@/services/api'
import type { User, UpdateProfileDto } from '@/types'

export const usersService = {
    async findAll(params?: { page?: number; pageSize?: number; role?: string; status?: string; search?: string }): Promise<User[]> {
        return apiGet<User[]>('/users', { params })
    },

    async getProfile(): Promise<User> {
        return apiGet<User>('/users/profile')
    },

    async updateProfile(dto: UpdateProfileDto): Promise<User> {
        return apiPatch<User>('/users/profile', dto)
    },

    async findById(id: string): Promise<User> {
        return apiGet<User>(`/users/${id}`)
    },

    async deleteUser(id: string): Promise<void> {
        return apiDelete(`/users/${id}`)
    },

    async suspendUser(id: string): Promise<User> {
        return apiPatch<User>(`/users/${id}/suspend`)
    },

    async activateUser(id: string): Promise<User> {
        return apiPatch<User>(`/users/${id}/activate`)
    },
}
