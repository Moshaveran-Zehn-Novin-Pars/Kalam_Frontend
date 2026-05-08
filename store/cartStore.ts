import { create } from 'zustand'
import type { Product, LocalCartItem } from '@/types'

// ============================================
// CART STORE
// Manages local cart state (client-side)
// Synced with backend via cartService on demand
// ============================================

interface CartStore {
    items: LocalCartItem[]
    isOpen: boolean
    isSyncing: boolean

    // UI
    openCart: () => void
    closeCart: () => void

    // Cart actions (local-first, then sync with backend)
    addItem: (product: Product, quantity?: number) => void
    updateItem: (productId: string, quantity: number) => void
    removeItem: (productId: string) => void
    clearCart: () => void

    // Computed
    totalItems: () => number
    totalPrice: () => number

    // Sync from backend (called after login or on mount)
    hydrateFromBackend: (items: LocalCartItem[]) => void
    setIsSyncing: (v: boolean) => void
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    isOpen: false,
    isSyncing: false,

    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),

    addItem: (product, quantity = 1) =>
        set((state) => {
            const existing = state.items.find((i) => i.productId === product.id)
            const minQty = parseFloat(product.minOrderQty)
            const actualQty = Math.max(quantity, minQty)

            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.productId === product.id
                            ? { ...i, quantity: i.quantity + actualQty }
                            : i
                    ),
                }
            }

            return {
                items: [...state.items, { productId: product.id, product, quantity: actualQty }],
            }
        }),

    updateItem: (productId, quantity) =>
        set((state) => ({
            items: quantity <= 0
                ? state.items.filter((i) => i.productId !== productId)
                : state.items.map((i) =>
                    i.productId === productId ? { ...i, quantity } : i
                ),
        })),

    removeItem: (productId) =>
        set((state) => ({
            items: state.items.filter((i) => i.productId !== productId),
        })),

    clearCart: () => set({ items: [] }),

    totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

    totalPrice: () =>
        get().items.reduce(
            (sum, item) => sum + item.quantity * parseFloat(item.product.pricePerUnit),
            0
        ),

    hydrateFromBackend: (items) => set({ items }),
    setIsSyncing: (v) => set({ isSyncing: v }),
}))
