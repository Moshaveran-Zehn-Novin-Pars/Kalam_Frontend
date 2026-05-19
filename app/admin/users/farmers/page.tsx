"use client"
import { useState, useEffect } from "react"
import { Search, Users, Package, Wallet, TrendingUp, TrendingDown, Star, X, Loader2 } from "lucide-react"
import { usersService } from "@/services/users"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

interface FarmerRow {
    id: string; name: string; farm: string; products: number; sales: number; rating: number; city: string
}

function FarmerDrawer({ farmer, onClose }: { farmer: FarmerRow | null; onClose: () => void }) {
    if (!farmer) return null
    return (<><div className="adm-drawer-overlay" onClick={onClose} /><aside className="adm-drawer open">
        <div className="adm-drawer-head"><div><div style={{ fontSize: 12, color: "var(--adm-fg-3)" }}>باغدار</div><div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{farmer.name}</div></div><button className="adm-drawer-close" onClick={onClose}><X size={14} /></button></div>
        <div className="adm-drawer-row"><span>نام باغ</span><span>{farmer.farm}</span></div>
        <div className="adm-drawer-row"><span>شهر</span><span>{farmer.city}</span></div>
        <div className="adm-drawer-row"><span>محصولات</span><span className="tnum">{fa(farmer.products)}</span></div>
        <div className="adm-drawer-row"><span>فروش کل</span><span className="tnum" style={{ fontWeight: 600 }}>{faNum(farmer.sales)} تومان</span></div>
        <div className="adm-drawer-row"><span>امتیاز</span><span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={14} style={{ color: "#f5a623" }} />{fa(farmer.rating)}</span></div>
    </aside></>)
}

export default function AdminFarmersPage() {
    const [q, setQ] = useState(""); const [open, setOpen] = useState<FarmerRow | null>(null)
    const [farmers, setFarmers] = useState<FarmerRow[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        usersService.findAll({ role: "FARMER" })
            .then(data => setFarmers(data.map(u => ({
                id: u.id,
                name: [u.firstName, u.lastName].filter(Boolean).join(" "),
                farm: u.farmer?.businessName ?? "",
                products: 0,
                sales: Number(u.farmer?.totalSales ?? 0),
                rating: Number(u.farmer?.ratingAvg ?? 0),
                city: u.farmer?.farmLocation ?? "",
            }))))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const list = farmers.filter(f => !q || f.name.includes(q))
    const totalSales = farmers.reduce((s, f) => s + f.sales, 0)
    const totalProducts = farmers.reduce((s, f) => s + f.products, 0)
    return (<>
        <h1 className="adm-page-title">باغداران</h1>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Users size={18} />کل باغداران</div><span className="adm-stat__delta up"><TrendingUp size={12} />{fa(20)}٪</span></div><div className="adm-stat__value">{fa(farmers.length)}<span className="adm-stat__unit">نفر</span></div><div className="adm-stat__compare">ماه قبل: {fa(5)} نفر</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Package size={18} />کل محصولات</div></div><div className="adm-stat__value">{fa(totalProducts)}<span className="adm-stat__unit">محصول</span></div><div className="adm-stat__compare">میانگین: {fa(Math.round(totalProducts / (farmers.length || 1)))} محصول</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Wallet size={18} />فروش کل</div><span className="adm-stat__delta up"><TrendingUp size={12} />{fa(38)}٪</span></div><div className="adm-stat__value">{faNum(totalSales)}<span className="adm-stat__unit">تومان</span></div><div className="adm-stat__compare">میانگین: {faNum(Math.round(totalSales / (farmers.length || 1)))} تومان</div></div>
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}><div style={{ position: "relative", flex: 1, maxWidth: 320 }}><Search size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--adm-fg-3)" }} /><input className="adm-field-input" placeholder="جستجوی باغدار..." value={q} onChange={e => setQ(e.target.value)} style={{ paddingRight: 36 }} /></div></div>
        <h2 className="adm-section-title">لیست باغداران</h2>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>باغدار</th><th>باغ</th><th>شهر</th><th>محصولات</th><th>فروش</th><th>امتیاز</th></tr></thead>
            <tbody>{loading ? (<tr><td colSpan={6} style={{ textAlign: "center", padding: 48 }}><Loader2 size={20} className="animate-spin inline-block" /></td></tr>) : list.length === 0 ? (<tr><td colSpan={6} style={{ textAlign: "center", padding: 48, color: "var(--adm-fg-3)" }}>باغداری یافت نشد</td></tr>) : list.map(f => (<tr key={f.id} className="clickable" onClick={() => setOpen(f)}><td style={{ fontWeight: 500 }}>{f.name}</td><td>{f.farm}</td><td>{f.city}</td><td className="tnum">{fa(f.products)}</td><td className="tnum" style={{ fontWeight: 600 }}>{faNum(f.sales)}</td><td className="tnum"><span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={12} style={{ color: "#f5a623" }} />{fa(f.rating)}</span></td></tr>))}</tbody></table></div></div>
        <FarmerDrawer farmer={open} onClose={() => setOpen(null)} />
    </>)
}
