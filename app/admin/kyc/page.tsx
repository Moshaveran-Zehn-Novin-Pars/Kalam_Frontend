"use client"
import { useState, useEffect } from "react"
import { Shield, CheckCircle, XCircle, Search, Users, Clock, TrendingUp, Loader2 } from "lucide-react"
import Link from "next/link"
import { adminService } from "@/services/admin"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

export default function KycPage() {
    const [all, setAll] = useState<any[]>([]); const [loading, setLoading] = useState(true)
    const [filter,setFilter]=useState("all"); const [q,setQ]=useState("")
    useEffect(() => { adminService.getKycRequests().then(setAll).catch(() => {}).finally(() => setLoading(false)) }, [])
    const filtered=all.filter((k:any)=>(filter==="all"||k.status===filter)&&(!q||(k.name||'').includes(q)))
    const pending=all.filter((k:any)=>k.status==="pending").length
    const approved=all.filter((k:any)=>k.status==="approved").length
    const rejected=all.filter((k:any)=>k.status==="rejected").length
    return (<>
        <div className="adm-detail-head"><h1 className="adm-page-title" style={{marginBottom:0}}>احراز هویت</h1>
            <Link href="/admin/kyc/pending" className="adm-btn adm-btn--filled" style={{fontSize:12,padding:"7px 16px"}}><Clock size={14}/> {fa(pending)} در انتظار</Link></div>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Users size={18}/>کل درخواست‌ها</div><span className="adm-stat__delta up"><TrendingUp size={12}/>{fa(50)}٪</span></div><div className="adm-stat__value">{fa(all.length)}</div><div className="adm-stat__compare">ماه قبل: {fa(4)} درخواست</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Clock size={18}/>در انتظار</div></div><div className="adm-stat__value" style={{color:"var(--adm-pending-fg)"}}>{fa(pending)}</div><div className="adm-stat__compare">نیاز به بررسی</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><CheckCircle size={18}/>تأیید شده</div></div><div className="adm-stat__value" style={{color:"var(--adm-accent)"}}>{fa(approved)}</div><div className="adm-stat__compare">رد شده: {fa(rejected)}</div></div>
        </div>
        <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
            <div className="adm-tb-input"><input placeholder="جستجو..." value={q} onChange={e=>setQ(e.target.value)}/></div>
            <div className="adm-filters">{["all","pending","approved","rejected"].map(f=>(<button key={f} className={`adm-filter-btn ${filter===f?"active":""}`} onClick={()=>setFilter(f)}>{f==="all"?"همه":f==="pending"?"در انتظار":f==="approved"?"تأیید شده":"رد شده"}</button>))}</div></div>
        <h2 className="adm-section-title">لیست درخواست‌ها</h2>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>نام</th><th>نوع</th><th>تاریخ</th><th>وضعیت</th></tr></thead>
            <tbody>{loading ? <tr><td colSpan={4} style={{textAlign:"center",padding:32}}><Loader2 size={20} className="animate-spin inline-block"/></td></tr> : filtered.length === 0 ? <tr><td colSpan={4} style={{textAlign:"center",padding:48,color:"var(--adm-fg-3)"}}>موردی یافت نشد</td></tr> : filtered.map((k:any)=>(<tr key={k.id}><td style={{fontWeight:500}}>{k.name || k.fullName || k.id}</td><td>{k.type || k.role || "—"}</td><td className="tnum">{k.createdAt ? fa(new Date(k.createdAt).toLocaleDateString("fa-IR")) : "—"}</td>
                <td>{k.status==="pending"?<span className="pill pill--pending">در انتظار</span>:k.status==="approved"?<span className="pill pill--shipped"><CheckCircle size={11}/> تأیید شده</span>:<span className="pill pill--cancel"><XCircle size={11}/> رد شده</span>}</td>
            </tr>))}</tbody></table></div></div>
    </>)
}
