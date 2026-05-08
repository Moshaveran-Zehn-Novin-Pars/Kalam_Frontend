"use client"

import { useState } from "react"
import { useCartStore } from "@/store/cartStore"
import { Plus, Minus, MapPin, Pencil } from "lucide-react"

const STEPS = ["سبد خرید", "آدرس و زمان تحویل سفارش", "پرداخت"]
const DAYS = [
    { label: "شنبه", date: "۱۲ بهمن" },
    { label: "یکشنبه", date: "۱۳ بهمن" },
    { label: "دوشنبه", date: "۱۴ بهمن", active: true },
    { label: "سه‌شنبه", date: "۱۵ بهمن" },
    { label: "چهارشنبه", date: "۱۶ بهمن" },
    { label: "پنجشنبه", date: "۱۷ بهمن" },
    { label: "جمعه", date: "۱۸ بهمن" },
]

export default function CheckoutPage() {
    const [step, setStep] = useState(0)
    const [selectedDay, setSelectedDay] = useState(2)
    const [selectedTime, setSelectedTime] = useState(1)
    const [discountCode, setDiscountCode] = useState("")
    const { items, updateItem, totalPrice } = useCartStore()

    const total = totalPrice()
    const totalFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(total / 10))
    const deliveryFee = 450000
    const deliveryFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(deliveryFee / 10))

    return (
        <div className="w-[90%] md:w-4/5 mx-auto py-8">

            {/* Stepper */}
            <div className="flex items-center justify-center mb-10 gap-0">
                {STEPS.map((s, i) => (
                    <div key={s} className="flex items-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className={`flex flex-col items-center gap-1 px-4 ${i === step ? "text-[#51A46B]" : "text-[#505050]"}`}>
                                <span className="text-[14px] font-medium whitespace-nowrap">{s}</span>
                                <div className={`h-[3px] w-full rounded-full transition-colors ${
                                    i <= step ? "bg-[#51A46B]" : "bg-[#E9E8E3]"
                                }`} style={{ minWidth: "120px" }} />
                            </div>
                        </div>
                        {i < STEPS.length - 1 && <div className="w-4" />}
                    </div>
                ))}
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* محتوای اصلی */}
                <div className="flex-1">
                    {step === 0 && (
                        <div>
                            <h2 className="text-[22px] font-bold text-right mb-6 text-[#212121]">
                                سبد خرید ({items.length})
                            </h2>
                            <div className="flex flex-col gap-3">
                                {items.map((item) => {
                                    const img = (item.product.images as { url: string }[] | undefined)?.[0]?.url ?? null
                                    const itemPrice = parseFloat(item.product.pricePerUnit) * item.quantity
                                    const f = new Intl.NumberFormat("fa-IR").format(Math.round(itemPrice / 10))

                                    return (
                                        <div key={item.productId}
                                             className="bg-white border border-[#E9E8E3] rounded-[16px] p-4 flex items-center gap-4">
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
                    )}

                    {step === 1 && (
                        <div className="flex flex-col gap-8 text-right">
                            {/* آدرس */}
                            <div>
                                <h2 className="text-[22px] font-bold text-[#212121] mb-4">آدرس</h2>
                                <div className="bg-white border border-[#E9E8E3] rounded-[16px] p-4 flex items-start gap-3">
                                    <button className="text-[#51A46B] hover:text-[#417F56] mt-1">
                                        <Pencil size={16} />
                                    </button>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <MapPin size={16} className="text-[#51A46B]" />
                                            <span className="text-[14px] text-[#505050]">خیابان بهشتی، خیابان سرافراز، کوچه بازدهم، پلاک ۱۰، واحد ۱۳</span>
                                        </div>
                                        <div className="flex gap-4 text-[13px] text-[#505050]">
                                            <span>شماره موبایل: ۰۹۴۳۸۴۷۵۸۷۲۱</span>
                                            <span>گیرنده: سوگند سلحشور</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="mt-3 flex items-center gap-1.5 text-[#51A46B] text-[14px] font-medium border border-[#51A46B] rounded-[10px] px-4 py-2 hover:bg-[#E5F2E9] transition-colors">
                                    <Plus size={14} />
                                    افزودن آدرس جدید
                                </button>
                            </div>

                            {/* زمان تحویل */}
                            <div>
                                <h2 className="text-[22px] font-bold text-[#212121] mb-4">زمان تحویل</h2>
                                <div className="flex gap-2 overflow-x-auto pb-2 flex-row-reverse">
                                    {DAYS.map((d, i) => (
                                        <button key={i} onClick={() => setSelectedDay(i)}
                                                className={`flex flex-col items-center px-4 py-3 rounded-[12px] border shrink-0 transition-colors ${
                                                    selectedDay === i
                                                        ? "border-[#51A46B] bg-[#51A46B] text-white"
                                                        : "border-[#E9E8E3] text-[#505050] hover:border-[#51A46B]"
                                                }`}>
                                            <span className="text-[14px] font-bold">{d.label}</span>
                                            <span className="text-[12px] mt-0.5">{d.date}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-4 flex flex-col gap-2">
                                    {["صبح از ساعت ۶ تا ۱۴", "عصر از ساعت ۱۴ تا ۱۸"].map((t, i) => (
                                        <label key={i} className="flex items-center justify-end gap-2 cursor-pointer text-[14px] text-[#505050]">
                                            {t}
                                            <input type="radio" name="time" checked={selectedTime === i}
                                                   onChange={() => setSelectedTime(i)}
                                                   className="accent-[#51A46B] w-4 h-4" />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* نحوه ارسال */}
                            <div>
                                <h2 className="text-[22px] font-bold text-[#212121] mb-4">نحوه‌ی ارسال</h2>
                                <div className="bg-white border border-[#51A46B] rounded-[16px] p-4 flex items-center justify-end gap-2">
                                    <span className="text-[14px] text-[#505050]">ارسال سریع و به موقع با پیک مجموعه‌ی کلم</span>
                                    <input type="radio" defaultChecked className="accent-[#51A46B] w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="text-center py-20">
                            <p className="text-[18px] font-bold text-[#212121] mb-4">در حال انتقال به درگاه پرداخت...</p>
                        </div>
                    )}
                </div>

                {/* sidebar خلاصه */}
                <div className="w-full md:w-[280px] shrink-0">
                    <div className="bg-white border border-[#E9E8E3] rounded-[20px] p-5 flex flex-col gap-4 text-right sticky top-8">
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
                                    onChange={(e) => setDiscountCode(e.target.value)}
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
                            onClick={() => setStep((s) => Math.min(s + 1, 2))}
                            className="w-full bg-[#51A46B] text-white rounded-[10px] py-3 font-bold text-[15px] hover:bg-[#417F56] transition-colors"
                        >
                            {step === 0 ? "تایید و تکمیل سفارش" : step === 1 ? "پرداخت" : "تایید"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}