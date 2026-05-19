import type { QualityGrade, ProductStatus } from './enums'
import type { VendorSummary } from './vendor'
import type { Category } from './category'

export interface Product {
    id: string
    farmerId?: string
    categoryId?: string
    name: string
    slug: string
    description?: string | null
    origin: string | null
    harvestDate?: string | null
    qualityGrade: QualityGrade
    unit: string
    pricePerUnit: string
    minOrderQty: string
    maxOrderQty?: string | null
    stockQty: string
    reservedQty?: string
    status: ProductStatus
    requiresColdChain: boolean
    storageTempMin?: number | null
    storageTempMax?: number | null
    shelfLifeDays?: number | null
    viewsCount?: number
    salesCount: number
    createdAt: string
    updatedAt?: string
    vendor?: VendorSummary
    category?: Category
    images?: ProductImage[]
    priceHistory?: PriceHistory[]
}

export interface ProductImage {
    id?: string
    productId?: string
    url: string
    fileName?: string | null
    fileSize?: number | null
    mimeType?: string | null
    order?: number
    isPrimary?: boolean
    createdAt?: string
}

export interface PriceHistory {
    id: string
    productId: string
    pricePerUnit: string
    recordedAt: string
}

export interface QueryProductsParams {
    page?: number
    pageSize?: number
    categoryId?: string
    farmerId?: string
    qualityGrade?: QualityGrade
    status?: ProductStatus
    minPrice?: number
    maxPrice?: number
    search?: string
    requiresColdChain?: boolean
    sortBy?: 'pricePerUnit' | 'createdAt' | 'ratingAvg'
    sortOrder?: 'asc' | 'desc'
}

export interface CreateProductDto {
    categoryId: string
    name: string
    slug: string
    description?: string
    origin?: string
    harvestDate?: string
    qualityGrade: QualityGrade
    unit: string
    pricePerUnit: number
    minOrderQty: number
    maxOrderQty?: number
    stockQty: number
    requiresColdChain?: boolean
    storageTempMin?: number
    storageTempMax?: number
    shelfLifeDays?: number
}

export interface UpdateProductDto {
    name?: string
    description?: string
    origin?: string
    harvestDate?: string
    qualityGrade?: QualityGrade
    unit?: string
    pricePerUnit?: number
    minOrderQty?: number
    maxOrderQty?: number
    stockQty?: number
    requiresColdChain?: boolean
    storageTempMin?: number
    storageTempMax?: number
    shelfLifeDays?: number
}
