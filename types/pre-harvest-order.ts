export interface PreHarvestOrder {
    id: string
    productId: string
    buyerId: string
    vendorId: string
    quantity: number
    unit: string
    agreedPrice: string
    depositAmount: string
    depositPaid: boolean
    status: 'pending' | 'growing' | 'harvested' | 'delivered' | 'cancelled'
    expectedHarvestDate: string
    actualHarvestDate: string | null
    notes: string | null
    createdAt: string
    updatedAt: string
}

export interface CreatePreHarvestOrderDto {
    productId: string
    quantity: number
    unit: string
    agreedPrice: number
    expectedHarvestDate: string
    notes?: string
}

export interface PayDepositDto {
    amount: number
    paymentMethod: string
}
