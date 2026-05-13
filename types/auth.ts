import type { UserRole, UserStatus } from './enums'

export interface AuthTokens {
    accessToken: string
    refreshToken: string
}

export interface AuthResponse extends AuthTokens {
    user: AuthUser
}

export interface AuthUser {
    id: string
    phone: string
    role: UserRole
    firstName: string | null
    lastName: string | null
    status: UserStatus
}

export interface SendOtpResponse {
    message: string
    expiresIn: number
}
