import { apiGet } from '@/services/api'
import type { AdminStats } from '@/types'

export const adminService = {
    async getDashboardStats(): Promise<AdminStats> { return apiGet('/admin/dashboard') },
    async getRevenueChart(months?: number): Promise<any> { return apiGet('/admin/revenue-chart', { params: { months } }) },
    async getOrdersByStatus(): Promise<any> { return apiGet('/admin/orders-by-status') },
    async getTopProducts(limit?: number): Promise<any[]> { return apiGet('/admin/top-products', { params: { limit } }) },
    async getTopFarmers(limit?: number): Promise<any[]> { return apiGet('/admin/top-farmers', { params: { limit } }) },
    async getRecentOrders(limit?: number): Promise<any[]> { return apiGet('/admin/recent-orders', { params: { limit } }) },
    async getUserGrowthChart(months?: number): Promise<any> { return apiGet('/admin/user-growth', { params: { months } }) },
    async getCategorySales(): Promise<any> { return apiGet('/admin/category-sales') },
    async getSystemStats(): Promise<any> { return apiGet('/admin/system-stats') },
}
