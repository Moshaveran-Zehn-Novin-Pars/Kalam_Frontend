"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Link from "next/link"
import "../account.css"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

type OrderStatus = "pending" | "shipped" | "cancelled"
const STATUS_MAP: Record<string, { label: string; cls: string }> = {
    pending: { label: "در انتظار تأیید", cls: "acc-badge--warning" },
    shipped: { label: "ارسال شده", cls: "acc-badge--success" },
    cancelled: { label: "لغو شده", cls: "acc-badge--danger" },
}

const TABS = [
    { key: "active", label: "جاری" },
    { key: "delivered", label: "تحویل داده شده" },
    { key: "cancelled", label: "لغو شده" },
]

const MOCK_ORDERS = [
    { id: "2345923", total: 1389000, status: "pending" as OrderStatus, tab: "active", date: "۱۴۰۴/۹/۱۲" },
    { id: "2345924", total: 2450000, status: "shipped" as OrderStatus, tab: "active", date: "۱۴۰۴/۹/۱۰" },
    { id: "2345925", total: 7600000, status: "cancelled" as OrderStatus, tab: "cancelled", date: "۱۴۰۴/۸/۲۸" },
]

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState("active")
    const [showQuickModal, setShowQuickModal] = useState(false)
    const filtered = MOCK_ORDERS.filter(o => o.tab === activeTab)

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

                {filtered.length === 0 ? (
                    <div style={{ padding: "48px 24px", textAlign: "center", color: "var(--acc-fg-3)" }}>
                        سفارشی یافت نشد
                    </div>
                ) : (
                    <div>
                        {filtered.map(order => {
                            const s = STATUS_MAP[order.status]
                            return (
                                <div key={order.id} style={{
                                    display: "flex", alignItems: "center", justifyContent: "space-between",
                                    padding: "16px 22px", borderBottom: "1px solid var(--acc-border)",
                                    flexWrap: "wrap", gap: 12,
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                        <span className={`acc-badge ${s.cls}`} style={{ fontSize: 12 }}>{s.label}</span>
                                        <span style={{ fontSize: 13, color: "var(--acc-fg-2)" }}>
                                            مبلغ: <b style={{ color: "var(--acc-fg)" }}>{faNum(order.total)} تومان</b>
                                        </span>
                                        <span style={{ fontSize: 13, color: "var(--acc-fg-3)" }}>
                                            #{fa(order.id)} · {fa(order.date)}
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <button onClick={() => setShowQuickModal(true)}
                                            className="acc-btn acc-btn--filled" style={{ padding: "6px 14px", fontSize: 12 }}>
                                            سفارش سریع
                                        </button>
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
