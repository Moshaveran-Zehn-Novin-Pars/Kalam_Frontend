import { apiGet, apiPost, apiPatch, apiDelete } from '@/services/api'
import type { Category, CreateCategoryDto, UpdateCategoryDto } from '@/types'

export const categoryService = {
    async getCategories(): Promise<Category[]> {
        return apiGet<Category[]>('/categories')
    },

    async getCategory(idOrSlug: string): Promise<Category> {
        return apiGet<Category>(`/categories/${idOrSlug}`)
    },

    async getFlat(): Promise<Category[]> {
        return apiGet<Category[]>('/categories/flat')
    },

    async create(dto: CreateCategoryDto): Promise<Category> {
        return apiPost<Category>('/categories', dto)
    },

    async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
        return apiPatch<Category>(`/categories/${id}`, dto)
    },

    async remove(id: string): Promise<void> {
        return apiDelete(`/categories/${id}`)
    },
}
