export interface TimeSlot {
    id: string
    vendorBranchId: string
    date: string
    startTime: string
    endTime: string
    capacity: number
    booked: number
    isHoliday: boolean
    isActive: boolean
    cutoffTime: string | null
    createdAt: string
    updatedAt: string
}

export interface TimeSlotTemplate {
    id: string
    vendorBranchId: string
    dayOfWeek: number
    startTime: string
    endTime: string
    capacity: number
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface AvailableDate {
    date: string
    slots: TimeSlot[]
}

export interface CreateTemplateDto {
    dayOfWeek: number
    startTime: string
    endTime: string
    capacity: number
}

export interface UpdateTemplateDto {
    startTime?: string
    endTime?: string
    capacity?: number
    isActive?: boolean
}
