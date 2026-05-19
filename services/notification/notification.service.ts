import { apiGet, apiGetPaginated, apiPatch, apiPost } from '@/services/api'
import type { Notification, PaginatedResponse } from '@/types'

export const notificationService = {
    async getMyNotifications(params?: { page?: number; pageSize?: number; unreadOnly?: boolean }): Promise<PaginatedResponse<Notification>> {
        const res = await apiGetPaginated<PaginatedResponse<Notification>>('/notifications', { params })
        return res.data as PaginatedResponse<Notification>
    },
    async getUnreadCount(): Promise<{ count: number }> {
        return apiGet('/notifications/unread-count')
    },
    async markAsRead(id: string): Promise<Notification> {
        return apiPatch(`/notifications/${id}/read`)
    },
    async markAllAsRead(): Promise<void> {
        return apiPost('/notifications/read-all')
    },
    async cleanup(): Promise<void> {
        return apiPost('/notifications/cleanup')
    },
    async sendNotification(dto: { title: string; message: string; target: string }): Promise<any> {
        return apiPost('/notifications/send', dto)
    },
}
