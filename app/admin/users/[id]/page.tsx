"use client"
import { useParams, useRouter } from "next/navigation"
import { Phone, Mail, ShoppingBag, Shield } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const USER = { id: "u1", name: "سوگند سلحشور", phone: "09037029121", email: "sogand@example.com", role: "خریدار", status: "فعال", registered: "۱۴۰۱/۴/۲۹", orders: 24, total: 45000000 }

export default function UserDetailPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    return (<>
        <div className="adm-detail-head"><h1 className="adm-page-title" style={{marginBottom:0}}>جزئیات کاربر</h1>
            <button className="adm-btn adm-btn--ghost" style={{fontSize:13,padding:"6px 14px",marginInlineStart:"auto"}} onClick={()=>router.back()}>← بازگشت</button></div>
        <div className="adm-card" style={{marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
                <div style={{width:56,height:56,borderRadius:"50%",background:"var(--adm-accent-50)",display:"grid",placeItems:"center",fontSize:24,fontWeight:700,color:"var(--adm-accent)"}}>{USER.name[0]}</div>
                <div><div style={{fontSize:16,fontWeight:600}}>{USER.name}</div><div style={{fontSize:13,color:"var(--adm-fg-3)"}}>{USER.role} · {fa(USER.registered)}</div></div>
                <span className="pill pill--shipped" style={{marginInlineStart:"auto"}}>{USER.status}</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,fontSize:13}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}><Phone size={14} style={{color:"var(--adm-fg-3)"}} /><span>{fa(USER.phone)}</span></div>
                <div style={{display:"flex",alignItems:"center",gap:8}}><Mail size={14} style={{color:"var(--adm-fg-3)"}} /><span>{USER.email}</span></div>
                <div style={{display:"flex",alignItems:"center",gap:8}}><ShoppingBag size={14} style={{color:"var(--adm-fg-3)"}} /><span>{fa(USER.orders)} سفارش</span></div>
                <div style={{display:"flex",alignItems:"center",gap:8}}><Shield size={14} style={{color:"var(--adm-fg-3)"}} /><span>{faNum(USER.total)} تومان</span></div>
            </div>
        </div>
        <div className="adm-card"><h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:600}}>سفارش‌های اخیر</h3>
            <div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>شماره</th><th>تاریخ</th><th>مبلغ</th><th>وضعیت</th></tr></thead>
                <tbody><tr><td>#۲۳۴۵۹۲۳</td><td>۱۴۰۴/۹/۱۲</td><td className="tnum" style={{fontWeight:600}}>{faNum(1389000)}</td><td><span className="pill pill--shipped">تحویل شده</span></td></tr>
                <tr><td>#۲۳۴۵۹۲۰</td><td>۱۴۰۴/۹/۵</td><td className="tnum" style={{fontWeight:600}}>{faNum(2100000)}</td><td><span className="pill pill--prep">در حال آماده‌سازی</span></td></tr></tbody></table></div></div>
        <div style={{display:"flex",gap:10,marginTop:16}}>
            <button className="adm-btn adm-btn--ghost" style={{color:"var(--adm-fg-3)"}}>مسدود کردن کاربر</button>
            <button className="adm-btn adm-btn--ghost">ارسال پیام</button>
        </div>
    </>)
}