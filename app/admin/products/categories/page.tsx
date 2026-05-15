"use client"
import { useState } from "react"
import { Plus, Pencil, Trash2, X, Save, FolderTree } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const INIT = [
    { id:"c1", name:"میوه", slug:"mive", count:24, status:"active" },
    { id:"c2", name:"سبزیجات", slug:"sabzijat", count:18, status:"active" },
    { id:"c3", name:"صیفی‌جات", slug:"sayfijat", count:12, status:"active" },
    { id:"c4", name:"خشکبار", slug:"khojaste", count:8, status:"inactive" },
    { id:"c5", name:"لبنیات", slug:"labaniyat", count:5, status:"active" },
    { id:"c6", name:"نان", slug:"nan", count:3, status:"inactive" },
]

export default function CategoriesPage() {
    const [cats, setCats] = useState(INIT)
    const [showDialog, setShowDialog] = useState(false)
    const [editCat, setEditCat] = useState<any>(null)
    const [form, setForm] = useState({ name: "", slug: "", status: "active" })
    const [delId, setDelId] = useState<string|null>(null)

    const openAdd = () => { setEditCat(null); setForm({ name:"", slug:"", status:"active" }); setShowDialog(true) }
    const openEdit = (c: any) => { setEditCat(c); setForm({ name:c.name, slug:c.slug, status:c.status }); setShowDialog(true) }
    const save = () => {
        if (editCat) setCats(prev => prev.map(c => c.id === editCat.id ? { ...c, ...form } : c))
        else setCats(prev => [...prev, { ...form, id:`c${Date.now()}`, count:0 }])
        setShowDialog(false)
    }
    const totalActive = cats.filter(c => c.status === "active").length

    return (<>
        <div className="adm-detail-head"><h1 className="adm-page-title" style={{marginBottom:0}}>دسته‌بندی‌ها</h1>
            <button className="adm-btn adm-btn--filled" onClick={openAdd}><Plus size={14}/> دسته جدید</button></div>

        <div className="adm-stat-grid" style={{marginBottom:20}}>
            <div className="adm-stat-card"><FolderTree size={18}/><span><span className="adm-stat-label">کل دسته‌ها</span><span className="adm-stat-value">{fa(cats.length)}</span></span></div>
            <div className="adm-stat-card"><span><span className="adm-stat-label">فعال</span><span className="adm-stat-value" style={{color:"var(--adm-accent)"}}>{fa(totalActive)}</span></span></div>
            <div className="adm-stat-card"><span><span className="adm-stat-label">کل محصولات</span><span className="adm-stat-value">{fa(cats.reduce((s,c)=>s+c.count,0))}</span></span></div>
        </div>

        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>نام</th><th>اسلاگ</th><th>تعداد محصول</th><th>وضعیت</th><th>عملیات</th></tr></thead>
            <tbody>{cats.map(c=>(<tr key={c.id}>
                <td style={{fontWeight:500}}>{c.name}</td><td style={{fontFamily:"monospace",fontSize:12}}>{c.slug}</td>
                <td className="tnum">{fa(c.count)}</td>
                <td><span className={`pill ${c.status==="active"?"pill--shipped":"pill--cancel"}`}>{c.status==="active"?"فعال":"غیرفعال"}</span></td>
                <td><div className="row-acts">
                    <button className="row-act-btn" onClick={()=>openEdit(c)}><Pencil size={14}/></button>
                    <button className="row-act-btn del" onClick={()=>setDelId(c.id)}><Trash2 size={14}/></button>
                </div></td>
            </tr>))}</tbody></table></div></div>

        {showDialog && <div className="adm-dlg-overlay" onClick={()=>setShowDialog(false)}><div className="adm-dlg" onClick={e=>e.stopPropagation()}>
            <button className="adm-dlg-close" onClick={()=>setShowDialog(false)}><X size={14}/></button>
            <p className="adm-dlg-title">{editCat?"ویرایش دسته‌بندی":"دسته‌بندی جدید"}</p>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
                <input className="adm-field-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="نام دسته‌بندی"/>
                <input className="adm-field-input" value={form.slug} onChange={e=>setForm(f=>({...f,slug:e.target.value}))} placeholder="اسلاگ (mive)"/>
                <select className="adm-field-input" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))} style={{appearance:"none",cursor:"pointer"}}>
                    <option value="active">فعال</option><option value="inactive">غیرفعال</option>
                </select>
            </div>
            <div className="adm-dlg-actions"><button className="adm-btn adm-btn--filled" onClick={save}><Save size={14}/> ذخیره</button>
                <button className="adm-btn adm-btn--outline" onClick={()=>setShowDialog(false)}>انصراف</button></div>
        </div></div>}

        {delId && <div className="adm-dlg-overlay" onClick={()=>setDelId(null)}><div className="adm-dlg" onClick={e=>e.stopPropagation()}>
            <p className="adm-dlg-title">آیا می‌خواهید این دسته‌بندی را حذف کنید؟</p>
            <div className="adm-dlg-actions">
                <button className="adm-btn adm-btn--filled" onClick={()=>{setCats(prev=>prev.filter(c=>c.id!==delId));setDelId(null)}}>حذف</button>
                <button className="adm-btn adm-btn--outline" onClick={()=>setDelId(null)}>انصراف</button></div>
        </div></div>}
    </>)
}
