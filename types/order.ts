import type { OrderStatus, PaymentMethod } from './enums'
import type { User } from './user'
import type { Address } from './address'
import type { Payment } from './payment'
import type { Delivery } from './delivery'
import type { Invoice } from './invoice'
import type { Dispute } from './dispute'
import type { Product } from './product'

export interface Order {
    id: string
    orderNumber: string
    buyerId: string
    addressId: string
    status: OrderStatus
    subtotal: string
    deliveryFee: string
    tax: string
    total: string
    commissionTotal: string
    paymentMethod: PaymentMethod
    requestedDeliveryAt: string | null
    notes: string | null
    cancelReason: string | null
    createdAt: string
    updatedAt: string
    buyer?: Pick<User, 'id' | 'firstName' | 'lastName' | 'phone'>
    address?: Address
    items?: OrderItem[]
    payment?: Payment
    delivery?: Delivery
    invoice?: Invoice
    disputes?: Dispute[]
    statusHistory?: OrderStatusHistory[]
}

export interface OrderItem {
    id: string
    orderId: string
    productId: string
    farmerId: string
    productName: string
    quantity: string
    unit: string
    pricePerUnit: string
    subtotal: string
    commissionRate: string
    commission: string
    product?: Product
}

export interface OrderStatusHistory {
    id: string
    orderId: string
    status: OrderStatus
    changedBy: string | null
    reason: string | null
    createdAt: string
}

export interface CreateOrderDto {
    addressId: string
    paymentMethod: PaymentMethod
    requestedDeliveryAt?: string
    notes?: string
}

export interface CancelOrderDto {
    reason?: string
}

export interface QueryOrdersParams {
    page?: number
    pageSize?: number
    status?: OrderStatus
}
