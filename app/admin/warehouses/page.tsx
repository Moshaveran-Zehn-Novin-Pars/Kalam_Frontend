"use client"
import { useState } from "react"
import { Search, Warehouse, Thermometer, MapPin, TrendingUp } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const ALL = [
    { id:"w1", name:"سردخانه مرکزی تهران", location:"تهران، شهرک صنعتی", capacity:50000, available:12000, temp:"۲–۸°C", refrigerated:true, price:1500 },
    { id:"w2", name:"انبار میوه کرج", location:"کرج، محمدشهر", capacity:30000, available:5000, temp:"۴–۱۰°C", refrigerated:true, price:1200 },
    { id:"w3", name:"سردخانه شیراز", location:"شیراز، شهرک صنعتی", capacity:40000, available:25000, temp:"۰–۴°C", refrigerated:true, price:1800 },
    { id:"w4", name:"انبار تبریز", location:"تبریز، ایلخچی", capacity:20000, available:8000, temp:"دمای محیط", refrigerated:false, price:800 },
]
export default function WarehousesPage() {
    const [q,setQ]=useState(""); const list=ALL.filter(w=>!q||w.name.includes(q))
    const totalCap=ALL.reduce((s,w)=>s+w.capacity,0); const totalAvail=ALL.reduce((s,w)=>s+w.available,0)
    return(<><h1 className="adm-page-title">سردخانه‌ها و انبارها</h1>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Warehouse size={18}/>کل ظرفیت</div><span className="adm-stat__delta up"><TrendingUp size={12}/>{fa(20)}٪</span></div><div className="adm-stat__value">{faNum(totalCap)}<span className="adm-stat__unit">کیلو</span></div><div className="adm-stat__compare">ماه قبل: {faNum(120000)} کیلو</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label">ظرفیت خالی</div></div><div className="adm-stat__value" style={{color:"var(--adm-accent)"}}>{faNum(totalAvail)}<span className="adm-stat__unit">کیلو</span></div><div className="adm-stat__compare">{fa(Math.round(totalAvail/totalCap*100))}٪ از کل</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label">انبارها</div></div><div className="adm-stat__value">{fa(ALL.length)}<span className="adm-stat__unit">مکان</span></div><div className="adm-stat__compare">سردخانه: {fa(ALL.filter(w=>w.refrigerated).length)}</div></div>
        </div>
        <div className="adm-tb-input" style={{marginBottom:16}}><input placeholder="جستجوی انبار..." value={q} onChange={e=>setQ(e.target.value)}/></div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {list.map(w=>(<div key={w.id} className="adm-card" style={{display:"flex",alignItems:"center",gap:16}}>
                <div style={{width:48,height:48,borderRadius:"var(--adm-r-sm)",background:"var(--adm-accent-50)",display:"grid",placeItems:"center",color:"var(--adm-accent)",flexShrink:0}}><Warehouse size={22}/></div>
                <div style={{flex:1,fontSize:13}}>
                    <div style={{fontWeight:600}}>{w.name}</div>
                    <div style={{display:"flex",gap:16,marginTop:4,color:"var(--adm-fg-3)",fontSize:12}}>
                        <span style={{display:"flex",alignItems:"center",gap:4}}><MapPin size={12}/>{w.location}</span>
                        {w.refrigerated&&<span style={{display:"flex",alignItems:"center",gap:4}}><Thermometer size={12}/>{w.temp}</span>}
                    </div>
                </div>
                <div style={{textAlign:"left",fontSize:13}}>
                    <div style={{fontWeight:600,color:"var(--adm-accent)"}}>{faNum(w.available)}<span style={{fontSize:11,fontWeight:400,color:"var(--adm-fg-3)"}}> کیلو</span></div>
                    <div style={{fontSize:11,color:"var(--adm-fg-3)"}}>خالی از {faNum(w.capacity)}</div>
                </div>
                <div style={{fontSize:13,fontWeight:600}}>{faNum(w.price)}<span style={{fontSize:11,fontWeight:400,color:"var(--adm-fg-3)"}}> / کیلو</span></div>
            </div>))}
        </div>
    </>)
}
