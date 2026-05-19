import { apiGet } from '@/services/api'
import type { AnalyticsDashboard, RevenueAnalytics, OrderAnalytics, ProductAnalytics, UserAnalytics } from '@/types'

export const analyticsService = {
    async getDashboard(params?: { from?: string; to?: string }): Promise<AnalyticsDashboard> {
        return apiGet<AnalyticsDashboard>('/analytics/dashboard', { params })
    },

    async getRevenue(params?: { from?: string; to?: string }): Promise<RevenueAnalytics> {
        return apiGet<RevenueAnalytics>('/analytics/revenue', { params })
    },

    async getOrders(params?: { from?: string; to?: string }): Promise<OrderAnalytics> {
        return apiGet<OrderAnalytics>('/analytics/orders', { params })
    },

    async getProducts(params?: { from?: string; to?: string }): Promise<ProductAnalytics> {
        return apiGet<ProductAnalytics>('/analytics/products', { params })
    },

    async getUsers(params?: { from?: string; to?: string }): Promise<UserAnalytics> {
        return apiGet<UserAnalytics>('/analytics/users', { params })
    },
}
