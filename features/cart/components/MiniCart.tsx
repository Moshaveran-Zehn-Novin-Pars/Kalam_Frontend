"use client"
import { useCartStore } from "@/store/cartStore"
import { X, ShoppingCart } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { formatPrice } from "@/lib/utils"

export default function MiniCart() {
    const { isOpen, closeCart, items, removeItem, totalPrice } = useCartStore()

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div className="fixed inset-0 z-50"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <button className="absolute inset-0 bg-black/40" onClick={closeCart} />
                    <motion.aside
                        className="absolute left-0 top-0 w-80 h-full bg-white shadow-xl flex flex-col"
                        initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}>
                        <div className="flex items-center justify-between p-5 border-b border-[#E9E8E3]">
                            <button onClick={closeCart}><X size={20} /></button>
                            <h2 className="font-bold text-[17px]">سبد خرید</h2>
                        </div>
                        {items.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-[#505050]">
                                <ShoppingCart size={48} className="text-[#E9E8E3]" />
                                <p>سبد خرید شما خالی است</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                                    {items.map((item) => (
                                        <div key={item.productId} className="flex items-center gap-3 border-b border-[#E9E8E3] pb-4">
                                            <div className="w-16 h-16 bg-[#F5F5F5] rounded-[10px] flex items-center justify-center shrink-0">
                                                {item.product.images?.[0]?.url
                                                    ? <img src={item.product.images[0].url} alt={item.product.name} className="w-full h-full object-contain" />
                                                    : <ShoppingCart size={20} className="text-[#51A46B]" />}
                                            </div>
                                            <div className="flex-1 text-right">
                                                <p className="text-[14px] font-bold truncate">{item.product.name}</p>
                                                <p className="text-[12px] text-[#505050]">{item.quantity} {item.product.unit}</p>
                                                <p className="text-[13px] font-bold text-[#51A46B]">{formatPrice(item.product.pricePerUnit)}</p>
                                            </div>
                                            <button onClick={() => removeItem(item.productId)} className="text-red-400 hover:text-red-600 shrink-0">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-5 border-t border-[#E9E8E3]">
                                    <div className="flex justify-between mb-4">
                                        <span className="font-bold text-[16px]">{formatPrice(totalPrice())}</span>
                                        <span className="text-[#505050]">جمع کل:</span>
                                    </div>
                                    <a href="/checkout"
                                       className="block w-full bg-[#51A46B] text-white text-center py-3 rounded-[10px] font-bold hover:bg-[#417F56] transition-colors">
                                        ادامه و پرداخت
                                    </a>
                                </div>
                            </>
                        )}
                    </motion.aside>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
