"use client"

import Link from "next/link"
import { AlertTriangle, ArrowLeft } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const LOW_STOCK = [
    { id: "p5", name: "هلو شیراز",   stock: 80,  minStock: 100, unit: "کیلو", status: "low",  emoji: "🍑" },
    { id: "p6", name: "اسفناج",       stock: 0,   minStock: 50,  unit: "کیلو", status: "out", emoji: "🥬" },
    { id: "p7", name: "کاهو",         stock: 45,  minStock: 60,  unit: "کیلو", status: "low", emoji: "🥬" },
]

const STATUS_STYLES: Record<string, { label: string; cls: string }> = {
    low: { label: "کم‌موجود", cls: "f-pill--pending" },
    out: { label: "ناموجود",   cls: "f-pill--cancel" },
}

export default function LowStockPage() {
    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <Link href="/farmer/inventory" className="f-btn f-btn--ghost" style={{ padding: "7px 14px" }}>
                    <ArrowLeft size={14} /> بازگشت
                </Link>
                <h1 className="f-title" style={{ margin: 0 }}>محصولات کم‌موجود</h1>
            </div>

            <div className="f-alert f-alert--warning">
                <AlertTriangle size={16} />
                {fa(LOW_STOCK.length)} محصول نیاز به بررسی و تأمین موجودی دارند.
            </div>

            <div className="f-table-card">
                <div className="f-table-wrap">
                    <table className="f-table">
                        <thead><tr>
                            <th>محصول</th><th>موجودی فعلی</th><th>حداقل موجودی</th><th>وضعیت</th><th>عملیات</th>
                        </tr></thead>
                        <tbody>
                        {LOW_STOCK.map(p => {
                            const s = STATUS_STYLES[p.status]
                            return (
                                <tr key={p.id}>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <div className="f-product-img">{p.emoji}</div>
                                            <span style={{ fontWeight: 500 }}>{p.name}</span>
                                        </div>
                                    </td>
                                    <td className="tnum" style={{ fontWeight: 600, color: p.stock === 0 ? "var(--f-down)" : "var(--f-pending-fg)" }}>
                                        {p.stock === 0 ? "ناموجود" : `${faNum(p.stock)} ${p.unit}`}
                                    </td>
                                    <td className="tnum" style={{ color: "var(--f-fg-3)" }}>{faNum(p.minStock)} {p.unit}</td>
                                    <td><span className={`f-pill ${s.cls}`}>{s.label}</span></td>
                                    <td>
                                        <Link href={`/farmer/products/${p.id}`} className="f-btn f-btn--filled" style={{ padding: "5px 12px", fontSize: 12 }}>
                                            ثبت موجودی
                                        </Link>
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
