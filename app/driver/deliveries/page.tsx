"use client"
import { useState } from "react"
import { Truck, MapPin, Clock } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

type Status = "pending" | "active" | "done"

const ALL = [
    { id: "DLV-041", buyer: "سوپرمارکت ستاره", address: "تهران، نیاوران",   weight: "۱۸۰ کیلو", slot: "۱۴:۰۰–۱۶:۰۰", status: "pending" as Status, orderId: "ORD-2041" },
    { id: "DLV-042", buyer: "رستوران آرمان",   address: "تهران، ونک",       weight: "۶۰ کیلو",  slot: "۱۶:۰۰–۱۸:۰۰", status: "pending" as Status, orderId: "ORD-2042" },
    { id: "DLV-039", buyer: "کافه سبز",        address: "تهران، جردن",      weight: "۳۰ کیلو",  slot: "۱۰:۰۰–۱۲:۰۰", status: "active"  as Status, orderId: "ORD-2039" },
    { id: "DLV-038", buyer: "هایپرمارکت نور",  address: "تهران، شریعتی",    weight: "۳۵۰ کیلو", slot: "۰۸:۰۰–۱۰:۰۰", status: "done"    as Status, orderId: "ORD-2038" },
]

const STATUS_MAP: Record<Status, { label: string; cls: string }> = {
    pending: { label: "در انتظار", cls: "pill--pending" },
    active:  { label: "در مسیر",   cls: "pill--prep" },
    done:    { label: "تحویل شده", cls: "pill--shipped" },
}

const FILTERS = [
    { id: "all", label: "همه" },
    { id: "pending", label: "در انتظار" },
    { id: "active",  label: "در مسیر" },
    { id: "done",    label: "تحویل شده" },
]

export default function DriverDeliveries() {
    const [filter, setFilter] = useState("all")
    const list = filter === "all" ? ALL : ALL.filter(d => d.status === filter)

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
                            {list.length === 0 && (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: "center", padding: 48, color: "var(--adm-fg-3)" }}>
                                        موردی یافت نشد
                                    </td>
                                </tr>
                            )}
                            {list.map(d => {
                                const s = STATUS_MAP[d.status]
                                return (
                                    <tr key={d.id}>
                                        <td className="oid tnum">{d.id}</td>
                                        <td style={{ fontWeight: 500 }}>{d.buyer}</td>
                                        <td style={{ color: "var(--adm-fg-3)" }}>{d.address}</td>
                                        <td className="tnum">{d.weight}</td>
                                        <td className="tnum">{d.slot}</td>
                                        <td><span className={`pill ${s.cls}`}>{s.label}</span></td>
                                        <td>
                                            {d.status === "pending" && (
                                                <Link href={`/driver/active?id=${d.id}`}
                                                      className="adm-btn adm-btn--filled"
                                                      style={{ fontSize: 12, padding: "5px 12px" }}>
                                                    شروع مسیر
                                                </Link>
                                            )}
                                            {d.status === "active" && (
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