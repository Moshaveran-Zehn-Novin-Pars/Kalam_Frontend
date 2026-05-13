"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, TrendingUp, TrendingDown, Wallet, Package, Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import {
    LineChart, Line, ResponsiveContainer, XAxis, YAxis,
    CartesianGrid, Tooltip
} from "recharts"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

function useCountUp(target: number) {
    const [v, setV] = useState(0)
    useEffect(() => {
        let start: number | null = null; let raf: number
        const step = (t: number) => {
            if (!start) start = t
            const p = Math.min((t - start) / 900, 1)
            setV(Math.round(target * (1 - Math.pow(1 - p, 3))))
            if (p < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
        return () => cancelAnimationFrame(raf)
    }, [target])
    return v
}

const CHART_DATA = [
    { m: "فروردین", v: 12 }, { m: "اردیبهشت", v: 18 }, { m: "خرداد", v: 22 },
    { m: "تیر", v: 16 },    { m: "مرداد", v: 28 },    { m: "شهریور", v: 24 },
    { m: "مهر", v: 19 },    { m: "آبان", v: 32 },     { m: "آذر", v: 28 },
    { m: "دی", v: 21 },     { m: "بهمن", v: 38 },     { m: "اسفند", v: 30 },
]

const PENDING_ORDERS = [
    { id: "2345923", buyer: "سوپرمارکت رضایی", cat: "سیب درختی", qty: "200 کیلو", total: 13000000, date: "1404/9/12" },
    { id: "2345924", buyer: "رستوران آرارات",   cat: "گوجه فرنگی", qty: "50 کیلو", total: 2250000, date: "1404/9/11" },
    { id: "2345925", buyer: "هایپرمی",          cat: "انگور",       qty: "300 کیلو", total: 24000000, date: "1404/9/10" },
]

const STATUS_MAP: Record<string, {label:string;cls:string}> = {
    PENDING_CONFIRMATION: { label: "در انتظار تأیید", cls: "f-pill--pending" },
    CONFIRMED:            { label: "تأیید شده",       cls: "f-pill--prep" },
    SHIPPED:              { label: "ارسال شده",        cls: "f-pill--shipped" },
    CANCELLED:            { label: "لغو شده",          cls: "f-pill--cancel" },
}

function StatCard({ icon, label, value, unit, delta, dir }: any) {
    const v = useCountUp(value)
    return (
        <div className="f-stat">
            <div className="f-stat__label"><span className="f-stat__icon">{icon}</span>{label}</div>
            <div className="f-stat__value">{faNum(v)}<span className="f-stat__unit">{unit}</span></div>
            {delta && (
                <span className={`f-stat__delta ${dir}`}>
          {dir === "up" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {fa(delta)}٪ نسبت به ماه قبل
        </span>
            )}
        </div>
    )
}

export default function FarmerDashboard() {
    return (
        <>
            <h1 className="f-title">داشبورد</h1>

            {/* stat cards */}
            <div className="f-stat-grid">
                <StatCard icon={<ShoppingBag size={16} />} label="سفارش‌های این ماه" value={24} unit=" سفارش" delta="18" dir="up" />
                <StatCard icon={<Wallet size={16} />}      label="درآمد این ماه"   value={185000000} unit=" تومان" delta="12" dir="up" />
                <StatCard icon={<Package size={16} />}     label="محصولات فعال"   value={8} unit=" محصول" />
                <StatCard icon={<Clock size={16} />}       label="در انتظار تأیید" value={3} unit=" سفارش" />
            </div>

            {/* revenue chart */}
            <div className="f-card" style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>نمودار درآمد ماهانه</h3>
                    <span style={{ fontSize: 12, color: "var(--f-fg-3)" }}>سال ۱۴۰۴</span>
                </div>
                <div style={{ height: 220 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                            <CartesianGrid stroke="var(--f-border)" strokeDasharray="4 4" vertical={false} />
                            <XAxis dataKey="m" reversed tick={{ fill: "var(--f-fg-3)", fontSize: 11, fontFamily: "var(--f-font)" }} axisLine={false} tickLine={false} interval={0} />
                            <YAxis orientation="right" tick={{ fill: "var(--f-fg-3)", fontSize: 11, fontFamily: "var(--f-font)" }} axisLine={false} tickLine={false} tickFormatter={v => fa(v) + "م"} />
                            <Tooltip formatter={(v: any) => [faNum(v * 1000000) + " تومان", "درآمد"]} labelStyle={{ fontFamily: "var(--f-font)" }} contentStyle={{ fontFamily: "var(--f-font)", fontSize: 12, borderRadius: 8 }} />
                            <Line type="monotone" dataKey="v" stroke="var(--f-accent)" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: "var(--f-accent)", stroke: "#fff", strokeWidth: 2 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* pending orders */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <h2 className="f-section-title" style={{ margin: 0 }}>سفارش‌های در انتظار تأیید</h2>
                <Link href="/farmer/orders" style={{ fontSize: 13, color: "var(--f-accent)", textDecoration: "none" }}>مشاهده همه ←</Link>
            </div>
            <div className="f-table-card">
                <div className="f-table-wrap">
                    <table className="f-table">
                        <thead><tr>
                            <th>شماره</th><th>خریدار</th><th>محصول</th><th>مقدار</th><th>مبلغ</th><th>تاریخ</th><th>عملیات</th>
                        </tr></thead>
                        <tbody>
                        {PENDING_ORDERS.map(o => (
                            <tr key={o.id}>
                                <td className="tnum" style={{ color: "var(--f-fg-3)" }}>#{fa(o.id)}</td>
                                <td>{o.buyer}</td>
                                <td>{o.cat}</td>
                                <td className="tnum">{fa(o.qty)}</td>
                                <td className="tnum" style={{ fontWeight: 600 }}>{faNum(o.total)}</td>
                                <td className="tnum">{fa(o.date)}</td>
                                <td>
                                    <div style={{ display: "flex", gap: 6 }}>
                                        <button className="f-btn f-btn--filled" style={{ padding: "5px 12px", fontSize: 12 }}>
                                            <CheckCircle size={13} /> تأیید
                                        </button>
                                        <button className="f-btn f-btn--ghost" style={{ padding: "5px 12px", fontSize: 12 }}>
                                            <XCircle size={13} /> رد
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