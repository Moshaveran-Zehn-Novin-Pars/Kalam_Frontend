import { apiGet, apiPost, apiPatch, apiDelete } from '@/services/api'
import type { Cart, AddToCartDto, UpdateCartItemDto } from '@/types'

export const cartService = {
  async getCart(): Promise<Cart> {
    return apiGet<Cart>('/cart')
  },

  async addItem(dto: AddToCartDto): Promise<Cart> {
    return apiPost<Cart>('/cart/items', dto)
  },

  async updateItem(productId: string, dto: UpdateCartItemDto): Promise<Cart> {
    return apiPatch<Cart>(`/cart/items/${productId}`, dto)
  },

  async removeItem(productId: string): Promise<{ message: string }> {
    return apiDelete(`/cart/items/${productId}`)
  },

  async clearCart(): Promise<{ message: string }> {
    return apiDelete('/cart')
  },
}
