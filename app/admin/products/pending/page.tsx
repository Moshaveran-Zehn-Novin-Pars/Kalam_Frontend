"use client"
import { useState } from "react"
import { Check, X, Search, Package, Clock, CheckCircle } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const ALL = [
    { id:"pp1", name:"کیوی شمال", farmer:"حسن کریمی", price:95000, date:"۱۴۰۴/۹/۱۴", cat:"میوه" },
    { id:"pp2", name:"پرتقال تامسون", farmer:"علی محمدی", price:45000, date:"۱۴۰۴/۹/۱۳", cat:"میوه" },
    { id:"pp3", name:"نارنگی", farmer:"نرگس احمدی", price:38000, date:"۱۴۰۴/۹/۱۲", cat:"میوه" },
    { id:"pp4", name:"کاهو فرانسوی", farmer:"فرید موسوی", price:25000, date:"۱۴۰۴/۹/۱۱", cat:"سبزیجات" },
]
export default function PendingProductsPage() {
    const [q,setQ]=useState(""); const [list,setList]=useState(ALL)
    const filtered=list.filter(p=>!q||p.name.includes(q))
    return (<><h1 className="adm-page-title">محصولات در انتظار تأیید</h1>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Clock size={18}/>در انتظار</div></div><div className="adm-stat__value" style={{color:"var(--adm-pending-fg)"}}>{fa(list.length)}</div><div className="adm-stat__compare">نیاز به بررسی</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Package size={18}/>امروز</div></div><div className="adm-stat__value">{fa(list.filter(p=>p.date==="۱۴۰۴/۹/۱۴").length)}</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><CheckCircle size={18}/>تأیید شده امروز</div></div><div className="adm-stat__value" style={{color:"var(--adm-accent)"}}>{fa(0)}</div></div>
        </div>
        <div style={{display:"flex",gap:12,marginBottom:16}}><div style={{position:"relative",flex:1,maxWidth:320}}><Search size={14} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--adm-fg-3)"}}/><input className="adm-field-input" placeholder="جستجو..." value={q} onChange={e=>setQ(e.target.value)} style={{paddingRight:36}}/></div></div>
        {filtered.length===0?<div className="adm-empty">محصولی در انتظار تأیید نیست.</div>:
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>محصول</th><th>باغدار</th><th>دسته</th><th>قیمت</th><th>تاریخ</th><th>عملیات</th></tr></thead>
            <tbody>{filtered.map(p=>(<tr key={p.id}><td style={{fontWeight:500}}>{p.name}</td><td>{p.farmer}</td><td>{p.cat}</td><td className="tnum" style={{fontWeight:600}}>{faNum(p.price)} تومان</td><td className="tnum">{fa(p.date)}</td>
                <td><div style={{display:"flex",gap:5}}><button className="adm-btn adm-btn--filled" style={{padding:"5px 10px",fontSize:12}} onClick={()=>setList(prev=>prev.filter(x=>x.id!==p.id))}><Check size={12}/> تأیید</button><button className="adm-btn adm-btn--ghost" style={{padding:"5px 10px",fontSize:12,color:"var(--adm-down)"}} onClick={()=>setList(prev=>prev.filter(x=>x.id!==p.id))}><X size={12}/> رد</button></div></td>
            </tr>))}</tbody></table></div></div>}
    </>)
}
