import { apiGet, apiGetPaginated, apiPost, apiPatch, apiDelete } from '@/services/api'
import type { Product, QueryProductsParams, PaginatedResponse, CreateProductDto, UpdateProductDto } from '@/types'

export const productService = {
    // Public: list products with filters + pagination
    async getProducts(params?: QueryProductsParams): Promise<PaginatedResponse<Product>> {
        const res = await apiGetPaginated<Product[]>('/products', { params })
        return { items: res.data, meta: res.meta! }
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
        const res = await apiGetPaginated<Product[]>('/products/my', { params })
        return { items: res.data, meta: res.meta! }
    },

    async createProduct(dto: CreateProductDto): Promise<Product> {
        return apiPost<Product>('/products', dto)
    },

    async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
        return apiPatch<Product>(`/products/${id}`, dto)
    },

    async deleteProduct(id: string): Promise<void> {
        return apiDelete(`/products/${id}`)
    },

    async approveProduct(id: string): Promise<Product> {
        return apiPost<Product>(`/products/${id}/approve`)
    },

    // ADMIN: all products
    async findAllAdmin(params?: QueryProductsParams): Promise<PaginatedResponse<Product>> {
        const res = await apiGetPaginated<Product[]>('/products/admin/all', { params })
        return { items: res.data, meta: res.meta! }
    },
}
