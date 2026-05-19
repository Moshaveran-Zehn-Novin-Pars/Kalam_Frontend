"use client"
import { useState, useEffect } from "react"
import { AlertTriangle, MessageSquare, Check, X, Clock, CheckCircle, Loader2 } from "lucide-react"
import { disputeService } from "@/services/dispute"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

export default function DisputesPage() {
    const [all,setAll]=useState<any[]>([]); const [loading,setLoading]=useState(true)
    const [filter,setFilter]=useState("all"); const [detail,setDetail]=useState<any>(null)
    useEffect(()=>{disputeService.findAll().then(setAll).catch(()=>{}).finally(()=>setLoading(false))},[])
    const filtered=all.filter(d=>filter==="all"||d.status===filter)
    if(detail)return <DisputeDetail dispute={detail} onBack={()=>setDetail(null)}/>
    return (<>
        <h1 className="adm-page-title">اعتراضات</h1>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><AlertTriangle size={18}/>کل اعتراضات</div></div><div className="adm-stat__value">{fa(all.length)}</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Clock size={18}/>باز</div></div><div className="adm-stat__value" style={{color:"var(--adm-pending-fg)"}}>{fa(all.filter(d=>d.status==="open").length)}</div><div className="adm-stat__compare">در بررسی: {fa(all.filter(d=>d.status==="review").length)}</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><CheckCircle size={18}/>حل شده</div></div><div className="adm-stat__value" style={{color:"var(--adm-accent)"}}>{fa(all.filter(d=>d.status==="resolved").length)}</div></div>
        </div>
        <div className="adm-filters" style={{marginBottom:16}}>{["all","open","review","resolved"].map(f=>(<button key={f} className={`adm-filter-btn ${filter===f?"active":""}`} onClick={()=>setFilter(f)}>{f==="all"?"همه":f==="open"?"باز":f==="review"?"در بررسی":"حل شده"}</button>))}</div>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>سفارش</th><th>خریدار</th><th>باغدار</th><th>دلیل</th><th>تاریخ</th><th>وضعیت</th></tr></thead>
            <tbody>{loading?<tr><td colSpan={6} style={{textAlign:"center",padding:32}}><Loader2 size={20} className="animate-spin inline-block"/></td></tr>:filtered.length===0?<tr><td colSpan={6} style={{textAlign:"center",padding:48,color:"var(--adm-fg-3)"}}>موردی یافت نشد</td></tr>:filtered.map(d=>(<tr key={d.id} className="clickable" onClick={()=>setDetail(d)}><td className="oid tnum">{(d as any).orderId || d.id}</td><td>{(d as any).buyer?.fullName || "—"}</td><td>{(d as any).farmer?.fullName || "—"}</td><td style={{fontSize:12,color:"var(--adm-fg-3)"}}>{d.reason || "—"}</td><td className="tnum">—</td>
                <td>{d.status==="open"?<span className="pill pill--pending">باز</span>:d.status==="review"?<span className="pill pill--prep">در بررسی</span>:<span className="pill pill--shipped">حل شده</span>}</td>
            </tr>))}</tbody></table></div></div>
    </>)
}
function DisputeDetail({dispute,onBack}:{dispute:any;onBack:()=>void}) {
    const [messages,setMessages]=useState([{side:"buyer",text:"محصولاتی که تحویل گرفتم کیفیت مطلوب را نداشت.",time:"۱۴۰۴/۹/۱۴ ۱۰:۳۰"},{side:"farmer",text:"محصولات در زمان بارگیری کاملاً سالم بودند.",time:"۱۴۰۴/۹/۱۴ ۱۲:۱۵"}])
    const [newMsg,setNewMsg]=useState("")
    return (<><div className="adm-detail-head"><h1 className="adm-page-title" style={{marginBottom:0}}>جزئیات اعتراض</h1><button className="adm-btn adm-btn--ghost" style={{fontSize:13,padding:"6px 14px",marginInlineStart:"auto"}} onClick={onBack}>← بازگشت</button></div>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label">خریدار</div></div><div className="adm-stat__value" style={{fontSize:16}}>{dispute.buyer}</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label">باغدار</div></div><div className="adm-stat__value" style={{fontSize:16}}>{dispute.farmer}</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label">سفارش</div></div><div className="adm-stat__value" style={{fontSize:16}}>{dispute.order}</div></div>
        </div>
        <div className="adm-card" style={{marginBottom:16}}><h3 style={{margin:"0 0 8px",fontSize:14,fontWeight:600}}>دلیل اعتراض</h3><p style={{fontSize:13,color:"var(--adm-fg-2)",margin:0}}>{dispute.reason}</p></div>
        <div className="adm-card" style={{marginBottom:16}}>
            <h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:600}}>پیام‌ها</h3>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:12}}>{messages.map((m,i)=>(<div key={i} style={{padding:"10px 14px",borderRadius:"var(--adm-r-sm)",fontSize:13,background:m.side==="buyer"?"var(--adm-bg-soft)":"var(--adm-accent-50)",borderInlineStart:`3px solid ${m.side==="buyer"?"var(--adm-fg-4)":"var(--adm-accent)"}`}}>
                <div style={{fontWeight:500,color:m.side==="buyer"?"var(--adm-fg)":"var(--adm-accent)",marginBottom:4}}>{m.side==="buyer"?dispute.buyer:dispute.farmer}</div>
                <p style={{margin:"0 0 4px",color:"var(--adm-fg-2)"}}>{m.text}</p><div style={{fontSize:11,color:"var(--adm-fg-3)"}}>{fa(m.time)}</div></div>))}</div>
            <div style={{display:"flex",gap:8}}><input className="adm-field-input" value={newMsg} onChange={e=>setNewMsg(e.target.value)} placeholder="پیام خود را بنویسید..." style={{flex:1}}/><button className="adm-btn adm-btn--filled" onClick={()=>{if(newMsg.trim()){setMessages(prev=>[...prev,{side:"admin",text:newMsg,time:"۱۴۰۴/۹/۱۵ ۰۸:۰۰"}]);setNewMsg("")}}}><MessageSquare size={14}/> ارسال</button></div>
        </div>
        <div style={{display:"flex",gap:10}}><button className="adm-btn adm-btn--filled"><Check size={14}/> تأیید و حل شده</button><button className="adm-btn adm-btn--ghost" style={{color:"var(--adm-down)"}}><X size={14}/> رد اعتراض</button></div>
    </>)
}
