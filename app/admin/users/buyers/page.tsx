"use client"
import { useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const BUYERS = Array.from({ length: 8 }, (_, i) => ({
    id: `b${i}`, name: ["سوپرمارکت رضایی","رستوران آرارات","هایپرمی","کافه گلدن","میوه فروشی محسن","فروشگاه ستاره","رستوران کاج","سوپرمارکت نور"][i],
    phone: "0912" + String(1000000 + i * 111111).slice(0, 7), orders: [24, 18, 42, 7, 15, 9, 11, 33][i],
    total: [45000000, 28000000, 92000000, 8500000, 19000000, 12000000, 16000000, 71000000][i], status: "active",
}))

export default function AdminBuyersPage() {
    const [q, setQ] = useState(""); const list = BUYERS.filter(b => !q || b.name.includes(q))
    return (<><h1 className="adm-page-title">خریداران</h1>
        <div style={{ display:"flex", gap:12, marginBottom:16 }}><div style={{ position:"relative", flex:1, maxWidth:320 }}><Search size={14} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", color:"var(--adm-fg-3)" }} />
            <input className="adm-input" placeholder="جستجو..." value={q} onChange={e=>setQ(e.target.value)} style={{ paddingRight:36 }} /></div></div>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>خریدار</th><th>تماس</th><th>سفارش‌ها</th><th>کل خرید</th><th>وضعیت</th></tr></thead>
            <tbody>{list.map(b=>(<tr key={b.id} className="clickable" onClick={()=>window.location.href=`/admin/users/${b.id}`}>
                <td style={{fontWeight:500}}>{b.name}</td><td style={{direction:"ltr", textAlign:"right"}}>{fa(b.phone)}</td>
                <td className="tnum">{fa(b.orders)}</td><td className="tnum" style={{fontWeight:600}}>{faNum(b.total)}</td>
                <td><span className="pill pill--shipped">فعال</span></td>
            </tr>))}</tbody></table></div></div></>)
}