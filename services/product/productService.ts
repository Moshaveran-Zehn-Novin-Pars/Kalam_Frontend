import { apiGet, apiGetPaginated, apiPost } from '@/services/api'
import type { Product, QueryProductsParams, PaginatedResponse } from '@/types'

export const productService = {
    // Public: list products with filters + pagination
    async getProducts(params?: QueryProductsParams): Promise<PaginatedResponse<Product>> {
        const res = await apiGetPaginated<PaginatedResponse<Product>>('/products', { params })
        return res.data as PaginatedResponse<Product>
    },

    // Public: get product by id or slug
    async getProduct(idOrSlug: string): Promise<Product> {
        return apiGet<Product>(`/products/${idOrSlug}`)
    },

    // Public: search suggestions
    async searchSuggestions(q: string, limit = 10): Promise<{ id: string; name: string; slug: string }[]> {
        return apiGet('/products/search/suggestions', { params: { q, limit } })
    },

    // FARMER: my products
    async getMyProducts(params?: QueryProductsParams): Promise<PaginatedResponse<Product>> {
        const res = await apiGetPaginated<PaginatedResponse<Product>>('/products/my', { params })
        return res.data as PaginatedResponse<Product>
    },
}
