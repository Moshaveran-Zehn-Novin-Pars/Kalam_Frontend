"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, CheckCircle, Clock } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const ALL_SETTLEMENTS = [
    { id: "s1", period: "مهر ۱۴۰۴",  date: "1404/8/10", amount: 45000000, orders: 8,  status: "paid",    ref: "TRX-90218" },
    { id: "s2", period: "آبان ۱۴۰۴", date: "1404/9/10", amount: 62000000, orders: 12, status: "paid",    ref: "TRX-90145" },
    { id: "s3", period: "آذر ۱۴۰۴",  date: "1404/10/10",amount: 38000000, orders: 7,  status: "paid",    ref: "TRX-90074" },
    { id: "s4", period: "دی ۱۴۰۴",   date: "1404/11/10",amount: 71000000, orders: 15, status: "pending", ref: "—" },
    { id: "s5", period: "بهمن ۱۴۰۴", date: "1404/12/10",amount: 89000000, orders: 18, status: "pending", ref: "—" },
]

export default function SettlementsPage() {
    const [filter, setFilter] = useState("all")
    const filtered = filter === "all" ? ALL_SETTLEMENTS : ALL_SETTLEMENTS.filter(s => s.status === filter)

    const totalPaid = ALL_SETTLEMENTS.filter(s => s.status === "paid").reduce((sum, s) => sum + s.amount, 0)
    const totalPending = ALL_SETTLEMENTS.filter(s => s.status === "pending").reduce((sum, s) => sum + s.amount, 0)

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <Link href="/farmer/finance" className="f-btn f-btn--ghost" style={{ padding: "7px 14px" }}>
                    <ArrowLeft size={14} /> بازگشت
                </Link>
                <h1 className="f-title" style={{ margin: 0 }}>تسویه‌حساب‌ها</h1>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 20 }}>
                <div className="f-finance-card f-finance-card--accent">
                    <div className="f-finance-label">کل تسویه‌های انجام شده</div>
                    <div className="f-finance-value">{faNum(totalPaid)}<span className="f-finance-unit">تومان</span></div>
                    <div className="f-finance-meta">{fa(ALL_SETTLEMENTS.filter(s => s.status === "paid").length)} دوره پرداخت شده</div>
                </div>
                <div className="f-finance-card">
                    <div className="f-finance-label">در انتظار واریز</div>
                    <div className="f-finance-value" style={{ color: "var(--f-pending-fg)" }}>{faNum(totalPending)}<span className="f-finance-unit">تومان</span></div>
                    <div className="f-finance-meta">{fa(ALL_SETTLEMENTS.filter(s => s.status === "pending").length)} دوره</div>
                </div>
            </div>

            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                {[
                    { id: "all", label: "همه" },
                    { id: "paid", label: "پرداخت شده" },
                    { id: "pending", label: "در انتظار" },
                ].map(f => (
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
                            <th>دوره</th><th>تاریخ تسویه</th><th>تعداد سفارش</th>
                            <th>مبلغ</th><th>کد پیگیری</th><th>وضعیت</th><th>دریافت</th>
                        </tr></thead>
                        <tbody>
                        {filtered.map(s => (
                            <tr key={s.id}>
                                <td style={{ fontWeight: 500 }}>{s.period}</td>
                                <td className="tnum">{fa(s.date)}</td>
                                <td className="tnum">{fa(s.orders)} سفارش</td>
                                <td className="tnum" style={{ fontWeight: 600 }}>{faNum(s.amount)} تومان</td>
                                <td style={{ fontFamily: "monospace", fontSize: 12, color: "var(--f-fg-3)" }}>{s.ref}</td>
                                <td>
                                    <span className={`f-pill ${s.status === "paid" ? "f-pill--shipped" : "f-pill--pending"}`}>
                                        {s.status === "paid" ? "واریز شده" : "در انتظار"}
                                    </span>
                                </td>
                                <td>
                                    {s.status === "paid" ? (
                                        <button className="f-btn f-btn--ghost" style={{ padding: "4px 10px", fontSize: 12 }}>
                                            <Download size={12} /> فاکتور
                                        </button>
                                    ) : (
                                        <span style={{ fontSize: 12, color: "var(--f-fg-3)" }}>—</span>
                                    )}
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
