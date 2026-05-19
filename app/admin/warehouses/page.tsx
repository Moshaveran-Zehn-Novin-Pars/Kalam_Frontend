"use client"
import { useState, useEffect } from "react"
import { Search, Warehouse, Thermometer, MapPin, TrendingUp, Loader2 } from "lucide-react"
import { warehouseService } from "@/services/warehouse"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

export default function WarehousesPage() {
    const [q,setQ]=useState(""); const [list,setList]=useState<any[]>([]); const [loading,setLoading]=useState(true)
    useEffect(()=>{
        warehouseService.findAll()
            .then((data:any)=>setList(Array.isArray(data)?data:[]))
            .catch(()=>{})
            .finally(()=>setLoading(false))
    },[])
    const filtered=list.filter((w:any)=>!q||w.name?.includes(q))
    const totalCap=list.reduce((s:number,w:any)=>s+(w.totalCapacityKg??w.capacity??0),0)
    const totalAvail=list.reduce((s:number,w:any)=>s+(w.availableKg??w.available??0),0)
    if(loading) return <div className="adm-loading"><Loader2 size={24} className="spin"/></div>
    return(<><h1 className="adm-page-title">سردخانه‌ها و انبارها</h1>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Warehouse size={18}/>کل ظرفیت</div><span className="adm-stat__delta up"><TrendingUp size={12}/>{fa(20)}٪</span></div><div className="adm-stat__value">{faNum(totalCap)}<span className="adm-stat__unit">کیلو</span></div><div className="adm-stat__compare">ماه قبل: {faNum(120000)} کیلو</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label">ظرفیت خالی</div></div><div className="adm-stat__value" style={{color:"var(--adm-accent)"}}>{faNum(totalAvail)}<span className="adm-stat__unit">کیلو</span></div><div className="adm-stat__compare">{fa(Math.round(totalAvail/(totalCap||1)*100))}٪ از کل</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label">انبارها</div></div><div className="adm-stat__value">{fa(list.length)}<span className="adm-stat__unit">مکان</span></div><div className="adm-stat__compare">سردخانه: {fa(list.filter((w:any)=>w.hasRefrigeration??w.refrigerated).length)}</div></div>
        </div>
        <div className="adm-tb-input" style={{marginBottom:16}}><input placeholder="جستجوی انبار..." value={q} onChange={e=>setQ(e.target.value)}/></div>
        {filtered.length===0?<div className="adm-empty">هیچ انباری یافت نشد.</div>:
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {filtered.map((w:any)=>(<div key={w.id} className="adm-card" style={{display:"flex",alignItems:"center",gap:16}}>
                <div style={{width:48,height:48,borderRadius:"var(--adm-r-sm)",background:"var(--adm-accent-50)",display:"grid",placeItems:"center",color:"var(--adm-accent)",flexShrink:0}}><Warehouse size={22}/></div>
                <div style={{flex:1,fontSize:13}}>
                    <div style={{fontWeight:600}}>{w.name}</div>
                    <div style={{display:"flex",gap:16,marginTop:4,color:"var(--adm-fg-3)",fontSize:12}}>
                        <span style={{display:"flex",alignItems:"center",gap:4}}><MapPin size={12}/>{w.address||w.location}</span>
                        {(w.hasRefrigeration??w.refrigerated)&&<span style={{display:"flex",alignItems:"center",gap:4}}><Thermometer size={12}/>{(w.tempMin!=null&&w.tempMax!=null)?`${w.tempMin}–${w.tempMax}°C`:w.temp||'—'}</span>}
                    </div>
                </div>
                <div style={{textAlign:"left",fontSize:13}}>
                    <div style={{fontWeight:600,color:"var(--adm-accent)"}}>{faNum(w.availableKg??w.available??0)}<span style={{fontSize:11,fontWeight:400,color:"var(--adm-fg-3)"}}> کیلو</span></div>
                    <div style={{fontSize:11,color:"var(--adm-fg-3)"}}>خالی از {faNum(w.totalCapacityKg??w.capacity??0)}</div>
                </div>
                <div style={{fontSize:13,fontWeight:600}}>{faNum(w.pricePerKgPerDay??w.price??0)}<span style={{fontSize:11,fontWeight:400,color:"var(--adm-fg-3)"}}> / کیلو</span></div>
            </div>))}
        </div>}
    </>)
}
