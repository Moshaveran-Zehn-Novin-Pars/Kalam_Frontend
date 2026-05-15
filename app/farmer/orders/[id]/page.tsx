"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { CheckCircle, XCircle, ChevronDown, Phone, MapPin, Calendar, Package } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
    PENDING_CONFIRMATION: { label: "در انتظار تأیید", cls: "f-pill--pending" },
    CONFIRMED:            { label: "تأیید شده",       cls: "f-pill--prep" },
    PREPARING:            { label: "در حال آماده‌سازی", cls: "f-pill--prep" },
    SHIPPED:              { label: "ارسال شده",       cls: "f-pill--shipped" },
    DELIVERED:            { label: "تحویل داده شده",  cls: "f-pill--shipped" },
    CANCELLED:            { label: "لغو شده",         cls: "f-pill--cancel" },
}

const MOCK_ORDER = {
    id: "2345923",
    buyer: "سوپرمارکت رضایی",
    buyerPhone: "09121234567",
    buyerAddress: "تهران، خیابان ولیعصر، نبش کوچه فلاحی، پلاک ۲۳",
    product: "سیب درختی",
    qty: "200 کیلو",
    unit: "کیلو",
    pricePerUnit: 65000,
    subtotal: 13000000,
    deliveryFee: 350000,
    commission: 780000,
    total: 14030000,
    date: "1404/9/12",
    status: "PENDING_CONFIRMATION" as string,
    deliveryDate: "1404/9/15",
    notes: "لطفاً محصولات درجه A ارسال شود.",
    items: [
        { name: "سیب درختی درجه A", qty: 150, unit: "کیلو", price: 68000 },
        { name: "سیب درختی درجه B", qty: 50, unit: "کیلو", price: 55000 },
    ],
}

const STATUS_HISTORY = [
    { status: "PENDING_CONFIRMATION", date: "1404/9/12 ۰۸:۳۰", by: "سیستم" },
]

export default function OrderDetailPage() {
    const { id } = useParams()
    const router = useRouter()
    const [status, setStatus] = useState(MOCK_ORDER.status)
    const s = STATUS_MAP[status]
    const order = { ...MOCK_ORDER, id: id as string }

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <button className="f-btn f-btn--ghost" onClick={() => router.back()} style={{ padding: "7px 14px" }}>
                    ← بازگشت
                </button>
                <h1 className="f-title" style={{ margin: 0 }}>جزئیات سفارش #{fa(order.id)}</h1>
                <span className={`f-pill ${s.cls}`} style={{ fontSize: 13 }}>{s.label}</span>
            </div>

            <div className="f-grid-2" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 20 }}>
                <div className="f-card">
                    <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600 }}>اطلاعات سفارش</h3>
                    <div className="f-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontSize: 13 }}>
                        <div><span style={{ color: "var(--f-fg-3)" }}>شماره سفارش: </span><span className="tnum" style={{ fontWeight: 600 }}>#{fa(order.id)}</span></div>
                        <div><span style={{ color: "var(--f-fg-3)" }}>تاریخ ثبت: </span><span className="tnum">{fa(order.date)}</span></div>
                        <div><span style={{ color: "var(--f-fg-3)" }}>تاریخ تحویل: </span><span className="tnum">{fa(order.deliveryDate)}</span></div>
                        <div>
                            <span style={{ color: "var(--f-fg-3)" }}>وضعیت: </span>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                                <span className={`f-pill ${s.cls}`}>{s.label}</span>
                                <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                                    <select value={status} onChange={e => setStatus(e.target.value)}
                                        style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%" }}>
                                        {Object.entries(STATUS_MAP).map(([k, v]) => (
                                            <option key={k} value={k}>{v.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} style={{ color: "var(--f-fg-3)", cursor: "pointer" }} />
                                </div>
                            </span>
                        </div>
                    </div>

                    {order.status === "PENDING_CONFIRMATION" && (
                        <div className="f-alert f-alert--warning" style={{ marginTop: 16, marginBottom: 0 }}>
                            ⏳ این سفارش منتظر تأیید شماست.
                        </div>
                    )}
                </div>

                <div className="f-card">
                    <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600 }}>خریدار</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
                            <Package size={15} style={{ color: "var(--f-accent)" }} /> {order.buyer}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--f-fg-3)" }}>
                            <Phone size={13} /> {fa(order.buyerPhone)}
                        </div>
                        <div style={{ display: "flex", gap: 8, color: "var(--f-fg-3)" }}>
                            <MapPin size={13} style={{ marginTop: 2, flexShrink: 0 }} />
                            <span>{order.buyerAddress}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="f-card" style={{ marginBottom: 20 }}>
                <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>محصولات سفارش</h3>
                <div className="f-table-wrap">
                    <table className="f-table">
                        <thead><tr>
                            <th>محصول</th><th>مقدار</th><th>قیمت واحد</th><th>قیمت کل</th>
                        </tr></thead>
                        <tbody>
                        {order.items.map((item, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 500 }}>{item.name}</td>
                                <td className="tnum">{faNum(item.qty)} {item.unit}</td>
                                <td className="tnum">{faNum(item.price)} تومان</td>
                                <td className="tnum" style={{ fontWeight: 600 }}>{faNum(item.qty * item.price)} تومان</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ marginTop: 14, borderTop: "1px solid var(--f-border)", paddingTop: 14 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, maxWidth: 300, marginInlineStart: "auto" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--f-fg-3)" }}>جمع کل:</span>
                            <span className="tnum">{faNum(order.subtotal)} تومان</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--f-fg-3)" }}>هزینه حمل:</span>
                            <span className="tnum">{faNum(order.deliveryFee)} تومان</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--f-fg-3)" }}>کمیسیون:</span>
                            <span className="tnum">{faNum(order.commission)} تومان</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600, fontSize: 14, borderTop: "1px solid var(--f-border)", paddingTop: 6, marginTop: 4 }}>
                            <span>مبلغ قابل پرداخت:</span>
                            <span className="tnum" style={{ color: "var(--f-accent)" }}>{faNum(order.total)} تومان</span>
                        </div>
                    </div>
                </div>
            </div>

            {order.notes && (
                <div className="f-card" style={{ marginBottom: 20 }}>
                    <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 600 }}>یادداشت خریدار</h3>
                    <p style={{ margin: 0, fontSize: 13, color: "var(--f-fg-2)", lineHeight: 1.7 }}>{order.notes}</p>
                </div>
            )}

            <div className="f-card" style={{ marginBottom: 20 }}>
                <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>تاریخچه وضعیت</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {STATUS_HISTORY.map((h, i) => {
                        const hs = STATUS_MAP[h.status as keyof typeof STATUS_MAP] || STATUS_MAP.PENDING_CONFIRMATION
                        return (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13 }}>
                                <span className={`f-pill ${hs.cls}`} style={{ fontSize: 11 }}>{hs.label}</span>
                                <span className="tnum" style={{ color: "var(--f-fg-3)" }}>{fa(h.date)}</span>
                                <span style={{ color: "var(--f-fg-3)", fontSize: 12 }}>توسط {h.by}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
                {status === "PENDING_CONFIRMATION" && (
                    <>
                        <button className="f-btn f-btn--filled"><CheckCircle size={15} /> تأیید سفارش</button>
                        <button className="f-btn f-btn--ghost" style={{ color: "var(--f-down)" }}><XCircle size={15} /> رد سفارش</button>
                    </>
                )}
                <Link href="/farmer/orders" className="f-btn f-btn--ghost">بازگشت به لیست</Link>
            </div>
        </>
    )
}
