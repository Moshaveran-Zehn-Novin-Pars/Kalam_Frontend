"use client"
import { useState } from "react"
import { Search, ShoppingBag, Users, Wallet, TrendingUp, X, Package } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const ALL = Array.from({ length: 8 }, (_, i) => ({
    id: `b${i}`, name: ["سوپرمارکت رضایی", "رستوران آرارات", "هایپرمی", "کافه گلدن", "میوه فروشی محسن", "فروشگاه ستاره", "رستوران کاج", "سوپرمارکت نور"][i],
    phone: "0912" + String(1000000 + i * 111111).slice(0, 7), orders: [24, 18, 42, 7, 15, 9, 11, 33][i],
    total: [45000000, 28000000, 92000000, 8500000, 19000000, 12000000, 16000000, 71000000][i], status: "active", city: ["تهران", "شیراز", "اصفهان", "تهران", "مشهد", "تبریز", "شیراز", "اهواز"][i],
}))

function BuyerDrawer({ buyer, onClose }: { buyer: typeof ALL[0] | null; onClose: () => void }) {
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
    const [openBuyer, setOpenBuyer] = useState<typeof ALL[0] | null>(null)
    const list = ALL.filter(b => !q || b.name.includes(q))
    const totalOrders = ALL.reduce((s, b) => s + b.orders, 0)
    const totalRev = ALL.reduce((s, b) => s + b.total, 0)
    return (<>
        <h1 className="adm-page-title">خریداران</h1>
        <div className="adm-stat-grid">
            <div className="adm-stat">
                <div className="adm-stat__top">
                    <div className="adm-stat__label"><Users size={18} />کل خریداران</div>
                    <span className="adm-stat__delta up"><TrendingUp size={12} />{fa(14)}٪</span>
                </div>
                <div className="adm-stat__value">{fa(ALL.length)}<span className="adm-stat__unit">نفر</span></div>
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
                <div className="adm-stat__compare">میانگین: {faNum(Math.round(totalRev / ALL.length))} تومان</div>
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
                    <tbody>{list.map(b => (<tr key={b.id} className="clickable" onClick={() => setOpenBuyer(b)}>
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
