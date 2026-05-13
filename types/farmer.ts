export interface FarmerProfile {
    id: string
    userId: string
    businessName: string
    description: string | null
    farmLocation: string | null
    farmLat: string | null
    farmLng: string | null
    iban: string | null
    cardNumber: string | null
    ratingAvg: string
    ratingCount: number
    totalSales: string
    commissionRate: string | null
    verifiedAt: string | null
    createdAt: string
    updatedAt: string
    certificates?: Certificate[]
}

export interface Certificate {
    id: string
    farmerId: string
    type: string
    imageUrl: string
    issuedAt: string
    expiresAt: string | null
    verified: boolean
    createdAt: string
}

export interface UpdateFarmerDto {
    businessName?: string
    description?: string
    farmLocation?: string
    farmLat?: number
    farmLng?: number
    iban?: string
}
