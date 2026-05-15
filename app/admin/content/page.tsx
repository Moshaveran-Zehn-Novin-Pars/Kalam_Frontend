"use client"
import { useState } from "react"
import { FileText, Plus, Pencil, Trash2, X, Eye } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const POSTS = [
    { id:"c1", title:"راهنمای خرید عمده میوه", status:"published", views:1240, date:"۱۴۰۴/۹/۱" },
    { id:"c2", title:"قوانین و مقررات پلتفرم", status:"published", views:856, date:"۱۴۰۴/۸/۱۵" },
    { id:"c3", title:"چگونه باغدار معتبر را تشخیص دهیم؟", status:"draft", views:0, date:"۱۴۰۴/۹/۱۰" },
]
const FAQS = [
    { id:"f1", question:"حداقل مقدار سفارش چقدر است؟", status:"active" },
    { id:"f2", question:"هزینه ارسال چگونه محاسبه می‌شود؟", status:"active" },
    { id:"f3", question:"چگونه می‌توانم باغدار شوم؟", status:"active" },
]
export default function ContentPage() {
    const [tab, setTab] = useState("blog")
    return (<><h1 className="adm-page-title">مدیریت محتوا</h1>
        <div className="adm-filters" style={{marginBottom:16}}>
            {["blog","faq"].map(t=>(<button key={t} className={`adm-filter-btn ${tab===t?"active":""}`} onClick={()=>setTab(t)}>{t==="blog"?"بلاگ":"سوالات متداول"}</button>))}
            <button className="adm-btn adm-btn--filled" style={{marginInlineStart:"auto"}}><Plus size={14}/> {tab==="blog"?"مطلب جدید":"سوال جدید"}</button></div>
        {tab==="blog" ? (<div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>عنوان</th><th>وضعیت</th><th>بازدید</th><th>تاریخ</th><th>عملیات</th></tr></thead>
            <tbody>{POSTS.map(p=>(<tr key={p.id}>
                <td style={{fontWeight:500}}>{p.title}</td>
                <td><span className={`pill ${p.status==="published"?"pill--shipped":"pill--draft"}`}>{p.status==="published"?"منتشر شده":"پیش‌نویس"}</span></td>
                <td className="tnum">{fa(p.views)}</td><td className="tnum">{fa(p.date)}</td>
                <td><div className="row-acts"><button className="row-act-btn"><Eye size={14}/></button><button className="row-act-btn"><Pencil size={14}/></button><button className="row-act-btn del"><Trash2 size={14}/></button></div></td>
            </tr>))}</tbody></table></div></div>) : (
            <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
                <thead><tr><th>سوال</th><th>وضعیت</th><th>عملیات</th></tr></thead>
                <tbody>{FAQS.map(f=>(<tr key={f.id}><td style={{fontWeight:500}}>{f.question}</td>
                    <td><span className="pill pill--shipped">فعال</span></td>
                    <td><div className="row-acts"><button className="row-act-btn"><Pencil size={14}/></button><button className="row-act-btn del"><Trash2 size={14}/></button></div></td>
                </tr>))}</tbody></table></div></div>)}
    </>)
}