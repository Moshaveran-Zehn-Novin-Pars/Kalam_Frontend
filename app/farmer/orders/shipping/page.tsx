"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Truck, ArrowLeft } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const SHIPPING_ORDERS = [
    { id: "2345925", buyer: "هایپرمی",      cat: "انگور",     qty: "300 کیلو", total: 24000000, date: "1404/9/10", driver: "رضا کریمی", eta: "۱۴۰۴/۹/۱۶" },
    { id: "2345930", buyer: "میوه فروشی محسن", cat: "سیب",    qty: "150 کیلو", total: 9750000,  date: "1404/9/13", driver: "حسین احمدی", eta: "۱۴۰۴/۹/۱۷" },
]

export default function ShippingOrdersPage() {
    const router = useRouter()

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <Link href="/farmer/orders" className="f-btn f-btn--ghost" style={{ padding: "7px 14px" }}>
                    <ArrowLeft size={14} /> بازگشت
                </Link>
                <h1 className="f-title" style={{ margin: 0 }}>سفارش‌های در حال ارسال</h1>
                <span className="f-pill f-pill--shipped" style={{ fontSize: 13 }}>{fa(SHIPPING_ORDERS.length)} سفارش</span>
            </div>

            <div className="f-table-card">
                <div className="f-table-wrap">
                    <table className="f-table">
                        <thead><tr>
                            <th>شماره</th><th>خریدار</th><th>محصول</th><th>مقدار</th>
                            <th>مبلغ</th><th>راننده</th><th>تخمین تحویل</th>
                        </tr></thead>
                        <tbody>
                        {SHIPPING_ORDERS.map(o => (
                            <tr key={o.id} className="clickable" onClick={() => router.push(`/farmer/orders/${o.id}`)}>
                                <td className="tnum" style={{ color: "var(--f-fg-3)" }}>#{fa(o.id)}</td>
                                <td>{o.buyer}</td>
                                <td>{o.cat}</td>
                                <td className="tnum">{fa(o.qty)}</td>
                                <td className="tnum" style={{ fontWeight: 600 }}>{faNum(o.total)}</td>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <Truck size={13} style={{ color: "var(--f-fg-3)" }} />
                                        <span style={{ fontSize: 12 }}>{o.driver}</span>
                                    </div>
                                </td>
                                <td className="tnum" style={{ color: "var(--f-accent)", fontWeight: 500 }}>{fa(o.eta)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
