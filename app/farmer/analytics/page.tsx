"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Package } from "lucide-react"
import {
    LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis,
    CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend
} from "recharts"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const MONTHLY_REVENUE = [
    { m: "فروردین", v: 85 }, { m: "اردیبهشت", v: 120 }, { m: "خرداد", v: 98 },
    { m: "تیر", v: 145 },    { m: "مرداد", v: 168 },    { m: "شهریور", v: 132 },
    { m: "مهر", v: 110 },    { m: "آبان", v: 156 },     { m: "آذر", v: 142 },
    { m: "دی", v: 95 },      { m: "بهمن", v: 178 },     { m: "اسفند", v: 160 },
]

const PRODUCT_PERFORMANCE = [
    { name: "سیب درختی", sales: 340, revenue: 22100000, trend: "up" },
    { name: "گوجه فرنگی", sales: 280, revenue: 12600000, trend: "up" },
    { name: "انگور بی‌دانه", sales: 195, revenue: 15600000, trend: "down" },
    { name: "خیار گلخانه", sales: 160, revenue: 4480000, trend: "up" },
    { name: "هلو شیراز", sales: 120, revenue: 11400000, trend: "down" },
]

const CATEGORY_DATA = [
    { name: "میوه", value: 55 }, { name: "سبزیجات", value: 30 }, { name: "صیفی", value: 15 },
]
const COLORS = ["var(--f-accent)", "var(--f-pending-fg)", "var(--f-prep-fg)"]

const ORDER_TRENDS = [
    { m: "فروردین", orders: 8 }, { m: "اردیبهشت", orders: 12 }, { m: "خرداد", orders: 10 },
    { m: "تیر", orders: 15 },    { m: "مرداد", orders: 18 },    { m: "شهریور", orders: 14 },
    { m: "مهر", orders: 11 },    { m: "آبان", orders: 16 },     { m: "آذر", orders: 13 },
    { m: "دی", orders: 9 },      { m: "بهمن", orders: 20 },     { m: "اسفند", orders: 17 },
]

export default function FarmerAnalyticsPage() {
    const [period, setPeriod] = useState("year")

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <h1 className="f-title" style={{ margin: 0 }}>تحلیل فروش</h1>
                <div style={{ display: "flex", gap: 6 }}>
                    {[
                        { id: "week", label: "هفته" },
                        { id: "month", label: "ماه" },
                        { id: "year", label: "سال" },
                    ].map(p => (
                        <button key={p.id} onClick={() => setPeriod(p.id)}
                            className={`f-btn ${period === p.id ? "f-btn--filled" : "f-btn--ghost"}`}
                            style={{ padding: "6px 14px", fontSize: 12 }}>
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="f-stat-grid">
                <div className="f-stat">
                    <div className="f-stat__label"><DollarSign size={15} />کل درآمد</div>
                    <div className="f-stat__value" style={{ color: "var(--f-accent)" }}>{faNum(1689000000)}</div>
                    <span className="f-stat__delta up"><TrendingUp size={10} />{fa(24)}٪</span>
                </div>
                <div className="f-stat">
                    <div className="f-stat__label"><ShoppingBag size={15} />تعداد سفارش</div>
                    <div className="f-stat__value">{fa(163)}</div>
                    <span className="f-stat__delta up"><TrendingUp size={10} />{fa(18)}٪</span>
                </div>
                <div className="f-stat">
                    <div className="f-stat__label"><Users size={15} />خریداران فعال</div>
                    <div className="f-stat__value">{fa(24)}</div>
                    <span className="f-stat__delta up"><TrendingUp size={10} />{fa(12)}٪</span>
                </div>
                <div className="f-stat">
                    <div className="f-stat__label"><Package size={15} />محصولات فروخته شده</div>
                    <div className="f-stat__value">{faNum(4850)}</div>
                    <span className="f-stat__delta down"><TrendingDown size={10} />{fa(3)}٪</span>
                </div>
            </div>

            <div className="f-grid-2" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
                <div className="f-card">
                    <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>درآمد ماهانه (میلیون تومان)</h3>
                    <div style={{ height: 240 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={MONTHLY_REVENUE} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                                <CartesianGrid stroke="var(--f-border)" strokeDasharray="4 4" vertical={false} />
                                <XAxis dataKey="m" reversed tick={{ fill: "var(--f-fg-3)", fontSize: 11, fontFamily: "var(--f-font)" }} axisLine={false} tickLine={false} interval={0} />
                                <YAxis orientation="right" tick={{ fill: "var(--f-fg-3)", fontSize: 11, fontFamily: "var(--f-font)" }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ fontFamily: "var(--f-font)", fontSize: 12, borderRadius: 8 }} />
                                <Bar dataKey="v" fill="var(--f-accent)" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="f-card">
                    <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>دسته‌بندی فروش</h3>
                    <div style={{ height: 240, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                                     paddingAngle={4} dataKey="value">
                                    {CATEGORY_DATA.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i]} />
                                    ))}
                                </Pie>
                                <Legend formatter={(v: string) => <span style={{ fontFamily: "var(--f-font)", fontSize: 12 }}>{v}</span>} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="f-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                <div className="f-card">
                    <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>روند سفارش‌ها</h3>
                    <div style={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={ORDER_TRENDS} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                                <CartesianGrid stroke="var(--f-border)" strokeDasharray="4 4" vertical={false} />
                                <XAxis dataKey="m" reversed tick={{ fill: "var(--f-fg-3)", fontSize: 10, fontFamily: "var(--f-font)" }} axisLine={false} tickLine={false} interval={1} />
                                <YAxis orientation="right" tick={{ fill: "var(--f-fg-3)", fontSize: 11, fontFamily: "var(--f-font)" }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ fontFamily: "var(--f-font)", fontSize: 12, borderRadius: 8 }} />
                                <Line type="monotone" dataKey="orders" stroke="var(--f-accent)" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="f-card">
                    <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>عملکرد محصولات</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {PRODUCT_PERFORMANCE.map(p => (
                            <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--f-border)" }}>
                                <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                                <div style={{ fontSize: 12, color: "var(--f-fg-3)", textAlign: "center" }}>
                                    <div>{faNum(p.sales)} کیلو</div>
                                </div>
                                <div style={{ fontSize: 12, textAlign: "end", minWidth: 80, fontWeight: 600 }}>
                                    {faNum(p.revenue)}
                                </div>
                                {p.trend === "up"
                                    ? <TrendingUp size={14} style={{ color: "var(--f-up)" }} />
                                    : <TrendingDown size={14} style={{ color: "var(--f-down)" }} />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
