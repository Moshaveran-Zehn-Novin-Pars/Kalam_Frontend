"use client"
import { useState } from "react"
import { Search, Wallet, CheckCircle } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const SETTLEMENTS = Array.from({ length: 8 }, (_, i) => ({
    id: `s${i}`, farmer: ["علی محمدی","نرگس احمدی","مهدی رضایی","زهرا حسینی","حسن کریمی","فرید موسوی","مریم شریفی","رضا کریمی"][i],
    period: ["مهر","آبان","آذر","دی","مهر","آبان","آذر","دی"][i], gross: [50000000,38000000,62000000,71000000,45000000,52000000,38000000,29000000][i],
    commission: [3000000,2280000,3720000,4260000,2700000,3120000,2280000,1740000][i], net: [47000000,35720000,58280000,66740000,42300000,48880000,35720000,27260000][i],
    status: i < 6 ? "paid" : "pending",
}))
export default function SettlementsPage() {
    const [filter, setFilter] = useState("all"); const [q, setQ] = useState("")
    const list = SETTLEMENTS.filter(s => (filter==="all"||s.status===filter) && (!q||s.farmer.includes(q)))
    const totalNet = list.reduce((s,i)=>s+i.net, 0)
    return (<><h1 className="adm-page-title">تسویه‌حساب‌ها</h1>
        <div className="adm-stat-grid" style={{marginBottom:20}}>
            <div className="adm-stat-card"><span className="adm-stat-label">تسویه‌های انجام شده</span><span className="adm-stat-value">{fa(SETTLEMENTS.filter(s=>s.status==="paid").length)}</span></div>
            <div className="adm-stat-card"><span className="adm-stat-label">در انتظار پرداخت</span><span className="adm-stat-value">{fa(SETTLEMENTS.filter(s=>s.status==="pending").length)}</span></div>
            <div className="adm-stat-card"><span className="adm-stat-label">کل تسویه‌ها</span><span className="adm-stat-value">{faNum(totalNet)} تومان</span></div>
        </div>
        <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
            <div style={{position:"relative",flex:1,maxWidth:320}}><Search size={14} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--adm-fg-3)"}}/>
                <input className="adm-input" placeholder="جستجو..." value={q} onChange={e=>setQ(e.target.value)} style={{paddingRight:36}}/></div>
            <div className="adm-filters">{["all","paid","pending"].map(f=>(<button key={f} className={`adm-filter-btn ${filter===f?"active":""}`} onClick={()=>setFilter(f)}>{f==="all"?"همه":f==="paid"?"پرداخت شده":"در انتظار"}</button>))}</div></div>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>باغدار</th><th>دوره</th><th>فروش ناخالص</th><th>کمیسیون</th><th>خالص پرداختی</th><th>وضعیت</th></tr></thead>
            <tbody>{list.map(s=>(<tr key={s.id}><td style={{fontWeight:500}}>{s.farmer}</td><td>{s.period}</td>
                <td className="tnum">{faNum(s.gross)}</td><td className="tnum" style={{color:"var(--adm-fg-3)"}}>{faNum(s.commission)}</td>
                <td className="tnum" style={{fontWeight:600,color:"var(--adm-accent)"}}>{faNum(s.net)}</td>
                <td>{s.status==="paid"?<span className="pill pill--shipped"><CheckCircle size={11}/> پرداخت شده</span>:<span className="pill pill--pending">در انتظار</span>}</td>
            </tr>))}</tbody></table></div></div></>)
}