"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock, MapPin, Package, Check, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { deliveryService } from "@/services/delivery"
import type { Delivery } from "@/types"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

export default function PendingOrdersPage() {
    const router = useRouter()
    const [deliveries, setDeliveries] = useState<Delivery[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        deliveryService.findAll({ status: "PENDING_ASSIGNMENT" })
            .then(res => setDeliveries(Array.isArray(res) ? res : (res as any).items || []))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <div className="adm-detail-head">
                <h1 className="adm-page-title" style={{ marginBottom: 0 }}>درخواست‌های حمل</h1>
                <span className="pill pill--pending" style={{ fontSize: 13 }}>{fa(deliveries.length)} درخواست</span>
                <Link href="/driver/dashboard" className="adm-btn adm-btn--ghost" style={{ fontSize: 13, padding: "6px 14px", marginInlineStart: "auto" }}>
                    ← بازگشت
                </Link>
            </div>

            <div className="adm-alert adm-alert--info" style={{ marginBottom: 20 }}>
                <Clock size={16} />
                <span>درخواست‌های حمل جدید در این بخش نمایش داده می‌شوند. برای قبول هر درخواست روی آن کلیک کنید.</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {loading ? (
                    <div style={{ textAlign: "center", padding: 48 }}><Loader2 size={20} className="animate-spin inline-block" /></div>
                ) : deliveries.length === 0 ? (
                    <div style={{ textAlign: "center", padding: 48, color: "var(--adm-fg-3)" }}>درخواست جدیدی وجود ندارد</div>
                ) : deliveries.map((d: any) => (
                    <div key={d.id} className="adm-card" style={{ cursor: "pointer" }} onClick={() => router.push(`/driver/orders/${d.id}`)}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--adm-fg)" }}>{d.orderId || "—"}</div>
                                <div style={{ fontSize: 12, color: "var(--adm-fg-3)", marginTop: 2 }}>#{d.id}</div>
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
                                <MapPin size={13} style={{ color: "var(--adm-fg-3)" }} /> {(d as any).address || "—"}
                            </div>
                            <span style={{ color: "var(--adm-fg-3)" }}>|</span>
                            <div><Package size={13} style={{ marginLeft: 4, color: "var(--adm-fg-3)" }} />—</div>
                            <span style={{ color: "var(--adm-fg-3)" }}>|</span>
                            <div><Clock size={13} style={{ marginLeft: 4, color: "var(--adm-fg-3)" }} />—</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
