// ============================================
// lib/auth.ts
// Server-side auth utilities (Next.js Route Handlers)
// Cookie names and helpers used by route handlers
// ============================================

export const COOKIE_NAME = {
    REFRESH_TOKEN: 'kalam_rt',
} as const

export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
}

export function getApiUrl(path: string): string {
    const base = process.env.API_URL || 'http://localhost:3000/api/v1'
    return `${base}${path}`
}
