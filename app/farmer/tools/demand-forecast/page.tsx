"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, BrainCircuit, Lightbulb, RefreshCw, BarChart3 } from "lucide-react"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const DEMAND_DATA = [
    { product: "سیب درختی", current: 85, predicted: 92, change: "+۸.۲٪" },
    { product: "گوجه فرنگی", current: 72, predicted: 65, change: "-۹.۷٪" },
    { product: "انگور", current: 45, predicted: 58, change: "+۲۸.۹٪" },
    { product: "هلو", current: 30, predicted: 22, change: "-۲۶.۷٪" },
    { product: "خیار", current: 55, predicted: 60, change: "+۹.۱٪" },
    { product: "اسفناج", current: 40, predicted: 48, change: "+۲۰٪" },
]

const CHART_DATA = DEMAND_DATA.map(d => ({
    name: d.product.split(" ")[0],
    فعلی: d.current,
    پیش‌بینی: d.predicted,
}))

const INSIGHTS = [
    { icon: "📈", title: "انگور در صدر رشد تقاضا", desc: "پیش‌بینی می‌شود تقاضای انگور در هفته‌های آینده ۲۸.۹٪ افزایش یابد. تولید خود را افزایش دهید.", type: "positive" },
    { icon: "📉", title: "کاهش تقاضای هلو", desc: "با اتمام فصل هلو، تقاضا رو به کاهش است. موجودی فعلی را سریع‌تر به فروش برسانید.", type: "negative" },
    { icon: "💡", title: "تنوع محصولات", desc: "افزودن محصولات جدید مانند کیوی و پرتقال می‌تواند سبد فروش شما را متنوع‌تر کند.", type: "info" },
]

export default function DemandForecastPage() {
    const [period, setPeriod] = useState("week")

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <h1 className="f-title" style={{ margin: 0 }}>پیش‌بینی تقاضا</h1>
                    <span className="f-pill f-pill--active" style={{ fontSize: 11 }}>AI</span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                    {[
                        { id: "week", label: "هفته" },
                        { id: "month", label: "ماه" },
                        { id: "season", label: "فصل" },
                    ].map(p => (
                        <button key={p.id} onClick={() => setPeriod(p.id)}
                            className={`f-btn ${period === p.id ? "f-btn--filled" : "f-btn--ghost"}`}
                            style={{ padding: "6px 14px", fontSize: 12 }}>
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="f-alert f-alert--info" style={{ marginBottom: 20 }}>
                <BrainCircuit size={16} />
                پیش‌بینی تقاضا بر اساس تحلیل سفارشات گذشته، روندهای فصلی و داده‌های بازار توسط هوش مصنوعی کلم محاسبه شده است.
            </div>

            <div className="f-grid-2" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
                <div className="f-card">
                    <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>مقایسه تقاضای فعلی و پیش‌بینی شده</h3>
                    <div style={{ height: 280 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                                <CartesianGrid stroke="var(--f-border)" strokeDasharray="4 4" vertical={false} />
                                <XAxis dataKey="name" reversed tick={{ fill: "var(--f-fg-3)", fontSize: 11, fontFamily: "var(--f-font)" }} axisLine={false} tickLine={false} />
                                <YAxis orientation="right" tick={{ fill: "var(--f-fg-3)", fontSize: 11, fontFamily: "var(--f-font)" }} axisLine={false} tickLine={false} tickFormatter={v => fa(v) + "٪"} />
                                <Tooltip contentStyle={{ fontFamily: "var(--f-font)", fontSize: 12, borderRadius: 8 }} />
                                <Bar dataKey="فعلی" fill="var(--f-fg-4)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="پیش‌بینی" fill="var(--f-accent)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="f-card">
                    <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>پیشنهاد تولید</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {DEMAND_DATA.sort((a, b) => parseFloat(b.change) - parseFloat(a.change)).slice(0, 4).map(d => (
                            <div key={d.product} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--f-border)" }}>
                                <BarChart3 size={14} style={{ color: "var(--f-accent)", flexShrink: 0 }} />
                                <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{d.product}</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: d.change.startsWith("+") ? "var(--f-up)" : "var(--f-down)" }}>
                                    {d.change.startsWith("+") ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {d.change}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <h2 className="f-section-title">تحلیل‌های هوشمند</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {INSIGHTS.map((item, i) => (
                    <div key={i} className="f-card" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <div style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{item.icon}</div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
                            <p style={{ margin: 0, fontSize: 13, color: "var(--f-fg-2)", lineHeight: 1.7 }}>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
