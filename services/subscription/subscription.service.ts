import { apiGet, apiPost, apiPatch } from '@/services/api'
import type { Subscription, CreateSubscriptionDto } from '@/types'

export const subscriptionService = {
    async getMySubscriptions(): Promise<Subscription[]> { return apiGet('/subscriptions') },
    async create(dto: CreateSubscriptionDto): Promise<Subscription> { return apiPost('/subscriptions', dto) },
    async pause(id: string): Promise<Subscription> { return apiPatch(`/subscriptions/${id}/pause`) },
    async resume(id: string): Promise<Subscription> { return apiPatch(`/subscriptions/${id}/resume`) },
    async cancel(id: string): Promise<Subscription> { return apiPost(`/subscriptions/${id}/cancel`) },
}
