// Subset returned in product list responses
export interface VendorSummary {
    id: string
    businessName: string
    ratingAvg: string
    verifiedAt: string | null
}

export interface VendorProfile {
    id: string
    userId: string
    businessName: string
    businessType: string
    economicCode: string | null
    nationalId: string | null
    description: string | null
    address: string | null
    lat: string | null
    lng: string | null
    ratingAvg: string
    ratingCount: number
    totalSales: string
    commissionRate: string | null
    verifiedAt: string | null
    createdAt: string
    updatedAt: string
    branches?: VendorBranch[]
    certificates?: VendorCertificate[]
}

export interface VendorBranch {
    id: string
    vendorId: string
    name: string
    address: string
    lat: string | null
    lng: string | null
    phone: string | null
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface VendorCertificate {
    id: string
    vendorId: string
    type: string
    imageUrl: string
    issuedAt: string
    expiresAt: string | null
    verified: boolean
    createdAt: string
}

export interface CreateBranchDto {
    name: string
    address: string
    lat?: number
    lng?: number
    phone?: string
}

export interface UpdateBranchDto {
    name?: string
    address?: string
    lat?: number
    lng?: number
    phone?: string
    isActive?: boolean
}
