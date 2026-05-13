import { apiGet, apiGetPaginated, apiPost } from '@/services/api'
import type { Review, CreateReviewDto, PaginatedResponse } from '@/types'

export const reviewService = {
    async create(dto: CreateReviewDto): Promise<Review> {
        return apiPost<Review>('/reviews', dto)
    },

    async getUserReviews(userId: string, params?: { page?: number; pageSize?: number }): Promise<PaginatedResponse<Review>> {
        const res = await apiGetPaginated<PaginatedResponse<Review>>(`/reviews/user/${userId}`, { params })
        return res.data as PaginatedResponse<Review>
    },

    async getFarmerReviews(farmerId: string, params?: { page?: number; pageSize?: number }): Promise<PaginatedResponse<Review>> {
        const res = await apiGetPaginated<PaginatedResponse<Review>>(`/reviews/farmer/${farmerId}`, { params })
        return res.data as PaginatedResponse<Review>
    },
}
