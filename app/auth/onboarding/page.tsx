"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuthStore } from "@/store/authStore"
import { ChevronDown, Store, Leaf, Truck } from "lucide-react"

const BUSINESS_TYPES = [
    { value: "SUPERMARKET", label: "سوپرمارکت" },
    { value: "RESTAURANT", label: "رستوران" },
    { value: "HOTEL", label: "هتل" },
    { value: "CAFE", label: "کافه" },
    { value: "FRUIT_SHOP", label: "میوه فروشی" },
    { value: "OTHER", label: "سایر" },
]

const ROLE_OPTIONS = [
    { value: "BUYER", label: "خریدار", icon: Store, desc: "سوپرمارکت، رستوران، هتل" },
    { value: "FARMER", label: "باغدار", icon: Leaf, desc: "تولیدکننده و باغدار" },
    { value: "DRIVER", label: "راننده", icon: Truck, desc: "حمل و نقل بار" },
]

export default function OnboardingPage() {
    const router = useRouter()
    const { user } = useAuthStore()
    const [step, setStep] = useState<"role" | "profile">("role")
    const [role, setRole] = useState("BUYER")
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        businessName: "",
        businessType: "",
    })
    const [loading, setLoading] = useState(false)

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

    const handleSubmit = async () => {
        if (!form.firstName.trim() || !form.lastName.trim()) {
            toast.error("نام و نام خانوادگی را وارد کنید")
            return
        }
        if (role === "BUYER" && !form.businessName.trim()) {
            toast.error("نام کسب‌وکار را وارد کنید")
            return
        }

        setLoading(true)
        try {
            await new Promise(r => setTimeout(r, 800))

            if (role === "BUYER") {
                router.push("/")
            } else if (role === "FARMER") {
                router.push("/farmer/dashboard")
            } else {
                router.push("/driver/dashboard")
            }

            toast.success("پروفایل شما با موفقیت تکمیل شد")
        } catch {
            toast.error("خطا در ثبت اطلاعات")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full flex flex-col items-end text-right">
            {step === "role" ? (
                <>
                    <h1 className="text-[28px] sm:text-[32px] font-extrabold text-[#212121] mb-2 w-full">
                        به کلم خوش آمدید
                    </h1>
                    <p className="text-[#8A8A8A] text-[14px] sm:text-[15px] mb-8 w-full">
                        نقش خود را انتخاب کنید
                    </p>

                    <div className="w-full flex flex-col gap-4">
                        {ROLE_OPTIONS.map(opt => {
                            const Icon = opt.icon
                            return (
                                <button
                                    key={opt.value}
                                    onClick={() => { setRole(opt.value); setStep("profile") }}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 14,
                                        padding: "16px 18px", width: "100%",
                                        border: `1.5px solid ${role === opt.value ? "#51A46B" : "#E9E8E3"}`,
                                        borderRadius: 14, background: role === opt.value ? "#F0F9F3" : "#fff",
                                        cursor: "pointer", textAlign: "right", fontFamily: "inherit",
                                    }}
                                >
                                    <div style={{
                                        width: 48, height: 48, borderRadius: 12,
                                        background: role === opt.value ? "#51A46B" : "#F5F5F5",
                                        display: "grid", placeItems: "center",
                                        color: role === opt.value ? "#fff" : "#8A8A8A", flexShrink: 0,
                                    }}>
                                        <Icon size={22} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: 15, color: "#212121" }}>{opt.label}</div>
                                        <div style={{ fontSize: 13, color: "#8A8A8A", marginTop: 2 }}>{opt.desc}</div>
                                    </div>
                                    <ChevronDown size={18} style={{ color: "#8A8A8A", transform: "rotate(-90deg)" }} />
                                </button>
                            )
                        })}
                    </div>

                    <div className="w-full flex flex-col gap-4 mt-8">
                        <button
                            onClick={() => router.push(user ? "/" : "/auth/login")}
                            className="w-full text-center text-[#8A8A8A] text-[14px] font-medium hover:text-[#51A46B] transition-colors"
                        >
                            بعداً تکمیل می‌کنم
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <button
                        onClick={() => setStep("role")}
                        className="text-[#8A8A8A] text-[13px] font-medium mb-6 hover:text-[#51A46B] transition-colors flex items-center gap-1"
                    >
                        → بازگشت
                    </button>

                    <h1 className="text-[28px] sm:text-[32px] font-extrabold text-[#212121] mb-2 w-full">
                        تکمیل پروفایل
                    </h1>
                    <p className="text-[#8A8A8A] text-[14px] sm:text-[15px] mb-8 w-full">
                        اطلاعات خود را وارد کنید
                    </p>

                    <div className="w-full flex flex-col gap-5">
                        {role === "BUYER" && (
                            <div className="relative w-full h-[56px] border border-[#E9E8E3] rounded-[14px] flex items-center px-4 focus-within:border-[#51A46B] transition-all bg-white">
                                <label className="absolute -top-[10px] right-4 bg-white px-2 text-[#8A8A8A] text-[13px] font-medium z-10">
                                    نوع کسب‌وکار
                                </label>
                                <select
                                    value={form.businessType}
                                    onChange={e => set("businessType", e.target.value)}
                                    className="flex-1 h-full bg-transparent outline-none text-right text-[15px] text-[#212121] appearance-none cursor-pointer"
                                >
                                    <option value="">انتخاب کنید</option>
                                    {BUSINESS_TYPES.map(t => (
                                        <option key={t.value} value={t.value}>{t.label}</option>
                                    ))}
                                </select>
                                <ChevronDown size={16} style={{ color: "#8A8A8A" }} />
                            </div>
                        )}

                        <div className="relative w-full h-[56px] border border-[#E9E8E3] rounded-[14px] flex items-center px-4 focus-within:border-[#51A46B] transition-all bg-white">
                            <label className="absolute -top-[10px] right-4 bg-white px-2 text-[#8A8A8A] text-[13px] font-medium z-10">
                                نام
                            </label>
                            <input
                                value={form.firstName}
                                onChange={e => set("firstName", e.target.value)}
                                className="flex-1 h-full bg-transparent outline-none text-right text-[15px] text-[#212121] placeholder:text-[#E9E8E3]"
                                placeholder="علی"
                            />
                        </div>

                        <div className="relative w-full h-[56px] border border-[#E9E8E3] rounded-[14px] flex items-center px-4 focus-within:border-[#51A46B] transition-all bg-white">
                            <label className="absolute -top-[10px] right-4 bg-white px-2 text-[#8A8A8A] text-[13px] font-medium z-10">
                                نام خانوادگی
                            </label>
                            <input
                                value={form.lastName}
                                onChange={e => set("lastName", e.target.value)}
                                className="flex-1 h-full bg-transparent outline-none text-right text-[15px] text-[#212121] placeholder:text-[#E9E8E3]"
                                placeholder="محمدی"
                            />
                        </div>

                        {(role === "BUYER" || role === "FARMER") && (
                            <div className="relative w-full h-[56px] border border-[#E9E8E3] rounded-[14px] flex items-center px-4 focus-within:border-[#51A46B] transition-all bg-white">
                                <label className="absolute -top-[10px] right-4 bg-white px-2 text-[#8A8A8A] text-[13px] font-medium z-10">
                                    نام کسب‌وکار
                                </label>
                                <input
                                    value={form.businessName}
                                    onChange={e => set("businessName", e.target.value)}
                                    className="flex-1 h-full bg-transparent outline-none text-right text-[15px] text-[#212121] placeholder:text-[#E9E8E3]"
                                    placeholder={role === "FARMER" ? "باغ سیب نقره‌ای" : "سوپرمارکت رضایی"}
                                />
                            </div>
                        )}
                    </div>

                    <div className="w-full flex flex-col gap-3 mt-8">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full h-[56px] text-white rounded-[14px] text-[17px] font-bold transition-all disabled:opacity-70"
                            style={{ backgroundColor: loading ? '#A3CBB0' : '#51A46B' }}
                        >
                            {loading ? "در حال ثبت..." : "تکمیل و ورود"}
                        </button>
                        <button
                            onClick={() => router.push(user ? "/" : "/auth/login")}
                            className="w-full text-center text-[#8A8A8A] text-[13px] font-medium hover:text-[#51A46B] transition-colors py-2"
                        >
                            بعداً تکمیل می‌کنم
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
