export interface Address {
    id: string
    userId: string
    title: string
    fullAddress: string
    province: string
    city: string
    postalCode: string | null
    lat: string
    lng: string
    receiverName: string
    receiverPhone: string
    isDefault: boolean
    createdAt: string
    updatedAt: string
}

export interface CreateAddressDto {
    title: string
    fullAddress: string
    province: string
    city: string
    postalCode?: string
    lat: number
    lng: number
    receiverName: string
    receiverPhone: string
    isDefault?: boolean
}

export interface UpdateAddressDto {
    title?: string
    fullAddress?: string
    province?: string
    city?: string
    postalCode?: string
    lat?: number
    lng?: number
    receiverName?: string
    receiverPhone?: string
    isDefault?: boolean
}
