"use client"
import { Search, Warehouse, Thermometer, MapPin } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const WAREHOUSES = [
    { id:"w1", name:"سردخانه مرکزی تهران", location:"تهران، شهرک صنعتی", capacity:50000, available:12000, temp:"۲–۸°C", refrigerated:true, price:1500 },
    { id:"w2", name:"انبار میوه کرج", location:"کرج، محمدشهر", capacity:30000, available:5000, temp:"۴–۱۰°C", refrigerated:true, price:1200 },
    { id:"w3", name:"سردخانه شیراز", location:"شیراز، شهرک صنعتی", capacity:40000, available:25000, temp:"۰–۴°C", refrigerated:true, price:1800 },
    { id:"w4", name:"انبار تبریز", location:"تبریز، ایلخچی", capacity:20000, available:8000, temp:"دمای محیط", refrigerated:false, price:800 },
]
export default function WarehousesPage() {
    return (<><h1 className="adm-page-title">سردخانه‌ها و انبارها</h1>
        <div className="adm-stat-grid" style={{marginBottom:20}}>
            <div className="adm-stat-card"><span className="adm-stat-label">کل ظرفیت</span><span className="adm-stat-value">{faNum(140000)} کیلو</span></div>
            <div className="adm-stat-card"><span className="adm-stat-label">ظرفیت خالی</span><span className="adm-stat-value">{faNum(50000)} کیلو</span></div>
            <div className="adm-stat-card"><span className="adm-stat-label">سردخانه‌ها</span><span className="adm-stat-value">{fa(3)}</span></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {WAREHOUSES.map(w=>(<div key={w.id} className="adm-card" style={{display:"flex",alignItems:"center",gap:16}}>
                <div style={{width:48,height:48,borderRadius:"var(--adm-r-sm)",background:"var(--adm-accent-50)",display:"grid",placeItems:"center",color:"var(--adm-accent)",flexShrink:0}}><Warehouse size={22}/></div>
                <div style={{flex:1,fontSize:13}}>
                    <div style={{fontWeight:600}}>{w.name}</div>
                    <div style={{display:"flex",gap:16,marginTop:4,color:"var(--adm-fg-3)",fontSize:12}}>
                        <span style={{display:"flex",alignItems:"center",gap:4}}><MapPin size={12}/>{w.location}</span>
                        {w.refrigerated && <span style={{display:"flex",alignItems:"center",gap:4}}><Thermometer size={12}/>{w.temp}</span>}
                    </div>
                </div>
                <div style={{textAlign:"left",fontSize:13}}>
                    <div style={{fontWeight:600,color:"var(--adm-accent)"}}>{faNum(w.available)} کیلو</div>
                    <div style={{fontSize:11,color:"var(--adm-fg-3)"}}>خالی از {faNum(w.capacity)}</div>
                </div>
                <div style={{fontSize:13,fontWeight:600,color:"var(--adm-fg)"}}>{faNum(w.price)}<span style={{fontSize:11,fontWeight:400,color:"var(--adm-fg-3)"}}> / کیلو</span></div>
            </div>))}
        </div></>)
}