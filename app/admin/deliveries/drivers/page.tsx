"use client"
import { useState } from "react"
import { Search, Truck, Users, Navigation, Star, TrendingUp, X, CheckCircle, XCircle } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const ALL = Array.from({ length: 6 }, (_, i) => ({
    id: `d${i}`, name: ["رضا کریمی", "حسین احمدی", "سعید موسوی", "امیر رضایی", "محمد حسینی", "حمید رحیمی"][i],
    vehicle: ["وانت نیسان", "کامیون ۱۰ تن", "وانت آریسان", "کامیون ۶ تن", "وانت زانتیا", "کامیون ۸ تن"][i],
    deliveries: [47, 82, 23, 56, 38, 61][i], rating: [4.8, 4.5, 4.2, 4.9, 4.3, 4.6][i], available: [true, true, false, true, false, true][i], city: ["تهران", "شیراز", "اصفهان", "تهران", "مشهد", "تبریز"][i],
}))

function DriverDrawer({ driver, onClose, onToggle }: { driver: typeof ALL[0] | null; onClose: () => void; onToggle: (id: string) => void }) {
    if (!driver) return null
    return (<><div className="adm-drawer-overlay" onClick={onClose} /><aside className="adm-drawer open">
        <div className="adm-drawer-head"><div><div style={{ fontSize: 12, color: "var(--adm-fg-3)" }}>راننده</div><div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{driver.name}</div></div><button className="adm-drawer-close" onClick={onClose}><X size={14} /></button></div>
        <div className="adm-drawer-product"><div className="adm-drawer-product-icon"><Truck size={20} /></div><div><div style={{ fontWeight: 600, fontSize: 14 }}>{driver.vehicle}</div><div style={{ fontSize: 12, color: "var(--adm-fg-3)", marginTop: 4 }}>{driver.city}</div></div></div>
        <div className="adm-drawer-row"><span>تحویل‌ها</span><span className="tnum">{fa(driver.deliveries)}</span></div>
        <div className="adm-drawer-row"><span>امتیاز</span><span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={14} style={{ color: "#f5a623" }} />{fa(driver.rating)}</span></div>
        <div className="adm-drawer-row" style={{ borderTop: "1px solid var(--adm-border)", paddingTop: 13, marginTop: 4 }}><span>وضعیت</span><span className={`pill ${driver.available ? "pill--shipped" : "pill--cancel"}`}>{driver.available ? "فعال" : "غیرفعال"}</span></div>
        <button className="adm-drawer-btn" onClick={() => { onToggle(driver.id); onClose() }}>{driver.available ? "غیرفعال کردن" : "فعال کردن"}</button>
    </aside></>)
}

export default function DriversManagementPage() {
    const [q, setQ] = useState(""); const [list, setList] = useState(ALL); const [open, setOpen] = useState<typeof ALL[0] | null>(null)
    const filtered = list.filter(d => !q || d.name.includes(d.city))
    const toggleAvail = (id: string) => setList(prev => prev.map(d => d.id === id ? { ...d, available: !d.available } : d))
    return (<>
        <h1 className="adm-page-title">مدیریت رانندگان</h1>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Users size={18} />کل رانندگان</div></div><div className="adm-stat__value">{fa(ALL.length)}<span className="adm-stat__unit">نفر</span></div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Truck size={18} />فعال</div><span className="adm-stat__delta up"><TrendingUp size={12} />{fa(Math.round(list.filter(d => d.available).length / ALL.length * 100))}٪</span></div><div className="adm-stat__value">{fa(list.filter(d => d.available).length)}<span className="adm-stat__unit">نفر</span></div><div className="adm-stat__compare">از {fa(ALL.length)} راننده</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Navigation size={18} />کل تحویل‌ها</div></div><div className="adm-stat__value">{fa(list.reduce((s, d) => s + d.deliveries, 0))}</div><div className="adm-stat__compare">میانگین امتیاز: ★ {fa(4.5)}</div></div>
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}><div style={{ position: "relative", flex: 1, maxWidth: 320 }}><Search size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--adm-fg-3)" }} /><input className="adm-field-input" placeholder="جستجو..." value={q} onChange={e => setQ(e.target.value)} style={{ paddingRight: 36 }} /></div></div>
        <h2 className="adm-section-title">لیست رانندگان</h2>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>راننده</th><th>خودرو</th><th>شهر</th><th>تحویل‌ها</th><th>امتیاز</th><th>وضعیت</th></tr></thead>
            <tbody>{filtered.map(d => (<tr key={d.id} className="clickable" onClick={() => setOpen(d)}><td style={{ fontWeight: 500 }}>{d.name}</td><td>{d.vehicle}</td><td>{d.city}</td><td className="tnum">{fa(d.deliveries)}</td><td className="tnum"><span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={12} style={{ color: "#f5a623" }} />{fa(d.rating)}</span></td><td>{d.available ? <span className="pill pill--shipped"><CheckCircle size={11} /> فعال</span> : <span className="pill pill--cancel"><XCircle size={11} /> غیرفعال</span>}</td></tr>))}</tbody></table></div></div>
        <DriverDrawer driver={open} onClose={() => setOpen(null)} onToggle={toggleAvail} />
    </>)
}
