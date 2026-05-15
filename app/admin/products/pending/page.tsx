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
    { id:"pp5", name:"فلفل دلمه رنگی", farmer:"مهدی رضایی", price:45000, date:"۱۴۰۴/۹/۱۰", cat:"سبزیجات" },
]

export default function PendingProductsPage() {
    const [q, setQ] = useState(""); const [list, setList] = useState(ALL)
    const filtered = list.filter(p => !q || p.name.includes(q) || p.farmer.includes(q))
    const remove = (id:string) => setList(prev => prev.filter(p => p.id !== id))

    return (<>
        <h1 className="adm-page-title">محصولات در انتظار تأیید</h1>

        <div className="adm-stat-grid" style={{marginBottom:20}}>
            <div className="adm-stat-card"><Clock size={18} style={{color:"var(--adm-pending-fg)"}}/><span><span className="adm-stat-label">در انتظار</span><span className="adm-stat-value" style={{color:"var(--adm-pending-fg)"}}>{fa(list.length)}</span></span></div>
            <div className="adm-stat-card"><Package size={18}/><span><span className="adm-stat-label">امروز</span><span className="adm-stat-value">{fa(list.filter(p=>p.date==="۱۴۰۴/۹/۱۴").length)}</span></span></div>
            <div className="adm-stat-card"><CheckCircle size={18} style={{color:"var(--adm-accent)"}}/><span><span className="adm-stat-label">تأیید شده امروز</span><span className="adm-stat-value">{fa(0)}</span></span></div>
        </div>

        <div style={{display:"flex",gap:12,marginBottom:16}}>
            <div style={{position:"relative",flex:1,maxWidth:320}}><Search size={14} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--adm-fg-3)"}}/>
                <input className="adm-input" placeholder="جستجو..." value={q} onChange={e=>setQ(e.target.value)} style={{paddingRight:36}}/></div></div>

        {filtered.length === 0 ? (
            <div className="adm-empty">محصولی در انتظار تأیید نیست.</div>
        ) : (
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>محصول</th><th>باغدار</th><th>دسته</th><th>قیمت</th><th>تاریخ</th><th>عملیات</th></tr></thead>
            <tbody>{filtered.map(p=>(<tr key={p.id}>
                <td style={{fontWeight:500}}>{p.name}</td><td>{p.farmer}</td><td>{p.cat}</td>
                <td className="tnum" style={{fontWeight:600}}>{faNum(p.price)} تومان</td><td className="tnum">{fa(p.date)}</td>
                <td><div style={{display:"flex",gap:5}}>
                    <button className="adm-btn adm-btn--filled" style={{padding:"5px 10px",fontSize:12}} onClick={()=>remove(p.id)}><Check size={12}/> تأیید</button>
                    <button className="adm-btn adm-btn--ghost" style={{padding:"5px 10px",fontSize:12,color:"var(--adm-down)"}} onClick={()=>remove(p.id)}><X size={12}/> رد</button>
                </div></td>
            </tr>))}</tbody></table></div></div>)}
    </>)
}