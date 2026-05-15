"use client"
import { Search, Truck } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const VEHICLES = [
    { id:"v1", type:"وانت نیسان", plate:"۱۲۳۴۵۶۷۸", capacity:"۱ تن", refrigerated:false, count:3, available:2 },
    { id:"v2", type:"کامیون ۱۰ تن", plate:"۸۷۶۵۴۳۲۱", capacity:"۱۰ تن", refrigerated:true, count:2, available:1 },
    { id:"v3", type:"وانت آریسان", plate:"۲۳۴۵۶۷۸۹", capacity:"۱.۵ تن", refrigerated:false, count:5, available:3 },
    { id:"v4", type:"کامیون ۶ تن", plate:"۹۸۷۶۵۴۳۲", capacity:"۶ تن", refrigerated:true, count:2, available:0 },
]
export default function VehiclesPage() {
    return (<><h1 className="adm-page-title">خودروها</h1>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>نوع خودرو</th><th>پلاک</th><th>ظرفیت</th><th>سردخانه</th><th>تعداد</th><th>موجود</th></tr></thead>
            <tbody>{VEHICLES.map(v=>(<tr key={v.id}>
                <td style={{fontWeight:500,display:"flex",alignItems:"center",gap:8}}><Truck size={14} style={{color:"var(--adm-accent)"}}/>{v.type}</td>
                <td style={{fontFamily:"monospace",fontSize:12,direction:"ltr",textAlign:"right"}}>{fa(v.plate)}</td>
                <td>{v.capacity}</td><td>{v.refrigerated?"✅":"—"}</td><td className="tnum">{fa(v.count)}</td>
                <td className="tnum" style={{fontWeight:600,color:v.available>0?"var(--adm-accent)":"var(--adm-down)"}}>{fa(v.available)}</td>
            </tr>))}</tbody></table></div></div></>)
}
