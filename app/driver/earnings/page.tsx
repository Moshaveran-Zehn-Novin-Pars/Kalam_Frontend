"use client"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { driverService } from "@/services/driver"

function fa(n: number | string) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
    paid:   { label: "پرداخت شده", cls: "pill--shipped" },
    waiting:{ label: "در انتظار",  cls: "pill--pending" },
    PENDING:   { label: "در انتظار", cls: "pill--pending" },
    SETTLED:   { label: "تسویه شده", cls: "pill--shipped" },
}

export default function DriverEarnings() {
    const [txns, setTxns] = useState<any[]>([])
    const [summary, setSummary] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            driverService.getMyEarnings().catch(() => []),
            driverService.getEarningsSummary().catch(() => null),
        ]).then(([t, s]) => { setTxns(t || []); setSummary(s) }).finally(() => setLoading(false))
    }, [])

    if (loading) return <div style={{textAlign:"center",padding:48}}><Loader2 size={20} className="animate-spin inline-block"/></div>

    return (
        <>
            <h1 className="adm-page-title">درآمد و تسویه</h1>

            <div className="adm-stat-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                <div className="adm-stat" style={{ background: "var(--adm-accent)", color: "#fff", borderColor: "var(--adm-accent)" }}>
                    <div className="adm-stat__label" style={{ color: "rgba(255,255,255,0.8)" }}>
                        <span>این هفته</span>
                    </div>
                    <div className="adm-stat__value" style={{ color: "#fff" }}>
                        {summary?.thisWeek ? faNum(Number(summary.thisWeek)) : faNum(0)}
                        <span className="adm-stat__unit" style={{ color: "rgba(255,255,255,0.8)" }}>تومان</span>
                    </div>
                    <div className="adm-stat__compare" style={{ color: "rgba(255,255,255,0.7)", borderTopColor: "rgba(255,255,255,0.2)" }}>
                        {summary?.weeklyGrowth ? `+${summary.weeklyGrowth}٪ نسبت به هفته قبل` : "—"}
                    </div>
                </div>
                <div className="adm-stat">
                    <div className="adm-stat__label"><span>این ماه</span></div>
                    <div className="adm-stat__value">{summary?.thisMonth ? faNum(Number(summary.thisMonth)) : faNum(0)}<span className="adm-stat__unit">تومان</span></div>
                    <div className="adm-stat__compare">{summary?.monthlyDeliveries ? `${fa(summary.monthlyDeliveries)} سفارش تحویل شده` : "—"}</div>
                </div>
                <div className="adm-stat">
                    <div className="adm-stat__label"><span>در انتظار تسویه</span></div>
                    <div className="adm-stat__value">{summary?.pendingSettlement ? faNum(Number(summary.pendingSettlement)) : faNum(0)}<span className="adm-stat__unit">تومان</span></div>
                    <div className="adm-stat__compare">{summary?.nextSettlement ? `تسویه بعدی: ${fa(new Date(summary.nextSettlement).toLocaleDateString("fa-IR"))}` : "—"}</div>
                </div>
            </div>

            <div className="adm-card" style={{ padding: "14px 18px", marginBottom: 20, background: "#e8f4fd", borderColor: "#a8d4f0" }}>
                <p style={{ fontSize: 13, color: "#1565a8", margin: 0 }}>
                    💡 تسویه‌حساب‌ها هر ماه اول به حساب ثبت‌شده واریز می‌شود.
                </p>
            </div>

            <h2 className="adm-section-title">تراکنش‌ها</h2>
            <div className="adm-table-card">
                <div className="adm-table-wrap">
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th>تاریخ</th>
                                <th>شرح</th>
                                <th>مبلغ (تومان)</th>
                                <th>وضعیت</th>
                            </tr>
                        </thead>
                        <tbody>
                            {txns.length === 0 ? (
                                <tr><td colSpan={4} style={{ textAlign: "center", padding: 48, color: "var(--adm-fg-3)" }}>تراکنشی وجود ندارد</td></tr>
                            ) : txns.map((t: any) => {
                                const s = STATUS_MAP[t.status] || { label: t.status, cls: "" }
                                return (
                                    <tr key={t.id}>
                                        <td className="tnum" style={{ color: "var(--adm-fg-3)" }}>{t.createdAt ? fa(new Date(t.createdAt).toLocaleDateString("fa-IR")) : "—"}</td>
                                        <td style={{ fontWeight: 500 }}>{t.description || t.orderId || "—"}</td>
                                        <td className="total">{faNum(Number(t.amount))}</td>
                                        <td><span className={`pill ${s.cls}`}>{s.label}</span></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}