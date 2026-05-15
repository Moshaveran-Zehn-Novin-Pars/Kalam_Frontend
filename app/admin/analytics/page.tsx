"use client"
import { useState } from "react"
import { BarChart3, TrendingUp, ShoppingBag, Users, DollarSign } from "lucide-react"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const MONTHLY = [
    { m:"فروردین", revenue:480, orders:120 },{ m:"اردیبهشت", revenue:560, orders:145 },
    { m:"خرداد", revenue:720, orders:180 },{ m:"تیر", revenue:600, orders:155 },
    { m:"مرداد", revenue:500, orders:130 },{ m:"شهریور", revenue:655, orders:168 },
    { m:"مهر", revenue:480, orders:125 },{ m:"آبان", revenue:550, orders:142 },
    { m:"آذر", revenue:620, orders:160 },{ m:"دی", revenue:510, orders:132 },
    { m:"بهمن", revenue:780, orders:195 },{ m:"اسفند", revenue:580, orders:150 },
]
const TOP_PRODUCTS = [
    { name:"سیب درختی", sales:1200, revenue:78000000 },{ name:"گوجه فرنگی", sales:980, revenue:44100000 },
    { name:"انگور", sales:850, revenue:68000000 },{ name:"خیار", sales:720, revenue:20160000 },
    { name:"پرتقال", sales:650, revenue:29250000 },
]
export default function AdminAnalyticsPage() {
    const totalRev=MONTHLY.reduce((s,m)=>s+m.revenue,0); const totalOrd=MONTHLY.reduce((s,m)=>s+m.orders,0)
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
                    <BarChart data={MONTHLY}><CartesianGrid stroke="var(--adm-border)" strokeDasharray="4 4" vertical={false}/>
                        <XAxis dataKey="m" reversed tick={{fill:"var(--adm-fg-3)",fontSize:10,fontFamily:"var(--adm-font)"}} axisLine={false} tickLine={false} interval={0}/>
                        <YAxis orientation="right" tick={{fill:"var(--adm-fg-3)",fontSize:10,fontFamily:"var(--adm-font)"}} axisLine={false} tickLine={false}/>
                        <Tooltip contentStyle={{fontFamily:"var(--adm-font)",fontSize:12,borderRadius:8}}/>
                        <Bar dataKey="revenue" fill="var(--adm-accent)" radius={[4,4,0,0]}/>
                    </BarChart></ResponsiveContainer></div></div>
            <div className="adm-card"><h3 style={{margin:"0 0 14px",fontSize:14,fontWeight:600}}>پرفروش‌ترین محصولات</h3>
                {TOP_PRODUCTS.map((p,i)=>(<div key={p.name} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid var(--adm-border)",fontSize:13}}>
                    <span style={{width:20,height:20,borderRadius:"50%",background:"var(--adm-accent-50)",display:"grid",placeItems:"center",fontSize:11,fontWeight:700,color:"var(--adm-accent)",flexShrink:0}}>{fa(i+1)}</span>
                    <span style={{flex:1,fontWeight:500}}>{p.name}</span>
                    <span style={{color:"var(--adm-fg-3)",fontSize:12}}>{faNum(p.sales)} کیلو</span>
                    <span style={{fontWeight:600}}>{faNum(p.revenue)}</span>
                </div>))}</div>
        </div>
    </>)
}
