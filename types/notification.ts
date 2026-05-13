export interface Notification {
    id: string
    userId: string
    type: string
    title: string
    message: string
    data: Record<string, unknown> | null
    readAt: string | null
    channel: string
    createdAt: string
}
