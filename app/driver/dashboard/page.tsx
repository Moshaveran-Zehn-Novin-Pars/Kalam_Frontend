"use client"
import { useState, useEffect } from "react"
import { CheckCircle, Clock, Wallet, TrendingUp, Truck, Loader2 } from "lucide-react"
import Link from "next/link"
import { deliveryService } from "@/services/delivery"
import type { Delivery } from "@/types"

function fa(n: number | string) {
    return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d])
}
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

function useCountUp(target: number, duration = 900) {
    const [val, setVal] = useState(0)
    useEffect(() => {
        let start: number | null = null; let raf: number
        const step = (t: number) => {
            if (!start) start = t
            const p = Math.min((t - start) / duration, 1)
            setVal(Math.round(target * (1 - Math.pow(1 - p, 3))))
            if (p < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
        return () => cancelAnimationFrame(raf)
    }, [target])
    return val
}

function StatCard({ icon, label, value, unit, delta, dir }: any) {
    const v = useCountUp(typeof value === "number" ? value : 0)
    return (
        <div className="adm-stat">
            <div className="adm-stat__top">
                <div className="adm-stat__label">
                    <span className="adm-stat__icon">{icon}</span>
                    <span>{label}</span>
                </div>
                {delta && (
                    <span className={`adm-stat__delta ${dir}`}>
                        <TrendingUp size={12} />
                        {fa(delta)}٪
                    </span>
                )}
            </div>
            <div className="adm-stat__value">
                {typeof value === "number" ? faNum(v) : value}
                <span className="adm-stat__unit">{unit}</span>
            </div>
        </div>
    )
}

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
    PENDING_ASSIGNMENT: { label: "در انتظار", cls: "pill--pending" },
    ASSIGNED: { label: "اختصاص داده شده", cls: "pill--prep" },
    PICKING_UP: { label: "در مسیر", cls: "pill--prep" },
    IN_TRANSIT: { label: "در مسیر", cls: "pill--prep" },
    DELIVERED: { label: "تحویل شده", cls: "pill--shipped" },
    FAILED: { label: "ناموفق", cls: "pill--cancel" },
}

export default function DriverDashboard() {
    const [deliveries, setDeliveries] = useState<Delivery[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        deliveryService.getMyDeliveries().then(setDeliveries).catch(() => {}).finally(() => setLoading(false))
    }, [])

    const todayDeliveries = deliveries.filter(d => d.status === "DELIVERED")
    const pendingDeliveries = deliveries.filter(d => ["PENDING_ASSIGNMENT", "ASSIGNED"].includes(d.status))

    return (
        <>
            <h1 className="adm-page-title">خوش آمدی، علی جان 👋</h1>

            <div className="adm-stat-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                <StatCard icon={<CheckCircle size={18} />} label="تحویل امروز"   value={todayDeliveries.length} unit="" />
                <StatCard icon={<Clock size={18} />}       label="در انتظار"     value={pendingDeliveries.length} unit="" />
                <StatCard icon={<Wallet size={18} />}      label="درآمد امروز"   value="—" unit="تومان" />
                <StatCard icon={<Truck size={18} />}       label="کل تحویل‌ها"   value={deliveries.length} unit="" />
            </div>

            <h2 className="adm-section-title">تحویل‌های امروز</h2>
            <div className="adm-table-card">
                <div className="adm-table-wrap">
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th>خریدار</th>
                                <th>آدرس</th>
                                <th>وضعیت</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={4} style={{ textAlign: "center", padding: 32 }}><Loader2 size={20} className="animate-spin inline-block" /></td></tr>
                            ) : deliveries.length === 0 ? (
                                <tr><td colSpan={4} style={{ textAlign: "center", padding: 32, color: "var(--adm-fg-3)" }}>تحویلی وجود ندارد</td></tr>
                            ) : deliveries.slice(0, 5).map(d => {
                                const s = STATUS_MAP[d.status] || { label: d.status, cls: "" }
                                return (
                                <tr key={d.id}>
                                    <td style={{ fontWeight: 500 }}>{d.orderId || "—"}</td>
                                    <td style={{ color: "var(--adm-fg-3)" }}>{(d as any).address || "—"}</td>
                                    <td>
                                        <span className={`pill ${s.cls}`}>{s.label}</span>
                                    </td>
                                    <td>
                                        <Link href={`/driver/active?id=${d.id}`}
                                              className="adm-btn adm-btn--filled"
                                              style={{ fontSize: 12, padding: "5px 12px" }}>
                                            شروع مسیر
                                        </Link>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}