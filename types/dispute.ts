import type { DisputeStatus } from './enums'
import type { User } from './user'

export interface Dispute {
    id: string
    orderId: string
    openedById: string
    reason: string
    description: string
    evidence: Record<string, unknown> | null
    status: DisputeStatus
    resolution: string | null
    resolvedAt: string | null
    createdAt: string
    updatedAt: string
    openedBy?: Pick<User, 'id' | 'firstName' | 'lastName'>
}

export interface CreateDisputeDto {
    orderId: string
    reason: string
    description: string
    evidence?: Record<string, unknown>
}

export interface ResolveDisputeDto {
    resolution: string
}
