import type { Product } from './product'

export interface Cart {
    id: string
    userId: string
    items: CartItem[]
    createdAt: string
    updatedAt: string
}

export interface CartItem {
    id: string
    cartId: string
    productId: string
    quantity: string
    addedAt: string
    product?: Product
}

export interface AddToCartDto {
    productId: string
    quantity: number
}

export interface UpdateCartItemDto {
    quantity: number
}

export interface LocalCartItem {
    productId: string
    product: Product
    quantity: number
}
