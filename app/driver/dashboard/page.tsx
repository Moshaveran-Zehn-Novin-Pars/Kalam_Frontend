"use client"
import { useState, useEffect } from "react"
import { CheckCircle, Clock, Wallet, TrendingUp, Truck } from "lucide-react"
import Link from "next/link"

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

const PENDING = [
    { id: "DLV-041", buyer: "سوپرمارکت ستاره", address: "تهران، نیاوران",   weight: "۱۸۰ کیلو", slot: "۱۴:۰۰–۱۶:۰۰", status: "pending" as const },
    { id: "DLV-042", buyer: "رستوران آرمان",   address: "تهران، ونک",       weight: "۶۰ کیلو",  slot: "۱۶:۰۰–۱۸:۰۰", status: "pending" as const },
]

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
    pending: { label: "در انتظار", cls: "pill--pending" },
    active:  { label: "در مسیر",   cls: "pill--prep" },
    done:    { label: "تحویل شده", cls: "pill--shipped" },
}

export default function DriverDashboard() {
    return (
        <>
            <h1 className="adm-page-title">خوش آمدی، علی جان 👋</h1>

            <div className="adm-stat-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                <StatCard icon={<CheckCircle size={18} />} label="تحویل امروز"   value={5}     unit="" />
                <StatCard icon={<Clock size={18} />}       label="در انتظار"     value={2}     unit="" />
                <StatCard icon={<Wallet size={18} />}      label="درآمد امروز"   value="۴۸۰,۰۰۰" unit="تومان" />
                <StatCard icon={<Truck size={18} />}       label="کل تحویل‌ها"   value={234}   unit="" delta="12" dir="up" />
            </div>

            <h2 className="adm-section-title">تحویل‌های امروز</h2>
            <div className="adm-table-card">
                <div className="adm-table-wrap">
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th>خریدار</th>
                                <th>آدرس</th>
                                <th>وزن</th>
                                <th>زمان تحویل</th>
                                <th>وضعیت</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PENDING.map(d => (
                                <tr key={d.id}>
                                    <td style={{ fontWeight: 500 }}>{d.buyer}</td>
                                    <td style={{ color: "var(--adm-fg-3)" }}>{d.address}</td>
                                    <td className="tnum">{d.weight}</td>
                                    <td className="tnum">{d.slot}</td>
                                    <td>
                                        <span className={`pill ${STATUS_MAP[d.status].cls}`}>
                                            {STATUS_MAP[d.status].label}
                                        </span>
                                    </td>
                                    <td>
                                        <Link href={`/driver/active?id=${d.id}`}
                                              className="adm-btn adm-btn--filled"
                                              style={{ fontSize: 12, padding: "5px 12px" }}>
                                            شروع مسیر
                                        </Link>
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