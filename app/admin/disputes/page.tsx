"use client"
import { useState } from "react"
import { AlertTriangle, MessageSquare, Check, X, Search, Clock, CheckCircle, XCircle } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const ALL = [
    { id:"dp1", order:"ORD-2040", buyer:"سوپرمارکت رضایی", farmer:"علی محمدی", reason:"کیفیت مطابق انتظار نبود", date:"۱۴۰۴/۹/۱۴", status:"open" },
    { id:"dp2", order:"ORD-2038", buyer:"رستوران آرارات", farmer:"نرگس احمدی", reason:"محصول آسیب دیده بود", date:"۱۴۰۴/۹/۱۰", status:"review" },
    { id:"dp3", order:"ORD-2035", buyer:"هایپرمی", farmer:"مهدی رضایی", reason:"تأخیر در تحویل", date:"۱۴۰۴/۹/۵", status:"resolved" },
    { id:"dp4", order:"ORD-2032", buyer:"کافه گلدن", farmer:"حسن کریمی", reason:"مقدار کمتر از سفارش", date:"۱۴۰۴/۸/۲۸", status:"open" },
]

export default function DisputesPage() {
    const [filter, setFilter] = useState("all"); const [detail, setDetail] = useState<any>(null); const [q, setQ] = useState("")
    const filtered = ALL.filter(d => (filter==="all"||d.status===filter) && (!q||d.buyer.includes(q)||d.farmer.includes(q)))
    if (detail) return <DisputeDetail dispute={detail} onBack={()=>setDetail(null)} />

    return (<>
        <h1 className="adm-page-title">اعتراضات</h1>

        <div className="adm-stat-grid" style={{marginBottom:20}}>
            <div className="adm-stat-card"><AlertTriangle size={18} style={{color:"var(--adm-down)"}}/><span><span className="adm-stat-label">کل اعتراضات</span><span className="adm-stat-value">{fa(ALL.length)}</span></span></div>
            <div className="adm-stat-card"><Clock size={18} style={{color:"var(--adm-pending-fg)"}}/><span><span className="adm-stat-label">باز</span><span className="adm-stat-value" style={{color:"var(--adm-pending-fg)"}}>{fa(ALL.filter(d=>d.status==="open").length)}</span></span></div>
            <div className="adm-stat-card"><CheckCircle size={18} style={{color:"var(--adm-accent)"}}/><span><span className="adm-stat-label">حل شده</span><span className="adm-stat-value" style={{color:"var(--adm-accent)"}}>{fa(ALL.filter(d=>d.status==="resolved").length)}</span></span></div>
        </div>

        <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
            <div style={{position:"relative",flex:1,maxWidth:320}}><Search size={14} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--adm-fg-3)"}}/>
                <input className="adm-input" placeholder="جستجو..." value={q} onChange={e=>setQ(e.target.value)} style={{paddingRight:36}}/></div>
            <div className="adm-filters">{["all","open","review","resolved"].map(f=>(<button key={f}
                className={`adm-filter-btn ${filter===f?"active":""}`} onClick={()=>setFilter(f)}>
                {f==="all"?"همه":f==="open"?"باز":f==="review"?"در بررسی":"حل شده"}</button>))}</div></div>

        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>سفارش</th><th>خریدار</th><th>باغدار</th><th>دلیل</th><th>تاریخ</th><th>وضعیت</th></tr></thead>
            <tbody>{filtered.map(d=>(<tr key={d.id} className="clickable" onClick={()=>setDetail(d)}>
                <td style={{fontWeight:500}}>{d.order}</td><td>{d.buyer}</td><td>{d.farmer}</td>
                <td style={{fontSize:12,color:"var(--adm-fg-3)",maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.reason}</td>
                <td className="tnum">{fa(d.date)}</td>
                <td>{d.status==="open"?<span className="pill pill--pending">باز</span>:d.status==="review"?<span className="pill pill--prep">در بررسی</span>:<span className="pill pill--shipped">حل شده</span>}</td>
            </tr>))}</tbody></table></div></div>
    </>)
}

