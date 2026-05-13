import { apiGet, apiPost, apiDelete } from '@/services/api'
import type { ProductImage } from '@/types'

export const storageService = {
    async uploadProductImage(productId: string, formData: FormData): Promise<ProductImage> {
        return apiPost(`/storage/products/${productId}/images`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },
    async getProductImages(productId: string): Promise<ProductImage[]> { return apiGet(`/storage/products/${productId}/images`) },
    async deleteProductImage(productId: string, imageId: string): Promise<void> { return apiDelete(`/storage/products/${productId}/images/${imageId}`) },
    async uploadAvatar(formData: FormData): Promise<{ url: string }> {
        return apiPost('/storage/avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },
}
