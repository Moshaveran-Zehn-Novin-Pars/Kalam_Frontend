"use client"
import { useState } from "react"
import { Truck, Search, Star, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const DRIVERS = Array.from({ length: 6 }, (_, i) => ({
    id:`d${i}`, name:["رضا کریمی","حسین احمدی","سعید موسوی","امیر رضایی","محمد حسینی","حمید رحیمی"][i],
    vehicle: ["وانت نیسان","کامیون ۱۰ تن","وانت آریسان","کامیون ۶ تن","وانت زانتیا","کامیون ۸ تن"][i],
    phone:"0912"+String(4000000+i*111111).slice(0,7), deliveries:[47,82,23,56,38,61][i],
    rating:[4.8,4.5,4.2,4.9,4.3,4.6][i], available:[true,true,false,true,false,true][i],
}))
export default function DriversManagementPage() {
    const [q, setQ] = useState(""); const list = DRIVERS.filter(d => !q || d.name.includes(q))
    return (<><h1 className="adm-page-title">مدیریت رانندگان</h1>
        <div style={{display:"flex",gap:12,marginBottom:16}}><div style={{position:"relative",flex:1,maxWidth:320}}><Search size={14} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--adm-fg-3)"}}/>
            <input className="adm-input" placeholder="جستجو..." value={q} onChange={e=>setQ(e.target.value)} style={{paddingRight:36}}/></div></div>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>راننده</th><th>خودرو</th><th>تماس</th><th>تحویل‌ها</th><th>امتیاز</th><th>وضعیت</th></tr></thead>
            <tbody>{list.map(d=>(<tr key={d.id}>
                <td style={{fontWeight:500,display:"flex",alignItems:"center",gap:8}}><Truck size={14} style={{color:"var(--adm-accent)"}}/>{d.name}</td>
                <td>{d.vehicle}</td><td style={{direction:"ltr",textAlign:"right"}}>{fa(d.phone)}</td>
                <td className="tnum">{fa(d.deliveries)}</td>
                <td className="tnum"><span style={{display:"flex",alignItems:"center",gap:4}}><Star size={12} style={{color:"#f5a623"}}/>{fa(d.rating)}</span></td>
                <td>{d.available?<span className="pill pill--shipped"><CheckCircle size={11}/> فعال</span>:<span className="pill pill--cancel"><XCircle size={11}/> غیرفعال</span>}</td>
            </tr>))}</tbody></table></div></div></>)
}