import type { DeliveryStatus } from './enums'
import type { DriverProfile } from './driver'
import type { User } from './user'

export interface Delivery {
    id: string
    orderId: string
    driverId: string | null
    status: DeliveryStatus
    pickupLat: string
    pickupLng: string
    dropoffLat: string
    dropoffLng: string
    distanceKm: string | null
    deliveryFee: string
    scheduledAt: string | null
    pickedUpAt: string | null
    deliveredAt: string | null
    proofImage: string | null
    signatureImage: string | null
    recipientName: string | null
    temperatureLog: Record<string, unknown> | null
    createdAt: string
    updatedAt: string
    driver?: DriverProfile & { user?: Pick<User, 'firstName' | 'lastName' | 'phone' | 'avatar'> }
    locations?: DeliveryLocation[]
}

export interface DeliveryLocation {
    id: string
    deliveryId: string
    lat: string
    lng: string
    timestamp: string
}

export interface AssignDriverDto {
    driverId: string
}

export interface UpdateLocationDto {
    lat: number
    lng: number
}

export interface ConfirmDeliveryDto {
    proofImage?: string
    signatureImage?: string
    recipientName?: string
}

export interface TemperatureLog {
    temperature: number
    timestamp: string
    location?: { lat: number; lng: number }
}

export interface AutoAssignDto {
    zoneId?: string
    priority?: 'nearest' | 'least_busy'
}
