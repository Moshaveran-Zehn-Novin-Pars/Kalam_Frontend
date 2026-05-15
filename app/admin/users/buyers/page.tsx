"use client"
import { useState } from "react"
import { Search, Users, ShoppingBag, DollarSign, TrendingUp } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const ALL = Array.from({ length: 8 }, (_, i) => ({
    id: `b${i}`, name: ["سوپرمارکت رضایی","رستوران آرارات","هایپرمی","کافه گلدن","میوه فروشی محسن","فروشگاه ستاره","رستوران کاج","سوپرمارکت نور"][i],
    phone: "0912" + String(1000000 + i * 111111).slice(0, 7), orders: [24, 18, 42, 7, 15, 9, 11, 33][i],
    total: [45000000, 28000000, 92000000, 8500000, 19000000, 12000000, 16000000, 71000000][i], status: "active", city: ["تهران","شیراز","اصفهان","تهران","مشهد","تبریز","شیراز","اهواز"][i],
}))

export default function AdminBuyersPage() {
    const [q, setQ] = useState("")
    const list = ALL.filter(b => !q || b.name.includes(q) || b.city.includes(q))
    const totalOrders = ALL.reduce((s, b) => s + b.orders, 0)
    const totalRevenue = ALL.reduce((s, b) => s + b.total, 0)

    return (<>
        <h1 className="adm-page-title">خریداران</h1>

        <div className="adm-stat-grid" style={{ marginBottom: 20 }}>
            <div className="adm-stat-card"><Users size={18} /><span><span className="adm-stat-label">کل خریداران</span><span className="adm-stat-value">{fa(ALL.length)}</span></span></div>
            <div className="adm-stat-card"><ShoppingBag size={18} /><span><span className="adm-stat-label">کل سفارش‌ها</span><span className="adm-stat-value">{fa(totalOrders)}</span></span></div>
            <div className="adm-stat-card"><DollarSign size={18} /><span><span className="adm-stat-label">کل خرید</span><span className="adm-stat-value">{faNum(totalRevenue)} تومان</span></span></div>
            <div className="adm-stat-card"><TrendingUp size={18} /><span><span className="adm-stat-label">میانگین هر خریدار</span><span className="adm-stat-value">{faNum(Math.round(totalRevenue / ALL.length))} تومان</span></span></div>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
                <Search size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--adm-fg-3)" }} />
                <input className="adm-input" placeholder="جستجو بر اساس نام یا شهر..." value={q} onChange={e => setQ(e.target.value)} style={{ paddingRight: 36 }} />
            </div>
        </div>

        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>خریدار</th><th>شهر</th><th>تماس</th><th>سفارش‌ها</th><th>کل خرید</th><th>وضعیت</th><th>عملیات</th></tr></thead>
            <tbody>{list.map(b => (<tr key={b.id}>
                <td style={{ fontWeight: 500 }}>{b.name}</td><td>{b.city}</td>
                <td style={{ direction: "ltr", textAlign: "right", fontSize: 12 }}>{fa(b.phone)}</td>
                <td className="tnum">{fa(b.orders)}</td>
                <td className="tnum" style={{ fontWeight: 600 }}>{faNum(b.total)}</td>
                <td><span className="pill pill--shipped">فعال</span></td>
                <td><Link href={`/admin/users/${b.id}`} className="adm-btn adm-btn--ghost" style={{ padding: "4px 10px", fontSize: 12 }}>جزئیات</Link></td>
            </tr>))}</tbody></table></div></div>
    </>)
}