"use client"
import { useState } from "react"
import { AlertTriangle, MessageSquare, Check, X } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const DISPUTES = [
    { id:"dp1", order:"ORD-2040", buyer:"سوپرمارکت رضایی", farmer:"علی محمدی", reason:"کیفیت مطابق انتظار نبود", date:"۱۴۰۴/۹/۱۴", status:"open" },
    { id:"dp2", order:"ORD-2038", buyer:"رستوران آرارات", farmer:"نرگس احمدی", reason:"محصول آسیب دیده بود", date:"۱۴۰۴/۹/۱۰", status:"review" },
    { id:"dp3", order:"ORD-2035", buyer:"هایپرمی", farmer:"مهدی رضایی", reason:"تأخیر در تحویل", date:"۱۴۰۴/۹/۵", status:"resolved" },
]
export default function DisputesPage() {
    const [filter, setFilter] = useState("all"); const [detail, setDetail] = useState<any>(null)
    const filtered = DISPUTES.filter(d => filter==="all"||d.status===filter)
    if (detail) return <DisputeDetail dispute={detail} onBack={()=>setDetail(null)} />
    return (<><h1 className="adm-page-title">اعتراضات</h1>
        <div className="adm-filters" style={{marginBottom:16}}>{["all","open","review","resolved"].map(f=>(<button key={f}
            className={`adm-filter-btn ${filter===f?"active":""}`} onClick={()=>setFilter(f)}>{f==="all"?"همه":f==="open"?"باز":f==="review"?"در بررسی":"حل شده"}</button>))}</div>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>سفارش</th><th>خریدار</th><th>باغدار</th><th>دلیل</th><th>تاریخ</th><th>وضعیت</th></tr></thead>
            <tbody>{filtered.map(d=>(<tr key={d.id} className="clickable" onClick={()=>setDetail(d)}>
                <td style={{fontWeight:500}}>{d.order}</td><td>{d.buyer}</td><td>{d.farmer}</td><td style={{fontSize:12,color:"var(--adm-fg-3)"}}>{d.reason}</td>
                <td className="tnum">{fa(d.date)}</td>
                <td>{d.status==="open"?<span className="pill pill--pending">باز</span>:d.status==="review"?<span className="pill pill--prep">در بررسی</span>:<span className="pill pill--shipped">حل شده</span>}</td>
            </tr>))}</tbody></table></div></div></>)
}
function DisputeDetail({dispute,onBack}:{dispute:any;onBack:()=>void}) {
    return (<><div className="adm-detail-head"><h1 className="adm-page-title" style={{marginBottom:0}}>جزئیات اعتراض</h1>
        <button className="adm-btn adm-btn--ghost" style={{fontSize:13,padding:"6px 14px",marginInlineStart:"auto"}} onClick={onBack}>← بازگشت</button></div>
        <div className="adm-card" style={{marginBottom:16}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,fontSize:13}}>
                <div><span style={{color:"var(--adm-fg-3)"}}>خریدار: </span><b>{dispute.buyer}</b></div>
                <div><span style={{color:"var(--adm-fg-3)"}}>باغدار: </span><b>{dispute.farmer}</b></div>
                <div><span style={{color:"var(--adm-fg-3)"}}>سفارش: </span><b>{dispute.order}</b></div>
                <div><span style={{color:"var(--adm-fg-3)"}}>تاریخ: </span><b>{fa(dispute.date)}</b></div>
            </div>
            <div style={{marginTop:12}}><span style={{fontSize:13,color:"var(--adm-fg-3)"}}>دلیل: </span><span style={{fontSize:13}}>{dispute.reason}</span></div>
        </div>
        <div className="adm-card" style={{marginBottom:16}}>
            <h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:600}}>پیام‌ها</h3>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <div style={{padding:"10px 14px",background:"var(--adm-bg-soft)",borderRadius:"var(--adm-r-sm)",fontSize:13}}>
                    <div style={{fontWeight:500,color:"var(--adm-fg)"}}>خریدار: {dispute.buyer}</div>
                    <p style={{margin:"4px 0 0",color:"var(--adm-fg-2)"}}>محصولاتی که تحویل گرفتم کیفیت مطلوب را نداشت. لطفاً بررسی کنید.</p>
                </div>
                <div style={{padding:"10px 14px",background:"var(--adm-accent-50)",borderRadius:"var(--adm-r-sm)",fontSize:13}}>
                    <div style={{fontWeight:500,color:"var(--adm-accent)"}}>باغدار: {dispute.farmer}</div>
                    <p style={{margin:"4px 0 0",color:"var(--adm-fg-2)"}}>محصولات در زمان بارگیری کاملاً سالم بودند. احتمالاً در حمل و نقل آسیب دیده‌اند.</p>
                </div>
            </div>
        </div>
        <div style={{display:"flex",gap:10}}>
            <button className="adm-btn adm-btn--filled"><MessageSquare size={14}/> ارسال پیام</button>
            <button className="adm-btn adm-btn--filled" style={{background:"var(--adm-accent)"}}><Check size={14}/> حل شده</button>
            <button className="adm-btn adm-btn--ghost" style={{color:"var(--adm-down)"}}><X size={14}/> رد اعتراض</button>
        </div></>)
}