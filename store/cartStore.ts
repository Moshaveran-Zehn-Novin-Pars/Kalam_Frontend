import { create } from "zustand"

type Product = {
    id: number
    title: string
    price: number
    image: string
}

type CartItem = Product & {
    quantity: number
}

type CartStore = {
    items: CartItem[]

    addToCart: (product: Product) => void
    removeFromCart: (id: number) => void
    isOpen: boolean
    openCart: () => void
    closeCart: () => void
}


export const useCartStore = create<CartStore>((set) => ({
    items: [],

    // 🆕 UI state
    isOpen: false,

    removeFromCart: (id: number) =>
        set((state) => ({
            items: state.items.filter((i) => i.id !== id),
        })),

    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),



    // 🛍️ logic
    addToCart: (product) =>
        set((state) => {
            const existing = state.items.find((i) => i.id === product.id)

            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.id === product.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    ),
                }
            }

            return {
                items: [...state.items, { ...product, quantity: 1 }],
            }
        }),
}))