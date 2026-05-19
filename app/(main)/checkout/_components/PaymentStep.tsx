"use client"

import { Loader2, CreditCard, Wallet, Building } from "lucide-react"
import { useState } from "react"

interface PaymentStepProps {
    onSubmit: () => Promise<void>
    submitting: boolean
}

const METHODS = [
    { value: "ONLINE_GATEWAY", label: "درگاه آنلاین", icon: CreditCard, desc: "پرداخت با کلیه کارت‌های بانکی" },
    { value: "WALLET", label: "کیف پول", icon: Wallet, desc: "پرداخت با اعتبار کیف پول" },
    { value: "BANK_TRANSFER", label: "کارت به کارت", icon: Building, desc: "واریز به حساب پلتفرم" },
]

export default function PaymentStep({ onSubmit, submitting }: PaymentStepProps) {
    const [method, setMethod] = useState("ONLINE_GATEWAY")

    return (
        <div>
            <h2 className="text-[22px] font-bold text-right mb-6 text-[#212121]" dir="rtl">روش پرداخت</h2>
            <div className="flex flex-col gap-3 mb-8">
                {METHODS.map((m) => {
                    const Icon = m.icon
                    return (
                        <button key={m.value} onClick={() => setMethod(m.value)}
                            style={{
                                display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", width: "100%",
                                border: `1.5px solid ${method === m.value ? "#51A46B" : "#E9E8E3"}`,
                                borderRadius: 14, background: method === m.value ? "#F0F9F3" : "#fff",
                                cursor: "pointer", textAlign: "right", fontFamily: "inherit",
                            }}>
                            <div style={{
                                width: 44, height: 44, borderRadius: 10,
                                background: method === m.value ? "#51A46B" : "#F5F5F5",
                                display: "grid", placeItems: "center",
                                color: method === m.value ? "#fff" : "#8A8A8A", flexShrink: 0,
                            }}><Icon size={20} /></div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: 14, color: "#212121" }}>{m.label}</div>
                                <div style={{ fontSize: 12, color: "#8A8A8A", marginTop: 2 }}>{m.desc}</div>
                            </div>
                        </button>
                    )
                })}
            </div>
            <button onClick={onSubmit} disabled={submitting}
                className="w-full bg-[#51A46B] text-white py-4 rounded-[12px] font-bold text-[16px] hover:bg-[#417F56] transition-colors disabled:opacity-70 flex items-center justify-center gap-2">
                {submitting ? <><Loader2 size={18} className="animate-spin" /> در حال پردازش...</> : "ثبت و پرداخت"}
            </button>
        </div>
    )
}
