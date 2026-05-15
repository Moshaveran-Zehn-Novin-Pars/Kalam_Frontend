"use client"
import { useState } from "react"
import { Plus, Pencil, Trash2, X } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const INIT_CATS = [
    { id:"c1", name:"میوه", slug:"mive", count:24, status:"active" },
    { id:"c2", name:"سبزیجات", slug:"sabzijat", count:18, status:"active" },
    { id:"c3", name:"صیفی‌جات", slug:"sayfijat", count:12, status:"active" },
    { id:"c4", name:"خشکبار", slug:"khojaste", count:8, status:"inactive" },
]
export default function CategoriesPage() {
    const [cats, setCats] = useState(INIT_CATS); const [showAdd, setShowAdd] = useState(false); const [newName, setNewName] = useState("")
    return (<><div className="adm-detail-head"><h1 className="adm-page-title" style={{marginBottom:0}}>دسته‌بندی‌ها</h1>
        <button className="adm-btn adm-btn--filled" onClick={()=>setShowAdd(true)}><Plus size={14}/> دسته جدید</button></div>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>نام</th><th>اسلاگ</th><th>تعداد محصول</th><th>وضعیت</th><th>عملیات</th></tr></thead>
            <tbody>{cats.map(c=>(<tr key={c.id}>
                <td style={{fontWeight:500}}>{c.name}</td><td style={{fontFamily:"monospace",fontSize:12}}>{c.slug}</td>
                <td className="tnum">{fa(c.count)}</td>
                <td><span className={`pill ${c.status==="active"?"pill--shipped":"pill--cancel"}`}>{c.status==="active"?"فعال":"غیرفعال"}</span></td>
                <td><div className="row-acts"><button className="row-act-btn"><Pencil size={14}/></button><button className="row-act-btn del"><Trash2 size={14}/></button></div></td>
            </tr>))}</tbody></table></div></div>
        {showAdd && <div className="adm-dlg-overlay" onClick={()=>setShowAdd(false)}><div className="adm-dlg" onClick={e=>e.stopPropagation()}>
            <button className="adm-dlg-close" onClick={()=>setShowAdd(false)}><X size={14}/></button>
            <p className="adm-dlg-title">دسته‌بندی جدید</p>
            <input className="adm-input" value={newName} onChange={e=>setNewName(e.target.value)} placeholder="نام دسته‌بندی" style={{marginBottom:16}}/>
            <div className="adm-dlg-actions"><button className="adm-btn adm-btn--filled">ذخیره</button><button className="adm-btn adm-btn--outline" onClick={()=>setShowAdd(false)}>انصراف</button></div>
        </div></div>}</>)
}