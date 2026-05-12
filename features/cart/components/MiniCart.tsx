"use client"

import { useCartStore } from "@/store/cartStore"
import { X, ShoppingCart, Plus, Minus } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"

export default function MiniCart() {
    const { isOpen, closeCart, items, updateItem, removeItem, totalPrice } = useCartStore()

    const total = totalPrice()
    const totalFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(total / 10))

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div className="fixed inset-0 z-50"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}>

                    {/* overlay */}
                    <div className="absolute inset-0 bg-black/30" onClick={closeCart} />

                    {/* sidebar — از چپ */}
                    <motion.div
                        className="absolute left-0 top-0 h-full w-[300px] bg-white shadow-xl flex flex-col"
                        initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
                        transition={{ type: "spring", damping: 28, stiffness: 260 }}
                    >
                        {/* header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E9E8E3]">
                            <button onClick={closeCart} className="hover:text-[#51A46B] transition-colors">
                                <X size={20} />
                            </button>
                            <div className="flex items-center gap-2 font-bold text-[17px] text-[#212121]">
                                <ShoppingCart size={20} className="text-[#51A46B]" />
                                سبد خرید
                            </div>
                        </div>

                        {items.length === 0 ? (
                            /* حالت خالی */
                            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
                                <div className="w-24 h-24 rounded-full bg-[#E5F2E9] flex items-center justify-center">
                                    <ShoppingCart size={40} className="text-[#51A46B]" strokeWidth={1.5} />
                                </div>
                                <p className="text-[15px] text-[#505050] font-medium">هنوز سفارشی ثبت نشده است.</p>
                                <Link href="/products" onClick={closeCart}
                                      className="border border-[#51A46B] text-[#51A46B] rounded-[10px] px-6 py-2 text-[14px] hover:bg-[#51A46B] hover:text-white transition-colors">
                                    مشاهده محصولات
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* آیتم‌ها */}
                                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
                                    {items.map((item) => {
                                        const img = (item.product.images as { url: string }[] | undefined)?.[0]?.url ?? null
                                        const itemPrice = parseFloat(item.product.pricePerUnit) * item.quantity
                                        const itemPriceFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(itemPrice / 10))

                                        return (
                                            <div key={item.productId} className="flex items-center gap-3 pb-4 border-b border-[#E9E8E3] last:border-0">
                                                {/* تصویر */}
                                                <div className="w-14 h-14 rounded-[10px] bg-[#F5F9F6] flex items-center justify-center shrink-0 overflow-hidden">
                                                    {img
                                                        ? <img src={img} alt={item.product.name} className="w-full h-full object-contain" />
                                                        : <ShoppingCart size={20} className="text-[#51A46B]" />}
                                                </div>

                                                {/* اطلاعات */}
                                                <div className="flex-1 text-right min-w-0">
                                                    <p className="text-[14px] font-bold text-[#212121] truncate">{item.product.name}</p>
                                                    <p className="text-[12px] text-[#505050]">{item.quantity} {item.product.unit}</p>
                                                    <p className="text-[13px] font-bold text-[#51A46B]">{itemPriceFormatted} تومان</p>
                                                </div>

                                                {/* counter */}
                                                <div className="flex items-center border border-[#E9E8E3] rounded-[8px] overflow-hidden shrink-0">
                                                    <button onClick={() => updateItem(item.productId, item.quantity - 1)}
                                                            className="w-7 h-7 flex items-center justify-center hover:bg-[#F5F5F5] text-[#505050]">
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="w-7 text-center text-[13px] font-bold">{item.quantity}</span>
                                                    <button onClick={() => updateItem(item.productId, item.quantity + 1)}
                                                            className="w-7 h-7 flex items-center justify-center hover:bg-[#F5F5F5] text-[#505050]">
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* footer */}
                                <div className="px-5 py-4 border-t border-[#E9E8E3] flex flex-col gap-3">
                                    <div className="flex justify-between text-[15px]">
                                        <span className="font-bold text-[#212121]">{totalFormatted} تومان</span>
                                        <span className="text-[#505050]">جمع کل:</span>
                                    </div>
                                    <Link href="/checkout" onClick={closeCart}
                                          className="block w-full bg-[#51A46B] text-white text-center py-3 rounded-[10px] font-bold text-[15px] hover:bg-[#417F56] transition-colors">
                                        ثبت سفارش
                                    </Link>
                                    <button onClick={closeCart}
                                            className="w-full border border-[#51A46B] text-[#51A46B] text-center py-2.5 rounded-[10px] text-[14px] hover:bg-[#E5F2E9] transition-colors">
                                        ادامه خرید
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}