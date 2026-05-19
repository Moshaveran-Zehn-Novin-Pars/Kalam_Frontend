"use client"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { deliveryService } from "@/services/delivery"
import type { Delivery } from "@/types"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

export default function DriverHistory() {
    const [deliveries, setDeliveries] = useState<Delivery[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        deliveryService.findAll({ status: "DELIVERED" })
            .then(res => setDeliveries(Array.isArray(res) ? res : (res as any).items || []))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <h1 className="adm-page-title">تاریخچه تحویل‌ها</h1>

            <div className="adm-table-card">
                <div className="adm-table-wrap">
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th>شماره</th>
                                <th>سفارش</th>
                                <th>وضعیت</th>
                                <th>تاریخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={4} style={{ textAlign: "center", padding: 48 }}><Loader2 size={20} className="animate-spin inline-block" /></td></tr>
                            ) : deliveries.length === 0 ? (
                                <tr><td colSpan={4} style={{ textAlign: "center", padding: 48, color: "var(--adm-fg-3)" }}>تحویلی وجود ندارد</td></tr>
                            ) : deliveries.map((h: any) => (
                                <tr key={h.id}>
                                    <td className="oid tnum">{h.id}</td>
                                    <td style={{ fontWeight: 500 }}>{h.orderId || "—"}</td>
                                    <td><span className="pill pill--shipped">تحویل شده</span></td>
                                    <td className="tnum">—</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}