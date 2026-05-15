"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, BrainCircuit, RefreshCw, Info } from "lucide-react"
import {
    LineChart, Line, ResponsiveContainer, XAxis, YAxis,
    CartesianGrid, Tooltip, Area, AreaChart
} from "recharts"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const HISTORICAL_DATA = [
    { d: "۱ مهر", actual: 58000, predicted: null },
    { d: "۸ مهر", actual: 59000, predicted: null },
    { d: "۱۵ مهر", actual: 61000, predicted: null },
    { d: "۲۲ مهر", actual: 60500, predicted: null },
    { d: "۲۹ مهر", actual: 62000, predicted: null },
    { d: "۵ آبان", actual: 63500, predicted: null },
    { d: "۱۲ آبان", actual: 64000, predicted: null },
    { d: "۱۹ آبان", actual: 65000, predicted: null },
    { d: "۲۶ آبان", actual: 66000, predicted: null },
    { d: "۳ آذر", actual: 64500, predicted: null },
    { d: "۱۰ آذر", actual: 65000, predicted: null },
    { d: "۱۷ آذر", actual: 65500, predicted: 67000 },
    { d: "۲۴ آذر", actual: null,  predicted: 69000 },
    { d: "۱ دی",   actual: null,  predicted: 71000 },
    { d: "۸ دی",   actual: null,  predicted: 69500 },
    { d: "۱۵ دی",  actual: null,  predicted: 72000 },
]

const RECOMMENDATIONS = [
    { product: "سیب درختی", currentPrice: 65000, predictedPrice: 72000, change: "+۱۰.۸٪", direction: "up", action: "منتظر بمانید" },
    { product: "گوجه فرنگی", currentPrice: 45000, predictedPrice: 42000, change: "-۶.۷٪", direction: "down", action: "زودتر بفروشید" },
    { product: "انگور بی‌دانه", currentPrice: 80000, predictedPrice: 85000, change: "+۶.۳٪", direction: "up", action: "منتظر بمانید" },
]

