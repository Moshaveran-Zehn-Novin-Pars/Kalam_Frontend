"use client"
import { useState, useEffect } from "react"
import { Search, DollarSign, Clock, CreditCard, TrendingUp, X, Loader2 } from "lucide-react"
import { adminService } from "@/services/admin"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const methodLabels: Record<string,string>={BANK_TRANSFER:"کارت به کارت",ONLINE_GATEWAY:"درگاه",WALLET:"کیف پول",CREDIT:"اعتبار",DEPOSIT:"واریز",WITHDRAWAL:"برداشت",PURCHASE:"خرید",REFUND:"استرداد",COMMISSION:"کمیسیون",PAYOUT:"پرداخت",ESCROW_HOLD:"مسدود",ESCROW_RELEASE:"آزاد"}

function PayDrawer({ pay, onClose }: { pay: any | null; onClose: () => void }) {
    if (!pay) return null
    return (<><div className="adm-drawer-overlay" onClick={onClose} /><aside className="adm-drawer open">
        <div className="adm-drawer-head"><div><div style={{ fontSize: 12, color: "var(--adm-fg-3)" }}>تراکنش</div><div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{pay.user || pay.id}</div></div><button className="adm-drawer-close" onClick={onClose}><X size={14} /></button></div>
        <div className="adm-drawer-row"><span>مبلغ</span><span className="tnum" style={{ fontWeight: 600 }}>{faNum(Number(pay.amount))} تومان</span></div>
        <div className="adm-drawer-row"><span>روش پرداخت</span><span>{methodLabels[pay.method as string] || pay.method || "—"}</span></div>
        <div className="adm-drawer-row"><span>تاریخ</span><span className="tnum">{fa(pay.createdAt ? new Date(pay.createdAt).toLocaleDateString("fa-IR") : "—")}</span></div>
        <div className="adm-drawer-row" style={{ borderTop: "1px solid var(--adm-border)", paddingTop: 13, marginTop: 4 }}><span>وضعیت</span><span className={`pill ${pay.status === "success" ? "pill--shipped" : pay.status === "pending" ? "pill--pending" : "pill--cancel"}`}>{pay.status === "success" ? "موفق" : pay.status === "pending" ? "در انتظار" : "ناموفق"}</span></div>
    </aside></>)
}

export default function PaymentsPage() {
    const [all, setAll] = useState<any[]>([]); const [loading, setLoading] = useState(true)
    const [q, setQ] = useState(""); const [filter, setFilter] = useState("all"); const [open, setOpen] = useState<any | null>(null)
    useEffect(() => { adminService.getAllPayments().then(setAll).catch(() => {}).finally(() => setLoading(false)) }, [])
    const list = all.filter((p: any) => (filter === "all" || p.status === filter) && (!q || (p.user || '').includes(q)))
    const successList = all.filter((p: any) => p.status === "success")
    const pendingList = all.filter((p: any) => p.status === "pending")
    const failedList = all.filter((p: any) => p.status === "failed")
    const successTotal = successList.reduce((s: number, p: any) => s + Number(p.amount), 0)
    const pendingTotal = pendingList.reduce((s: number, p: any) => s + Number(p.amount), 0)
    return (<>
        <h1 className="adm-page-title">تراکنش‌ها</h1>
        <div className="adm-stat-grid">
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><CreditCard size={18} />کل تراکنش‌ها</div><span className="adm-stat__delta up"><TrendingUp size={12} />{fa(12)}٪</span></div><div className="adm-stat__value">{fa(all.length)}</div><div className="adm-stat__compare">موفق: {fa(successList.length)} · ناموفق: {fa(failedList.length)}</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><DollarSign size={18} />مجموع موفق</div></div><div className="adm-stat__value">{faNum(successTotal)}<span className="adm-stat__unit">تومان</span></div><div className="adm-stat__compare">{successList.length > 0 ? `میانگین: ${faNum(Math.round(successTotal / successList.length))} تومان` : '—'}</div></div>
            <div className="adm-stat"><div className="adm-stat__top"><div className="adm-stat__label"><Clock size={18} />در انتظار</div></div><div className="adm-stat__value" style={{ color: "var(--adm-pending-fg)" }}>{fa(pendingList.length)}</div><div className="adm-stat__compare">{faNum(pendingTotal)} تومان</div></div>
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 320 }}><Search size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--adm-fg-3)" }} /><input className="adm-field-input" placeholder="جستجو..." value={q} onChange={e => setQ(e.target.value)} style={{ paddingRight: 36 }} /></div>
            <div className="adm-filters">{["all", "success", "pending", "failed"].map(f => (<button key={f} className={`adm-filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f === "all" ? "همه" : f === "success" ? "موفق" : f === "pending" ? "در انتظار" : "ناموفق"}</button>))}</div>
        </div>
        <h2 className="adm-section-title">لیست تراکنش‌ها</h2>
        <div className="adm-table-card"><div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>کاربر</th><th>مبلغ</th><th>روش</th><th>تاریخ</th><th>وضعیت</th></tr></thead>
            <tbody>{loading ? <tr><td colSpan={5} style={{ textAlign: "center", padding: 32 }}><Loader2 size={20} className="animate-spin inline-block" /></td></tr> : list.length === 0 ? <tr><td colSpan={5} style={{ textAlign: "center", padding: 48, color: "var(--adm-fg-3)" }}>موردی یافت نشد</td></tr> : list.map((p: any) => (<tr key={p.id} className="clickable" onClick={() => setOpen(p)}><td style={{ fontWeight: 500 }}>{p.user || p.id}</td><td className="tnum total">{faNum(Number(p.amount))}</td><td>{methodLabels[p.method as string] || p.method || "—"}</td><td className="tnum">{p.createdAt ? fa(new Date(p.createdAt).toLocaleDateString("fa-IR")) : "—"}</td><td><span className={`pill ${p.status === "success" ? "pill--shipped" : p.status === "pending" ? "pill--pending" : "pill--cancel"}`}>{p.status === "success" ? "موفق" : p.status === "pending" ? "در انتظار" : "ناموفق"}</span></td></tr>))}</tbody></table></div></div>
        <PayDrawer pay={open} onClose={() => setOpen(null)} />
    </>)
}
