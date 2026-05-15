"use client"

import Link from "next/link"
import { ArrowUpRight, CreditCard, TrendingDown, Receipt } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const SETTLEMENTS = [
    { id: "s1", date: "1404/9/1",  amount: 45000000, orders: 8, status: "paid",    ref: "TRX-90218" },
    { id: "s2", date: "1404/8/1",  amount: 62000000, orders: 12, status: "paid",   ref: "TRX-90145" },
    { id: "s3", date: "1404/7/1",  amount: 38000000, orders: 7, status: "paid",    ref: "TRX-90074" },
    { id: "s4", date: "1404/10/1", amount: 71000000, orders: 15, status: "pending", ref: "—" },
]

export default function FarmerFinancePage() {
    return (
        <>
            <h1 className="f-title">مالی و تسویه‌حساب</h1>

            <div className="f-finance-grid">
                <div className="f-finance-card f-finance-card--accent">
                    <div className="f-finance-label">موجودی قابل برداشت</div>
                    <div className="f-finance-value">{faNum(71000000)}<span className="f-finance-unit">تومان</span></div>
                    <div className="f-finance-meta">پس از کسر کمیسیون کلم</div>
                </div>
                <div className="f-finance-card">
                    <div className="f-finance-label">کل درآمد این ماه</div>
                    <div className="f-finance-value">{faNum(185000000)}<span className="f-finance-unit">تومان</span></div>
                    <div className="f-finance-meta">{fa(24)} سفارش</div>
                </div>
                <div className="f-finance-card">
                    <div className="f-finance-label">کمیسیون پرداخت شده</div>
                    <div className="f-finance-value">{faNum(18500000)}<span className="f-finance-unit">تومان</span></div>
                    <div className="f-finance-meta">نرخ: ۱۰٪</div>
                </div>
            </div>

            <div className="f-alert f-alert--info" style={{ marginBottom: 20 }}>
                💡 تسویه‌حساب‌ها هر ماه اول به حساب ثبت شده واریز می‌شود.
            </div>

            <div className="f-finance-nav" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
                <Link href="/farmer/finance/settlements"
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", background: "var(--f-surface)", border: "1px solid var(--f-border)", borderRadius: "var(--f-r)", textDecoration: "none" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "var(--f-r-sm)", background: "var(--f-accent-50)", display: "grid", placeItems: "center", color: "var(--f-accent)" }}>
                        <Receipt size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--f-fg)" }}>تسویه‌حساب‌ها</div>
                        <div style={{ fontSize: 12, color: "var(--f-fg-3)", marginTop: 2 }}>مشاهده جزئیات</div>
                    </div>
                    <ArrowUpRight size={16} style={{ color: "var(--f-fg-3)" }} />
                </Link>
                <Link href="/farmer/finance/payouts"
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", background: "var(--f-surface)", border: "1px solid var(--f-border)", borderRadius: "var(--f-r)", textDecoration: "none" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "var(--f-r-sm)", background: "var(--f-accent-50)", display: "grid", placeItems: "center", color: "var(--f-accent)" }}>
                        <CreditCard size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--f-fg)" }}>پرداخت‌ها</div>
                        <div style={{ fontSize: 12, color: "var(--f-fg-3)", marginTop: 2 }}>تاریخچه واریزها</div>
                    </div>
                    <ArrowUpRight size={16} style={{ color: "var(--f-fg-3)" }} />
                </Link>
                <Link href="/farmer/finance/commissions"
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", background: "var(--f-surface)", border: "1px solid var(--f-border)", borderRadius: "var(--f-r)", textDecoration: "none" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "var(--f-r-sm)", background: "var(--f-accent-50)", display: "grid", placeItems: "center", color: "var(--f-accent)" }}>
                        <TrendingDown size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--f-fg)" }}>کمیسیون‌ها</div>
                        <div style={{ fontSize: 12, color: "var(--f-fg-3)", marginTop: 2 }}>جزئیات کسر کمیسیون</div>
                    </div>
                    <ArrowUpRight size={16} style={{ color: "var(--f-fg-3)" }} />
                </Link>
            </div>

            <h2 className="f-section-title">آخرین تسویه‌حساب‌ها</h2>
            <div className="f-table-card">
                <div className="f-table-wrap">
                    <table className="f-table">
                        <thead><tr>
                            <th>تاریخ</th><th>تعداد سفارش</th><th>مبلغ تسویه</th><th>کد پیگیری</th><th>وضعیت</th>
                        </tr></thead>
                        <tbody>
                        {SETTLEMENTS.map(s => (
                            <tr key={s.id}>
                                <td className="tnum">{fa(s.date)}</td>
                                <td className="tnum">{fa(s.orders)} سفارش</td>
                                <td className="tnum" style={{ fontWeight: 600 }}>{faNum(s.amount)} تومان</td>
                                <td style={{ fontFamily: "monospace", fontSize: 12, color: "var(--f-fg-3)" }}>{s.ref}</td>
                                <td>
                    <span className={`f-pill ${s.status === "paid" ? "f-pill--shipped" : "f-pill--pending"}`}>
                      {s.status === "paid" ? "واریز شده" : "در انتظار"}
                    </span>
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
