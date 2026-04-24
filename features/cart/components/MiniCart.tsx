"use client"

import { useCartStore } from "@/store/cartStore"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2 } from "lucide-react"
import Link from "next/link"

export default function MiniCart() {
    const { items, isOpen, closeCart, removeFromCart } = useCartStore()

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

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
                        className="fixed top-0 right-0 w-80 h-full bg-white z-50 shadow-xl p-4 flex flex-col"
                    >
                        <h2 className="text-lg font-semibold mb-4">سبد خرید</h2>

                        {/* لیست */}
                        <div className="flex-1 overflow-y-auto">
                            {items.length === 0 && <p>سبد خالی است</p>}

                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center mb-3 border-b pb-2"
                                >
                                    <div>
                                        <p className="text-sm">{item.title}</p>
                                        <p className="text-xs text-gray-500">
                                            {item.quantity} × ${item.price}
                                        </p>
                                    </div>

                                    <button onClick={() => removeFromCart(item.id)}>
                                        <Trash2 size={16} className="text-red-500" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* footer */}
                        <div className="border-t pt-4 mt-4">
                            <p className="flex justify-between mb-3">
                                <span>جمع:</span>
                                <span>${total}</span>
                            </p>

                            <Link
                                href="/checkout"
                                onClick={closeCart}
                                className="block text-center bg-[var(--primary)] text-white py-2 rounded-xl"
                            >
                                ادامه خرید
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}