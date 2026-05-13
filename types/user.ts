import type { UserRole, UserStatus, KycStatus } from './enums'
import type { FarmerProfile } from './farmer'
import type { BuyerProfile } from './buyer'
import type { DriverProfile } from './driver'

export interface User {
    id: string
    phone: string
    email: string | null
    nationalCode: string | null
    firstName: string | null
    lastName: string | null
    role: UserRole
    status: UserStatus
    kycStatus: KycStatus
    avatar: string | null
    referralCode: string | null
    createdAt: string
    updatedAt: string
    farmer?: FarmerProfile | null
    buyer?: BuyerProfile | null
    driver?: DriverProfile | null
}

export interface UpdateProfileDto {
    firstName?: string
    lastName?: string
    email?: string
}
