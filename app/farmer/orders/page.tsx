"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, ChevronDown, Loader2 } from "lucide-react"
import { orderService } from "@/services/order"
import type { Order } from "@/types"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const STATUS_MAP: Record<string, {label:string;cls:string}> = {
    PENDING_PAYMENT: { label: "در انتظار پرداخت", cls: "f-pill--pending" },
    PAID_HELD: { label: "پرداخت شده", cls: "f-pill--prep" },
    CONFIRMED: { label: "تأیید شده", cls: "f-pill--prep" },
    PREPARING: { label: "در حال آماده‌سازی", cls: "f-pill--prep" },
    READY_FOR_PICKUP: { label: "آماده تحویل", cls: "f-pill--shipped" },
    COMPLETED: { label: "تحویل داده شده", cls: "f-pill--shipped" },
    CANCELLED: { label: "لغو شده", cls: "f-pill--cancel" },
    DISPUTED: { label: "اعتراض شده", cls: "f-pill--cancel" },
}

const FILTERS = [
    { id: "all", label: "همه" },
    { id: "PENDING_PAYMENT", label: "در انتظار پرداخت" },
    { id: "CONFIRMED", label: "تأیید شده" },
    { id: "COMPLETED", label: "تحویل داده شده" },
    { id: "CANCELLED", label: "لغو شده" },
]

function formatOrder(order: Order) {
    const buyerName = order.buyer ? `${order.buyer.firstName || ""} ${order.buyer.lastName || ""}`.trim() || "—" : "—"
    const firstItem = order.items?.[0]
    const productName = firstItem?.productName || "—"
    const quantity = firstItem ? `${firstItem.quantity} ${firstItem.unit || ""}` : "—"
    const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString("fa-IR") : ""
    return { buyerName, productName, quantity, date }
}

export default function FarmerOrdersPage() {
    const [filter, setFilter] = useState("all")
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [detail, setDetail] = useState<Order | null>(null)

    useEffect(() => {
        setLoading(true)
        orderService.getMyOrders().then(res => setOrders(res.items || [])).catch(() => {}).finally(() => setLoading(false))
    }, [])

    const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter)

    if (detail) return <OrderDetail order={detail} onBack={() => setDetail(null)} />

    return (
        <>
            <h1 className="f-title">سفارش‌های دریافتی</h1>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                {FILTERS.map(f => (
                    <button key={f.id} onClick={() => setFilter(f.id)}
                            style={{
                                padding: "7px 14px", borderRadius: 999, fontSize: 13, cursor: "pointer",
                                fontFamily: "var(--f-font)", border: `1px solid ${filter === f.id ? "var(--f-accent)" : "var(--f-border-s)"}`,
                                background: filter === f.id ? "var(--f-accent-50)" : "transparent",
                                color: filter === f.id ? "var(--f-accent)" : "var(--f-fg-2)",
                            }}>
                        {f.label}
                    </button>
                ))}
            </div>

            <div className="f-table-card">
                <div className="f-table-wrap">
                    <table className="f-table">
                        <thead><tr>
                            <th>شماره</th><th>خریدار</th><th>محصول</th><th>مقدار</th>
                            <th>مبلغ</th><th>تاریخ</th><th>وضعیت</th><th>عملیات</th>
                        </tr></thead>
                        <tbody>
                        {loading ? (
                            <tr><td colSpan={8} style={{ textAlign: "center", padding: 32 }}>
                                <Loader2 size={20} className="animate-spin inline-block" />
                            </td></tr>
                        ) : filtered.map(o => {
                            const s = STATUS_MAP[o.status] || { label: o.status, cls: "" }
                            const { buyerName, productName, quantity, date } = formatOrder(o)
                            return (
                                <tr key={o.id} className="clickable" onClick={() => setDetail(o)}>
                                    <td className="tnum" style={{ color: "var(--f-fg-3)" }}>#{fa(o.orderNumber || o.id)}</td>
                                    <td>{buyerName}</td>
                                    <td>{productName}</td>
                                    <td className="tnum">{fa(quantity)}</td>
                                    <td className="tnum" style={{ fontWeight: 600 }}>{faNum(Number(o.total))}</td>
                                    <td className="tnum">{fa(date)}</td>
                                    <td><span className={`f-pill ${s.cls}`}>{s.label}</span></td>
                                    <td onClick={e => e.stopPropagation()}>
                                        {o.status === "PENDING_PAYMENT" && (
                                            <div style={{ display: "flex", gap: 5 }}>
                                                <button className="f-btn f-btn--filled" style={{ padding: "4px 10px", fontSize: 12 }}>
                                                    <CheckCircle size={12} /> تأیید
                                                </button>
                                                <button className="f-btn f-btn--ghost" style={{ padding: "4px 10px", fontSize: 12 }}>
                                                    <XCircle size={12} /> رد
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                        {!loading && filtered.length === 0 && (
                            <tr><td colSpan={8} style={{ textAlign: "center", padding: 32, color: "var(--f-fg-3)" }}>سفارشی یافت نشد</td></tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

function OrderDetail({ order, onBack }: { order: Order; onBack: ()=>void }) {
    const [status, setStatus] = useState<string>(order.status)
    const s = STATUS_MAP[status] || { label: status, cls: "" }
    const { buyerName, productName, quantity, date } = formatOrder(order)
    const total = Number(order.total)

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <button className="f-btn f-btn--ghost" onClick={onBack} style={{ padding: "7px 14px" }}>← بازگشت</button>
                <h1 className="f-title" style={{ margin: 0 }}>جزئیات سفارش #{fa(order.orderNumber || order.id)}</h1>
            </div>

            <div className="f-card" style={{ marginBottom: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, fontSize: 14 }}>
                    <div><span style={{ color: "var(--f-fg-3)" }}>خریدار: </span><b>{buyerName}</b></div>
                    <div><span style={{ color: "var(--f-fg-3)" }}>محصول: </span><b>{productName}</b></div>
                    <div><span style={{ color: "var(--f-fg-3)" }}>مقدار: </span><span className="tnum"><b>{fa(quantity)}</b></span></div>
                    <div><span style={{ color: "var(--f-fg-3)" }}>تاریخ: </span><span className="tnum">{fa(date)}</span></div>
                    <div><span style={{ color: "var(--f-fg-3)" }}>مبلغ کل: </span><b className="tnum" style={{ color: "var(--f-accent)" }}>{faNum(total)} تومان</b></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: "var(--f-fg-3)" }}>وضعیت:</span>
                        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", border: "1px solid var(--f-border-s)", borderRadius: "var(--f-r-sm)", cursor: "pointer" }}>
                            <span className={`f-pill ${s.cls}`}>{s.label}</span>
                            <ChevronDown size={12} style={{ color: "var(--f-fg-3)" }} />
                            <select value={status} onChange={e => setStatus(e.target.value)}
                                    style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%" }}>
                                {Object.entries(STATUS_MAP).map(([k, v]) => (
                                    <option key={k} value={k}>{v.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {order.status === "PENDING_PAYMENT" && (
                <div className="f-alert f-alert--warning">
                    ⏳ این سفارش منتظر تأیید شماست. لطفاً در اسرع وقت بررسی کنید.
                </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                {order.status === "PENDING_PAYMENT" && (
                    <>
                        <button className="f-btn f-btn--filled"><CheckCircle size={14} /> تأیید سفارش</button>
                        <button className="f-btn f-btn--ghost" style={{ color: "var(--f-down)" }}><XCircle size={14} /> رد سفارش</button>
                    </>
                )}
            </div>
        </>
    )
}
