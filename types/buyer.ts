export interface BuyerProfile {
    id: string
    userId: string
    businessName: string
    businessType: string
    economicCode: string | null
    nationalId: string | null
    creditLimit: string
    creditUsed: string
    ratingAvg: string
    ratingCount: number
    totalPurchases: string
    verifiedAt: string | null
    createdAt: string
    updatedAt: string
}

export interface UpdateBuyerDto {
    businessName?: string
    businessType?: string
    economicCode?: string
}
