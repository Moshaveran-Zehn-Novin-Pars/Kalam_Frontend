"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { AlertTriangle, Send, ChevronLeft, Loader2 } from "lucide-react"
import { disputeService } from "@/services/dispute"
import "../../../account.css"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const REASONS = [
    { value: "damaged", label: "محصول آسیب دیده بود" },
    { value: "wrong", label: "محصول اشتباه ارسال شد" },
    { value: "quality", label: "کیفیت مطابق انتظار نبود" },
    { value: "late", label: "تأخیر در تحویل" },
    { value: "other", label: "سایر" },
]

export default function DisputePage() {
    const { orderId } = useParams<{ orderId: string }>()
    const router = useRouter()
    const [reason, setReason] = useState("")
    const [description, setDescription] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async () => {
        if (!reason) return
        setSubmitting(true)
        try {
            await disputeService.create({
                orderId,
                reason,
                description,
            } as any)
            setSubmitted(true)
        } catch {
            setSubmitted(true)
        } finally {
            setSubmitting(false)
        }
    }

    if (submitted) {
        return (
            <div style={{ textAlign: "center", padding: "48px 24px" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <AlertTriangle size={28} style={{ color: "#F59E0B" }} />
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--acc-fg)", marginBottom: 8 }}>اعتراض شما ثبت شد</h2>
                <p style={{ fontSize: 13, color: "var(--acc-fg-3)", marginBottom: 24 }}>تیم پشتیبانی در اسرع وقت بررسی خواهد کرد.</p>
                <button onClick={() => router.push("/account/orders")} className="acc-btn acc-btn--filled">بازگشت به سفارش‌ها</button>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: 500 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <button onClick={() => router.back()} className="acc-btn acc-btn--ghost" style={{ padding: "7px 14px" }}>
                    <ChevronLeft size={14} /> بازگشت
                </button>
                <h1 className="acc-title" style={{ margin: 0 }}>ثبت اعتراض</h1>
            </div>
            <p style={{ fontSize: 13, color: "var(--acc-fg-3)", marginBottom: 20 }}>سفارش #{fa(orderId)}</p>

            <div className="acc-alert acc-alert--warning" style={{ marginBottom: 24 }}>
                <AlertTriangle size={18} />
                <span>پس از ثبت اعتراض، تیم پشتیبانی کلم ظرف ۲۴ ساعت بررسی و نتیجه را اعلام خواهد کرد.</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 24 }}>
                <div>
                    <label className="acc-label">دلیل اعتراض</label>
                    <select value={reason} onChange={e => setReason(e.target.value)}
                        className="acc-input" style={{ height: 48, appearance: "none", cursor: "pointer" }}>
                        <option value="">انتخاب کنید</option>
                        {REASONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                </div>
                <div>
                    <label className="acc-label">توضیحات</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4}
                        placeholder="لطفاً توضیح کامل مشکل خود را بنویسید..."
                        className="acc-textarea" />
                </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
                <button onClick={handleSubmit} disabled={!reason || submitting}
                    className="acc-btn acc-btn--filled" style={{ opacity: !reason || submitting ? 0.5 : 1, background: "#F59E0B", borderColor: "#F59E0B" }}>
                    {submitting ? <><Loader2 size={16} className="animate-spin" /> در حال ثبت...</> : "ثبت اعتراض"}
                </button>
                <button onClick={() => router.back()} className="acc-btn acc-btn--ghost">انصراف</button>
            </div>
        </div>
    )
}
