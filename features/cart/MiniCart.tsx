"use client"

import { useCartStore } from "@/store/cartStore"

export default function MiniCart() {
    const { items, isOpen, closeCart } = useCartStore()

    if (!isOpen) return null

    return (
        <>
            {/* overlay */}
            <div
                onClick={closeCart}
                className="fixed inset-0 bg-black/30 z-40"
            />

            {/* sidebar */}
            <div className="fixed top-0 right-0 w-80 h-full bg-white z-50 shadow-xl p-4">
                <h2 className="text-lg font-semibold mb-4">سبد خرید</h2>

                {items.length === 0 && <p>سبد خالی است</p>}

                {items.map((item) => (
                    <div key={item.id} className="mb-2">
                        {item.title} x {item.quantity}
                    </div>
                ))}
            </div>
        </>
    )
}