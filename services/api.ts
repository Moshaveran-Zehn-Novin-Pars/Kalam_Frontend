import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'
import type { ApiResponse } from '@/types'

// ============================================
// CONFIG
// ============================================

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'

// ============================================
// IN-MEMORY TOKEN STORE
// accessToken lives in memory (not localStorage)
// refreshToken lives in httpOnly cookie (managed by Next route handlers)
// ============================================

let accessToken: string | null = null

export const tokenStore = {
    get: () => accessToken,
    set: (token: string) => { accessToken = token },
    clear: () => { accessToken = null },
}

// ============================================
// AXIOS INSTANCE
// ============================================

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
    withCredentials: true, // send cookies with every request
})

// ============================================
// REQUEST INTERCEPTOR
// Attach accessToken to every request
// ============================================

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = tokenStore.get()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// ============================================
// RESPONSE INTERCEPTOR
// Handle 401 → auto refresh → retry
// ============================================

let isRefreshing = false
let failedQueue: Array<{
    resolve: (token: string) => void
    reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token!)
        }
    })
    failedQueue = []
}

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

        // If 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Queue this request until refresh is done
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then((token) => {
                    if (originalRequest.headers) {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`
                    }
                    return api(originalRequest)
                }).catch((err) => Promise.reject(err))
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                // Call our Next.js BFF route to refresh using the httpOnly cookie
                const res = await fetch('/api/auth/refresh', {
                    method: 'POST',
                    credentials: 'include',
                })

                if (!res.ok) throw new Error('Refresh failed')

                const data = await res.json()
                const newToken = data.accessToken

                tokenStore.set(newToken)
                processQueue(null, newToken)

                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`
                }

                return api(originalRequest)
            } catch (refreshError) {
                processQueue(refreshError, null)
                tokenStore.clear()

                // Redirect to login
                if (typeof window !== 'undefined') {
                    window.location.href = '/auth/login?expired=1'
                }

                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

// ============================================
// HELPER: Unwrap ApiResponse<T>
// Backend returns { success: true, data: T }
// ============================================

export async function apiGet<T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<T> {
    const res = await api.get<ApiResponse<T>>(url, config)
    return res.data.data
}

export async function apiGetPaginated<T>(
    url: string,
    config?: AxiosRequestConfig
) {
    const res = await api.get<ApiResponse<T>>(url, config)
    return res.data
}

export async function apiPost<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
): Promise<T> {
    const res = await api.post<ApiResponse<T>>(url, data, config)
    return res.data.data
}

export async function apiPatch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
): Promise<T> {
    const res = await api.patch<ApiResponse<T>>(url, data, config)
    return res.data.data
}

export async function apiDelete<T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<T> {
    const res = await api.delete<ApiResponse<T>>(url, config)
    return res.data.data
}

export default api