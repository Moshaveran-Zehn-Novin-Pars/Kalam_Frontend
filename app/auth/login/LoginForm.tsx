"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { authService } from "@/services/auth"
import { useAuthStore } from "@/store/authStore"
import { toLatinDigits } from "@/lib/utils"

type Step = "phone" | "otp"

export default function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get("redirect") || "/"

    const setSession = useAuthStore((s) => s.setSession)

    const [step, setStep] = useState<Step>("phone")
    const [phone, setPhone] = useState("")
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const [countdown, setCountdown] = useState(0)

    const otpInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (countdown <= 0) return
        const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
        return () => clearTimeout(t)
    }, [countdown])

    // فرمت دهی زمان به شکل فارسی (مثلا ۱:۵۵)
    const formatTimeFa = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        const timeString = `${m}:${s < 10 ? "0" : ""}${s}`
        return timeString.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)])
    }

    const handleSendOtp = async () => {
        const cleaned = toLatinDigits(phone.trim())
        if (!/^09\d{9}$/.test(cleaned)) {
            toast.error("شماره موبایل معتبر نیست")
            return
        }

        if (cleaned === "09100200300") {
            setStep("otp")
            setCountdown(115)
            setOtp("")
            setTimeout(() => otpInputRef.current?.focus(), 100)
            return
        }

        setLoading(true)
        try {
            await authService.sendOtp(cleaned)
            setStep("otp")
            setCountdown(115)
            setOtp("")
            setTimeout(() => otpInputRef.current?.focus(), 100)
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : "خطا در ارسال کد"
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async (codeToVerify?: string) => {
        const finalOtp = codeToVerify ?? otp
        if (finalOtp.length < 6) {
            toast.error("کد ۶ رقمی را کامل کنید")
            return
        }

        if (toLatinDigits(phone.trim()) === "09100200300" && finalOtp === "123456") {
            // ── MOCK ──
            document.cookie = "mock_test_user=09100200300; path=/"
            // ── END MOCK ──

            const mockData = {
                user: { firstName: "کاربر تست" },
            }
            setSession(mockData as any)
            toast.success("خوش آمدی کاربر تست")
            router.push(redirect)
            return
        }

        setLoading(true)
        try {
            const data = await authService.verifyOtp(toLatinDigits(phone.trim()), finalOtp)
            setSession(data)
            toast.success(`خوش آمدی ${data.user.firstName ?? ""}`)
            router.push(redirect)
        } catch (e: unknown) {
            toast.error("کد نامعتبر است")
            setOtp("")
        } finally {
            setLoading(false)
        }
    }

    const handleOtpChange = (value: string) => {
        const cleaned = toLatinDigits(value).replace(/\D/g, "").slice(0, 6)
        setOtp(cleaned)
        if (cleaned.length === 6) {
            handleVerifyOtp(cleaned)
        }
    }

    // تبدیل شماره موبایل به حروف فارسی برای نمایش
    const faPhone = phone.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)])

    return (
        <div className="w-full flex flex-col items-end text-right">
            <h1 className="text-[28px] sm:text-[32px] font-extrabold text-[#212121] mb-2 w-full">
                ورود یا ثبت نام
            </h1>
            <p className="text-[#8A8A8A] text-[14px] sm:text-[15px] mb-8 w-full">
                برای ادامه، شماره موبایل خود را وارد کنید
            </p>

            {/* ── مرحله اول ── */}
            {step === "phone" && (
                <div className="w-full flex flex-col gap-6 animate-fade-in">
                    <div className="relative w-full h-[56px] border border-[#E9E8E3] rounded-[14px] flex items-center px-4 focus-within:border-[#51A46B] transition-all bg-white">
                        <label className="absolute -top-[10px] right-4 bg-white px-2 text-[#8A8A8A] text-[13px] font-medium z-10">
                            شماره موبایل
                        </label>

                        {/* آیکون در سمت چپ فیلد */}
                        <div className="text-[#8A8A8A] ml-3">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                        </div>

                        <input
                            type="tel"
                            inputMode="numeric"
                            value={phone}
                            onChange={(e) => setPhone(toLatinDigits(e.target.value).replace(/\D/g, "").slice(0, 11))}
                            onKeyDown={(e) => e.key === "Enter" && phone.length === 11 && handleSendOtp()}
                            className="flex-1 h-full bg-transparent outline-none text-right text-[17px] text-[#212121] placeholder:text-[#E9E8E3] font-medium tracking-wide"
                            dir="ltr"
                            placeholder="09123456789"
                            maxLength={11}
                            autoFocus
                        />
                    </div>

                    <button
                        onClick={handleSendOtp}
                        disabled={loading || phone.length < 11}
                        className="w-full h-[56px] bg-[#9BC6A6] text-white rounded-[14px] text-[17px] font-bold hover:bg-[#51A46B] transition-colors disabled:opacity-70 mt-2"
                        style={{ backgroundColor: (phone.length === 11 && !loading) ? '#51A46B' : '#A3CBB0' }}
                    >
                        {loading ? "در حال ارسال..." : "ارسال کد"}
                    </button>
                </div>
            )}

            {/* ── مرحله دوم ── */}
            {step === "otp" && (
                <div className="w-full flex flex-col gap-6 animate-fade-in">
                    <p className="text-[#212121] text-[14px] w-full text-right font-medium">
                        کد تأیید ۶ رقمی به شماره <span className="font-bold">{faPhone}</span> ارسال شد.
                    </p>

                    {/* ردیف تایمر و ویرایش شماره */}
                    <div className="flex items-center justify-between w-full text-[13px] font-medium">
                        <button onClick={() => setStep("phone")} className="text-[#8A8A8A] hover:text-[#51A46B] transition-colors">
                            ویرایش شماره
                        </button>

                        {countdown > 0 ? (
                            <div className="flex items-center gap-2 bg-[#F5F5F5] text-[#8A8A8A] px-3 py-1.5 rounded-full">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                                </svg>
                                <span className="pt-0.5">{formatTimeFa(countdown)} تا ارسال مجدد</span>
                            </div>
                        ) : (
                            <button onClick={handleSendOtp} disabled={loading} className="text-[#51A46B] font-bold">
                                ارسال مجدد کد
                            </button>
                        )}
                    </div>

                    <div className="relative w-full" dir="ltr">
                        <input
                            ref={otpInputRef}
                            type="tel"
                            inputMode="numeric"
                            value={otp}
                            onChange={(e) => handleOtpChange(e.target.value)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            maxLength={6}
                            autoFocus
                        />

                        <div className="grid grid-cols-6 gap-2 sm:gap-3">
                            {Array(6).fill(0).map((_, index) => {
                                const char = otp[index] || ""
                                const isFocused = otp.length === index
                                return (
                                    <div
                                        key={index}
                                        className={`w-full h-[60px] sm:h-[68px] border rounded-[12px] flex items-center justify-center text-[24px] font-bold text-[#51A46B] transition-all bg-white
                                        ${isFocused ? "border-[#51A46B] ring-1 ring-[#51A46B]" : "border-[#E9E8E3]"} 
                                        ${char ? "border-[#51A46B]" : ""}`}
                                    >
                                        {/* تبدیل عدد انگلیسی به فارسی برای نمایش در باکس */}
                                        {char ? char.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]) : ""}
                                        {isFocused && (
                                            <div className="w-[1.5px] h-6 bg-[#51A46B] animate-pulse"></div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <button
                        onClick={() => handleVerifyOtp()}
                        disabled={loading || otp.length < 6}
                        className="w-full h-[56px] text-white rounded-[14px] text-[17px] font-bold transition-colors disabled:opacity-70 mt-4 shadow-sm"
                        style={{ backgroundColor: (otp.length === 6 && !loading) ? '#51A46B' : '#A3CBB0' }}
                    >
                        {loading ? "در حال بررسی..." : "ورود به کلم"}
                    </button>
                </div>
            )}
        </div>
    )
}