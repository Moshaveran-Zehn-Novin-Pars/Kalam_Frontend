"use client"
import { useState, useEffect } from "react"
import { Search, Truck, Users, Navigation, Star, TrendingUp, TrendingDown, X, Loader2 } from "lucide-react"
import { usersService } from "@/services/users"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

interface DriverRow {
    id: string; name: string; vehicle: string; deliveries: number; rating: number; available: boolean; city: string
}

function DriverDrawer({ driver, onClose }: { driver: DriverRow | null; onClose: () => void }) {
    if (!driver) return null
    return (<><div className="adm-drawer-overlay" onClick={onClose} /><aside className="adm-drawer open">
        <div className="adm-drawer-head"><div><div style={{ fontSize: 12, color: "var(--adm-fg-3)" }}>راننده</div><div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{driver.name}</div></div><button className="adm-drawer-close" onClick={onClose}><X size={14} /></button></div>
        <div className="adm-drawer-row"><span>خودرو</span><span>{driver.vehicle}</span></div>
        <div className="adm-drawer-row"><span>شهر</span><span>{driver.city}</span></div>
        <div className="adm-drawer-row"><span>تحویل‌ها</span><span className="tnum">{fa(driver.deliveries)}</span></div>
        <div className="adm-drawer-row"><span>امتیاز</span><span><Star size={14} style={{ color: "#f5a623" }} /> {fa(driver.rating)}</span></div>
        <div className="adm-drawer-row" style={{ borderTop: "1px solid var(--adm-border)", paddingTop: 13, marginTop: 4 }}><span>وضعیت</span><span className={`pill ${driver.available ? "pill--shipped" : "pill--cancel"}`}>{driver.available ? "فعال" : "غیرفعال"}</span></div>
    </aside></>)
}

export default function AdminDriversPage() {
    const [q, setQ] = useState(""); const [open, setOpen] = useState<DriverRow | null>(null)
    const [drivers, setDrivers] = useState<DriverRow[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        usersService.findAll({ role: "DRIVER" })
            .then(data => setDrivers(data.map(u => ({
                id: u.id,
                name: [u.firstName, u.lastName].filter(Boolean).join(" "),
                vehicle: u.driver?.vehicleType ?? "",
                deliveries: u.driver?.ordersDelivered ?? 0,
                rating: Number(u.driver?.ratingAvg ?? 0),
                available: u.driver?.isAvailable ?? false,
                city: "",
            }))))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const list = drivers.filter(d => !q || d.name.includes(q))
    const active = drivers.filter(d => d.available).length
    const totalDeliveries = drivers.reduce((s, d) => s + d.deliveries, 0)
    return (<>
        <h1 className="adm-page-title">رانندگان</h1>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Users size={18} />کل رانندگان</div><span className="adm-stat__delta up"><TrendingUp size={12} />{fa(25)}٪</span></div><div className="adm-stat__value">{fa(drivers.length)}<span className="adm-stat__unit">نفر</span></div><div className="adm-stat__compare">ماه قبل: {fa(4)} نفر</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Truck size={18} />فعال</div><span className={`adm-stat__delta ${active >= 3 ? "up" : "down"}`}>{active >= 3 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{fa(drivers.length ? Math.round(active / drivers.length * 100) : 0)}٪</span></div><div className="adm-stat__value">{fa(active)}<span className="adm-stat__unit">نفر</span></div><div className="adm-stat__compare">از {fa(drivers.length)} راننده</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Navigation size={18} />کل تحویل‌ها</div></div><div className="adm-stat__value">{fa(totalDeliveries)}</div><div className="adm-stat__compare">میانگین امتیاز: ★ {fa(4.5)}</div></div>
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}><div style={{ position: "relative", flex: 1, maxWidth: 320 }}><Search size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--adm-fg-3)" }} /><input className="adm-field-input" placeholder="جستجوی راننده..." value={q} onChange={e => setQ(e.target.value)} style={{ paddingRight: 36 }} /></div></div>
        <h2 className="adm-section-title">لیست رانندگان</h2>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>راننده</th><th>خودرو</th><th>شهر</th><th>تحویل‌ها</th><th>امتیاز</th><th>وضعیت</th></tr></thead>
            <tbody>{loading ? (<tr><td colSpan={6} style={{ textAlign: "center", padding: 48 }}><Loader2 size={20} className="animate-spin inline-block" /></td></tr>) : list.length === 0 ? (<tr><td colSpan={6} style={{ textAlign: "center", padding: 48, color: "var(--adm-fg-3)" }}>راننده‌ای یافت نشد</td></tr>) : list.map(d => (<tr key={d.id} className="clickable" onClick={() => setOpen(d)}><td style={{ fontWeight: 500 }}>{d.name}</td><td>{d.vehicle}</td><td>{d.city}</td><td className="tnum">{fa(d.deliveries)}</td><td className="tnum"><span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={12} style={{ color: "#f5a623" }} />{fa(d.rating)}</span></td><td><span className={`pill ${d.available ? "pill--shipped" : "pill--cancel"}`}>{d.available ? "فعال" : "غیرفعال"}</span></td></tr>))}</tbody></table></div></div>
        <DriverDrawer driver={open} onClose={() => setOpen(null)} />
    </>)
}
