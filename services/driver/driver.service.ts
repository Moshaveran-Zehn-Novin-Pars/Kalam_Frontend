import { apiGet, apiPatch } from '@/services/api'
import type { DriverProfile, UpdateDriverDto } from '@/types'

export const driverService = {
    async findAvailable(): Promise<DriverProfile[]> {
        return apiGet<DriverProfile[]>('/drivers/available')
    },

    async getMyProfile(): Promise<DriverProfile> {
        return apiGet<DriverProfile>('/drivers/me')
    },

    async updateStatus(dto: UpdateDriverDto): Promise<DriverProfile> {
        return apiPatch<DriverProfile>('/drivers/me/status', dto)
    },
}
