export interface DeliveryZone {
    id: string
    name: string
    description: string | null
    boundaries: GeoPolygon
    baseFee: string
    feePerKm: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    drivers?: ZoneDriver[]
}

export interface GeoPolygon {
    type: 'Polygon'
    coordinates: number[][][]
}

export interface ZoneDriver {
    driverId: string
    zoneId: string
    assignedAt: string
}

export interface CreateDeliveryZoneDto {
    name: string
    description?: string
    boundaries: GeoPolygon
    baseFee: number
    feePerKm: number
}

export interface UpdateDeliveryZoneDto {
    name?: string
    description?: string
    boundaries?: GeoPolygon
    baseFee?: number
    feePerKm?: number
    isActive?: boolean
}

export interface AssignDriverToZoneDto {
    driverId: string
    zoneId: string
}
