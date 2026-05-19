"use client"
import { useState, useEffect } from "react"
import { BarChart3, TrendingUp, ShoppingBag, Users, DollarSign } from "lucide-react"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { adminService } from "@/services/admin"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

export default function AdminAnalyticsPage() {
    const [monthly, setMonthly] = useState<any[]>([])
    const [topProducts, setTopProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            adminService.getRevenueChart(12),
            adminService.getTopProducts(5),
        ])
            .then(([m, p]) => { setMonthly(m); setTopProducts(p) })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <><h1 className="adm-page-title">گزارش‌ها</h1><div style={{textAlign:"center",padding:48,color:"var(--adm-fg-3)"}}>در حال بارگذاری...</div></>

    const totalRev=monthly.reduce((s:number,m:any)=>s+m.revenue,0); const totalOrd=monthly.reduce((s:number,m:any)=>s+m.orders,0)
    return(<><h1 className="adm-page-title">گزارش‌ها</h1>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><DollarSign size={18}/>درآمد کل</div><span className="adm-stat__delta up"><TrendingUp size={12}/>{fa(24)}٪</span></div><div className="adm-stat__value">{faNum(totalRev*1000000)}<span className="adm-stat__unit">تومان</span></div><div className="adm-stat__compare">نسبت به سال قبل</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><ShoppingBag size={18}/>تعداد سفارشات</div><span className="adm-stat__delta up"><TrendingUp size={12}/>{fa(18)}٪</span></div><div className="adm-stat__value">{fa(totalOrd)}</div><div className="adm-stat__compare">نسبت به سال قبل</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><BarChart3 size={18}/>میانگین هر سفارش</div></div><div className="adm-stat__value">{faNum(Math.round(totalRev*1000000/totalOrd))}<span className="adm-stat__unit">تومان</span></div></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:20}}>
            <div className="adm-chart-card" style={{marginBottom:0}}>
                <div className="adm-chart-head"><h3 className="adm-chart-title">درآمد ماهانه</h3></div>
                <div className="adm-chart-wrap" style={{height:260}}><ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthly}><CartesianGrid stroke="var(--adm-border)" strokeDasharray="4 4" vertical={false}/>
                        <XAxis dataKey="m" reversed tick={{fill:"var(--adm-fg-3)",fontSize:10,fontFamily:"var(--adm-font)"}} axisLine={false} tickLine={false} interval={0}/>
                        <YAxis orientation="right" tick={{fill:"var(--adm-fg-3)",fontSize:10,fontFamily:"var(--adm-font)"}} axisLine={false} tickLine={false}/>
                        <Tooltip contentStyle={{fontFamily:"var(--adm-font)",fontSize:12,borderRadius:8}}/>
                        <Bar dataKey="revenue" fill="var(--adm-accent)" radius={[4,4,0,0]}/>
                    </BarChart></ResponsiveContainer></div></div>
            <div className="adm-card"><h3 style={{margin:"0 0 14px",fontSize:14,fontWeight:600}}>پرفروش‌ترین محصولات</h3>
                {topProducts.map((p:any,i:number)=>(<div key={p.name} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid var(--adm-border)",fontSize:13}}>
                    <span style={{width:20,height:20,borderRadius:"50%",background:"var(--adm-accent-50)",display:"grid",placeItems:"center",fontSize:11,fontWeight:700,color:"var(--adm-accent)",flexShrink:0}}>{fa(i+1)}</span>
                    <span style={{flex:1,fontWeight:500}}>{p.name}</span>
                    <span style={{color:"var(--adm-fg-3)",fontSize:12}}>{faNum(p.sales)} کیلو</span>
                    <span style={{fontWeight:600}}>{faNum(p.revenue)}</span>
                </div>))}</div>
        </div>
    </>)
}
