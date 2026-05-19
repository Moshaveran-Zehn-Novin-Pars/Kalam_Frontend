"use client"

import { useState, useEffect } from "react"
import { X, Loader2 } from "lucide-react"
import Link from "next/link"
import { orderService } from "@/services/order"
import type { Order } from "@/types"
import "../account.css"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
    PENDING_PAYMENT: { label: "در انتظار پرداخت", cls: "acc-badge--warning" },
    PAID_HELD: { label: "پرداخت شده", cls: "acc-badge--info" },
    CONFIRMED: { label: "تأیید شده", cls: "acc-badge--success" },
    PREPARING: { label: "در حال آماده‌سازی", cls: "acc-badge--warning" },
    READY_FOR_PICKUP: { label: "آماده تحویل", cls: "acc-badge--info" },
    COMPLETED: { label: "تحویل شده", cls: "acc-badge--success" },
    CANCELLED: { label: "لغو شده", cls: "acc-badge--danger" },
    REFUNDED: { label: "مسترد شده", cls: "acc-badge--danger" },
    DISPUTED: { label: "اعتراض شده", cls: "acc-badge--warning" },
}

const TABS = [
    { key: "active", label: "جاری" },
    { key: "delivered", label: "تحویل داده شده" },
    { key: "cancelled", label: "لغو شده" },
]

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState("active")
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [showQuickModal, setShowQuickModal] = useState(false)

    useEffect(() => {
        setLoading(true)
        orderService.getMyOrders().then(res => {
            setOrders(res.items || [])
        }).catch(() => {
            setOrders([])
        }).finally(() => setLoading(false))
    }, [])

    const filtered = orders.filter(o => {
        if (activeTab === "active") return !["COMPLETED", "CANCELLED", "REFUNDED"].includes(o.status)
        if (activeTab === "delivered") return o.status === "COMPLETED"
        if (activeTab === "cancelled") return o.status === "CANCELLED"
        return true
    })

    return (
        <div>
            <h1 className="acc-title">سفارش‌ها</h1>

            <div className="acc-card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ display: "flex", gap: 24, padding: "20px 22px 0", borderBottom: "1px solid var(--acc-border)" }}>
                    {TABS.map(tab => (
                        <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                            style={{
                                paddingBottom: 12, fontSize: 14, fontWeight: activeTab === tab.key ? 600 : 400,
                                color: activeTab === tab.key ? "var(--acc-accent)" : "var(--acc-fg-2)",
                                borderBottom: activeTab === tab.key ? "2px solid var(--acc-accent)" : "2px solid transparent",
                                background: "transparent", borderInline: "none", borderTop: "none",
                                cursor: "pointer", fontFamily: "var(--acc-font)",
                            }}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div style={{ padding: "48px 24px", textAlign: "center", color: "var(--acc-fg-3)" }}>
                        <Loader2 size={24} className="animate-spin inline-block" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div style={{ padding: "48px 24px", textAlign: "center", color: "var(--acc-fg-3)" }}>
                        سفارشی یافت نشد
                    </div>
                ) : (
                    <div>
                        {filtered.map(order => {
                            const s = STATUS_MAP[order.status] || { label: order.status, cls: "acc-badge--warning" }
                            const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString("fa-IR") : ""
                            return (
                                <div key={order.id} style={{
                                    display: "flex", alignItems: "center", justifyContent: "space-between",
                                    padding: "16px 22px", borderBottom: "1px solid var(--acc-border)",
                                    flexWrap: "wrap", gap: 12,
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                        <span className={`acc-badge ${s.cls}`} style={{ fontSize: 12 }}>{s.label}</span>
                                        <span style={{ fontSize: 13, color: "var(--acc-fg-2)" }}>
                                            مبلغ: <b style={{ color: "var(--acc-fg)" }}>{faNum(Number(order.total))} تومان</b>
                                        </span>
                                        <span style={{ fontSize: 13, color: "var(--acc-fg-3)" }}>
                                            #{fa(order.id)} · {fa(date)}
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <Link href={`/account/orders/${order.id}`}
                                            className="acc-btn acc-btn--ghost" style={{ padding: "6px 14px", fontSize: 12 }}>
                                            جزئیات
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {showQuickModal && (
                <div style={{
                    position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 90,
                    display: "flex", alignItems: "center", justifyContent: "center",
                }} onClick={() => setShowQuickModal(false)}>
                    <div style={{
                        background: "var(--acc-surface)", borderRadius: "var(--acc-r-lg)",
                        boxShadow: "var(--acc-shadow)", padding: "28px 28px 24px",
                        minWidth: 360, maxWidth: 480, position: "relative", textAlign: "center",
                    }} onClick={e => e.stopPropagation()}>
                        <button onClick={() => setShowQuickModal(false)}
                            style={{ position: "absolute", top: 14, left: 14, background: "none", border: "none", cursor: "pointer", color: "var(--acc-fg-3)" }}>
                            <X size={14} />
                        </button>
                        <p style={{ fontSize: 15, color: "var(--acc-fg)", margin: "0 0 20px", lineHeight: 1.8 }}>
                            با انتخاب گزینه «سفارش سریع»، آخرین سفارش شما به صورت خودکار تکرار می‌شود.
                        </p>
                        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
                            <button className="acc-btn acc-btn--filled">ثبت سفارش</button>
                            <button className="acc-btn acc-btn--ghost" onClick={() => setShowQuickModal(false)}>انصراف</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
