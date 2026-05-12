"use client"

import { Plus, Minus } from "lucide-react"
import { useCartStore } from "@/store/cartStore"

interface CartStepProps {
    discountCode: string
    onDiscountChange: (val: string) => void
}

export default function CartStep({ discountCode, onDiscountChange }: CartStepProps) {
    const { items, updateItem } = useCartStore()

    return (
        <div>
            <h2 className="text-[22px] font-bold text-right mb-6 text-[#212121]" dir="rtl">
                سبد خرید ({items.length})
            </h2>
            <div className="flex flex-col gap-3">
                {items.map((item) => {
                    const img = (item.product.images as { url: string }[] | undefined)?.[0]?.url ?? null
                    const itemPrice = parseFloat(item.product.pricePerUnit) * item.quantity
                    const f = new Intl.NumberFormat("fa-IR").format(Math.round(itemPrice / 10))

                    return (
                        <div key={item.productId}
                             className="bg-white border border-[#E9E8E3] rounded-[16px] p-4 flex items-center gap-4" dir="rtl">
                            {/* تصویر */}
                            <div className="w-16 h-16 rounded-[10px] bg-[#F5F9F6] flex items-center justify-center shrink-0">
                                {img
                                    ? <img src={img} alt={item.product.name} className="w-full h-full object-contain" />
                                    : <span className="text-2xl">🍎</span>}
                            </div>

                            {/* اطلاعات */}
                            <div className="flex-1 text-right">
                                <p className="text-[15px] font-bold text-[#212121]">{item.product.name}</p>
                                <p className="text-[13px] text-[#505050]">{item.quantity} {item.product.unit}</p>
                                <p className="text-[13px] text-[#51A46B] font-medium">قیمت کل: {f} تومان</p>
                            </div>

                            {/* counter */}
                            <div className="flex items-center border border-[#E9E8E3] rounded-[10px] overflow-hidden">
                                <button onClick={() => updateItem(item.productId, item.quantity - 1)}
                                        className="w-9 h-9 flex items-center justify-center hover:bg-[#F5F5F5]">
                                    <Minus size={14} />
                                </button>
                                <span className="w-9 text-center font-bold">{item.quantity}</span>
                                <button onClick={() => updateItem(item.productId, item.quantity + 1)}
                                        className="w-9 h-9 flex items-center justify-center hover:bg-[#F5F5F5]">
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}