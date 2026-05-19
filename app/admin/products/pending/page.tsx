"use client"
import { useState, useEffect } from "react"
import { Check, X, Search, Package, Clock, CheckCircle, Loader2 } from "lucide-react"
import { productService } from "@/services/product"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

export default function PendingProductsPage() {
    const [q,setQ]=useState(""); const [list,setList]=useState<any[]>([]); const [loading,setLoading]=useState(true)
    useEffect(()=>{
        productService.findAllAdmin({ status: 'PENDING_APPROVAL' as any })
            .then((res:any)=>setList(res?.items||[]))
            .catch(()=>{})
            .finally(()=>setLoading(false))
    },[])
    const filtered=list.filter((p:any)=>!q||p.name?.includes(q))
    if(loading) return <div className="adm-loading"><Loader2 size={24} className="spin"/></div>
    return (<><h1 className="adm-page-title">محصولات در انتظار تأیید</h1>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Clock size={18}/>در انتظار</div></div><div className="adm-stat__value" style={{color:"var(--adm-pending-fg)"}}>{fa(list.length)}</div><div className="adm-stat__compare">نیاز به بررسی</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Package size={18}/>امروز</div></div><div className="adm-stat__value">{fa(list.filter((p:any)=>p.createdAt&&new Date(p.createdAt).toDateString()===new Date().toDateString()).length)}</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><CheckCircle size={18}/>تأیید شده امروز</div></div><div className="adm-stat__value" style={{color:"var(--adm-accent)"}}>{fa(0)}</div></div>
        </div>
        <div style={{display:"flex",gap:12,marginBottom:16}}><div style={{position:"relative",flex:1,maxWidth:320}}><Search size={14} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--adm-fg-3)"}}/><input className="adm-field-input" placeholder="جستجو..." value={q} onChange={e=>setQ(e.target.value)} style={{paddingRight:36}}/></div></div>
        {filtered.length===0?<div className="adm-empty">محصولی در انتظار تأیید نیست.</div>:
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>محصول</th><th>باغدار</th><th>دسته</th><th>قیمت</th><th>تاریخ</th><th>عملیات</th></tr></thead>
            <tbody>{filtered.map((p:any)=>(<tr key={p.id}><td style={{fontWeight:500}}>{p.name}</td><td>{p.farmer?.name || p.farmerId || '—'}</td><td>{p.category?.name || p.categoryId || '—'}</td><td className="tnum" style={{fontWeight:600}}>{faNum(p.pricePerUnit??p.price??0)} تومان</td><td className="tnum">{p.createdAt?fa(new Date(p.createdAt).toLocaleDateString('fa-IR')):'—'}</td>
                <td><div style={{display:"flex",gap:5}}><button className="adm-btn adm-btn--filled" style={{padding:"5px 10px",fontSize:12}} onClick={()=>setList(prev=>prev.filter((x:any)=>x.id!==p.id))}><Check size={12}/> تأیید</button><button className="adm-btn adm-btn--ghost" style={{padding:"5px 10px",fontSize:12,color:"var(--adm-down)"}} onClick={()=>setList(prev=>prev.filter((x:any)=>x.id!==p.id))}><X size={12}/> رد</button></div></td>
            </tr>))}</tbody></table></div></div>}
    </>)
}
