export interface CreateCommissionRuleDto {
    categoryId?: string
    farmerId?: string
    rate: number
    validFrom: string
    validTo?: string
}

export interface UpdateCommissionRuleDto {
    rate?: number
    isActive?: boolean
}
