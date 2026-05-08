import { create } from 'zustand'
import type { User, AuthResponse } from '@/types'
import { authService } from '@/services/auth.service'

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean

    // Actions
    setUser: (user: User) => void
    setSession: (data: AuthResponse) => void
    logout: () => Promise<void>
    initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    setUser: (user) =>
        set({ user, isAuthenticated: true }),

    setSession: (data) =>
        set({ user: data.user as unknown as User, isAuthenticated: true }),

    logout: async () => {
        await authService.logout()
        set({ user: null, isAuthenticated: false })
    },

    initialize: async () => {
        set({ isLoading: true })
        try {
            const session = await authService.initSession()
            if (session) {
                set({
                    user: session.user as unknown as User,
                    isAuthenticated: true,
                })
            }
        } catch {
            // No session - that's fine
        } finally {
            set({ isLoading: false })
        }
    },
}))
