import { apiGet, apiPost } from '@/services/api'
import type { Invoice } from '@/types'

export const invoiceService = {
    async findAll(): Promise<Invoice[]> { return apiGet('/invoices') },
    async getByOrder(orderId: string): Promise<Invoice> { return apiGet(`/invoices/order/${orderId}`) },
    async getInvoiceData(id: string): Promise<any> { return apiGet(`/invoices/${id}/data`) },
    async generateInvoice(orderId: string): Promise<Invoice> { return apiPost(`/invoices/order/${orderId}/generate`) },
}
