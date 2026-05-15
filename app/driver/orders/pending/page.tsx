"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Clock, MapPin, Package, Check, X } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const PENDING = [
    { id: "DLV-041", buyer: "سوپرمارکت ستاره", address: "تهران، نیاوران، خیابان باهنر، پلاک ۴۵", weight: "۱۸۰ کیلو", slot: "۱۴:۰۰–۱۶:۰۰", orderId: "ORD-2041", distance: "۱۲ کیلومتر", fee: 350000 },
    { id: "DLV-042", buyer: "رستوران آرمان", address: "تهران، ونک، خیابان ملاصدرا، پلاک ۲۱", weight: "۶۰ کیلو", slot: "۱۶:۰۰–۱۸:۰۰", orderId: "ORD-2042", distance: "۸ کیلومتر", fee: 250000 },
    { id: "DLV-043", buyer: "میوه فروشی محسن", address: "تهران، جردن، بلوار میرداماد، پلاک ۷", weight: "۱۲۰ کیلو", slot: "۱۰:۰۰–۱۲:۰۰", orderId: "ORD-2043", distance: "۱۵ کیلومتر", fee: 400000 },
]

export default function PendingOrdersPage() {
    const router = useRouter()

    return (
        <>
            <div className="adm-detail-head">
                <h1 className="adm-page-title" style={{ marginBottom: 0 }}>درخواست‌های حمل</h1>
                <span className="pill pill--pending" style={{ fontSize: 13 }}>{fa(PENDING.length)} درخواست</span>
                <Link href="/driver/dashboard" className="adm-btn adm-btn--ghost" style={{ fontSize: 13, padding: "6px 14px", marginInlineStart: "auto" }}>
                    ← بازگشت
                </Link>
            </div>

            <div className="adm-alert adm-alert--info" style={{ marginBottom: 20 }}>
                <Clock size={16} />
                <span>درخواست‌های حمل جدید در این بخش نمایش داده می‌شوند. برای قبول هر درخواست روی آن کلیک کنید.</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {PENDING.map(d => (
                    <div key={d.id} className="adm-card" style={{ cursor: "pointer" }} onClick={() => router.push(`/driver/orders/${d.id}`)}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--adm-fg)" }}>{d.buyer}</div>
                                <div style={{ fontSize: 12, color: "var(--adm-fg-3)", marginTop: 2 }}>#{d.orderId}</div>
                            </div>
                            <div style={{ display: "flex", gap: 6 }}>
                                <button onClick={e => { e.stopPropagation(); alert("قبول شد") }}
                                    className="adm-btn adm-btn--filled" style={{ padding: "6px 14px", fontSize: 12 }}>
                                    <Check size={13} /> قبول
                                </button>
                                <button onClick={e => { e.stopPropagation(); alert("رد شد") }}
                                    className="adm-btn adm-btn--ghost" style={{ padding: "6px 14px", fontSize: 12, color: "var(--adm-down)" }}>
                                    <X size={13} /> رد
                                </button>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontSize: 13, color: "var(--adm-fg-2)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <MapPin size={13} style={{ color: "var(--adm-fg-3)" }} /> {d.address}
                            </div>
                            <span style={{ color: "var(--adm-fg-3)" }}>|</span>
                            <div><Package size={13} style={{ marginLeft: 4, color: "var(--adm-fg-3)" }} />{d.weight}</div>
                            <span style={{ color: "var(--adm-fg-3)" }}>|</span>
                            <div><Clock size={13} style={{ marginLeft: 4, color: "var(--adm-fg-3)" }} />{fa(d.slot)}</div>
                        </div>
                        <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12, color: "var(--adm-fg-3)" }}>
                            <span>📍 {d.distance}</span>
                            <span>💰 {faNum(d.fee)} تومان</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
