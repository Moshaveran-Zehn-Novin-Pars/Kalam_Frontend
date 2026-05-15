"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, Package, Plus, Search } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const INVENTORY = [
    { id: "p1", name: "سیب درختی",   stock: 500,  minStock: 100, unit: "کیلو", status: "ok", emoji: "🍎" },
    { id: "p2", name: "گوجه فرنگی",  stock: 200,  minStock: 80,  unit: "کیلو", status: "ok", emoji: "🍅" },
    { id: "p3", name: "انگور بی‌دانه",stock: 150,  minStock: 60,  unit: "کیلو", status: "ok", emoji: "🍇" },
    { id: "p4", name: "خیار گلخانه", stock: 300,  minStock: 100, unit: "کیلو", status: "ok", emoji: "🥒" },
    { id: "p5", name: "هلو شیراز",   stock: 80,   minStock: 100, unit: "کیلو", status: "low", emoji: "🍑" },
    { id: "p6", name: "اسفناج",       stock: 0,    minStock: 50,  unit: "کیلو", status: "out", emoji: "🥬" },
    { id: "p7", name: "کاهو",         stock: 45,   minStock: 60,  unit: "کیلو", status: "low", emoji: "🥬" },
    { id: "p8", name: "پرتقال شمال", stock: 800,  minStock: 200, unit: "کیلو", status: "ok", emoji: "🍊" },
]

const STATUS_STYLES: Record<string, { label: string; cls: string }> = {
    ok:  { label: "موجود کافی", cls: "f-pill--active" },
    low: { label: "کم‌موجود",   cls: "f-pill--pending" },
    out: { label: "ناموجود",     cls: "f-pill--cancel" },
}

export default function FarmerInventoryPage() {
    const [q, setQ] = useState("")
    const [filter, setFilter] = useState("all")

    const filtered = INVENTORY
        .filter(i => filter === "all" || i.status === filter)
        .filter(i => !q.trim() || i.name.includes(q))

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <h1 className="f-title" style={{ margin: 0 }}>موجودی انبار</h1>
                <Link href="/farmer/inventory/low-stock" className="f-btn f-btn--ghost" style={{ color: "var(--f-pending-fg)" }}>
                    <AlertTriangle size={14} /> کم‌موجودی‌ها
                </Link>
            </div>

            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
                    <Search size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--f-fg-3)" }} />
                    <input className="f-input" placeholder="جستجوی محصول..." value={q} onChange={e => setQ(e.target.value)} style={{ paddingRight: 36 }} />
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                    {[
                        { id: "all", label: "همه" },
                        { id: "ok", label: "موجود" },
                        { id: "low", label: "کم‌موجود" },
                        { id: "out", label: "ناموجود" },
                    ].map(f => (
                        <button key={f.id} onClick={() => setFilter(f.id)}
                            style={{
                                padding: "7px 14px", borderRadius: 999, fontSize: 13, cursor: "pointer",
                                fontFamily: "var(--f-font)", border: `1px solid ${filter === f.id ? "var(--f-accent)" : "var(--f-border-s)"}`,
                                background: filter === f.id ? "var(--f-accent-50)" : "transparent",
                                color: filter === f.id ? "var(--f-accent)" : "var(--f-fg-2)",
                            }}>
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="f-table-card">
                <div className="f-table-wrap">
                    <table className="f-table">
                        <thead><tr>
                            <th>محصول</th><th>موجودی فعلی</th><th>حداقل موجودی</th>
                            <th>وضعیت</th><th>موجودی قابل فروش</th><th>عملیات</th>
                        </tr></thead>
                        <tbody>
                        {filtered.map(p => {
                            const s = STATUS_STYLES[p.status]
                            const available = Math.max(0, p.stock)
                            return (
                                <tr key={p.id}>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <div className="f-product-img">{p.emoji}</div>
                                            <span style={{ fontWeight: 500 }}>{p.name}</span>
                                        </div>
                                    </td>
                                    <td className="tnum" style={{ fontWeight: 600 }}>
                                        <span style={{ color: p.status === "out" ? "var(--f-down)" : p.status === "low" ? "var(--f-pending-fg)" : "inherit" }}>
                                            {faNum(p.stock)} {p.unit}
                                        </span>
                                    </td>
                                    <td className="tnum" style={{ color: "var(--f-fg-3)" }}>{faNum(p.minStock)} {p.unit}</td>
                                    <td><span className={`f-pill ${s.cls}`}>{s.label}</span></td>
                                    <td className="tnum">
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <span style={{ fontWeight: 600 }}>{faNum(available)} {p.unit}</span>
                                            <div style={{
                                                width: 60, height: 6, background: "var(--f-border)", borderRadius: 3, overflow: "hidden",
                                            }}>
                                                <div style={{
                                                    width: `${Math.min(100, (p.stock / Math.max(p.minStock * 3, 1)) * 100)}%`,
                                                    height: "100%", background: p.status === "out" ? "var(--f-down)" : p.status === "low" ? "var(--f-pending-fg)" : "var(--f-accent)",
                                                    borderRadius: 3,
                                                }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Link href={`/farmer/products/${p.id}`} className="f-btn f-btn--ghost" style={{ padding: "5px 12px", fontSize: 12 }}>
                                            تنظیم موجودی
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                        {filtered.length === 0 && (
                            <tr><td colSpan={6} style={{ textAlign: "center", color: "var(--f-fg-3)", padding: 32 }}>محصولی یافت نشد</td></tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
