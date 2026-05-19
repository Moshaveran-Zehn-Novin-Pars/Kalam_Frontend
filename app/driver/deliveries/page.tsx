"use client"
import { useState, useEffect } from "react"
import { Truck, MapPin, Clock, Loader2 } from "lucide-react"
import Link from "next/link"
import { deliveryService } from "@/services/delivery"
import type { Delivery } from "@/types"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
    PENDING_ASSIGNMENT: { label: "در انتظار", cls: "pill--pending" },
    ASSIGNED: { label: "اختصاص داده شده", cls: "pill--prep" },
    PICKING_UP: { label: "در مسیر", cls: "pill--prep" },
    IN_TRANSIT: { label: "در مسیر", cls: "pill--prep" },
    DELIVERED: { label: "تحویل شده", cls: "pill--shipped" },
    FAILED: { label: "ناموفق", cls: "pill--cancel" },
}

const FILTERS = [
    { id: "all", label: "همه" },
    { id: "PENDING_ASSIGNMENT", label: "در انتظار" },
    { id: "IN_TRANSIT",  label: "در مسیر" },
    { id: "DELIVERED",    label: "تحویل شده" },
]

export default function DriverDeliveries() {
    const [filter, setFilter] = useState("all")
    const [deliveries, setDeliveries] = useState<Delivery[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        deliveryService.getMyDeliveries().then(setDeliveries).catch(() => {}).finally(() => setLoading(false))
    }, [])

    const list = filter === "all" ? deliveries : deliveries.filter(d => d.status === filter)

    return (
        <>
            <h1 className="adm-page-title">مدیریت تحویل‌ها</h1>

            <div className="adm-filters">
                {FILTERS.map(f => (
                    <button key={f.id}
                            className={`adm-filter-btn ${filter === f.id ? "active" : ""}`}
                            onClick={() => setFilter(f.id)}>
                        {f.label}
                    </button>
                ))}
            </div>

            <div className="adm-table-card">
                <div className="adm-table-wrap">
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th>شماره</th>
                                <th>خریدار</th>
                                <th>آدرس</th>
                                <th>وزن</th>
                                <th>زمان تحویل</th>
                                <th>وضعیت</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={7} style={{ textAlign: "center", padding: 48 }}><Loader2 size={20} className="animate-spin inline-block" /></td></tr>
                            ) : list.length === 0 && (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: "center", padding: 48, color: "var(--adm-fg-3)" }}>
                                        موردی یافت نشد
                                    </td>
                                </tr>
                            )}
                            {list.map((d: any) => {
                                const s = STATUS_MAP[d.status] || { label: d.status, cls: "" }
                                return (
                                    <tr key={d.id}>
                                        <td className="oid tnum">{d.id}</td>
                                        <td style={{ fontWeight: 500 }}>{d.orderId || "—"}</td>
                                        <td style={{ color: "var(--adm-fg-3)" }}>{d.address || "—"}</td>
                                        <td className="tnum">—</td>
                                        <td className="tnum">—</td>
                                        <td><span className={`pill ${s.cls}`}>{s.label}</span></td>
                                        <td>
                                            {d.status === "PENDING_ASSIGNMENT" && (
                                                <Link href={`/driver/active?id=${d.id}`}
                                                      className="adm-btn adm-btn--filled"
                                                      style={{ fontSize: 12, padding: "5px 12px" }}>
                                                    شروع مسیر
                                                </Link>
                                            )}
                                            {d.status === "IN_TRANSIT" && (
                                                <button className="adm-btn adm-btn--outline"
                                                        style={{ fontSize: 12, padding: "5px 12px" }}>
                                                    تأیید تحویل
                                                </button>
                                            )}
                                        </td>
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