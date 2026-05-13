import type { FarmerProfile } from './farmer'

export interface Settlement {
    id: string
    farmerId: string
    periodStart: string
    periodEnd: string
    grossAmount: string
    commissionAmount: string
    deliveryFees: string
    taxes: string
    netAmount: string
    status: string
    paidAt: string | null
    createdAt: string
    farmer?: FarmerProfile
    payouts?: Payout[]
}

export interface Payout {
    id: string
    farmerId: string
    settlementId: string
    amount: string
    iban: string
    referenceId: string | null
    status: string
    paidAt: string | null
    failureReason: string | null
    createdAt: string
}

export interface CreateSettlementDto {
    farmerId: string
    periodStart: string
    periodEnd: string
}
