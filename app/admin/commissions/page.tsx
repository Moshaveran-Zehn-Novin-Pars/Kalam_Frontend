"use client"
import { useState } from "react"
import { Pencil, Plus, X, Save, Percent, DollarSign } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const INIT = [
    { id:"r1", category:"میوه", rate:6, min:0, max:null, active:true },
    { id:"r2", category:"سبزیجات", rate:5, min:0, max:null, active:true },
    { id:"r3", category:"صیفی‌جات", rate:5, min:0, max:null, active:true },
    { id:"r4", category:"خشکبار", rate:8, min:0, max:5000000, active:true },
    { id:"r5", category:"لبنیات", rate:7, min:0, max:null, active:false },
]

export default function CommissionsPage() {
    const [rules, setRules] = useState(INIT)
    const [showDlg, setShowDlg] = useState(false)
    const [editRule, setEditRule] = useState<any>(null)
    const [form, setForm] = useState({ category:"", rate:6, min:0, max:"", active:true })

    const openAdd = () => { setEditRule(null); setForm({ category:"", rate:6, min:0, max:"", active:true }); setShowDlg(true) }
    const openEdit = (r:any) => { setEditRule(r); setForm({ category:r.category, rate:r.rate, min:r.min, max:r.max||"", active:r.active }); setShowDlg(true) }
    const save = () => {
        if (editRule) setRules(prev => prev.map(r => r.id === editRule.id ? { ...r, ...form, max: form.max ? Number(form.max) : null } : r))
        else setRules(prev => [...prev, { id:`r${Date.now()}`, ...form, max: form.max ? Number(form.max) : null }])
        setShowDlg(false)
    }

    return (<>
        <div className="adm-detail-head"><h1 className="adm-page-title" style={{marginBottom:0}}>قوانین کمیسیون</h1>
            <button className="adm-btn adm-btn--filled" onClick={openAdd}><Plus size={14}/> قانون جدید</button></div>

        <div className="adm-stat-grid" style={{marginBottom:20}}>
            <div className="adm-stat-card"><Percent size={18}/><span><span className="adm-stat-label">پیش‌فرض پلتفرم</span><span className="adm-stat-value">{fa(6)}٪</span></span></div>
            <div className="adm-stat-card"><DollarSign size={18}/><span><span className="adm-stat-label">قوانین فعال</span><span className="adm-stat-value">{fa(rules.filter(r=>r.active).length)}</span></span></div>
            <div className="adm-stat-card"><span><span className="adm-stat-label">کل قوانین</span><span className="adm-stat-value">{fa(rules.length)}</span></span></div>
        </div>

        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>دسته‌بندی</th><th>نرخ</th><th>حداقل</th><th>حداکثر</th><th>وضعیت</th><th>عملیات</th></tr></thead>
            <tbody>{rules.map(r=>(<tr key={r.id}>
                <td style={{fontWeight:500}}>{r.category}</td><td className="tnum" style={{fontWeight:600}}>{fa(r.rate)}٪</td>
                <td className="tnum">{faNum(r.min)} تومان</td><td className="tnum">{r.max ? faNum(r.max)+" تومان" : "—"}</td>
                <td><span className={`pill ${r.active?"pill--shipped":"pill--cancel"}`}>{r.active?"فعال":"غیرفعال"}</span></td>
                <td><div className="row-acts"><button className="row-act-btn" onClick={()=>openEdit(r)}><Pencil size={14}/></button></div></td>
            </tr>))}</tbody></table></div></div>

        {showDlg && <div className="adm-dlg-overlay" onClick={()=>setShowDlg(false)}><div className="adm-dlg" onClick={e=>e.stopPropagation()}>
            <button className="adm-dlg-close" onClick={()=>setShowDlg(false)}><X size={14}/></button>
            <p className="adm-dlg-title">{editRule?"ویرایش قانون":"قانون جدید"}</p>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
                <input className="adm-input" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} placeholder="دسته‌بندی"/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <input className="adm-input" type="number" value={form.rate} onChange={e=>setForm(f=>({...f,rate:Number(e.target.value)}))} placeholder="نرخ (%)"/>
                    <input className="adm-input" type="number" value={form.min} onChange={e=>setForm(f=>({...f,min:Number(e.target.value)}))} placeholder="حداقل (تومان)"/>
                </div>
                <input className="adm-input" value={form.max} onChange={e=>setForm(f=>({...f,max:e.target.value}))} placeholder="حداکثر (تومان) - خالی = نامحدود"/>
            </div>
            <div className="adm-dlg-actions"><button className="adm-btn adm-btn--filled" onClick={save}><Save size={14}/> ذخیره</button>
                <button className="adm-btn adm-btn--outline" onClick={()=>setShowDlg(false)}>انصراف</button></div>
        </div></div>}
    </>)
}