"use client"
import { useState, useEffect } from "react"
import { Search, Wallet, CheckCircle, TrendingUp, X, Loader2 } from "lucide-react"
import { settlementService } from "@/services/settlement"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

function SettleDrawer({s,onClose}:{s:any|null;onClose:()=>void}){
    if(!s)return null
    return(<><div className="adm-drawer-overlay" onClick={onClose}/><aside className="adm-drawer open">
        <div className="adm-drawer-head"><div><div style={{fontSize:12,color:"var(--adm-fg-3)"}}>تسویه</div><div style={{fontSize:18,fontWeight:700,marginTop:4}}>{s.farmer}</div></div><button className="adm-drawer-close" onClick={onClose}><X size={14}/></button></div>
        <div className="adm-drawer-row"><span>دوره</span><span>{s.period}</span></div>
        <div className="adm-drawer-row"><span>فروش ناخالص</span><span className="tnum">{faNum(s.gross)} تومان</span></div>
        <div className="adm-drawer-row"><span>کمیسیون</span><span className="tnum" style={{color:"var(--adm-fg-3)"}}>{faNum(s.commission)} تومان</span></div>
        <div className="adm-drawer-row" style={{borderTop:"1px solid var(--adm-border)",paddingTop:13,marginTop:4,fontWeight:600}}><span>خالص پرداختی</span><span style={{color:"var(--adm-accent)",fontSize:15}}>{faNum(s.net)} تومان</span></div>
        <div className="adm-drawer-row"><span>وضعیت</span><span className={`pill ${s.status==="paid"?"pill--shipped":"pill--pending"}`}>{s.status==="paid"?"پرداخت شده":"در انتظار"}</span></div>
    </aside></>)
}
export default function SettlementsPage() {
    const [filter,setFilter]=useState("all"); const [q,setQ]=useState(""); const [open,setOpen]=useState<any>(null)
    const [data,setData]=useState<any[]>([]); const [loading,setLoading]=useState(true)
    useEffect(()=>{settlementService.findAll().then(setData).catch(()=>{}).finally(()=>setLoading(false))},[])
    const ALL=data.map(s=>({
        id:s.id, farmer:s.farmer?.businessName||s.farmerId,
        period:`${String(s.periodStart||"").slice(0,10)} – ${String(s.periodEnd||"").slice(0,10)}`,
        gross:Number(s.grossAmount), commission:Number(s.commissionAmount), net:Number(s.netAmount),
        status:s.status,
    }))
    const list=ALL.filter(s=>(filter==="all"||s.status===filter)&&(!q||s.farmer.includes(q)))
    const paid=ALL.filter(s=>s.status==="paid"); const totalPaid=paid.reduce((s,i)=>s+i.net,0)
    if(loading)return<div style={{display:"flex",justifyContent:"center",padding:48}}><Loader2 className="spin" size={32}/></div>
    return(<><h1 className="adm-page-title">تسویه‌حساب‌ها</h1>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Wallet size={18}/>پرداخت شده</div><span className="adm-stat__delta up"><TrendingUp size={12}/>{fa(75)}٪</span></div><div className="adm-stat__value">{fa(paid.length)}<span className="adm-stat__unit">دوره</span></div><div className="adm-stat__compare">از {fa(ALL.length)} دوره</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><CheckCircle size={18}/>کل پرداختی</div></div><div className="adm-stat__value">{faNum(totalPaid)}<span className="adm-stat__unit">تومان</span></div><div className="adm-stat__compare">میانگین: {faNum(Math.round(totalPaid/paid.length||0))} تومان</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label">در انتظار</div></div><div className="adm-stat__value" style={{color:"var(--adm-pending-fg)"}}>{fa(ALL.filter(s=>s.status==="pending").length)}</div><div className="adm-stat__compare">{faNum(ALL.filter(s=>s.status==="pending").reduce((s,i)=>s+i.net,0))} تومان</div></div>
        </div>
        {ALL.length===0?<div style={{textAlign:"center",padding:32,color:"var(--adm-fg-3)",fontSize:13}}>هیچ تسویه‌ای یافت نشد</div>:<>
        <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
            <div className="adm-tb-input"><input placeholder="جستجوی باغدار..." value={q} onChange={e=>setQ(e.target.value)}/></div>
            <div className="adm-filters">{["all","paid","pending"].map(f=>(<button key={f} className={`adm-filter-btn ${filter===f?"active":""}`} onClick={()=>setFilter(f)}>{f==="all"?"همه":f==="paid"?"پرداخت شده":"در انتظار"}</button>))}</div></div>
        <h2 className="adm-section-title">تاریخچه تسویه‌ها</h2>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>باغدار</th><th>دوره</th><th>فروش ناخالص</th><th>کمیسیون</th><th>خالص پرداختی</th><th>وضعیت</th></tr></thead>
            <tbody>{list.map(s=>(<tr key={s.id} className="clickable" onClick={()=>setOpen(s)}><td style={{fontWeight:500}}>{s.farmer}</td><td>{s.period}</td><td className="tnum">{faNum(s.gross)}</td><td className="tnum" style={{color:"var(--adm-fg-3)"}}>{faNum(s.commission)}</td><td className="tnum total">{faNum(s.net)}</td><td><span className={`pill ${s.status==="paid"?"pill--shipped":"pill--pending"}`}>{s.status==="paid"?"پرداخت شده":"در انتظار"}</span></td></tr>))}</tbody></table></div></div>
        </>}
        <SettleDrawer s={open} onClose={()=>setOpen(null)}/>
    </>)
}