function DisputeDetail({dispute,onBack}:{dispute:any;onBack:()=>void}) {
    const [messages, setMessages] = useState([
        { side:"buyer", text:"محصولاتی که تحویل گرفتم کیفیت مطلوب را نداشت. لطفاً بررسی کنید.", time:"۱۴۰۴/۹/۱۴ ۱۰:۳۰" },
        { side:"farmer", text:"محصولات در زمان بارگیری کاملاً سالم بودند. احتمالاً در حمل و نقل آسیب دیده‌اند.", time:"۱۴۰۴/۹/۱۴ ۱۲:۱۵" },
    ])
    const [newMsg, setNewMsg] = useState("")

    return (<>
        <div className="adm-detail-head"><h1 className="adm-page-title" style={{marginBottom:0}}>جزئیات اعتراض</h1>
            <button className="adm-btn adm-btn--ghost" style={{fontSize:13,padding:"6px 14px",marginInlineStart:"auto"}} onClick={onBack}>← بازگشت</button></div>

        <div className="adm-stat-grid" style={{marginBottom:20}}>
            <div className="adm-stat-card"><span><span className="adm-stat-label">خریدار</span><span className="adm-stat-value" style={{fontSize:14}}>{dispute.buyer}</span></span></div>
            <div className="adm-stat-card"><span><span className="adm-stat-label">باغدار</span><span className="adm-stat-value" style={{fontSize:14}}>{dispute.farmer}</span></span></div>
            <div className="adm-stat-card"><span><span className="adm-stat-label">سفارش</span><span className="adm-stat-value" style={{fontSize:14}}>{dispute.order}</span></span></div>
        </div>

        <div className="adm-card" style={{marginBottom:16}}>
            <h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:600}}>دلیل اعتراض</h3>
            <p style={{fontSize:13,color:"var(--adm-fg-2)",margin:0}}>{dispute.reason}</p>
        </div>

        <div className="adm-card" style={{marginBottom:16}}>
            <h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:600}}>پیام‌ها ({fa(messages.length)})</h3>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:12}}>
                {messages.map((m,i)=>(<div key={i} style={{
                    padding:"10px 14px", borderRadius:"var(--adm-r-sm)", fontSize:13,
                    background: m.side==="buyer" ? "var(--adm-bg-soft)" : "var(--adm-accent-50)",
                    borderInlineStart: `3px solid ${m.side==="buyer" ? "var(--adm-fg-4)" : "var(--adm-accent)"}`,
                }}>
                    <div style={{fontWeight:500,color:m.side==="buyer"?"var(--adm-fg)":"var(--adm-accent)",marginBottom:4}}>
                        {m.side==="buyer"?dispute.buyer:dispute.farmer}
                    </div>
                    <p style={{margin:"0 0 4px",color:"var(--adm-fg-2)"}}>{m.text}</p>
                    <div style={{fontSize:11,color:"var(--adm-fg-3)"}}>{fa(m.time)}</div>
                </div>))}
            </div>
            <div style={{display:"flex",gap:8}}>
                <input className="adm-input" value={newMsg} onChange={e=>setNewMsg(e.target.value)} placeholder="پیام خود را بنویسید..." style={{flex:1}}/>
                <button className="adm-btn adm-btn--filled" onClick={()=>{if(newMsg.trim()){setMessages(prev=>[...prev,{side:"admin",text:newMsg,time:"۱۴۰۴/۹/۱۵ ۰۸:۰۰"}]);setNewMsg("")}}}><MessageSquare size={14}/> ارسال</button>
            </div>
        </div>

        <div style={{display:"flex",gap:10}}>
            <button className="adm-btn adm-btn--filled"><Check size={14}/> تأیید و حل شده</button>
            <button className="adm-btn adm-btn--ghost" style={{color:"var(--adm-down)"}}><X size={14}/> رد اعتراض</button>
        </div>
    </>)
}