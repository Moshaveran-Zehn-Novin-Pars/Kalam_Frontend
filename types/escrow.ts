export interface Escrow {
    id: string
    orderId: string
    amount: string
    status: 'held' | 'released_to_vendor' | 'released_to_buyer' | 'refunded'
    heldAt: string
    releasedAt: string | null
    createdAt: string
    updatedAt: string
}
