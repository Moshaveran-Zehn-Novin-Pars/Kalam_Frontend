"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { MapPin, ChevronLeft, ShoppingBag, MessageSquare, AlertTriangle } from "lucide-react"
import "../../account.css"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const ORDER = {
    id: "2345923", date: "۱۴۰۴/۹/۱۲", status: "pending" as const,
    address: "خیابان بهشتی، خیابان سرافراز، کوچه یازدهم، پلاک ۱۰، واحد ۱۳",
    receiver: "سوگند سلحشور", phone: "۰۹۴۳۸۴۷۵۷۲۱", deliveryTime: "۱۲ بهمن / صبح",
    items: [
        { name: "بلوبری", qty: 3, unit: "کیلو", price: 710000, img: null },
        { name: "توت فرنگی", qty: 2, unit: "کیلو", price: 520000, img: null },
        { name: "انگور", qty: 5, unit: "کیلو", price: 380000, img: null },
    ],
    subtotal: 3543500, discount: 1000000, deliveryFee: 400000, total: 2543500,
}

const STATUS_STYLES: Record<string, { label: string; cls: string }> = {
    pending: { label: "در انتظار تأیید", cls: "acc-badge--warning" },
    shipped: { label: "ارسال شده", cls: "acc-badge--success" },
    cancelled: { label: "لغو شده", cls: "acc-badge--danger" },
}

export default function OrderDetailPage() {
    const { orderId } = useParams<{ orderId: string }>()
    const router = useRouter()
    const s = STATUS_STYLES[ORDER.status]

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <button onClick={() => router.back()} className="acc-btn acc-btn--ghost" style={{ padding: "7px 14px" }}>
                    <ChevronLeft size={14} /> بازگشت
                </button>
                <h1 className="acc-title" style={{ margin: 0 }}>جزئیات سفارش</h1>
            </div>

            <div className="acc-card" style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 20, fontSize: 13, alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: 20 }}>
                        <span style={{ color: "var(--acc-fg-3)" }}>شماره: <b style={{ color: "var(--acc-fg)" }}>#{fa(ORDER.id)}</b></span>
                        <span style={{ color: "var(--acc-fg-3)" }}>تاریخ: <b style={{ color: "var(--acc-fg)" }}>{fa(ORDER.date)}</b></span>
                    </div>
                    <span className={`acc-badge ${s.cls}`}>{s.label}</span>
                </div>
            </div>

            <div className="acc-card" style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <MapPin size={16} style={{ color: "var(--acc-accent)", marginTop: 3, flexShrink: 0 }} />
                    <div style={{ fontSize: 13, color: "var(--acc-fg-2)" }}>
                        <p style={{ margin: 0 }}>{ORDER.address}</p>
                        <p style={{ margin: "4px 0 0", color: "var(--acc-fg-3)" }}>
                            {ORDER.receiver} · {ORDER.phone}
                        </p>
                    </div>
                </div>
                <p style={{ fontSize: 13, color: "var(--acc-fg-2)", margin: "10px 0 0" }}>
                    زمان تحویل: <b>{fa(ORDER.deliveryTime)}</b>
                </p>
            </div>

            <h2 className="acc-title" style={{ fontSize: 16, marginBottom: 14 }}>محصولات ({fa(ORDER.items.length)})</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                {ORDER.items.map((item, i) => (
                    <div key={i} className="acc-card" style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px" }}>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--acc-r-sm)", background: "var(--acc-accent-50)", display: "grid", placeItems: "center", fontSize: 22, flexShrink: 0 }}>
                            {item.img ? <img src={item.img} style={{ width: 32, height: 32, objectFit: "contain" }} /> : <ShoppingBag size={18} style={{ color: "var(--acc-accent)" }} />}
                        </div>
                        <div style={{ flex: 1, fontSize: 13 }}>
                            <div style={{ fontWeight: 600, color: "var(--acc-fg)" }}>{item.name}</div>
                            <div style={{ color: "var(--acc-fg-3)", marginTop: 2 }}>{faNum(item.qty)} {item.unit}</div>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--acc-accent)", textAlign: "left" }}>
                            {faNum(item.price * item.qty)} تومان
                        </div>
                    </div>
                ))}
            </div>

            <div className="acc-card" style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, maxWidth: 300, marginInlineStart: "auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--acc-fg-3)" }}>قیمت کالاها:</span>
                        <span>{faNum(ORDER.subtotal)} تومان</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--acc-fg-3)" }}>تخفیف:</span>
                        <span style={{ color: "var(--acc-accent)" }}>-{faNum(ORDER.discount)} تومان</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--acc-fg-3)" }}>هزینه ارسال:</span>
                        <span>{faNum(ORDER.deliveryFee)} تومان</span>
                    </div>
                    <div style={{ borderTop: "1px solid var(--acc-border)", paddingTop: 8, marginTop: 4, display: "flex", justifyContent: "space-between", fontWeight: 600, fontSize: 14 }}>
                        <span>جمع سبد خرید:</span>
                        <span style={{ color: "var(--acc-accent)" }}>{faNum(ORDER.total)} تومان</span>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
                <Link href={`/account/orders/${orderId}/review`} className="acc-btn acc-btn--filled">
                    <MessageSquare size={14} /> ثبت نظر
                </Link>
                <Link href={`/account/orders/${orderId}/dispute`} className="acc-btn acc-btn--ghost" style={{ color: "var(--acc-fg-3)" }}>
                    <AlertTriangle size={14} /> ثبت اعتراض
                </Link>
            </div>
        </div>
    )
}
