"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, ShoppingBag, ArrowLeft, Home } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

export default function CheckoutSuccessPage() {
    const { orderId } = useParams<{ orderId: string }>()

    return (
        <div className="w-[90%] md:w-4/5 mx-auto py-8">
            <div className="max-w-lg mx-auto text-center">
                <div className="w-20 h-20 rounded-full bg-[#E5F2E9] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={44} className="text-[#51A46B]" />
                </div>

                <h1 className="text-[26px] font-extrabold text-[#212121] mb-3">سفارش شما ثبت شد</h1>
                <p className="text-[#8A8A8A] text-[15px] mb-2">
                    سفارش شما با موفقیت ثبت و برای تأیید باغدار ارسال شد.
                </p>
                <p className="text-[#8A8A8A] text-[14px] mb-8">
                    شماره سفارش: <span className="font-bold text-[#212121]">{fa(orderId)}</span>
                </p>

                <div className="border border-[#E9E8E3] rounded-[14px] p-6 bg-white mb-8 text-right">
                    <h3 className="font-bold text-[15px] text-[#212121] mb-4">مراحل بعدی</h3>
                    <div className="space-y-4">
                        {[
                            { step: "۱", title: "تأیید باغدار", desc: "باغدار سفارش شما را بررسی و تأیید می‌کند." },
                            { step: "۲", title: "آماده‌سازی و بسته‌بندی", desc: "محصولات آماده و بسته‌بندی می‌شوند." },
                            { step: "۳", title: "ارسال و تحویل", desc: "سفارش توسط راننده به آدرس شما تحویل داده می‌شود." },
                        ].map(s => (
                            <div key={s.step} className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#F0F9F3] text-[#51A46B] flex items-center justify-center text-[13px] font-bold shrink-0">
                                    {s.step}
                                </div>
                                <div>
                                    <p className="text-[14px] font-semibold text-[#212121]">{s.title}</p>
                                    <p className="text-[12px] text-[#8A8A8A]">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/account/orders"
                          className="inline-flex items-center justify-center gap-2 bg-[#51A46B] text-white px-8 py-3 rounded-[12px] font-bold text-[14px] hover:bg-[#417F56] transition-colors">
                        <ShoppingBag size={18} /> پیگیری سفارش
                    </Link>
                    <Link href="/"
                          className="inline-flex items-center justify-center gap-2 border border-[#51A46B] text-[#51A46B] px-8 py-3 rounded-[12px] font-bold text-[14px] hover:bg-[#F0F9F3] transition-colors">
                        <Home size={18} /> صفحه اصلی
                    </Link>
                </div>
            </div>
        </div>
    )
}
