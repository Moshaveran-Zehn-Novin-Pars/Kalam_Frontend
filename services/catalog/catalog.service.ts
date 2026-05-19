import { apiGet } from '@/services/api'
import type { CatalogItem } from '@/types'

export const catalogService = {
    async getAll(params?: { category?: string; search?: string; page?: number; pageSize?: number }): Promise<CatalogItem[]> {
        return apiGet<CatalogItem[]>('/catalog', { params })
    },
}
