"use client"
import { useState } from "react"
import { Search, Truck, Navigation, Star, Users, CheckCircle, XCircle } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const ALL = Array.from({ length: 5 }, (_, i) => ({
    id: `d${i}`, name: ["رضا کریمی","حسین احمدی","سعید موسوی","امیر رضایی","محمد حسینی"][i],
    phone: "0912" + String(3000000 + i * 111111).slice(0, 7), vehicle: ["وانت نیسان","کامیون ۱۰ تن","وانت آریسان","کامیون ۶ تن","وانت زانتیا"][i],
    deliveries: [47, 82, 23, 56, 38][i], rating: [4.8, 4.5, 4.2, 4.9, 4.3][i], available: [true, true, false, true, false][i], city: ["تهران","شیراز","اصفهان","تهران","مشهد"][i],
}))

export default function AdminDriversPage() {
    const [q, setQ] = useState("")
    const list = ALL.filter(d => !q || d.name.includes(q) || d.city.includes(q))
    const activeCount = ALL.filter(d => d.available).length
    const totalDeliveries = ALL.reduce((s, d) => s + d.deliveries, 0)

    return (<>
        <h1 className="adm-page-title">رانندگان</h1>

        <div className="adm-stat-grid" style={{ marginBottom: 20 }}>
            <div className="adm-stat-card"><Users size={18} /><span><span className="adm-stat-label">کل رانندگان</span><span className="adm-stat-value">{fa(ALL.length)}</span></span></div>
            <div className="adm-stat-card"><CheckCircle size={18} /><span><span className="adm-stat-label">فعال</span><span className="adm-stat-value" style={{ color: "var(--adm-accent)" }}>{fa(activeCount)}</span></span></div>
            <div className="adm-stat-card"><Navigation size={18} /><span><span className="adm-stat-label">کل تحویل‌ها</span><span className="adm-stat-value">{fa(totalDeliveries)}</span></span></div>
            <div className="adm-stat-card"><Star size={18} /><span><span className="adm-stat-label">میانگین امتیاز</span><span className="adm-stat-value">{fa(4.5)}</span></span></div>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
                <Search size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--adm-fg-3)" }} />
                <input className="adm-input" placeholder="جستجو..." value={q} onChange={e => setQ(e.target.value)} style={{ paddingRight: 36 }} />
            </div>
        </div>

        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>راننده</th><th>خودرو</th><th>شهر</th><th>تحویل‌ها</th><th>امتیاز</th><th>وضعیت</th></tr></thead>
            <tbody>{list.map(d => (<tr key={d.id}>
                <td style={{ fontWeight: 500 }}>{d.name}</td><td>{d.vehicle}</td><td>{d.city}</td>
                <td className="tnum">{fa(d.deliveries)}</td>
                <td className="tnum"><span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={12} style={{ color: "#f5a623" }} />{fa(d.rating)}</span></td>
                <td>{d.available ? <span className="pill pill--shipped">فعال</span> : <span className="pill pill--cancel">غیرفعال</span>}</td>
            </tr>))}</tbody></table></div></div>
    </>)
}