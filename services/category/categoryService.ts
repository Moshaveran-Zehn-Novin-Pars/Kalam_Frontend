import { apiGet } from '@/services/api'
import type { Category } from '@/types'

export const categoryService = {
    async getCategories(): Promise<Category[]> {
        return apiGet<Category[]>('/categories')
    },

    async getCategory(idOrSlug: string): Promise<Category> {
        return apiGet<Category>(`/categories/${idOrSlug}`)
    },
}