export default function PricePredictionPage() {
    const [selectedProduct, setSelectedProduct] = useState("apple")
    const [loading, setLoading] = useState(false)

    const refresh = () => {
        setLoading(true)
        setTimeout(() => setLoading(false), 1500)
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <h1 className="f-title" style={{ margin: 0 }}>پیش‌بینی قیمت هوشمند</h1>
                    <span className="f-pill f-pill--active" style={{ fontSize: 11 }}>AI</span>
                </div>
                <button className="f-btn f-btn--ghost" onClick={refresh} disabled={loading}>
                    <RefreshCw size={14} className={loading ? "fa-spin" : ""} /> بروزرسانی
                </button>
            </div>

            <div className="f-alert f-alert--info" style={{ marginBottom: 20 }}>
                <BrainCircuit size={16} />
                پیش‌بینی‌ها توسط هوش مصنوعی کلم بر اساس تحلیل داده‌های بازار، روند فصلی و الگوهای قیمتی تولید شده‌اند.
            </div>

            <div className="f-grid-2" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
                <div className="f-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>روند قیمت و پیش‌بینی</h3>
                        <div className="f-select" style={{ width: 160 }}>
                            <select className="f-input" value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} style={{ paddingInlineEnd: 36, fontSize: 12 }}>
                                <option value="apple">سیب درختی</option>
                                <option value="tomato">گوجه فرنگی</option>
                                <option value="grape">انگور بی‌دانه</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ height: 260 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={HISTORICAL_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                                <defs>
                                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--f-accent)" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="var(--f-accent)" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="var(--f-border)" strokeDasharray="4 4" vertical={false} />
                                <XAxis dataKey="d" reversed tick={{ fill: "var(--f-fg-3)", fontSize: 10, fontFamily: "var(--f-font)" }} axisLine={false} tickLine={false} interval={1} />
                                <YAxis orientation="right" tick={{ fill: "var(--f-fg-3)", fontSize: 11, fontFamily: "var(--f-font)" }} axisLine={false} tickLine={false} tickFormatter={v => fa(Math.round(v / 1000)) + "ه" } />
                                <Tooltip contentStyle={{ fontFamily: "var(--f-font)", fontSize: 12, borderRadius: 8 }} />
                                <Area type="monotone" dataKey="actual" stroke="var(--f-accent)" strokeWidth={2.5} fill="url(#colorActual)" dot={false} connectNulls />
                                <Area type="monotone" dataKey="predicted" stroke="#8B5CF6" strokeWidth={2.5} strokeDasharray="6 3" fill="url(#colorPred)" dot={false} connectNulls />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, justifyContent: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ width: 16, height: 3, background: "var(--f-accent)", borderRadius: 2 }} />
                            قیمت واقعی
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ width: 16, height: 0, borderTop: "2px dashed #8B5CF6" }} />
                            پیش‌بینی AI
                        </div>
                    </div>
                </div>

                <div className="f-card">
                    <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>پیشنهادات هوشمند</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {RECOMMENDATIONS.map(r => (
                            <div key={r.product} style={{ padding: "12px 14px", border: "1px solid var(--f-border)", borderRadius: "var(--f-r-sm)" }}>
                                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{r.product}</div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                                    <span style={{ color: "var(--f-fg-3)" }}>قیمت فعلی: {faNum(r.currentPrice)}</span>
                                    <span style={{ color: "var(--f-fg-3)" }}>پیش‌بینی: {faNum(r.predictedPrice)}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: r.direction === "up" ? "var(--f-up)" : "var(--f-down)" }}>
                                        {r.direction === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                        {r.change}
                                    </span>
                                    <span className={`f-pill ${r.direction === "up" ? "f-pill--pending" : "f-pill--cancel"}`} style={{ fontSize: 11 }}>
                                        {r.action}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="f-card" style={{ marginBottom: 20 }}>
                <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>عوامل مؤثر بر پیش‌بینی</h3>
                <div className="f-grid-4" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, fontSize: 13 }}>
                    <div style={{ textAlign: "center", padding: "12px", background: "var(--f-accent-50)", borderRadius: "var(--f-r-sm)" }}>
                        <div style={{ fontWeight: 700, fontSize: 18, color: "var(--f-accent)", marginBottom: 4 }}>+{fa(12)}٪</div>
                        <div style={{ color: "var(--f-fg-3)", fontSize: 11 }}>روند فصلی</div>
                    </div>
                    <div style={{ textAlign: "center", padding: "12px", background: "var(--f-accent-50)", borderRadius: "var(--f-r-sm)" }}>
                        <div style={{ fontWeight: 700, fontSize: 18, color: "var(--f-accent)", marginBottom: 4 }}>+{fa(8)}٪</div>
                        <div style={{ color: "var(--f-fg-3)", fontSize: 11 }}>تقاضای بازار</div>
                    </div>
                    <div style={{ textAlign: "center", padding: "12px", background: "var(--f-pending-bg)", borderRadius: "var(--f-r-sm)" }}>
                        <div style={{ fontWeight: 700, fontSize: 18, color: "var(--f-pending-fg)", marginBottom: 4 }}>-{fa(3)}٪</div>
                        <div style={{ color: "var(--f-fg-3)", fontSize: 11 }}>رقابت</div>
                    </div>
                    <div style={{ textAlign: "center", padding: "12px", background: "var(--f-accent-50)", borderRadius: "var(--f-r-sm)" }}>
                        <div style={{ fontWeight: 700, fontSize: 18, color: "var(--f-accent)", marginBottom: 4 }}>+{fa(5)}٪</div>
                        <div style={{ color: "var(--f-fg-3)", fontSize: 11 }}>کیفیت محصول</div>
                    </div>
                </div>
            </div>
        </>
    )
}
