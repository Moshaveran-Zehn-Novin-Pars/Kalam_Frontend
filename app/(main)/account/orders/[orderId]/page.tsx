"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { MapPin, ChevronLeft, ShoppingBag, MessageSquare, AlertTriangle, Loader2 } from "lucide-react"
import { orderService } from "@/services/order"
import type { Order } from "@/types"
import "../../account.css"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const STATUS_STYLES: Record<string, { label: string; cls: string }> = {
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

export default function OrderDetailPage() {
    const { orderId } = useParams<{ orderId: string }>()
    const router = useRouter()
    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        orderService.getOrder(orderId).then(setOrder).catch(() => setOrder(null)).finally(() => setLoading(false))
    }, [orderId])

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "48px 24px" }}>
                <Loader2 size={24} className="animate-spin inline-block" />
            </div>
        )
    }

    if (!order) {
        return (
            <div style={{ textAlign: "center", padding: "48px 24px", color: "var(--acc-fg-3)" }}>
                سفارش مورد نظر یافت نشد
            </div>
        )
    }

    const s = STATUS_STYLES[order.status] || { label: order.status, cls: "acc-badge--warning" }
    const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString("fa-IR") : ""
    const items = order.items || []
    const subtotal = items.reduce((sum, item) => sum + (Number((item as any).pricePerUnit || (item as any).price) * Number(item.quantity)), 0)

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
                        <span style={{ color: "var(--acc-fg-3)" }}>شماره: <b style={{ color: "var(--acc-fg)" }}>#{fa(order.id)}</b></span>
                        <span style={{ color: "var(--acc-fg-3)" }}>تاریخ: <b style={{ color: "var(--acc-fg)" }}>{fa(date)}</b></span>
                    </div>
                    <span className={`acc-badge ${s.cls}`}>{s.label}</span>
                </div>
            </div>

            {order.address && (
                <div className="acc-card" style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <MapPin size={16} style={{ color: "var(--acc-accent)", marginTop: 3, flexShrink: 0 }} />
                        <div style={{ fontSize: 13, color: "var(--acc-fg-2)" }}>
                            <p style={{ margin: 0 }}>{order.address.fullAddress}</p>
                            {order.address.receiverName && (
                                <p style={{ margin: "4px 0 0", color: "var(--acc-fg-3)" }}>
                                    {order.address.receiverName} · {order.address.receiverPhone}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <h2 className="acc-title" style={{ fontSize: 16, marginBottom: 14 }}>محصولات ({fa(items.length)})</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                {items.map((item, i) => (
                    <div key={i} className="acc-card" style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px" }}>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--acc-r-sm)", background: "var(--acc-accent-50)", display: "grid", placeItems: "center", fontSize: 22, flexShrink: 0 }}>
                            <ShoppingBag size={18} style={{ color: "var(--acc-accent)" }} />
                        </div>
                        <div style={{ flex: 1, fontSize: 13 }}>
                            <div style={{ fontWeight: 600, color: "var(--acc-fg)" }}>{item.productName}</div>
                            <div style={{ color: "var(--acc-fg-3)", marginTop: 2 }}>{faNum(Number(item.quantity))} {item.unit || ""}</div>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--acc-accent)", textAlign: "left" }}>
                            {faNum(Number((item as any).pricePerUnit || (item as any).price) * Number(item.quantity))} تومان
                        </div>
                    </div>
                ))}
            </div>

            <div className="acc-card" style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, maxWidth: 300, marginInlineStart: "auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--acc-fg-3)" }}>قیمت کالاها:</span>
                        <span>{faNum(subtotal)} تومان</span>
                    </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--acc-fg-3)" }}>هزینه ارسال:</span>
                        <span>{faNum(Number(order.deliveryFee || 0))} تومان</span>
                    </div>
                    <div style={{ borderTop: "1px solid var(--acc-border)", paddingTop: 8, marginTop: 4, display: "flex", justifyContent: "space-between", fontWeight: 600, fontSize: 14 }}>
                        <span>جمع سبد خرید:</span>
                        <span style={{ color: "var(--acc-accent)" }}>{faNum(Number(order.total))} تومان</span>
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
