import { apiGet, apiPost } from '@/services/api'
import type { Warehouse, CreateWarehouseDto, ReserveWarehouseDto } from '@/types'

export const warehouseService = {
    async findAll(params?: { hasRefrigeration?: boolean }): Promise<Warehouse[]> { return apiGet('/warehouses', { params }) },
    async createWarehouse(dto: CreateWarehouseDto): Promise<Warehouse> { return apiPost('/warehouses', dto) },
    async getMyReservations(): Promise<any[]> { return apiGet('/warehouses/my-reservations') },
    async findById(id: string): Promise<Warehouse> { return apiGet(`/warehouses/${id}`) },
    async reserveSpace(id: string, dto: ReserveWarehouseDto): Promise<any> { return apiPost(`/warehouses/${id}/reserve`, dto) },
    async cancelReservation(id: string): Promise<void> { return apiPost(`/warehouses/reservations/${id}/cancel`) },
}
