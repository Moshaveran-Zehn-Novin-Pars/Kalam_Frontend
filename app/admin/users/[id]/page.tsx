"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Phone, Mail, ShoppingBag, Shield, Loader2 } from "lucide-react"
import { usersService } from "@/services/users"
import type { User } from "@/types"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

export default function UserDetailPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        usersService.findById(id)
            .then(setUser)
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [id])

    const roleMap: Record<string, string> = { FARMER: "باغدار", BUYER: "خریدار", DRIVER: "راننده", ADMIN: "مدیر" }

    if (loading) {
        return (<>
            <div className="adm-detail-head"><h1 className="adm-page-title" style={{marginBottom:0}}>جزئیات کاربر</h1>
                <button className="adm-btn adm-btn--ghost" style={{fontSize:13,padding:"6px 14px",marginInlineStart:"auto"}} onClick={()=>router.back()}>← بازگشت</button></div>
            <div style={{display:"flex",justifyContent:"center",padding:80}}><Loader2 size={24} className="animate-spin" /></div>
        </>)
    }

    if (!user) {
        return (<>
            <div className="adm-detail-head"><h1 className="adm-page-title" style={{marginBottom:0}}>جزئیات کاربر</h1>
                <button className="adm-btn adm-btn--ghost" style={{fontSize:13,padding:"6px 14px",marginInlineStart:"auto"}} onClick={()=>router.back()}>← بازگشت</button></div>
            <p style={{padding:40,textAlign:"center",color:"var(--adm-fg-3)"}}>کاربر یافت نشد</p>
        </>)
    }

    const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || "کاربر"
    const roleLabel = roleMap[user.role] || user.role
    const statusLabel = user.status === "ACTIVE" ? "فعال" : "غیرفعال"
    const statusClass = user.status === "ACTIVE" ? "pill--shipped" : "pill--cancel"

    return (<>
        <div className="adm-detail-head"><h1 className="adm-page-title" style={{marginBottom:0}}>جزئیات کاربر</h1>
            <button className="adm-btn adm-btn--ghost" style={{fontSize:13,padding:"6px 14px",marginInlineStart:"auto"}} onClick={()=>router.back()}>← بازگشت</button></div>
        <div className="adm-card" style={{marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
                <div style={{width:56,height:56,borderRadius:"50%",background:"var(--adm-accent-50)",display:"grid",placeItems:"center",fontSize:24,fontWeight:700,color:"var(--adm-accent)"}}>{name[0]}</div>
                <div><div style={{fontSize:16,fontWeight:600}}>{name}</div><div style={{fontSize:13,color:"var(--adm-fg-3)"}}>{roleLabel} · {fa(user.createdAt)}</div></div>
                <span className={`pill ${statusClass}`} style={{marginInlineStart:"auto"}}>{statusLabel}</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,fontSize:13}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}><Phone size={14} style={{color:"var(--adm-fg-3)"}} /><span>{fa(user.phone)}</span></div>
                <div style={{display:"flex",alignItems:"center",gap:8}}><Mail size={14} style={{color:"var(--adm-fg-3)"}} /><span>{user.email || "—"}</span></div>
                <div style={{display:"flex",alignItems:"center",gap:8}}><ShoppingBag size={14} style={{color:"var(--adm-fg-3)"}} /><span>— سفارش</span></div>
                <div style={{display:"flex",alignItems:"center",gap:8}}><Shield size={14} style={{color:"var(--adm-fg-3)"}} /><span>— تومان</span></div>
            </div>
        </div>
        <div className="adm-card"><h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:600}}>سفارش‌های اخیر</h3>
            <div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>شماره</th><th>تاریخ</th><th>مبلغ</th><th>وضعیت</th></tr></thead>
                <tbody><tr><td colSpan={4} style={{textAlign:"center",padding:24,color:"var(--adm-fg-3)"}}>سفارشی یافت نشد</td></tr></tbody></table></div></div>
        <div style={{display:"flex",gap:10,marginTop:16}}>
            <button className="adm-btn adm-btn--ghost" style={{color:"var(--adm-fg-3)"}}>مسدود کردن کاربر</button>
            <button className="adm-btn adm-btn--ghost">ارسال پیام</button>
        </div>
    </>)
}