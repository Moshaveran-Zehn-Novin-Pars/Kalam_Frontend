"use client"

import { useState } from "react"
import { CheckCircle, XCircle, ChevronDown } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const STATUS_MAP: Record<string, {label:string;cls:string}> = {
    PENDING_CONFIRMATION: { label: "در انتظار تأیید", cls: "f-pill--pending" },
    CONFIRMED:            { label: "تأیید شده",       cls: "f-pill--prep"    },
    PREPARING:            { label: "در حال آماده‌سازی",cls: "f-pill--prep"    },
    SHIPPED:              { label: "ارسال شده",        cls: "f-pill--shipped" },
    DELIVERED:            { label: "تحویل داده شده",   cls: "f-pill--shipped" },
    CANCELLED:            { label: "لغو شده",          cls: "f-pill--cancel"  },
}

const ORDERS = [
    { id: "2345923", buyer: "سوپرمارکت رضایی", cat: "سیب درختی",   qty: "200 کیلو", total: 13000000, date: "1404/9/12", status: "PENDING_CONFIRMATION" },
    { id: "2345924", buyer: "رستوران آرارات",   cat: "گوجه فرنگی", qty: "50 کیلو",  total: 2250000,  date: "1404/9/11", status: "CONFIRMED" },
    { id: "2345925", buyer: "هایپرمی",          cat: "انگور",       qty: "300 کیلو", total: 24000000, date: "1404/9/10", status: "SHIPPED" },
    { id: "2345926", buyer: "رستوران کاج",      cat: "خیار",        qty: "100 کیلو", total: 2800000,  date: "1404/9/9",  status: "PENDING_CONFIRMATION" },
    { id: "2345927", buyer: "فروشگاه ستاره",    cat: "هلو",         qty: "80 کیلو",  total: 7600000,  date: "1404/9/8",  status: "DELIVERED" },
    { id: "2345928", buyer: "کافه گلدن",        cat: "اسفناج",      qty: "30 کیلو",  total: 960000,   date: "1404/9/7",  status: "CANCELLED" },
]

const FILTERS = [
    { id: "all",                  label: "همه" },
    { id: "PENDING_CONFIRMATION", label: "در انتظار تأیید" },
    { id: "CONFIRMED",            label: "تأیید شده" },
    { id: "SHIPPED",              label: "ارسال شده" },
    { id: "DELIVERED",            label: "تحویل داده شده" },
    { id: "CANCELLED",            label: "لغو شده" },
]

export default function FarmerOrdersPage() {
    const [filter, setFilter] = useState("all")
    const [detail, setDetail] = useState<typeof ORDERS[0] | null>(null)
    const filtered = filter === "all" ? ORDERS : ORDERS.filter(o => o.status === filter)

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
                        {filtered.map(o => {
                            const s = STATUS_MAP[o.status]
                            return (
                                <tr key={o.id} className="clickable" onClick={() => setDetail(o)}>
                                    <td className="tnum" style={{ color: "var(--f-fg-3)" }}>#{fa(o.id)}</td>
                                    <td>{o.buyer}</td>
                                    <td>{o.cat}</td>
                                    <td className="tnum">{fa(o.qty)}</td>
                                    <td className="tnum" style={{ fontWeight: 600 }}>{faNum(o.total)}</td>
                                    <td className="tnum">{fa(o.date)}</td>
                                    <td><span className={`f-pill ${s.cls}`}>{s.label}</span></td>
                                    <td onClick={e => e.stopPropagation()}>
                                        {o.status === "PENDING_CONFIRMATION" && (
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
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

function OrderDetail({ order, onBack }: { order: typeof ORDERS[0]; onBack: ()=>void }) {
    const [status, setStatus] = useState(order.status)
    const s = STATUS_MAP[status]
    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <button className="f-btn f-btn--ghost" onClick={onBack} style={{ padding: "7px 14px" }}>← بازگشت</button>
                <h1 className="f-title" style={{ margin: 0 }}>جزئیات سفارش #{fa(order.id)}</h1>
            </div>

            <div className="f-card" style={{ marginBottom: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, fontSize: 14 }}>
                    <div><span style={{ color: "var(--f-fg-3)" }}>خریدار: </span><b>{order.buyer}</b></div>
                    <div><span style={{ color: "var(--f-fg-3)" }}>محصول: </span><b>{order.cat}</b></div>
                    <div><span style={{ color: "var(--f-fg-3)" }}>مقدار: </span><span className="tnum"><b>{fa(order.qty)}</b></span></div>
                    <div><span style={{ color: "var(--f-fg-3)" }}>تاریخ: </span><span className="tnum">{fa(order.date)}</span></div>
                    <div><span style={{ color: "var(--f-fg-3)" }}>مبلغ کل: </span><b className="tnum" style={{ color: "var(--f-accent)" }}>{faNum(order.total)} تومان</b></div>
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

            {order.status === "PENDING_CONFIRMATION" && (
                <div className="f-alert f-alert--warning">
                    ⏳ این سفارش منتظر تأیید شماست. لطفاً در اسرع وقت بررسی کنید.
                </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                {order.status === "PENDING_CONFIRMATION" && (
                    <>
                        <button className="f-btn f-btn--filled"><CheckCircle size={14} /> تأیید سفارش</button>
                        <button className="f-btn f-btn--ghost" style={{ color: "var(--f-down)" }}><XCircle size={14} /> رد سفارش</button>
                    </>
                )}
            </div>
        </>
    )
}