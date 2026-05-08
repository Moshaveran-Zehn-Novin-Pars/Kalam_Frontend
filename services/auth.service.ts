import { apiGet, apiPost, tokenStore } from './api'
import type {
    SendOtpResponse,
    AuthResponse,
    AuthTokens,
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
    // We proxy through Next.js BFF to set httpOnly cookie for refreshToken
    async verifyOtp(phone: string, code: string): Promise<AuthResponse> {
        const res = await fetch('/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ phone, code }),
        })

        if (!res.ok) {
            const err = await res.json()
            throw new Error(err.message || 'خطا در ورود')
        }

        const data: AuthResponse = await res.json()
        // Store accessToken in memory
        tokenStore.set(data.accessToken)
        return data
    },

    // Refresh accessToken (called automatically by interceptor)
    async refreshToken(): Promise<AuthTokens> {
        const res = await fetch('/api/auth/refresh', {
            method: 'POST',
            credentials: 'include',
        })

        if (!res.ok) throw new Error('Refresh failed')

        const data: AuthTokens = await res.json()
        tokenStore.set(data.accessToken)
        return data
    },

    // Logout: clear cookie + memory
    async logout(): Promise<void> {
        try {
            // Tell backend to revoke session
            await apiPost('/auth/logout')
        } finally {
            // Clear client-side state
            tokenStore.clear()
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            })
        }
    },

    // Get current user info
    async getMe(): Promise<User> {
        return apiGet<User>('/auth/me')
    },

    // Initialize on app load: try to restore session from cookie
    async initSession(): Promise<AuthResponse | null> {
        try {
            const res = await fetch('/api/auth/refresh', {
                method: 'POST',
                credentials: 'include',
            })

            if (!res.ok) return null

            const data = await res.json()
            tokenStore.set(data.accessToken)

            // Fetch user info
            const user = await authService.getMe()
            return { ...data, user }
        } catch {
            return null
        }
    },
}
