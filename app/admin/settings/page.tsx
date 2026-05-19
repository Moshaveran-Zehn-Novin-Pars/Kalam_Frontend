"use client"
import { useState, useEffect } from "react"
import { Save, Percent, DollarSign, Clock, Users, Loader2 } from "lucide-react"
import { adminService } from "@/services/admin"

export default function AdminSettingsPage() {
    const [defaultCommission,setDefaultCommission]=useState("6"); const [taxRate,setTaxRate]=useState("9")
    const [settlementPeriod,setSettlementPeriod]=useState("monthly"); const [minWithdraw,setMinWithdraw]=useState("50000")
    const [loading,setLoading]=useState(true); const [saved,setSaved]=useState(false)
    useEffect(()=>{adminService.getSettings().then((s:any)=>{if(s?.defaultCommission!=null)setDefaultCommission(String(s.defaultCommission));if(s?.taxRate!=null)setTaxRate(String(s.taxRate));if(s?.settlementPeriod)setSettlementPeriod(s.settlementPeriod);if(s?.minWithdraw!=null)setMinWithdraw(String(s.minWithdraw))}).catch(()=>{}).finally(()=>setLoading(false))},[])
    const handleSave=()=>{adminService.updateSettings({defaultCommission:Number(defaultCommission),taxRate:Number(taxRate),settlementPeriod,minWithdraw:Number(minWithdraw)}).then(()=>{setSaved(true);setTimeout(()=>setSaved(false),2500)}).catch(()=>{})}
    if(loading)return <div style={{textAlign:"center",padding:48}}><Loader2 size={20} className="animate-spin inline-block"/></div>
    return (<>
        <h1 className="adm-page-title">تنظیمات سیستم</h1>
        {saved&&<div className="adm-alert adm-alert--success"><Save size={16}/> تنظیمات با موفقیت ذخیره شد.</div>}
        <div className="adm-card" style={{maxWidth:500}}>
            <div style={{display:"flex",flexDirection:"column",gap:18}}>
                <div><label className="adm-field-label" style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><Percent size={14}/> نرخ کمیسیون پیش‌فرض (%)</label>
                    <input className="adm-field-input" value={defaultCommission} onChange={e=>setDefaultCommission(e.target.value)}/></div>
                <div><label className="adm-field-label" style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><DollarSign size={14}/> نرخ مالیات (%)</label>
                    <input className="adm-field-input" value={taxRate} onChange={e=>setTaxRate(e.target.value)}/></div>
                <div><label className="adm-field-label" style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><Clock size={14}/> دوره تسویه</label>
                    <select className="adm-field-input" value={settlementPeriod} onChange={e=>setSettlementPeriod(e.target.value)} style={{appearance:"none",cursor:"pointer"}}>
                        <option value="weekly">هفتگی</option><option value="monthly">ماهانه</option><option value="biweekly">دوهفته یکبار</option></select></div>
                <div><label className="adm-field-label" style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><Users size={14}/> حداقل مبلغ برداشت (تومان)</label>
                    <input className="adm-field-input" value={minWithdraw} onChange={e=>setMinWithdraw(e.target.value)}/></div>
            </div>
            <button className="adm-btn adm-btn--filled" style={{marginTop:24}} onClick={handleSave}><Save size={14}/> ذخیره تنظیمات</button>
        </div>
    </>)
}
