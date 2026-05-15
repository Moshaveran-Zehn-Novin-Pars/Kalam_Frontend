"use client"
import { useState } from "react"
import { Truck, Search, Star, Users, CheckCircle, XCircle, Navigation } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const ALL = Array.from({ length: 6 }, (_, i) => ({
    id:`d${i}`, name:["رضا کریمی","حسین احمدی","سعید موسوی","امیر رضایی","محمد حسینی","حمید رحیمی"][i],
    vehicle: ["وانت نیسان","کامیون ۱۰ تن","وانت آریسان","کامیون ۶ تن","وانت زانتیا","کامیون ۸ تن"][i],
    phone:"0912"+String(4000000+i*111111).slice(0,7), deliveries:[47,82,23,56,38,61][i],
    rating:[4.8,4.5,4.2,4.9,4.3,4.6][i], available:[true,true,false,true,false,true][i], city:["تهران","شیراز","اصفهان","تهران","مشهد","تبریز"][i],
}))

export default function DriversManagementPage() {
    const [q, setQ] = useState(""); const [list, setList] = useState(ALL)
    const filtered = list.filter(d => !q || d.name.includes(q) || d.city.includes(q))
    const toggleAvail = (id:string) => setList(prev => prev.map(d => d.id===id ? {...d, available:!d.available} : d))

    return (<>
        <h1 className="adm-page-title">مدیریت رانندگان</h1>

        <div className="adm-stat-grid" style={{marginBottom:20}}>
            <div className="adm-stat-card"><Users size={18}/><span><span className="adm-stat-label">کل رانندگان</span><span className="adm-stat-value">{fa(ALL.length)}</span></span></div>
            <div className="adm-stat-card"><CheckCircle size={18} style={{color:"var(--adm-accent)"}}/><span><span className="adm-stat-label">فعال</span><span className="adm-stat-value" style={{color:"var(--adm-accent)"}}>{fa(list.filter(d=>d.available).length)}</span></span></div>
            <div className="adm-stat-card"><Navigation size={18}/><span><span className="adm-stat-label">کل تحویل‌ها</span><span className="adm-stat-value">{fa(list.reduce((s,d)=>s+d.deliveries,0))}</span></span></div>
            <div className="adm-stat-card"><Star size={18} style={{color:"#f5a623"}}/><span><span className="adm-stat-label">میانگین امتیاز</span><span className="adm-stat-value">{fa(4.5)}</span></span></div>
        </div>

        <div style={{display:"flex",gap:12,marginBottom:16}}>
            <div style={{position:"relative",flex:1,maxWidth:320}}><Search size={14} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--adm-fg-3)"}}/>
                <input className="adm-input" placeholder="جستجو..." value={q} onChange={e=>setQ(e.target.value)} style={{paddingRight:36}}/></div></div>

        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>راننده</th><th>خودرو</th><th>شهر</th><th>تحویل‌ها</th><th>امتیاز</th><th>وضعیت</th><th>عملیات</th></tr></thead>
            <tbody>{filtered.map(d=>(<tr key={d.id}>
                <td style={{fontWeight:500}}>{d.name}</td><td>{d.vehicle}</td><td>{d.city}</td>
                <td className="tnum">{fa(d.deliveries)}</td>
                <td className="tnum"><span style={{display:"flex",alignItems:"center",gap:4}}><Star size={12} style={{color:"#f5a623"}}/>{fa(d.rating)}</span></td>
                <td>{d.available?<span className="pill pill--shipped">فعال</span>:<span className="pill pill--cancel">غیرفعال</span>}</td>
                <td><button className={`adm-btn ${d.available?"adm-btn--ghost":"adm-btn--filled"}`} style={{padding:"4px 10px",fontSize:12}}
                    onClick={()=>toggleAvail(d.id)}>{d.available?"غیرفعال کردن":"فعال کردن"}</button></td>
            </tr>))}</tbody></table></div></div>
    </>)
}