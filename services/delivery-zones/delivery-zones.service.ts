import { apiGet, apiPost, apiPatch, apiDelete } from '@/services/api'
import type { DeliveryZone, CreateDeliveryZoneDto, UpdateDeliveryZoneDto, AssignDriverToZoneDto } from '@/types'

export const deliveryZonesService = {
    async getAll(): Promise<DeliveryZone[]> {
        return apiGet<DeliveryZone[]>('/delivery-zones')
    },

    async getById(id: string): Promise<DeliveryZone> {
        return apiGet<DeliveryZone>(`/delivery-zones/${id}`)
    },

    async create(dto: CreateDeliveryZoneDto): Promise<DeliveryZone> {
        return apiPost<DeliveryZone>('/delivery-zones', dto)
    },

    async update(id: string, dto: UpdateDeliveryZoneDto): Promise<DeliveryZone> {
        return apiPatch<DeliveryZone>(`/delivery-zones/${id}`, dto)
    },

    async delete(id: string): Promise<void> {
        return apiDelete(`/delivery-zones/${id}`)
    },

    async assignDriver(dto: AssignDriverToZoneDto): Promise<void> {
        return apiPost('/delivery-zones/assign-driver', dto)
    },

    async unassignDriver(driverId: string, zoneId: string): Promise<void> {
        return apiDelete(`/delivery-zones/unassign-driver/${driverId}/${zoneId}`)
    },
}
