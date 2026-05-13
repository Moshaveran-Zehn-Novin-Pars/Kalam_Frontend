export interface Warehouse {
    id: string
    name: string
    ownerId: string | null
    address: string
    lat: string
    lng: string
    totalCapacityKg: number
    availableKg: number
    hasRefrigeration: boolean
    tempMin: number | null
    tempMax: number | null
    pricePerKgPerDay: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    reservations?: WarehouseReservation[]
}

export interface WarehouseReservation {
    id: string
    warehouseId: string
    userId: string
    quantityKg: number
    startDate: string
    endDate: string
    totalPrice: string
    status: string
    createdAt: string
}

export interface CreateWarehouseDto {
    name: string
    address: string
    lat: number
    lng: number
    totalCapacityKg: number
    hasRefrigeration?: boolean
    tempMin?: number
    tempMax?: number
    pricePerKgPerDay: number
}

export interface ReserveWarehouseDto {
    quantityKg: number
    startDate: string
    endDate: string
}
