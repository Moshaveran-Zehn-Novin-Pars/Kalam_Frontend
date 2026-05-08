'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

/**
 * AuthProvider
 * Runs on app mount, tries to restore session from httpOnly cookie.
 * Must be placed in the root layout (client component).
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const initialize = useAuthStore((s) => s.initialize)

    useEffect(() => {
        initialize()
    }, [initialize])

    return <>{children}</>
}
