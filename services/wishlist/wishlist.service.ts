import { apiGet, apiPost, apiDelete } from '@/services/api'
import type { WishlistItem } from '@/types'

export const wishlistService = {
    async getWishlist(): Promise<WishlistItem[]> { return apiGet('/wishlist') },
    async addToWishlist(productId: string): Promise<WishlistItem> { return apiPost(`/wishlist/${productId}`) },
    async removeFromWishlist(productId: string): Promise<void> { return apiDelete(`/wishlist/${productId}`) },
    async clearWishlist(): Promise<void> { return apiDelete('/wishlist') },
    async isInWishlist(productId: string): Promise<{ inWishlist: boolean }> { return apiGet(`/wishlist/${productId}/check`) },
}
