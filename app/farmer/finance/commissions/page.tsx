"use client"

import Link from "next/link"
import { ArrowLeft, Info } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const COMMISSION_HISTORY = [
    { id: "c1", period: "مهر ۱۴۰۴",  gross: 50000000, commission: 3000000, rate: 6,  orders: 8 },
    { id: "c2", period: "آبان ۱۴۰۴", gross: 70000000, commission: 4200000, rate: 6,  orders: 12 },
    { id: "c3", period: "آذر ۱۴۰۴",  gross: 44000000, commission: 2640000, rate: 6,  orders: 7 },
    { id: "c4", period: "دی ۱۴۰۴",   gross: 80000000, commission: 4800000, rate: 6,  orders: 15 },
]

export default function CommissionsPage() {
    const totalCommission = COMMISSION_HISTORY.reduce((s, c) => s + c.commission, 0)
    const totalGross = COMMISSION_HISTORY.reduce((s, c) => s + c.gross, 0)

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <Link href="/farmer/finance" className="f-btn f-btn--ghost" style={{ padding: "7px 14px" }}>
                    <ArrowLeft size={14} /> بازگشت
                </Link>
                <h1 className="f-title" style={{ margin: 0 }}>کمیسیون‌ها</h1>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
                <div className="f-finance-card f-finance-card--accent">
                    <div className="f-finance-label">کل کمیسیون پرداختی</div>
                    <div className="f-finance-value">{faNum(totalCommission)}<span className="f-finance-unit">تومان</span></div>
                </div>
                <div className="f-finance-card">
                    <div className="f-finance-label">کل فروش ناخالص</div>
                    <div className="f-finance-value">{faNum(totalGross)}<span className="f-finance-unit">تومان</span></div>
                </div>
                <div className="f-finance-card">
                    <div className="f-finance-label">نرخ کمیسیون</div>
                    <div className="f-finance-value">{fa(6)}<span className="f-finance-unit">٪</span></div>
                    <div className="f-finance-meta">نرخ استاندارد پلتفرم</div>
                </div>
            </div>

            <div className="f-alert f-alert--info">
                <Info size={15} />
                کمیسیون کلم از مبلغ نهایی هر سفارش کسر می‌شود. نرخ کمیسیون بر اساس دسته‌بندی محصول تعیین می‌گردد.
            </div>

            <h2 className="f-section-title">تاریخچه کمیسیون</h2>
            <div className="f-table-card">
                <div className="f-table-wrap">
                    <table className="f-table">
                        <thead><tr>
                            <th>دوره</th><th>تعداد سفارش</th><th>فروش ناخالص</th>
                            <th>نرخ</th><th>کمیسیون</th><th>سهم شما</th>
                        </tr></thead>
                        <tbody>
                        {COMMISSION_HISTORY.map(c => (
                            <tr key={c.id}>
                                <td style={{ fontWeight: 500 }}>{c.period}</td>
                                <td className="tnum">{fa(c.orders)} سفارش</td>
                                <td className="tnum">{faNum(c.gross)} تومان</td>
                                <td className="tnum">{fa(c.rate)}٪</td>
                                <td className="tnum" style={{ color: "var(--f-pending-fg)" }}>{faNum(c.commission)} تومان</td>
                                <td className="tnum" style={{ fontWeight: 600, color: "var(--f-accent)" }}>{faNum(c.gross - c.commission)} تومان</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
