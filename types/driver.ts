export interface DriverProfile {
    id: string
    userId: string
    vehicleType: string
    vehiclePlate: string
    capacityKg: number
    hasRefrigeration: boolean
    licenseNumber: string
    licenseExpiresAt: string
    ratingAvg: string
    ratingCount: number
    ordersDelivered: number
    currentLat: string | null
    currentLng: string | null
    isAvailable: boolean
    createdAt: string
    updatedAt: string
}

export interface UpdateDriverDto {
    isAvailable?: boolean
    currentLat?: number
    currentLng?: number
}
