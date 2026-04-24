"use client"

import { useCartStore } from "@/store/cartStore"
import { motion, AnimatePresence } from "framer-motion"

export default function MiniCart() {
    const { items, isOpen, closeCart } = useCartStore()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* overlay */}
                    <motion.div
                        onClick={closeCart}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 z-40"
                    />

                    {/* sidebar */}
                    <motion.div
                        initial={{ x: 300 }}
                        animate={{ x: 0 }}
                        exit={{ x: 300 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 w-80 h-full bg-white z-50 shadow-xl p-4"
                    >
                        <h2 className="text-lg font-semibold mb-4">سبد خرید</h2>

                        {items.length === 0 && <p>سبد خالی است</p>}

                        {items.map((item) => (
                            <div key={item.id} className="mb-2">
                                {item.title} x {item.quantity}
                            </div>
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}