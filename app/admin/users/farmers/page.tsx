"use client"
import { useState } from "react"
import { Search } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const FARMERS = Array.from({ length: 6 }, (_, i) => ({
    id: `f${i}`, name: ["علی محمدی","نرگس احمدی","مهدی رضایی","زهرا حسینی","حسن کریمی","فرید موسوی"][i],
    farm: ["باغ سیب نقره‌ای","گلخانه سبز","باغ انگور","باغ هلو","باغ پسته","گلخانه صیفی"][i],
    phone: "0913" + String(2000000 + i * 111111).slice(0, 7), products: [5, 8, 3, 6, 4, 7][i],
    sales: [185000000, 92000000, 45000000, 130000000, 68000000, 210000000][i], status: "verified",
}))

export default function AdminFarmersPage() {
    const [q, setQ] = useState(""); const list = FARMERS.filter(f => !q || f.name.includes(q) || f.farm.includes(q))
    return (<><h1 className="adm-page-title">باغداران</h1>
        <div style={{ display:"flex", gap:12, marginBottom:16 }}><div style={{ position:"relative", flex:1, maxWidth:320 }}><Search size={14} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", color:"var(--adm-fg-3)" }} />
            <input className="adm-input" placeholder="جستجو..." value={q} onChange={e=>setQ(e.target.value)} style={{ paddingRight:36 }} /></div></div>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>باغدار</th><th>نام باغ</th><th>تماس</th><th>محصولات</th><th>فروش کل</th><th>وضعیت</th></tr></thead>
            <tbody>{list.map(f=>(<tr key={f.id}>
                <td style={{fontWeight:500}}>{f.name}</td><td>{f.farm}</td><td style={{direction:"ltr", textAlign:"right"}}>{fa(f.phone)}</td>
                <td className="tnum">{fa(f.products)}</td><td className="tnum" style={{fontWeight:600}}>{faNum(f.sales)}</td>
                <td><span className="pill pill--shipped">تأیید شده</span></td>
            </tr>))}</tbody></table></div></div></>)
}