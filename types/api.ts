export interface ApiResponse<T> {
    success: boolean
    data: T
    meta?: PaginationMeta
}

export interface PaginationMeta {
    page: number
    pageSize: number
    total: number
    totalPages: number
}

export interface PaginatedResponse<T> {
    items: T[]
    meta: PaginationMeta
}
