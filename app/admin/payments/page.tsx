"use client"
import { useState } from "react"
import { Search, CreditCard } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const PAYMENTS = Array.from({ length: 10 }, (_, i) => ({
    id: `pay${i}`, user: ["علی محمدی","سوپرمارکت رضایی","نرگس احمدی","رستوران آرارات","مهدی رضایی","هایپرمی","حسن کریمی","کافه گلدن","زهرا حسینی","میوه فروشی محسن"][i],
    amount: [50000000, 1389000, 25000000, 4500000, 12000000, 7600000, 32000000, 960000, 18500000, 2800000][i],
    method: ["کارت به کارت","درگاه","کیف پول","درگاه","کارت به کارت","کیف پول","درگاه","کارت به کارت","کیف پول","درگاه"][i],
    date: "۱۴۰۴/۹/" + String(12 - i).padStart(2, "0"), status: ["success","success","success","success","failed","success","success","success","pending","success"][i],
}))

export default function PaymentsPage() {
    const [q, setQ] = useState(""); const [filter, setFilter] = useState("all")
    const list = PAYMENTS.filter(p => (filter==="all"||p.status===filter) && (!q||p.user.includes(q)))
    return (<><h1 className="adm-page-title">تراکنش‌ها</h1>
        <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
            <div style={{position:"relative",flex:1,maxWidth:320}}><Search size={14} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--adm-fg-3)"}}/>
                <input className="adm-input" placeholder="جستجو..." value={q} onChange={e=>setQ(e.target.value)} style={{paddingRight:36}}/></div>
            <div className="adm-filters">{["all","success","pending","failed"].map(f=>(<button key={f} className={`adm-filter-btn ${filter===f?"active":""}`} onClick={()=>setFilter(f)}>{f==="all"?"همه":f==="success"?"موفق":f==="pending"?"در انتظار":"ناموفق"}</button>))}</div></div>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>کاربر</th><th>مبلغ</th><th>روش</th><th>تاریخ</th><th>وضعیت</th></tr></thead>
            <tbody>{list.map(p=>(<tr key={p.id}>
                <td style={{fontWeight:500}}>{p.user}</td><td className="tnum" style={{fontWeight:600}}>{faNum(p.amount)}</td>
                <td>{p.method}</td><td className="tnum">{fa(p.date)}</td>
                <td>{p.status==="success"?<span className="pill pill--shipped">موفق</span>:p.status==="pending"?<span className="pill pill--pending">در انتظار</span>:<span className="pill pill--cancel">ناموفق</span>}</td>
            </tr>))}</tbody></table></div></div></>)
}