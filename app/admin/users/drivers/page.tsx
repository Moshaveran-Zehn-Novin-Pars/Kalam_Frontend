"use client"
import { useState } from "react"
import { Search } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const DRIVERS = Array.from({ length: 5 }, (_, i) => ({
    id: `d${i}`, name: ["رضا کریمی","حسین احمدی","سعید موسوی","امیر رضایی","محمد حسینی"][i],
    phone: "0912" + String(3000000 + i * 111111).slice(0, 7), vehicle: ["وانت نیسان","کامیون ۱۰ تن","وانت آریسان","کامیون ۶ تن","وانت زانتیا"][i],
    deliveries: [47, 82, 23, 56, 38][i], rating: [4.8, 4.5, 4.2, 4.9, 4.3][i], available: i % 2 === 0,
}))

export default function AdminDriversPage() {
    const [q, setQ] = useState(""); const list = DRIVERS.filter(d => !q || d.name.includes(q))
    return (<><h1 className="adm-page-title">رانندگان</h1>
        <div style={{ display:"flex", gap:12, marginBottom:16 }}><div style={{ position:"relative", flex:1, maxWidth:320 }}><Search size={14} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", color:"var(--adm-fg-3)" }} />
            <input className="adm-input" placeholder="جستجو..." value={q} onChange={e=>setQ(e.target.value)} style={{ paddingRight:36 }} /></div></div>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>راننده</th><th>تماس</th><th>خودرو</th><th>تحویل‌ها</th><th>امتیاز</th><th>وضعیت</th></tr></thead>
            <tbody>{list.map(d=>(<tr key={d.id}>
                <td style={{fontWeight:500}}>{d.name}</td><td style={{direction:"ltr", textAlign:"right"}}>{fa(d.phone)}</td>
                <td>{d.vehicle}</td><td className="tnum">{fa(d.deliveries)}</td>
                <td className="tnum">{fa(d.rating)}</td>
                <td><span className={`pill ${d.available ? "pill--shipped" : "pill--cancel"}`}>{d.available ? "فعال" : "غیرفعال"}</span></td>
            </tr>))}</tbody></table></div></div></>)
}