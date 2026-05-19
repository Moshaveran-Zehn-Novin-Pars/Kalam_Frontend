import { apiGet, apiPatch, apiPost } from '@/services/api'
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
    async getAllPayments(params?: { status?: string }): Promise<any[]> { return apiGet('/admin/payments', { params }) },
    async getKycRequests(params?: { status?: string }): Promise<any[]> { return apiGet('/admin/kyc', { params }) },
    async approveKyc(id: string): Promise<any> { return apiPost(`/admin/kyc/${id}/approve`) },
    async rejectKyc(id: string, reason?: string): Promise<any> { return apiPost(`/admin/kyc/${id}/reject`, { reason }) },
    async getContentPosts(): Promise<any[]> { return apiGet('/admin/content/posts') },
    async getContentFaqs(): Promise<any[]> { return apiGet('/admin/content/faqs') },
    async createPost(dto: any): Promise<any> { return apiPost('/admin/content/posts', dto) },
    async createFaq(dto: any): Promise<any> { return apiPost('/admin/content/faqs', dto) },
    async deletePost(id: string): Promise<void> { return apiPost(`/admin/content/posts/${id}/delete`) },
    async deleteFaq(id: string): Promise<void> { return apiPost(`/admin/content/faqs/${id}/delete`) },
    async getSettings(): Promise<any> { return apiGet('/admin/settings') },
    async updateSettings(dto: any): Promise<any> { return apiPatch('/admin/settings', dto) },
}
