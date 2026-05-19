"use client"
import { useState, useEffect } from "react"
import { Search, ShoppingBag, Users, Wallet, TrendingUp, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { usersService } from "@/services/users"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

interface BuyerRow {
    id: string; name: string; phone: string; orders: number; total: number; status: string; city: string
}

function BuyerDrawer({ buyer, onClose }: { buyer: BuyerRow | null; onClose: () => void }) {
    if (!buyer) return null
    return (<><div className="adm-drawer-overlay" onClick={onClose} /><aside className="adm-drawer open">
        <div className="adm-drawer-head"><div><div style={{ fontSize: 12, color: "var(--adm-fg-3)" }}>خریدار</div><div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{buyer.name}</div></div><button className="adm-drawer-close" onClick={onClose}><X size={14} /></button></div>
        <div className="adm-drawer-row"><span>شهر</span><span>{buyer.city}</span></div>
        <div className="adm-drawer-row"><span>تماس</span><span>{fa(buyer.phone)}</span></div>
        <div className="adm-drawer-row"><span>تعداد سفارش</span><span className="tnum">{fa(buyer.orders)}</span></div>
        <div className="adm-drawer-row"><span>کل خرید</span><span className="tnum" style={{ fontWeight: 600 }}>{faNum(buyer.total)} تومان</span></div>
        <div className="adm-drawer-row" style={{ borderTop: "1px solid var(--adm-border)", paddingTop: 13, marginTop: 4 }}><span>وضعیت</span><span className="pill pill--shipped">فعال</span></div>
    </aside></>)
}

export default function AdminBuyersPage() {
    const [q, setQ] = useState("")
    const [openBuyer, setOpenBuyer] = useState<BuyerRow | null>(null)
    const [buyers, setBuyers] = useState<BuyerRow[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        usersService.findAll({ role: "BUYER" })
            .then(data => setBuyers(data.map(u => ({
                id: u.id,
                name: u.buyer?.businessName ?? [u.firstName, u.lastName].filter(Boolean).join(" "),
                phone: u.phone,
                orders: 0,
                total: Number(u.buyer?.totalPurchases ?? 0),
                status: u.status === "ACTIVE" ? "فعال" : "غیرفعال",
                city: "",
            }))))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const list = buyers.filter(b => !q || b.name.includes(q))
    const totalOrders = buyers.reduce((s, b) => s + b.orders, 0)
    const totalRev = buyers.reduce((s, b) => s + b.total, 0)
    return (<>
        <h1 className="adm-page-title">خریداران</h1>
        <div className="adm-stat-grid">
            <div className="adm-stat">
                <div className="adm-stat__top">
                    <div className="adm-stat__label"><Users size={18} />کل خریداران</div>
                    <span className="adm-stat__delta up"><TrendingUp size={12} />{fa(14)}٪</span>
                </div>
                <div className="adm-stat__value">{fa(buyers.length)}<span className="adm-stat__unit">نفر</span></div>
                <div className="adm-stat__compare">ماه قبل: {fa(7)} نفر</div>
            </div>
            <div className="adm-stat">
                <div className="adm-stat__top">
                    <div className="adm-stat__label"><ShoppingBag size={18} />کل سفارش‌ها</div>
                    <span className="adm-stat__delta up"><TrendingUp size={12} />{fa(24)}٪</span>
                </div>
                <div className="adm-stat__value">{fa(totalOrders)}<span className="adm-stat__unit">سفارش</span></div>
                <div className="adm-stat__compare">ماه قبل: {fa(135)} سفارش</div>
            </div>
            <div className="adm-stat">
                <div className="adm-stat__top">
                    <div className="adm-stat__label"><Wallet size={18} />کل خرید</div>
                </div>
                <div className="adm-stat__value">{faNum(totalRev)}<span className="adm-stat__unit">تومان</span></div>
                <div className="adm-stat__compare">میانگین: {faNum(Math.round(totalRev / (buyers.length || 1)))} تومان</div>
            </div>
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
                <Search size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--adm-fg-3)" }} />
                <input className="adm-field-input" placeholder="جستجوی خریدار..." value={q} onChange={e => setQ(e.target.value)} style={{ paddingRight: 36 }} />
            </div>
        </div>
        <h2 className="adm-section-title">لیست خریداران</h2>
        <div className="adm-table-card">
            <div className="adm-table-wrap">
                <table className="adm-table">
                    <thead><tr><th>خریدار</th><th>شهر</th><th>سفارش‌ها</th><th>کل خرید</th><th>وضعیت</th><th>عملیات</th></tr></thead>
                    <tbody>{loading ? (<tr><td colSpan={6} style={{ textAlign: "center", padding: 48 }}><Loader2 size={20} className="animate-spin inline-block" /></td></tr>) : list.length === 0 ? (<tr><td colSpan={6} style={{ textAlign: "center", padding: 48, color: "var(--adm-fg-3)" }}>خریداری یافت نشد</td></tr>) : list.map(b => (<tr key={b.id} className="clickable" onClick={() => setOpenBuyer(b)}>
                        <td style={{ fontWeight: 500 }}>{b.name}</td><td>{b.city}</td><td className="tnum">{fa(b.orders)}</td>
                        <td className="tnum" style={{ fontWeight: 600 }}>{faNum(b.total)}</td><td><span className="pill pill--shipped">فعال</span></td>
                        <td onClick={e => e.stopPropagation()}><Link href={`/admin/users/${b.id}`} className="adm-btn adm-btn--ghost" style={{ padding: "4px 10px", fontSize: 12 }}>جزئیات</Link></td>
                    </tr>))}</tbody>
                </table>
            </div>
        </div>
        <BuyerDrawer buyer={openBuyer} onClose={() => setOpenBuyer(null)} />
    </>)
}
