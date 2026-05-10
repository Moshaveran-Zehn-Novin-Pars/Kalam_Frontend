"use client"

import { useCartStore } from "@/store/cartStore"

interface OrderSummaryProps {
    step: number
    discountCode: string
    onDiscountChange: (val: string) => void
    onNext: () => void
}

export default function OrderSummary({
                                         step,
                                         discountCode,
                                         onDiscountChange,
                                         onNext,
                                     }: OrderSummaryProps) {
    const { totalPrice } = useCartStore()

    const total = totalPrice()
    const totalFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(total / 10))
    const deliveryFee = 450000
    const deliveryFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(deliveryFee / 10))

    return (
        <div className="w-full md:w-[280px] shrink-0">
            <div className="bg-white border border-[#E9E8E3] rounded-[20px] p-5 flex flex-col gap-4 text-right sticky top-8" dir="rtl">

                <div className="flex justify-between text-[14px] text-[#505050]">
                    <span>{totalFormatted} تومان</span>
                    <span>قیمت کالاها:</span>
                </div>

                {step >= 1 && (
                    <div className="flex justify-between text-[14px] text-[#505050]">
                        <span>{deliveryFormatted} تومان</span>
                        <span>هزینه ارسال:</span>
                    </div>
                )}

                {step === 0 && (
                    <div className="flex items-center border border-[#E9E8E3] rounded-[10px] overflow-hidden">
                        <input
                            value={discountCode}
                            onChange={(e) => onDiscountChange(e.target.value)}
                            placeholder="کد تخفیف"
                            className="flex-1 px-3 py-2 text-[13px] text-right outline-none"
                        />
                    </div>
                )}

                <div className="h-px bg-[#E9E8E3]" />

                <div className="flex justify-between font-bold text-[15px]">
                    <span className="text-[#212121]">{totalFormatted} تومان</span>
                    <span>جمع سبد خرید:</span>
                </div>

                <button
                    onClick={onNext}
                    className="w-full bg-[#51A46B] text-white rounded-[10px] py-3 font-bold text-[15px] hover:bg-[#417F56] transition-colors"
                >
                    {step === 0 ? "تایید و تکمیل سفارش" : step === 1 ? "پرداخت" : "تایید"}
                </button>
            </div>
        </div>
    )
}