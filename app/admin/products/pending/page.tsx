"use client"
import { Check, X, Search } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const PENDING = [
    { id:"pp1", name:"کیوی شمال", farmer:"حسن کریمی", price:95000, date:"۱۴۰۴/۹/۱۴" },
    { id:"pp2", name:"پرتقال تامسون", farmer:"علی محمدی", price:45000, date:"۱۴۰۴/۹/۱۳" },
    { id:"pp3", name:"نارنگی", farmer:"نرگس احمدی", price:38000, date:"۱۴۰۴/۹/۱۲" },
]
export default function PendingProductsPage() {
    return (<><h1 className="adm-page-title">محصولات در انتظار تأیید</h1>
        <div className="adm-alert adm-alert--info" style={{marginBottom:20}}>{fa(PENDING.length)} محصول منتظر تأیید هستند.</div>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>محصول</th><th>باغدار</th><th>قیمت</th><th>تاریخ</th><th>عملیات</th></tr></thead>
            <tbody>{PENDING.map(p=>(<tr key={p.id}>
                <td style={{fontWeight:500}}>{p.name}</td><td>{p.farmer}</td><td className="tnum" style={{fontWeight:600}}>{faNum(p.price)} تومان</td>
                <td className="tnum">{fa(p.date)}</td>
                <td><div style={{display:"flex",gap:5}}>
                    <button className="adm-btn adm-btn--filled" style={{padding:"5px 10px",fontSize:12}}><Check size={12}/> تأیید</button>
                    <button className="adm-btn adm-btn--ghost" style={{padding:"5px 10px",fontSize:12,color:"var(--adm-down)"}}><X size={12}/> رد</button>
                </div></td>
            </tr>))}</tbody></table></div></div></>)
}