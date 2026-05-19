import { apiGet, apiPost } from '@/services/api'
import type { KYCRequest, StartKYCDto, VerifyKYCDto } from '@/types'

export const kycService = {
    async start(dto: StartKYCDto): Promise<KYCRequest> {
        return apiPost<KYCRequest>('/kyc/start', dto)
    },

    async verify(dto: VerifyKYCDto): Promise<KYCRequest> {
        return apiPost<KYCRequest>('/kyc/verify', dto)
    },

    async getStatus(): Promise<KYCRequest> {
        return apiGet<KYCRequest>('/kyc/status')
    },
}
