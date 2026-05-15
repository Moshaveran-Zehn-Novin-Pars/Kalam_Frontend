"use client"
import { useState } from "react"
import { Shield, CheckCircle, XCircle, Search, Users, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const ALL = [
    { id:"k1", name:"علی محمدی", phone:"09121111111", type:"باغدار", date:"۱۴۰۴/۹/۱۲", status:"pending", nationalId:"۰۰۱۲۳۴۵۶۷۸" },
    { id:"k2", name:"رضا کریمی", phone:"09122222222", type:"راننده", date:"۱۴۰۴/۹/۱۰", status:"pending", nationalId:"۰۰۱۲۳۴۵۶۷۹" },
    { id:"k3", name:"سوپرمارکت رضایی", phone:"09123333333", type:"خریدار", date:"۱۴۰۴/۹/۸", status:"approved", nationalId:"۰۰۱۲۳۴۵۶۸۰" },
    { id:"k4", name:"مهدی رضایی", phone:"09124444444", type:"باغدار", date:"۱۴۰۴/۹/۵", status:"rejected", nationalId:"۰۰۱۲۳۴۵۶۸۱" },
    { id:"k5", name:"نرگس احمدی", phone:"09125555555", type:"باغدار", date:"۱۴۰۴/۹/۳", status:"approved", nationalId:"۰۰۱۲۳۴۵۶۸۲" },
    { id:"k6", name:"حسین احمدی", phone:"09126666666", type:"راننده", date:"۱۴۰۴/۸/۲۸", status:"pending", nationalId:"۰۰۱۲۳۴۵۶۸۳" },
]

export default function KycPage() {
    const [filter, setFilter] = useState("all"); const [q, setQ] = useState("")
    const filtered = ALL.filter(k => (filter==="all"||k.status===filter) && (!q||k.name.includes(q)))
    const pending = ALL.filter(k => k.status === "pending").length

    return (<>
        <div className="adm-detail-head">
            <h1 className="adm-page-title" style={{marginBottom:0}}>احراز هویت</h1>
            <Link href="/admin/kyc/pending" className="adm-btn adm-btn--filled" style={{fontSize:12,padding:"7px 16px"}}>
                <Clock size={14}/> {fa(pending)} در انتظار
            </Link>
        </div>

        <div className="adm-stat-grid" style={{marginBottom:20}}>
            <div className="adm-stat-card"><Users size={18}/><span><span className="adm-stat-label">کل درخواست‌ها</span><span className="adm-stat-value">{fa(ALL.length)}</span></span></div>
            <div className="adm-stat-card"><Clock size={18} style={{color:"var(--adm-pending-fg)"}}/><span><span className="adm-stat-label">در انتظار</span><span className="adm-stat-value" style={{color:"var(--adm-pending-fg)"}}>{fa(pending)}</span></span></div>
            <div className="adm-stat-card"><CheckCircle size={18} style={{color:"var(--adm-accent)"}}/><span><span className="adm-stat-label">تأیید شده</span><span className="adm-stat-value" style={{color:"var(--adm-accent)"}}>{fa(ALL.filter(k=>k.status==="approved").length)}</span></span></div>
            <div className="adm-stat-card"><AlertCircle size={18} style={{color:"var(--adm-down)"}}/><span><span className="adm-stat-label">رد شده</span><span className="adm-stat-value" style={{color:"var(--adm-down)"}}>{fa(ALL.filter(k=>k.status==="rejected").length)}</span></span></div>
        </div>

        <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
            <div style={{position:"relative",flex:1,maxWidth:320}}><Search size={14} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--adm-fg-3)"}}/>
                <input className="adm-input" placeholder="جستجو..." value={q} onChange={e=>setQ(e.target.value)} style={{paddingRight:36}}/></div>
            <div className="adm-filters">{["all","pending","approved","rejected"].map(f=>(<button key={f}
                className={`adm-filter-btn ${filter===f?"active":""}`} onClick={()=>setFilter(f)}>
                {f==="all"?"همه":f==="pending"?"در انتظار":f==="approved"?"تأیید شده":"رد شده"}</button>))}</div></div>

        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>نام</th><th>شماره</th><th>نوع کاربر</th><th>کد ملی</th><th>تاریخ</th><th>وضعیت</th></tr></thead>
            <tbody>{filtered.map(k=>(<tr key={k.id}>
                <td style={{fontWeight:500}}>{k.name}</td><td style={{direction:"ltr",textAlign:"right",fontSize:12}}>{fa(k.phone)}</td>
                <td>{k.type}</td><td className="tnum" style={{fontFamily:"monospace"}}>{fa(k.nationalId)}</td><td className="tnum">{fa(k.date)}</td>
                <td>{k.status==="pending"?<span className="pill pill--pending">در انتظار</span>:k.status==="approved"?<span className="pill pill--shipped"><CheckCircle size={11}/> تأیید شده</span>:<span className="pill pill--cancel"><XCircle size={11}/> رد شده</span>}</td>
            </tr>))}</tbody></table></div></div>
    </>)
}