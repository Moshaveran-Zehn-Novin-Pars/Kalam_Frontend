"use client"
import { useState } from "react"
import { Shield, CheckCircle, XCircle, Search, Users, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const ALL = [
    { id:"k1", name:"علی محمدی", type:"باغدار", date:"۱۴۰۴/۹/۱۲", status:"pending" },
    { id:"k2", name:"رضا کریمی", type:"راننده", date:"۱۴۰۴/۹/۱۰", status:"pending" },
    { id:"k3", name:"سوپرمارکت رضایی", type:"خریدار", date:"۱۴۰۴/۹/۸", status:"approved" },
    { id:"k4", name:"مهدی رضایی", type:"باغدار", date:"۱۴۰۴/۹/۵", status:"rejected" },
    { id:"k5", name:"نرگس احمدی", type:"باغدار", date:"۱۴۰۴/۹/۳", status:"approved" },
    { id:"k6", name:"حسین احمدی", type:"راننده", date:"۱۴۰۴/۸/۲۸", status:"pending" },
]
export default function KycPage() {
    const [filter,setFilter]=useState("all"); const [q,setQ]=useState("")
    const filtered=ALL.filter(k=>(filter==="all"||k.status===filter)&&(!q||k.name.includes(q)))
    const pending=ALL.filter(k=>k.status==="pending").length
    return (<>
        <div className="adm-detail-head"><h1 className="adm-page-title" style={{marginBottom:0}}>احراز هویت</h1>
            <Link href="/admin/kyc/pending" className="adm-btn adm-btn--filled" style={{fontSize:12,padding:"7px 16px"}}><Clock size={14}/> {fa(pending)} در انتظار</Link></div>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Users size={18}/>کل درخواست‌ها</div><span className="adm-stat__delta up"><TrendingUp size={12}/>{fa(50)}٪</span></div><div className="adm-stat__value">{fa(ALL.length)}</div><div className="adm-stat__compare">ماه قبل: {fa(4)} درخواست</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Clock size={18}/>در انتظار</div></div><div className="adm-stat__value" style={{color:"var(--adm-pending-fg)"}}>{fa(pending)}</div><div className="adm-stat__compare">نیاز به بررسی</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><CheckCircle size={18}/>تأیید شده</div></div><div className="adm-stat__value" style={{color:"var(--adm-accent)"}}>{fa(ALL.filter(k=>k.status==="approved").length)}</div><div className="adm-stat__compare">رد شده: {fa(ALL.filter(k=>k.status==="rejected").length)}</div></div>
        </div>
        <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
            <div className="adm-tb-input"><input placeholder="جستجو..." value={q} onChange={e=>setQ(e.target.value)}/></div>
            <div className="adm-filters">{["all","pending","approved","rejected"].map(f=>(<button key={f} className={`adm-filter-btn ${filter===f?"active":""}`} onClick={()=>setFilter(f)}>{f==="all"?"همه":f==="pending"?"در انتظار":f==="approved"?"تأیید شده":"رد شده"}</button>))}</div></div>
        <h2 className="adm-section-title">لیست درخواست‌ها</h2>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>نام</th><th>نوع</th><th>تاریخ</th><th>وضعیت</th></tr></thead>
            <tbody>{filtered.map(k=>(<tr key={k.id}><td style={{fontWeight:500}}>{k.name}</td><td>{k.type}</td><td className="tnum">{fa(k.date)}</td>
                <td>{k.status==="pending"?<span className="pill pill--pending">در انتظار</span>:k.status==="approved"?<span className="pill pill--shipped"><CheckCircle size={11}/> تأیید شده</span>:<span className="pill pill--cancel"><XCircle size={11}/> رد شده</span>}</td>
            </tr>))}</tbody></table></div></div>
    </>)
}
