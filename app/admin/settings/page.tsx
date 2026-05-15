"use client"
import { useState } from "react"
import { Settings, Save, Percent, DollarSign, Clock, Users } from "lucide-react"

export default function AdminSettingsPage() {
    const [defaultCommission, setDefaultCommission] = useState("6")
    const [taxRate, setTaxRate] = useState("9")
    const [settlementPeriod, setSettlementPeriod] = useState("monthly")
    const [minWithdraw, setMinWithdraw] = useState("50000")
    const [saved, setSaved] = useState(false)

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

    return (<><h1 className="adm-page-title">تنظیمات سیستم</h1>
        {saved && <div className="adm-alert adm-alert--success" style={{marginBottom:16}}><Save size={16}/> تنظیمات با موفقیت ذخیره شد.</div>}
        <div className="adm-card" style={{maxWidth:500}}>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <div><label className="adm-label" style={{display:"flex",alignItems:"center",gap:6}}><Percent size={14}/> نرخ کمیسیون پیش‌فرض (%)</label>
                    <input className="adm-input" value={defaultCommission} onChange={e=>setDefaultCommission(e.target.value)} placeholder="۶"/></div>
                <div><label className="adm-label" style={{display:"flex",alignItems:"center",gap:6}}><DollarSign size={14}/> نرخ مالیات (%)</label>
                    <input className="adm-input" value={taxRate} onChange={e=>setTaxRate(e.target.value)} placeholder="۹"/></div>
                <div><label className="adm-label" style={{display:"flex",alignItems:"center",gap:6}}><Clock size={14}/> دوره تسویه</label>
                    <select className="adm-input" value={settlementPeriod} onChange={e=>setSettlementPeriod(e.target.value)} style={{appearance:"none",cursor:"pointer"}}>
                        <option value="weekly">هفتگی</option><option value="monthly">ماهانه</option><option value="biweekly">دوهفته یکبار</option>
                    </select></div>
                <div><label className="adm-label" style={{display:"flex",alignItems:"center",gap:6}}><Users size={14}/> حداقل مبلغ برداشت (تومان)</label>
                    <input className="adm-input" value={minWithdraw} onChange={e=>setMinWithdraw(e.target.value)} placeholder="۵۰۰۰۰"/></div>
            </div>
            <button className="adm-btn adm-btn--filled" style={{marginTop:20}} onClick={handleSave}><Save size={14}/> ذخیره تنظیمات</button>
        </div></>)
}