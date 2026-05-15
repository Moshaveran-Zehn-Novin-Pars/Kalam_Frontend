"use client"
import { useState } from "react"
import { Pencil, Plus, X } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const RULES = [
    { id:"r1", category:"میوه", rate:6, min:0, max:null, active:true },
    { id:"r2", category:"سبزیجات", rate:5, min:0, max:null, active:true },
    { id:"r3", category:"صیفی‌جات", rate:5, min:0, max:null, active:true },
    { id:"r4", category:"خشکبار", rate:8, min:0, max:5000000, active:true },
    { id:"r5", category:"لبنیات", rate:7, min:0, max:null, active:false },
]
export default function CommissionsPage() {
    return (<><div className="adm-detail-head"><h1 className="adm-page-title" style={{marginBottom:0}}>قوانین کمیسیون</h1>
        <button className="adm-btn adm-btn--filled"><Plus size={14}/> قانون جدید</button></div>
        <div className="adm-alert adm-alert--info" style={{marginBottom:20}}>نرخ کمیسیون پیش‌فرض پلتفرم: ۶٪</div>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table">
            <thead><tr><th>دسته‌بندی</th><th>نرخ</th><th>حداقل</th><th>حداکثر</th><th>وضعیت</th><th>عملیات</th></tr></thead>
            <tbody>{RULES.map(r=>(<tr key={r.id}>
                <td style={{fontWeight:500}}>{r.category}</td><td className="tnum" style={{fontWeight:600}}>{fa(r.rate)}٪</td>
                <td className="tnum">{fa(r.min)} تومان</td><td className="tnum">{r.max ? fa(r.max)+" تومان" : "—"}</td>
                <td><span className={`pill ${r.active?"pill--shipped":"pill--cancel"}`}>{r.active?"فعال":"غیرفعال"}</span></td>
                <td><div className="row-acts"><button className="row-act-btn"><Pencil size={14}/></button></div></td>
            </tr>))}</tbody></table></div></div></>)
}