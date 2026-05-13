export type UserRole = 'BUYER' | 'FARMER' | 'DRIVER' | 'ADMIN' | 'SUPPORT'

export type UserStatus =
    | 'PENDING_VERIFICATION'
    | 'ACTIVE'
    | 'SUSPENDED'
    | 'BANNED'

export type KycStatus = 'NOT_STARTED' | 'PENDING' | 'APPROVED' | 'REJECTED'

export type ProductStatus =
    | 'DRAFT'
    | 'PENDING_APPROVAL'
    | 'ACTIVE'
    | 'OUT_OF_STOCK'
    | 'ARCHIVED'

export type QualityGrade = 'A' | 'B' | 'C'

export type OrderStatus =
    | 'PENDING_PAYMENT'
    | 'PAID_HELD'
    | 'CONFIRMED'
    | 'PREPARING'
    | 'READY_FOR_PICKUP'
    | 'SHIPPING'
    | 'DELIVERED'
    | 'COMPLETED'
    | 'CANCELLED'
    | 'REFUNDED'
    | 'DISPUTED'

export type PaymentMethod =
    | 'ONLINE_GATEWAY'
    | 'WALLET'
    | 'CREDIT'
    | 'BANK_TRANSFER'

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'

export type DeliveryStatus =
    | 'PENDING_ASSIGNMENT'
    | 'ASSIGNED'
    | 'PICKING_UP'
    | 'IN_TRANSIT'
    | 'DELIVERED'
    | 'FAILED'

export type TransactionType =
    | 'DEPOSIT'
    | 'WITHDRAWAL'
    | 'PURCHASE'
    | 'REFUND'
    | 'COMMISSION'
    | 'PAYOUT'
    | 'ESCROW_HOLD'
    | 'ESCROW_RELEASE'

export type DisputeStatus = 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'CLOSED'
