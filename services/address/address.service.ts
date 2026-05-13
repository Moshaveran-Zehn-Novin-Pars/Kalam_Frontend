import { apiGet, apiPost, apiPatch, apiDelete } from '@/services/api'
import type { Address, CreateAddressDto, UpdateAddressDto } from '@/types'

export const addressService = {
    async findAll(): Promise<Address[]> {
        return apiGet<Address[]>('/addresses')
    },

    async findOne(id: string): Promise<Address> {
        return apiGet<Address>(`/addresses/${id}`)
    },

    async create(dto: CreateAddressDto): Promise<Address> {
        return apiPost<Address>('/addresses', dto)
    },

    async update(id: string, dto: UpdateAddressDto): Promise<Address> {
        return apiPatch<Address>(`/addresses/${id}`, dto)
    },

    async remove(id: string): Promise<void> {
        return apiDelete(`/addresses/${id}`)
    },

    async setDefault(id: string): Promise<Address> {
        return apiPatch<Address>(`/addresses/${id}/set-default`)
    },
}
