import { apiGet, apiGetPaginated, apiPost, apiPatch } from '@/services/api'
import type { Order, CreateOrderDto, QueryOrdersParams, PaginatedResponse } from '@/types'

export const orderService = {
  async getMyOrders(params?: QueryOrdersParams): Promise<PaginatedResponse<Order>> {
    const res = await apiGetPaginated<PaginatedResponse<Order>>('/orders', { params })
    return res.data as PaginatedResponse<Order>
  },

  async getOrder(id: string): Promise<Order> {
    return apiGet<Order>(`/orders/${id}`)
  },

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    return apiPost<Order>('/orders', dto)
  },

  async cancelOrder(id: string, reason?: string): Promise<Order> {
    return apiPost<Order>(`/orders/${id}/cancel`, { reason })
  },

  async confirmOrder(id: string): Promise<Order> {
    return apiPost<Order>(`/orders/${id}/confirm`)
  },

  // ADMIN
  async getAllOrders(params?: QueryOrdersParams): Promise<PaginatedResponse<Order>> {
    const res = await apiGetPaginated<PaginatedResponse<Order>>('/orders/admin', { params })
    return res.data as PaginatedResponse<Order>
  },
}
