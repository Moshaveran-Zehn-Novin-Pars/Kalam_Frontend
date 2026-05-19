import { apiGet, apiPost, apiPatch } from '@/services/api'
import type { Delivery, AssignDriverDto, UpdateLocationDto, ConfirmDeliveryDto, TemperatureLog, AutoAssignDto } from '@/types'

export const deliveryService = {
    async findAll(params?: { status?: string }): Promise<Delivery[]> {
        return apiGet<Delivery[]>('/deliveries', { params })
    },

    async getMyDeliveries(): Promise<Delivery[]> {
        return apiGet<Delivery[]>('/deliveries/my')
    },

    async getDeliveryByOrder(orderId: string): Promise<Delivery> {
        return apiGet<Delivery>(`/deliveries/order/${orderId}`)
    },

    async createDelivery(orderId: string): Promise<Delivery> {
        return apiPost<Delivery>(`/deliveries/order/${orderId}`)
    },

    async assignDriver(id: string, dto: AssignDriverDto): Promise<Delivery> {
        return apiPatch<Delivery>(`/deliveries/${id}/assign-driver`, dto)
    },

    async updateStatus(id: string, status: string): Promise<Delivery> {
        return apiPatch<Delivery>(`/deliveries/${id}/status`, null, { params: { status } })
    },

    async updateLocation(id: string, dto: UpdateLocationDto): Promise<Delivery> {
        return apiPost<Delivery>(`/deliveries/${id}/location`, dto)
    },

    async confirmDelivery(id: string, dto: ConfirmDeliveryDto): Promise<Delivery> {
        return apiPost<Delivery>(`/deliveries/${id}/confirm`, dto)
    },

    async getLiveTracking(orderId: string): Promise<Delivery> {
        return apiGet<Delivery>(`/deliveries/track/${orderId}`)
    },

    async autoAssign(id: string, dto?: AutoAssignDto): Promise<Delivery> {
        return apiPost<Delivery>(`/deliveries/${id}/auto-assign`, dto)
    },

    async getTemperature(id: string): Promise<TemperatureLog[]> {
        return apiGet<TemperatureLog[]>(`/deliveries/${id}/temperature`)
    },

    async updateTemperature(id: string, dto: TemperatureLog): Promise<void> {
        return apiPost(`/deliveries/${id}/temperature`, dto)
    },
}
