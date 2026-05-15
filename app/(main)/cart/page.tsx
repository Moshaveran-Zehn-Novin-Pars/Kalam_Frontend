"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/store/cartStore"

export default function CartPage() {
    const { items, updateItem, removeItem, clearCart, totalPrice } = useCartStore()
    const [promoCode, setPromoCode] = useState("")
    const subtotal = totalPrice()
    const subtotalFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(subtotal / 10))

    return (
        <div className="w-[90%] md:w-4/5 mx-auto py-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#E5F2E9] flex items-center justify-center">
                    <ShoppingCart size={20} className="text-[#51A46B]" />
                </div>
                <h1 className="text-[24px] font-extrabold text-[#212121]">سبد خرید</h1>
                {items.length > 0 && (
                    <span className="text-[#8A8A8A] text-[14px]">{items.length} کالا</span>
                )}
            </div>

            {items.length === 0 ? (
                <div className="text-center py-20">
                    <div className="w-24 h-24 rounded-full bg-[#E5F2E9] flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag size={40} className="text-[#51A46B]" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-[18px] font-bold text-[#212121] mb-2">سبد خرید خالی است</h2>
                    <p className="text-[#8A8A8A] text-[14px] mb-6">محصولی را به سبد خود اضافه کنید</p>
                    <Link href="/products"
                          className="inline-flex items-center gap-2 bg-[#51A46B] text-white px-8 py-3 rounded-[12px] font-bold hover:bg-[#417F56] transition-colors">
                        <ShoppingBag size={18} /> مشاهده محصولات
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex-1 w-full space-y-4">
                        {items.map((item) => {
                            const img = (item.product.images as { url: string }[] | undefined)?.[0]?.url ?? null
                            const itemTotal = parseFloat(item.product.pricePerUnit) * item.quantity
                            const itemTotalFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(itemTotal / 10))
                            const priceFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(parseFloat(item.product.pricePerUnit) / 10))

                            return (
                                <div key={item.productId}
                                     className="flex items-center gap-4 p-4 border border-[#E9E8E3] rounded-[14px] bg-white">
                                    <div className="w-16 h-16 rounded-[10px] bg-[#F5F9F6] flex items-center justify-center shrink-0 overflow-hidden">
                                        {img
                                            ? <img src={img} alt={item.product.name} className="w-full h-full object-contain" />
                                            : <ShoppingCart size={24} className="text-[#51A46B]" />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <Link href={`/products/${item.product.slug}`}
                                              className="text-[15px] font-bold text-[#212121] hover:text-[#51A46B] transition-colors line-clamp-1">
                                            {item.product.name}
                                        </Link>
                                        <p className="text-[12px] text-[#8A8A8A] mt-1">
                                            {priceFormatted} تومان / {item.product.unit}
                                        </p>
                                    </div>

                                    <div className="flex items-center border border-[#E9E8E3] rounded-[10px] overflow-hidden shrink-0">
                                        <button onClick={() => updateItem(item.productId, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-[#F5F5F5] text-[#505050] transition-colors">
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-10 text-center text-[14px] font-bold text-[#212121]">{item.quantity}</span>
                                        <button onClick={() => updateItem(item.productId, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-[#F5F5F5] text-[#505050] transition-colors">
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    <div className="text-left shrink-0">
                                        <p className="text-[15px] font-bold text-[#51A46B]">{itemTotalFormatted}</p>
                                        <p className="text-[11px] text-[#8A8A8A]">تومان</p>
                                    </div>

                                    <button onClick={() => removeItem(item.productId)}
                                            className="p-2 hover:bg-red-50 rounded-[8px] text-[#8A8A8A] hover:text-red-500 transition-colors shrink-0">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            )
                        })}

                        <div className="flex items-center justify-between pt-2">
                            <button onClick={clearCart}
                                    className="text-[#8A8A8A] text-[13px] hover:text-red-500 transition-colors">
                                پاک کردن سبد
                            </button>
                            <Link href="/products"
                                  className="text-[#51A46B] text-[13px] font-medium hover:underline flex items-center gap-1">
                                <ArrowLeft size={14} /> ادامه خرید
                            </Link>
                        </div>
                    </div>

                    <div className="w-full lg:w-80 shrink-0">
                        <div className="border border-[#E9E8E3] rounded-[14px] p-6 bg-white sticky top-24">
                            <h3 className="font-bold text-[16px] text-[#212121] mb-4">خلاصه سبد خرید</h3>

                            <div className="space-y-3 text-[14px]">
                                <div className="flex justify-between">
                                    <span className="text-[#8A8A8A]">تعداد کالا</span>
                                    <span className="font-medium text-[#212121]">{items.length} کالا</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#8A8A8A]">جمع کالاها</span>
                                    <span className="font-medium text-[#212121]">{subtotalFormatted} تومان</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#8A8A8A]">هزینه حمل</span>
                                    <span className="font-medium text-[#212121]">—</span>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <input value={promoCode} onChange={e => setPromoCode(e.target.value)}
                                           placeholder="کد تخفیف"
                                           className="flex-1 border border-[#E9E8E3] rounded-[8px] px-3 py-2 text-[13px] outline-none focus:border-[#51A46B] text-right" />
                                    <button className="px-4 py-2 bg-[#F0F9F3] text-[#51A46B] rounded-[8px] text-[13px] font-medium hover:bg-[#E5F2E9] transition-colors">
                                        اعمال
                                    </button>
                                </div>
                            </div>

                            <div className="border-t border-[#E9E8E3] mt-4 pt-4">
                                <div className="flex justify-between text-[16px]">
                                    <span className="font-bold text-[#212121]">مبلغ قابل پرداخت</span>
                                    <span className="font-bold text-[#51A46B]">{subtotalFormatted} تومان</span>
                                </div>
                            </div>

                            <Link href="/checkout"
                                  className="block w-full bg-[#51A46B] text-white text-center py-3.5 rounded-[10px] font-bold text-[15px] hover:bg-[#417F56] transition-colors mt-5">
                                ادامه فرآیند خرید
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
