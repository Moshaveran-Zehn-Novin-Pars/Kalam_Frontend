"use client"
import { useState } from "react"
import { Bell, Send } from "lucide-react"

export default function AdminNotificationsPage() {
    const [title, setTitle] = useState(""); const [message, setMessage] = useState(""); const [target, setTarget] = useState("all"); const [sent, setSent] = useState(false)
    if (sent) return (
        <div style={{textAlign:"center",padding:48}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:"var(--adm-shipped-bg)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}><Send size={28} style={{color:"var(--adm-shipped-fg)"}}/></div>
            <h2 style={{fontSize:18,fontWeight:600,marginBottom:8}}>اعلان ارسال شد</h2>
            <p style={{fontSize:13,color:"var(--adm-fg-3)",marginBottom:16}}>اعلان با موفقیت برای کاربران منتخب ارسال شد.</p>
            <button className="adm-btn adm-btn--filled" onClick={()=>{setSent(false);setTitle("");setMessage("")}}>ارسال اعلان جدید</button>
        </div>
    )
    return (<>
        <h1 className="adm-page-title">ارسال اعلان</h1>
        <div className="adm-card" style={{maxWidth:500}}>
            <div style={{marginBottom:16}}>
                <label className="adm-field-label">گیرندگان</label>
                <div style={{display:"flex",gap:8,marginTop:6}}>
                    {["all","buyers","farmers","drivers"].map(t=>(
                        <button key={t} onClick={()=>setTarget(t)} style={{
                            padding:"8px 16px",borderRadius:"var(--adm-r-sm)",fontSize:13,cursor:"pointer",fontFamily:"var(--adm-font)",
                            border:`1px solid ${target===t?"var(--adm-accent)":"var(--adm-border-s)"}`,
                            background:target===t?"var(--adm-accent-50)":"transparent",
                            color:target===t?"var(--adm-accent)":"var(--adm-fg-2)",
                        }}>{t==="all"?"همه کاربران":t==="buyers"?"خریداران":t==="farmers"?"باغداران":"رانندگان"}</button>
                    ))}
                </div>
            </div>
            <div style={{marginBottom:16}}>
                <label className="adm-field-label">عنوان</label>
                <input className="adm-field-input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="عنوان اعلان" style={{marginTop:6}}/>
            </div>
            <div style={{marginBottom:16}}>
                <label className="adm-field-label">متن پیام</label>
                <textarea className="adm-field-textarea" value={message} onChange={e=>setMessage(e.target.value)} rows={4} placeholder="متن اعلان را وارد کنید..." style={{marginTop:6}}/>
            </div>
            <button className="adm-btn adm-btn--filled" onClick={()=>setSent(true)} disabled={!title||!message} style={{opacity:(!title||!message)?0.5:1}}>
                <Send size={14}/> ارسال اعلان
            </button>
        </div>
    </>)
}
