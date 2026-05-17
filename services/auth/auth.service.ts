import { apiGet, apiPost, tokenStore } from '@/services/api'
import type {
    SendOtpResponse,
    AuthResponse,
    User,
} from '@/types'

// ============================================
// AUTH SERVICE
// Handles OTP login, token management, profile
// ============================================

export const authService = {
    // Step 1: Send OTP to phone
    async sendOtp(phone: string): Promise<SendOtpResponse> {
        return apiPost<SendOtpResponse>('/auth/send-otp', { phone })
    },

    // Step 2: Verify OTP → get tokens
    async verifyOtp(phone: string, code: string): Promise<AuthResponse> {
        const data = await apiPost<AuthResponse>('/auth/verify-otp', { phone, code })
        tokenStore.set(data.accessToken)
        tokenStore.setRefresh(data.refreshToken)
        return data
    },

    // Refresh accessToken (called automatically by interceptor)
    async refreshToken(): Promise<void> {
        const rt = tokenStore.getRefresh()
        if (!rt) throw new Error('No refresh token')
        const data = await apiPost<{ accessToken: string; refreshToken: string }>('/auth/refresh', { refreshToken: rt })
        tokenStore.set(data.accessToken)
        tokenStore.setRefresh(data.refreshToken)
    },

    // Logout: clear tokens
    async logout(): Promise<void> {
        try {
            await apiPost('/auth/logout')
        } finally {
            tokenStore.clear()
        }
    },

    // Get current user info
    async getMe(): Promise<User> {
        return apiGet<User>('/auth/me')
    },

    // Initialize on app load: try to restore session from stored refresh token
    async initSession(): Promise<AuthResponse | null> {
        try {
            await authService.refreshToken()
            const user = await authService.getMe()
            const at = tokenStore.get()
            return { accessToken: at!, refreshToken: tokenStore.getRefresh()!, user: user as any }
        } catch {
            return null
        }
    },
}
