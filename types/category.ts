export interface Category {
    id: string
    name: string
    slug: string
    parentId: string | null
    imageUrl: string | null
    commissionRate: string
    isActive: boolean
    order: number
    createdAt: string
    updatedAt: string
    children?: Category[]
}

export interface CreateCategoryDto {
    name: string
    slug: string
    parentId?: string
    imageUrl?: string
    commissionRate?: number
    order?: number
    isActive?: boolean
}

export interface UpdateCategoryDto {
    name?: string
    slug?: string
    parentId?: string
    imageUrl?: string
    commissionRate?: number
    order?: number
    isActive?: boolean
}
