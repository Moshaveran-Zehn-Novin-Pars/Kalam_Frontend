"use client"
import { useState, useEffect } from "react"
import { Pencil, Plus, X, Save, Percent, DollarSign, Loader2 } from "lucide-react"
import { commissionService } from "@/services/commission"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

export default function CommissionsPage() {
    const [rules,setRules]=useState<any[]>([]); const [loading,setLoading]=useState(true)
    const [showDlg,setShowDlg]=useState(false); const [editRule,setEditRule]=useState<any>(null)
    const [form,setForm]=useState({category:"",rate:6,min:0,max:"",active:true})
    useEffect(()=>{
        commissionService.findAll()
            .then((data:any)=>setRules(Array.isArray(data)?data:[]))
            .catch(()=>{})
            .finally(()=>setLoading(false))
    },[])
    const openAdd=()=>{setEditRule(null);setForm({category:"",rate:6,min:0,max:"",active:true});setShowDlg(true)}
    const openEdit=(r:any)=>{setEditRule(r);setForm({category:r.category,rate:r.rate,min:r.min,max:r.max||"",active:r.active});setShowDlg(true)}
    const save=()=>{if(editRule)setRules(prev=>prev.map(r=>r.id===editRule.id?{...r,...form,max:form.max?Number(form.max):null}:r));else setRules(prev=>[...prev,{id:`r${Date.now()}`,...form,max:form.max?Number(form.max):null}]);setShowDlg(false)}
    if(loading) return <div className="adm-loading"><Loader2 size={24} className="spin"/></div>
    return (<>
        <div className="adm-detail-head"><h1 className="adm-page-title" style={{marginBottom:0}}>قوانین کمیسیون</h1>
            <button className="adm-btn adm-btn--filled" onClick={openAdd}><Plus size={14}/> قانون جدید</button></div>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Percent size={18}/>پیش‌فرض پلتفرم</div></div><div className="adm-stat__value">{fa(6)}<span className="adm-stat__unit">٪</span></div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label">قوانین فعال</div></div><div className="adm-stat__value" style={{color:"var(--adm-accent)"}}>{fa(rules.filter(r=>r.active).length)}</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><DollarSign size={18}/>کل قوانین</div></div><div className="adm-stat__value">{fa(rules.length)}</div></div>
        </div>
        {rules.length===0?<div className="adm-empty">هیچ قانون کمیسیونی یافت نشد.</div>:
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>دسته‌بندی</th><th>نرخ</th><th>حداقل</th><th>حداکثر</th><th>وضعیت</th><th>عملیات</th></tr></thead>
            <tbody>{rules.map(r=>(<tr key={r.id}><td style={{fontWeight:500}}>{r.category}</td><td className="tnum" style={{fontWeight:600}}>{fa(r.rate)}٪</td><td className="tnum">{faNum(r.min)}</td><td className="tnum">{r.max?faNum(r.max):"—"}</td>
                <td><span className={`pill ${r.active?"pill--shipped":"pill--cancel"}`}>{r.active?"فعال":"غیرفعال"}</span></td>
                <td><div className="row-acts"><button className="row-act-btn" onClick={()=>openEdit(r)}><Pencil size={14}/></button></div></td>
            </tr>))}</tbody></table></div></div>}
        {showDlg&&<div className="adm-dlg-overlay" onClick={()=>setShowDlg(false)}><div className="adm-dlg" onClick={e=>e.stopPropagation()}>
            <button className="adm-dlg-close" onClick={()=>setShowDlg(false)}><X size={14}/></button>
            <p className="adm-dlg-title">{editRule?"ویرایش قانون":"قانون جدید"}</p>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
                <input className="adm-field-input" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} placeholder="دسته‌بندی"/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <input className="adm-field-input" type="number" value={form.rate} onChange={e=>setForm(f=>({...f,rate:Number(e.target.value)}))} placeholder="نرخ (%)"/>
                    <input className="adm-field-input" type="number" value={form.min} onChange={e=>setForm(f=>({...f,min:Number(e.target.value)}))} placeholder="حداقل (تومان)"/></div>
                <input className="adm-field-input" value={form.max} onChange={e=>setForm(f=>({...f,max:e.target.value}))} placeholder="حداکثر (تومان) - خالی = نامحدود"/></div>
            <div className="adm-dlg-actions"><button className="adm-btn adm-btn--filled" onClick={save}><Save size={14}/> ذخیره</button><button className="adm-btn adm-btn--outline" onClick={()=>setShowDlg(false)}>انصراف</button></div>
        </div></div>}
    </>)
}
