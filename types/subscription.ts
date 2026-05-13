import type { PaymentMethod } from './enums'
import type { Product } from './product'
import type { Address } from './address'

export interface Subscription {
    id: string
    buyerId: string
    productId: string
    quantity: string
    frequency: string
    nextOrderAt: string
    addressId: string
    paymentMethod: PaymentMethod
    status: string
    createdAt: string
    updatedAt: string
    product?: Product
    address?: Address
}

export interface CreateSubscriptionDto {
    productId: string
    addressId: string
    quantity: number
    frequency: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY'
    startDate: string
    endDate?: string
    notes?: string
}
