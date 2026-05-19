"use client"

import { useState, useEffect } from "react"
import { FileText, Download, Filter, Loader2 } from "lucide-react"
import { settlementService } from "@/services/settlement"
import type { Settlement } from "@/types"
import "../../farmer.css"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

export default function SettlementsPage() {
    const [filter, setFilter] = useState<"all"|"paid"|"pending">("all")
    const [settlements, setSettlements] = useState<Settlement[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        settlementService.getMySettlements().then(setSettlements).catch(() => {}).finally(() => setLoading(false))
    }, [])

    const filtered = filter === "all" ? settlements : settlements.filter(s => s.status === filter)

    const totalPaid = settlements.filter(s => s.status === "paid").reduce((a, s) => a + Number(s.netAmount || 0), 0)
    const totalPending = settlements.filter(s => s.status === "pending").reduce((a, s) => a + Number(s.netAmount || 0), 0)

    return (
        <div>
            <h1 className="f-title">تسویه حساب‌ها</h1>

            <div className="f-stat-grid">
                <div className="f-stat-card"><p className="f-stat-label">تسویه شده</p><p className="f-stat-value tnum" style={{ color: "var(--f-accent)" }}>{faNum(totalPaid)}</p></div>
                <div className="f-stat-card"><p className="f-stat-label">در انتظار پرداخت</p><p className="f-stat-value tnum" style={{ color: "#F59E0B" }}>{faNum(totalPending)}</p></div>
                <div className="f-stat-card"><p className="f-stat-label">تعداد کل</p><p className="f-stat-value tnum">{fa(settlements.length)}</p></div>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {(["all","paid","pending"] as const).map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={`f-filter-btn ${filter === f ? "is-active" : ""}`}>{f === "all" ? "همه" : f === "paid" ? "پرداخت شده" : "در انتظار"}</button>
                ))}
            </div>

            <div className="f-table-card">
                <div className="f-table-wrap">
                    <table className="f-table">
                        <thead><tr><th>دوره</th><th>فروش</th><th>کارمزد</th><th>خالص</th><th>وضعیت</th><th>تاریخ</th><th>دریافت</th></tr></thead>
                        <tbody>
                        {loading ? (
                            <tr><td colSpan={7} style={{ textAlign: "center", padding: 32 }}><Loader2 size={20} className="animate-spin inline-block" /></td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={7} style={{ textAlign: "center", padding: 32, color: "var(--f-fg-3)" }}>تسویه‌ای یافت نشد</td></tr>
                        ) : filtered.map(s => {
                            const date = s.createdAt ? new Date(s.createdAt).toLocaleDateString("fa-IR") : ""
                            const period = `${s.periodStart ? new Date(s.periodStart).toLocaleDateString("fa-IR") : ""} - ${s.periodEnd ? new Date(s.periodEnd).toLocaleDateString("fa-IR") : ""}`
                            return (
                            <tr key={s.id}>
                                <td style={{ fontWeight: 500 }}>{period || "—"}</td>
                                <td className="tnum">{faNum(Number(s.grossAmount || 0))}</td>
                                <td className="tnum">{faNum(Number(s.commissionAmount || 0))}</td>
                                <td className="tnum" style={{ fontWeight: 600 }}>{faNum(Number(s.netAmount || 0))}</td>
                                <td><span className={`f-pill ${s.status === "paid" ? "f-pill--shipped" : "f-pill--pending"}`}>{s.status === "paid" ? "پرداخت شده" : "در انتظار"}</span></td>
                                <td className="tnum">{fa(date)}</td>
                                <td>{s.status === "paid" ? <button className="f-btn f-btn--ghost" style={{ padding: "4px 10px", fontSize: 12 }}><Download size={12} /> فاکتور</button> : "—"}</td>
                            </tr>
                        )})}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
