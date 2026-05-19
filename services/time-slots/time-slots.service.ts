import { apiGet, apiPost, apiPatch, apiDelete } from '@/services/api'
import type { TimeSlot, TimeSlotTemplate, AvailableDate, CreateTemplateDto, UpdateTemplateDto } from '@/types'

export const timeSlotsService = {
    async getAvailable(date?: string, branchId?: string): Promise<TimeSlot[]> {
        return apiGet<TimeSlot[]>('/time-slots/available', { params: { date, branchId } })
    },

    async getAvailableDates(month?: number, year?: number): Promise<AvailableDate[]> {
        return apiGet<AvailableDate[]>('/time-slots/available-dates', { params: { month, year } })
    },

    async getTemplates(branchId?: string): Promise<TimeSlotTemplate[]> {
        return apiGet<TimeSlotTemplate[]>('/time-slots/templates', { params: { branchId } })
    },

    async createTemplate(dto: CreateTemplateDto): Promise<TimeSlotTemplate> {
        return apiPost<TimeSlotTemplate>('/time-slots/templates', dto)
    },

    async updateTemplate(id: string, dto: UpdateTemplateDto): Promise<TimeSlotTemplate> {
        return apiPatch<TimeSlotTemplate>(`/time-slots/templates/${id}`, dto)
    },

    async deleteTemplate(id: string): Promise<void> {
        return apiDelete(`/time-slots/templates/${id}`)
    },

    async generateSlots(startDate: string, endDate?: string): Promise<{ generated: number }> {
        return apiPost<{ generated: number }>('/time-slots/generate', { startDate, endDate })
    },
}
