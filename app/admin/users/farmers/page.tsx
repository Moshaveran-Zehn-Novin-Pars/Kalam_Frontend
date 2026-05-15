"use client"
import { useState } from "react"
import { Search, Users, Package, Wallet, TrendingUp, TrendingDown, Star, X } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const ALL = Array.from({ length: 6 }, (_, i) => ({
    id: `f${i}`, name: ["علی محمدی", "نرگس احمدی", "مهدی رضایی", "زهرا حسینی", "حسن کریمی", "فرید موسوی"][i],
    farm: ["باغ سیب نقره‌ای", "گلخانه سبز", "باغ انگور", "باغ هلو", "باغ پسته", "گلخانه صیفی"][i],
    products: [5, 8, 3, 6, 4, 7][i], sales: [185000000, 92000000, 45000000, 130000000, 68000000, 210000000][i],
    rating: [4.8, 4.5, 4.2, 4.9, 4.3, 4.6][i], city: ["شیراز", "اصفهان", "تبریز", "شیراز", "کرمان", "اهواز"][i],
}))

function FarmerDrawer({ farmer, onClose }: { farmer: typeof ALL[0] | null; onClose: () => void }) {
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
    const [q, setQ] = useState(""); const [open, setOpen] = useState<typeof ALL[0] | null>(null)
    const list = ALL.filter(f => !q || f.name.includes(q))
    const totalSales = ALL.reduce((s, f) => s + f.sales, 0)
    const totalProducts = ALL.reduce((s, f) => s + f.products, 0)
    return (<>
        <h1 className="adm-page-title">باغداران</h1>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Users size={18} />کل باغداران</div><span className="adm-stat__delta up"><TrendingUp size={12} />{fa(20)}٪</span></div><div className="adm-stat__value">{fa(ALL.length)}<span className="adm-stat__unit">نفر</span></div><div className="adm-stat__compare">ماه قبل: {fa(5)} نفر</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Package size={18} />کل محصولات</div></div><div className="adm-stat__value">{fa(totalProducts)}<span className="adm-stat__unit">محصول</span></div><div className="adm-stat__compare">میانگین: {fa(Math.round(totalProducts / ALL.length))} محصول</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Wallet size={18} />فروش کل</div><span className="adm-stat__delta up"><TrendingUp size={12} />{fa(38)}٪</span></div><div className="adm-stat__value">{faNum(totalSales)}<span className="adm-stat__unit">تومان</span></div><div className="adm-stat__compare">میانگین: {faNum(Math.round(totalSales / ALL.length))} تومان</div></div>
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}><div style={{ position: "relative", flex: 1, maxWidth: 320 }}><Search size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--adm-fg-3)" }} /><input className="adm-field-input" placeholder="جستجوی باغدار..." value={q} onChange={e => setQ(e.target.value)} style={{ paddingRight: 36 }} /></div></div>
        <h2 className="adm-section-title">لیست باغداران</h2>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>باغدار</th><th>باغ</th><th>شهر</th><th>محصولات</th><th>فروش</th><th>امتیاز</th></tr></thead>
            <tbody>{list.map(f => (<tr key={f.id} className="clickable" onClick={() => setOpen(f)}><td style={{ fontWeight: 500 }}>{f.name}</td><td>{f.farm}</td><td>{f.city}</td><td className="tnum">{fa(f.products)}</td><td className="tnum" style={{ fontWeight: 600 }}>{faNum(f.sales)}</td><td className="tnum"><span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={12} style={{ color: "#f5a623" }} />{fa(f.rating)}</span></td></tr>))}</tbody></table></div></div>
        <FarmerDrawer farmer={open} onClose={() => setOpen(null)} />
    </>)
}
