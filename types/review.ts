import type { User } from './user'

export interface Review {
    id: string
    orderId: string
    authorId: string
    targetId: string
    rating: number
    comment: string | null
    type: string
    createdAt: string
    author?: Pick<User, 'id' | 'firstName' | 'lastName' | 'avatar'>
    target?: Pick<User, 'id' | 'firstName' | 'lastName' | 'avatar'>
}

export interface CreateReviewDto {
    orderId: string
    targetId: string
    rating: number
    comment?: string
    type: string
}
