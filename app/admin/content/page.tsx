"use client"
import { useState, useEffect } from "react"
import { FileText, Plus, Pencil, Trash2, X, Save, Eye, FileCheck, HelpCircle, TrendingUp, Loader2 } from "lucide-react"
import { adminService } from "@/services/admin"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

export default function ContentPage() {
    const [tab,setTab]=useState("blog"); const [posts,setPosts]=useState<any[]>([]); const [faqs,setFaqs]=useState<any[]>([])
    const [loading,setLoading]=useState(true)
    const [showDlg,setShowDlg]=useState(false); const [editItem,setEditItem]=useState<any>(null); const [delId,setDelId]=useState<string|null>(null)
    const [form,setForm]=useState({title:"",question:"",answer:"",status:"draft"})
    useEffect(()=>{Promise.all([adminService.getContentPosts(),adminService.getContentFaqs()]).then(([p,f])=>{setPosts(p||[]);setFaqs(f||[])}).catch(()=>{}).finally(()=>setLoading(false))},[])
    const openAdd=()=>{setEditItem(null);setForm({title:"",question:"",answer:"",status:"draft"});setShowDlg(true)}
    const openEdit=(item:any)=>{setEditItem(item);setForm({title:item.title||"",question:item.question||"",answer:item.answer||"",status:item.status});setShowDlg(true)}
    const totalViews=posts.reduce((s,p)=>s+(p.views||0),0)
    return(<><h1 className="adm-page-title">مدیریت محتوا</h1>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><FileCheck size={18}/>مطالب بلاگ</div><span className="adm-stat__delta up"><TrendingUp size={12}/>{fa(50)}٪</span></div><div className="adm-stat__value">{fa(posts.length)}</div><div className="adm-stat__compare">ماه قبل: {fa(2)} مطلب</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><HelpCircle size={18}/>سوالات متداول</div></div><div className="adm-stat__value">{fa(faqs.length)}</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Eye size={18}/>بازدید کل</div></div><div className="adm-stat__value">{fa(totalViews)}</div><div className="adm-stat__compare">{posts.length > 0 ? `میانگین: ${fa(Math.round(totalViews/posts.length))} بازدید` : '—'}</div></div>
        </div>
        <div className="adm-filters" style={{marginBottom:16}}>
            {["blog","faq"].map(t=>(<button key={t} className={`adm-filter-btn ${tab===t?"active":""}`} onClick={()=>setTab(t)}>{t==="blog"?"بلاگ":"سوالات متداول"}</button>))}
            <button className="adm-btn adm-btn--filled" style={{marginInlineStart:"auto"}} onClick={openAdd}><Plus size={14}/> {tab==="blog"?"مطلب جدید":"سوال جدید"}</button></div>
        {loading ? <div style={{textAlign:"center",padding:48}}><Loader2 size={20} className="animate-spin inline-block"/></div> : tab==="blog"?(<div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>عنوان</th><th>وضعیت</th><th>بازدید</th><th>تاریخ</th><th>عملیات</th></tr></thead>
            <tbody>{posts.length === 0 ? <tr><td colSpan={5} style={{textAlign:"center",padding:48,color:"var(--adm-fg-3)"}}>مطلبی وجود ندارد</td></tr> : posts.map((p:any)=>(<tr key={p.id}><td style={{fontWeight:500}}>{p.title}</td><td><span className={`pill ${p.status==="published"?"pill--shipped":"pill--draft"}`}>{p.status==="published"?"منتشر شده":"پیش‌نویس"}</span></td><td className="tnum">{fa(p.views||0)}</td><td className="tnum">{p.createdAt ? fa(new Date(p.createdAt).toLocaleDateString("fa-IR")) : "—"}</td>
                <td><div className="row-acts"><button className="row-act-btn" onClick={()=>openEdit(p)}><Pencil size={14}/></button><button className="row-act-btn del" onClick={()=>setDelId(p.id)}><Trash2 size={14}/></button></div></td></tr>))}</tbody></table></div></div>):(
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>سوال</th><th>وضعیت</th><th>عملیات</th></tr></thead>
            <tbody>{faqs.length === 0 ? <tr><td colSpan={3} style={{textAlign:"center",padding:48,color:"var(--adm-fg-3)"}}>سوالی وجود ندارد</td></tr> : faqs.map((f:any)=>(<tr key={f.id}><td style={{fontWeight:500}}>{f.question}</td><td><span className="pill pill--shipped">فعال</span></td>
                <td><div className="row-acts"><button className="row-act-btn" onClick={()=>openEdit(f)}><Pencil size={14}/></button><button className="row-act-btn del" onClick={()=>setDelId(f.id)}><Trash2 size={14}/></button></div></td></tr>))}</tbody></table></div></div>)}
        {showDlg&&<div className="adm-dlg-overlay" onClick={()=>setShowDlg(false)}><div className="adm-dlg" onClick={e=>e.stopPropagation()} style={{minWidth:480}}>
            <button className="adm-dlg-close" onClick={()=>setShowDlg(false)}><X size={14}/></button>
            <p className="adm-dlg-title">{editItem?(tab==="blog"?"ویرایش مطلب":"ویرایش سوال"):(tab==="blog"?"مطلب جدید":"سوال جدید")}</p>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
                <input className="adm-field-input" value={tab==="blog"?form.title:form.question} onChange={e=>setForm(f=>({...f,[tab==="blog"?"title":"question"]:e.target.value}))} placeholder={tab==="blog"?"عنوان مطلب":"سوال"}/>
                {tab==="faq"&&<textarea className="adm-field-textarea" value={form.answer} onChange={e=>setForm(f=>({...f,answer:e.target.value}))} placeholder="پاسخ" rows={3}/>}
                {tab==="blog"&&<select className="adm-field-input" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))} style={{appearance:"none",cursor:"pointer"}}><option value="published">منتشر شده</option><option value="draft">پیش‌نویس</option></select>}
            </div>
            <div className="adm-dlg-actions"><button className="adm-btn adm-btn--filled" onClick={save}><Save size={14}/> ذخیره</button><button className="adm-btn adm-btn--outline" onClick={()=>setShowDlg(false)}>انصراف</button></div>
        </div></div>}
        {delId&&<div className="adm-dlg-overlay" onClick={()=>setDelId(null)}><div className="adm-dlg" onClick={e=>e.stopPropagation()}><p className="adm-dlg-title">آیا می‌خواهید این آیتم را حذف کنید؟</p>
            <div className="adm-dlg-actions"><button className="adm-btn adm-btn--filled" onClick={remove}>حذف</button><button className="adm-btn adm-btn--outline" onClick={()=>setDelId(null)}>انصراف</button></div></div></div>}
    </>)
    function save(){
        if(tab==="blog"){if(editItem)setPosts(prev=>prev.map((p:any)=>p.id===editItem.id?{...p,title:form.title,status:form.status}:p));else setPosts(prev=>[...prev,{id:`c${Date.now()}`,title:form.title,status:form.status,views:0}])}
        else{if(editItem)setFaqs(prev=>prev.map((f:any)=>f.id===editItem.id?{...f,question:form.question,answer:form.answer}:f));else setFaqs(prev=>[...prev,{id:`f${Date.now()}`,question:form.question,answer:form.answer,status:"active"}])}
        setShowDlg(false)}
    function remove(){tab==="blog"?setPosts(prev=>prev.filter((p:any)=>p.id!==delId)):setFaqs(prev=>prev.filter((f:any)=>f.id!==delId));setDelId(null)}
}
