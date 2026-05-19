"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Star, Send, ChevronLeft } from "lucide-react"
import "../../../account.css"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

export default function ReviewPage() {
    const { orderId } = useParams<{ orderId: string }>()
    const router = useRouter()
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [comment, setComment] = useState("")
    const [submitted, setSubmitted] = useState(false)

    if (submitted) {
        return (
            <div style={{ textAlign: "center", padding: "48px 24px" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--acc-accent-100)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <Send size={28} style={{ color: "var(--acc-accent)" }} />
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--acc-fg)", marginBottom: 8 }}>نظر شما ثبت شد</h2>
                <p style={{ fontSize: 13, color: "var(--acc-fg-3)", marginBottom: 24 }}>نظر شما پس از تأیید نمایش داده می‌شود.</p>
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
                <h1 className="acc-title" style={{ margin: 0 }}>ثبت نظر</h1>
            </div>
            <p style={{ fontSize: 13, color: "var(--acc-fg-3)", marginBottom: 24 }}>سفارش #{fa(orderId)}</p>

            <div style={{ textAlign: "center", marginBottom: 32 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "var(--acc-fg)", marginBottom: 16 }}>امتیاز شما به این سفارش</p>
                <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                    {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, transition: "transform 0.15s" }}>
                            <Star size={36} fill={(hover || rating) >= star ? "#f5a623" : "none"}
                                stroke={(hover || rating) >= star ? "#f5a623" : "#D4D4D4"} strokeWidth={1.5} />
                        </button>
                    ))}
                </div>
            </div>

            <textarea value={comment} onChange={e => setComment(e.target.value)} rows={4}
                placeholder="نظر خود را درباره این سفارش بنویسید..."
                className="acc-textarea" style={{ marginBottom: 24 }} />

            <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => { if (rating > 0) setSubmitted(true) }}
                    disabled={rating === 0}
                    className="acc-btn acc-btn--filled" style={{ opacity: rating === 0 ? 0.5 : 1 }}>
                    ثبت نظر
                </button>
                <button onClick={() => router.back()} className="acc-btn acc-btn--ghost">انصراف</button>
            </div>
        </div>
    )
}
