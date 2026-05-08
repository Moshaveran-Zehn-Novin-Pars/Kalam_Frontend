import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, getApiUrl } from '@/lib/auth'

// ============================================
// ROUTE CONFIG
// ============================================

// Routes that require authentication
const PROTECTED_ROUTES = [
    '/account',
    '/checkout',
    '/cart',
]

// Routes only for specific roles
const ROLE_ROUTES: Record<string, string[]> = {
    '/farmer': ['FARMER', 'ADMIN'],
    '/admin': ['ADMIN', 'SUPPORT'],
    '/driver': ['DRIVER', 'ADMIN'],
}

// Routes only for guests (redirect to home if logged in)
const GUEST_ONLY_ROUTES = ['/auth/login', '/auth/signup']

// ============================================
// MIDDLEWARE
// ============================================

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl
    const refreshToken = req.cookies.get(COOKIE_NAME.REFRESH_TOKEN)?.value

    const isAuthenticated = !!refreshToken

    // Guest-only routes: redirect authenticated users
    if (GUEST_ONLY_ROUTES.some((r) => pathname.startsWith(r))) {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL('/', req.url))
        }
        return NextResponse.next()
    }

    // Protected routes: redirect guests to login
    if (PROTECTED_ROUTES.some((r) => pathname.startsWith(r))) {
        if (!isAuthenticated) {
            const loginUrl = new URL('/auth/login', req.url)
            loginUrl.searchParams.set('redirect', pathname)
            return NextResponse.redirect(loginUrl)
        }
    }

    // Role-based routes
    const matchedRoleRoute = Object.keys(ROLE_ROUTES).find((r) =>
        pathname.startsWith(r)
    )

    if (matchedRoleRoute && isAuthenticated) {
        const allowedRoles = ROLE_ROUTES[matchedRoleRoute]

        try {
            // Refresh to get fresh token + role
            const refreshRes = await fetch(getApiUrl('/auth/refresh'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            })

            if (!refreshRes.ok) {
                const loginUrl = new URL('/auth/login', req.url)
                return NextResponse.redirect(loginUrl)
            }

            const refreshData = await refreshRes.json()
            const newToken = refreshData.data?.accessToken

            if (newToken) {
                // Fetch user role
                const meRes = await fetch(getApiUrl('/auth/me'), {
                    headers: { Authorization: `Bearer ${newToken}` },
                })

                if (meRes.ok) {
                    const meData = await meRes.json()
                    const role: string = meData.data?.role

                    if (!allowedRoles.includes(role)) {
                        // Redirect unauthorized users to home
                        return NextResponse.redirect(new URL('/', req.url))
                    }
                }
            }
        } catch {
            // On error, just continue (don't block)
        }
    }

    return NextResponse.next()
}

// ============================================
// MATCHER: which paths this middleware runs on
// ============================================

export const config = {
    matcher: [
        '/account/:path*',
        '/checkout/:path*',
        '/cart/:path*',
        '/farmer/:path*',
        '/admin/:path*',
        '/driver/:path*',
        '/auth/:path*',
    ],
}