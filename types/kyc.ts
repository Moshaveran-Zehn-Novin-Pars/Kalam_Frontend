export interface KYCRequest {
    id: string
    userId: string
    status: 'pending' | 'verified' | 'rejected'
    documentType: string
    documentFront: string
    documentBack: string | null
    selfieImage: string | null
    rejectionReason: string | null
    submittedAt: string
    reviewedAt: string | null
    createdAt: string
    updatedAt: string
}

export interface StartKYCDto {
    documentType: string
    documentFront: string
    documentBack?: string
    selfieImage?: string
    nationalId: string
}

export interface VerifyKYCDto {
    code: string
}
