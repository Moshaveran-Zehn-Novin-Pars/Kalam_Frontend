"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const PENDING_ORDERS = [
    { id: "2345923", buyer: "سوپرمارکت رضایی", cat: "سیب درختی",   qty: "200 کیلو", total: 13000000, date: "1404/9/12" },
    { id: "2345926", buyer: "رستوران کاج",      cat: "خیار",        qty: "100 کیلو", total: 2800000,  date: "1404/9/9" },
    { id: "2345929", buyer: "هایپرمی",          cat: "پرتقال",      qty: "400 کیلو", total: 28000000, date: "1404/9/14" },
]

export default function PendingOrdersPage() {
    const router = useRouter()

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <Link href="/farmer/orders" className="f-btn f-btn--ghost" style={{ padding: "7px 14px" }}>
                    <ArrowLeft size={14} /> بازگشت
                </Link>
                <h1 className="f-title" style={{ margin: 0 }}>سفارش‌های در انتظار تأیید</h1>
                <span className="f-pill f-pill--pending" style={{ fontSize: 13 }}>{fa(PENDING_ORDERS.length)} سفارش</span>
            </div>

            <div className="f-alert f-alert--warning">
                ⏳ {fa(PENDING_ORDERS.length)} سفارش منتظر تأیید شما هستند. لطفاً در اسرع وقت بررسی کنید.
            </div>

            <div className="f-table-card">
                <div className="f-table-wrap">
                    <table className="f-table">
                        <thead><tr>
                            <th>شماره</th><th>خریدار</th><th>محصول</th><th>مقدار</th>
                            <th>مبلغ</th><th>تاریخ</th><th>عملیات</th>
                        </tr></thead>
                        <tbody>
                        {PENDING_ORDERS.map(o => (
                            <tr key={o.id} className="clickable" onClick={() => router.push(`/farmer/orders/${o.id}`)}>
                                <td className="tnum" style={{ color: "var(--f-fg-3)" }}>#{fa(o.id)}</td>
                                <td>{o.buyer}</td>
                                <td>{o.cat}</td>
                                <td className="tnum">{fa(o.qty)}</td>
                                <td className="tnum" style={{ fontWeight: 600 }}>{faNum(o.total)}</td>
                                <td className="tnum">{fa(o.date)}</td>
                                <td onClick={e => e.stopPropagation()}>
                                    <div style={{ display: "flex", gap: 5 }}>
                                        <button className="f-btn f-btn--filled" style={{ padding: "4px 10px", fontSize: 12 }}>
                                            <CheckCircle size={12} /> تأیید
                                        </button>
                                        <button className="f-btn f-btn--ghost" style={{ padding: "4px 10px", fontSize: 12 }}>
                                            <XCircle size={12} /> رد
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
