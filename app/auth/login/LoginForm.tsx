"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { authService } from "@/services/auth.service"
import { useAuthStore } from "@/store/authStore"
import { toLatinDigits } from "@/lib/utils"


type Step = "phone" | "otp"

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get("redirect") || "/"
    const expired = searchParams.get("expired") === "1"

    const setSession = useAuthStore((s) => s.setSession)

    const [step, setStep] = useState<Step>("phone")
    const [phone, setPhone] = useState("")
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [loading, setLoading] = useState(false)
    const [countdown, setCountdown] = useState(0)

    const otpRefs = useRef<(HTMLInputElement | null)[]>([])

    // Show expiry message
    useEffect(() => {
        if (expired) toast.error("نشست شما منقضی شده. لطفاً دوباره وارد شوید.")
    }, [expired])

    // Countdown timer
    useEffect(() => {
        if (countdown <= 0) return
        const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
        return () => clearTimeout(t)
    }, [countdown])

    // ── Step 1: Send OTP ──────────────────────
    const handleSendOtp = async () => {
        const cleaned = toLatinDigits(phone.trim())
        if (!/^09\d{9}$/.test(cleaned)) {
            toast.error("شماره موبایل معتبر نیست")
            return
        }

        setLoading(true)
        try {
            await authService.sendOtp(cleaned)
            setStep("otp")
            setCountdown(120)
            toast.success("کد تأیید ارسال شد")
            setTimeout(() => otpRefs.current[0]?.focus(), 100)
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : "خطا در ارسال کد"
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }

    // ── OTP input handling ────────────────────
    const handleOtpChange = (index: number, value: string) => {
        const digit = toLatinDigits(value).replace(/\D/g, "").slice(-1)
        const next = [...otp]
        next[index] = digit
        setOtp(next)
        if (digit && index < 5) otpRefs.current[index + 1]?.focus()
    }

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus()
        }
    }

    const handleOtpPaste = (e: React.ClipboardEvent) => {
        const pasted = toLatinDigits(e.clipboardData.getData("text")).replace(/\D/g, "").slice(0, 6)
        if (pasted.length === 6) {
            setOtp(pasted.split(""))
            otpRefs.current[5]?.focus()
        }
    }

    // ── Step 2: Verify OTP ───────────────────
    const handleVerifyOtp = async () => {
        const code = otp.join("")
        if (code.length < 6) {
            toast.error("کد ۶ رقمی را وارد کنید")
            return
        }

        setLoading(true)
        try {
            const data = await authService.verifyOtp(toLatinDigits(phone.trim()), code)
            setSession(data)
            toast.success(`خوش آمدی ${data.user.firstName ?? ""}`)
            router.push(redirect)
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : "کد نامعتبر است"
            toast.error(msg)
            setOtp(["", "", "", "", "", ""])
            otpRefs.current[0]?.focus()
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        if (countdown > 0) return
        setOtp(["", "", "", "", "", ""])
        await handleSendOtp()
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7FAF8] px-4">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white rounded-[20px] shadow-card p-8 md:p-10">

                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <Link href="/">
                            <Image src="/logo.svg" alt="کلم" width={80} height={48} />
                        </Link>
                    </div>

                    {/* ── Phone Step ── */}
                    {step === "phone" && (
                        <>
                            <h1 className="text-[22px] font-bold text-center text-neutral-12 mb-2">
                                ورود به کلم
                            </h1>
                            <p className="text-[14px] text-neutral-10 text-center mb-8">
                                شماره موبایل خود را وارد کنید
                            </p>

                            <div className="flex flex-col gap-4">
                                <input
                                    type="tel"
                                    inputMode="numeric"
                                    dir="ltr"
                                    placeholder="09xxxxxxxxx"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                                    className="w-full h-[52px] border border-[#E9E8E3] rounded-[10px] px-4 text-center text-[18px] tracking-widest focus:outline-none focus:border-primary transition-colors"
                                    maxLength={11}
                                    autoFocus
                                />

                                <button
                                    onClick={handleSendOtp}
                                    disabled={loading}
                                    className="w-full h-[52px] bg-primary text-white rounded-[10px] text-[17px] font-medium hover:bg-primary-dark transition-colors disabled:opacity-60"
                                >
                                    {loading ? "در حال ارسال..." : "دریافت کد تأیید"}
                                </button>
                            </div>

                            <p className="text-[13px] text-neutral-10 text-center mt-6">
                                با ورود، با{" "}
                                <Link href="#" className="text-primary underline">
                                    قوانین کلم
                                </Link>{" "}
                                موافقت می‌کنید
                            </p>
                        </>
                    )}

                    {/* ── OTP Step ── */}
                    {step === "otp" && (
                        <>
                            <h1 className="text-[22px] font-bold text-center text-neutral-12 mb-2">
                                کد تأیید
                            </h1>
                            <p className="text-[14px] text-neutral-10 text-center mb-1">
                                کد ۶ رقمی ارسال شده به
                            </p>
                            <p className="text-[16px] font-bold text-center text-primary mb-8 dir-ltr" dir="ltr">
                                {phone}
                            </p>

                            {/* OTP boxes */}
                            <div
                                className="flex justify-center gap-3 mb-6 flex-row-reverse"
                                onPaste={handleOtpPaste}
                            >
                                {otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        ref={(el) => { otpRefs.current[i] = el }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(i, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                        dir="ltr"
                                        className="w-[48px] h-[56px] border-2 border-[#E9E8E3] rounded-[10px] text-center text-[22px] font-bold focus:outline-none focus:border-primary transition-colors"
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleVerifyOtp}
                                disabled={loading || otp.join("").length < 6}
                                className="w-full h-[52px] bg-primary text-white rounded-[10px] text-[17px] font-medium hover:bg-primary-dark transition-colors disabled:opacity-60 mb-4"
                            >
                                {loading ? "در حال بررسی..." : "تأیید و ورود"}
                            </button>

                            {/* Resend + change number */}
                            <div className="flex justify-between items-center text-[13px]">
                                <button
                                    onClick={() => { setStep("phone"); setOtp(["","","","","",""]) }}
                                    className="text-neutral-10 hover:text-primary transition-colors"
                                >
                                    تغییر شماره
                                </button>

                                <button
                                    onClick={handleResend}
                                    disabled={countdown > 0}
                                    className="text-primary disabled:text-neutral-10 transition-colors"
                                >
                                    {countdown > 0
                                        ? `ارسال مجدد (${countdown})`
                                        : "ارسال مجدد کد"}
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Back to home */}
                <div className="text-center mt-6">
                    <Link href="/" className="text-[14px] text-neutral-10 hover:text-primary transition-colors">
                        بازگشت به صفحه اصلی
                    </Link>
                </div>
            </div>
        </div>
    )
}
