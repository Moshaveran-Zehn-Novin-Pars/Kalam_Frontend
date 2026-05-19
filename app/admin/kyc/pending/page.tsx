"use client"
import { useState, useEffect } from "react"
import { Clock, Check, X, Loader2, Shield, Camera, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { adminService } from "@/services/admin"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

export default function PendingKycPage() {
    const [list, setList] = useState<any[]>([]); const [loading, setLoading] = useState(true)
    const [review, setReview] = useState<string|null>(null)
    useEffect(() => { adminService.getKycRequests({ status: "pending" }).then(setList).catch(() => {}).finally(() => setLoading(false)) }, [])
    if (review) return <KycReview userId={review} onBack={()=>setReview(null)} />

    return (<><div className="adm-detail-head"><h1 className="adm-page-title" style={{marginBottom:0}}>در انتظار بررسی</h1>
        <Link href="/admin/kyc" className="adm-btn adm-btn--ghost" style={{fontSize:13,padding:"6px 14px",marginInlineStart:"auto"}}>← بازگشت</Link></div>
        <div className="adm-alert adm-alert--info" style={{marginBottom:20}}><Shield size={16}/><span>{fa(list.length)} کاربر منتظر تأیید احراز هویت هستند.</span></div>
        {loading ? <div style={{textAlign:"center",padding:48}}><Loader2 size={20} className="animate-spin inline-block"/></div> : list.length === 0 ? <div style={{textAlign:"center",padding:48,color:"var(--adm-fg-3)"}}>موردی یافت نشد</div> : list.map((k:any)=>(<div key={k.id} className="adm-card" style={{marginBottom:12,display:"flex",alignItems:"center",gap:16}}>
            <div style={{width:44,height:44,borderRadius:"50%",background:"var(--adm-accent-50)",display:"grid",placeItems:"center",fontSize:18,fontWeight:700,color:"var(--adm-accent)",flexShrink:0}}>{(k.name || k.fullName || "?")[0]}</div>
            <div style={{flex:1,fontSize:13}}><div style={{fontWeight:600}}>{k.name || k.fullName}</div>
                <div style={{color:"var(--adm-fg-3)",fontSize:12,marginTop:2}}>{k.type || k.role || "—"} · {fa(k.phone || "—")}</div>
                <div style={{display:"flex",gap:6,marginTop:6}}>{(k.docs || []).map((d:string)=>(<span key={d} className="pill pill--shipped" style={{fontSize:10}}>{d}</span>))}</div></div>
            <button className="adm-btn adm-btn--filled" style={{padding:"7px 16px"}} onClick={()=>setReview(k.id)}>بررسی</button>
        </div>))}</>)
}

function KycReview({userId,onBack}:{userId:string;onBack:()=>void}) {
    return (<><div className="adm-detail-head"><h1 className="adm-page-title" style={{marginBottom:0}}>بررسی احراز هویت</h1>
        <button className="adm-btn adm-btn--ghost" style={{fontSize:13,padding:"6px 14px",marginInlineStart:"auto"}} onClick={onBack}>← بازگشت</button></div>
        <div className="adm-card" style={{marginBottom:16}}>
            <h3 style={{margin:"0 0 14px",fontSize:14,fontWeight:600}}>مدارک ارسال شده</h3>
            {["تصویر کارت ملی","تصویر پروانه کسب","سلفی با مدارک"].map((doc,i)=>(<div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid var(--adm-border)"}}>
                <div style={{display:"flex",gap:8,alignItems:"center",fontSize:13}}><Camera size={15} style={{color:"var(--adm-accent)"}}/>{doc}</div>
                <button className="adm-btn adm-btn--ghost" style={{padding:"4px 10px",fontSize:12}}>مشاهده</button>
            </div>))}
        </div>
        <div style={{display:"flex",gap:10}}>
            <button className="adm-btn adm-btn--filled" style={{gap:6}}><CheckCircle size={14}/> تأیید مدارک</button>
            <button className="adm-btn adm-btn--ghost" style={{color:"var(--adm-down)",gap:6}}><XCircle size={14}/> رد مدارک</button>
        </div></>)
}
