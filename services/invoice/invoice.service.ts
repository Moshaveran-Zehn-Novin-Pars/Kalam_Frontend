import { apiGet, apiPost, apiPatch } from '@/services/api'
import type { Invoice, CreditNoteDto } from '@/types'

export const invoiceService = {
    async findAll(): Promise<Invoice[]> { return apiGet('/invoices') },
    async getByOrder(orderId: string): Promise<Invoice> { return apiGet(`/invoices/order/${orderId}`) },
    async getInvoiceData(id: string): Promise<any> { return apiGet(`/invoices/${id}/data`) },
    async generateInvoice(orderId: string): Promise<Invoice> { return apiPost(`/invoices/order/${orderId}/generate`) },
    async downloadInvoice(id: string): Promise<Blob> { return apiGet(`/invoices/${id}/download`, { responseType: 'blob' }) },
    async updateStatus(id: string, status: string): Promise<Invoice> { return apiPatch(`/invoices/${id}/status`, { status }) },
    async createCreditNote(orderId: string, dto: CreditNoteDto): Promise<Invoice> { return apiPost(`/invoices/order/${orderId}/credit-note`, dto) },
}
