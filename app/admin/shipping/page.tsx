"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, X, UserCircle, ShoppingBag } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const DRIVERS = [
  { id: "d1", name: "رضا امیری",    delivered: 34 },
  { id: "d2", name: "علی محمدی",   delivered: 21 },
  { id: "d3", name: "حسین رضوی",  delivered: 48 },
]

const DELIVERIES = [
  { id: "2345923", date: "1404/9/12", slot: "ساعت ۶ تا ۱۴", driver: "ندارد",       drvKind: "none",   status: "sending", pay: "حضوری" },
  { id: "2345923", date: "1404/9/12", slot: "ساعت ۶ تا ۱۴", driver: "آقای عسگری", drvKind: "active", status: "shipped", pay: "حضوری" },
  { id: "2345923", date: "1404/9/12", slot: "ساعت ۶ تا ۱۴", driver: "آقای عسگری", drvKind: "active", status: "sending", pay: "حضوری" },
  { id: "2345923", date: "1404/9/12", slot: "ساعت ۶ تا ۱۴", driver: "آقای عسگری", drvKind: "active", status: "sending", pay: "حضوری" },
  { id: "2345923", date: "1404/9/12", slot: "ساعت ۶ تا ۱۴", driver: "آقای عسگری", drvKind: "active", status: "cancel",  pay: "حضوری" },
  { id: "2345923", date: "1404/9/12", slot: "ساعت ۶ تا ۱۴", driver: "آقای عسگری", drvKind: "active", status: "sending", pay: "حضوری" },
  { id: "2345923", date: "1404/9/12", slot: "ساعت ۶ تا ۱۴", driver: "آقای عسگری", drvKind: "active", status: "shipped", pay: "حضوری" },
]

function AddDriverModal({ onClose }: { onClose: ()=>void }) {
  return (
    <div className="adm-dlg-overlay" onClick={onClose}>
      <div className="adm-dlg" style={{ minWidth: 420 }} onClick={e => e.stopPropagation()}>
        <button className="adm-dlg-close" onClick={onClose}><X size={14} /></button>
        <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 20px", textAlign: "start" }}>افزودن راننده جدید</h3>
        <div className="adm-dlg-form">
          <div className="adm-field">
            <label className="adm-field-label">نام راننده</label>
            <div style={{ position: "relative" }}>
              <input className="adm-field-input" style={{ paddingInlineEnd: 40 }} />
              <span style={{ position: "absolute", insetInlineEnd: 12, top: "50%", transform: "translateY(-50%)", color: "var(--adm-fg-3)" }}>
                <UserCircle size={16} />
              </span>
            </div>
          </div>
          <div className="adm-field">
            <label className="adm-field-label">تعداد سفارشات تحویل شده</label>
            <div style={{ position: "relative" }}>
              <input className="adm-field-input" type="number" style={{ paddingInlineEnd: 40 }} />
              <span style={{ position: "absolute", insetInlineEnd: 12, top: "50%", transform: "translateY(-50%)", color: "var(--adm-fg-3)" }}>
                <ShoppingBag size={16} />
              </span>
            </div>
          </div>
        </div>
        <button className="adm-btn adm-btn--filled" onClick={onClose}>ثبت راننده</button>
      </div>
    </div>
  )
}

function ConfirmDialog({ open, title, onConfirm, onCancel }: any) {
  if (!open) return null
  return (
    <div className="adm-dlg-overlay" onClick={onCancel}>
      <div className="adm-dlg" onClick={e => e.stopPropagation()}>
        <button className="adm-dlg-close" onClick={onCancel}><X size={14} /></button>
        <p className="adm-dlg-title">{title}</p>
        <div className="adm-dlg-actions">
          <button className="adm-btn adm-btn--filled" onClick={onConfirm}>حذف کردن</button>
          <button className="adm-btn adm-btn--outline" onClick={onCancel}>انصراف</button>
        </div>
      </div>
    </div>
  )
}

const DELIVERY_STATUS: Record<string, {label:string;cls:string}> = {
  sending: { label: "در حال ارسال", cls: "pill--sending" },
  shipped: { label: "ارسال شده",    cls: "pill--shipped" },
  cancel:  { label: "لغو شده",      cls: "pill--cancel"  },
}

export default function ShippingPage() {
  const [delDrv, setDelDrv] = useState<any>(null)
  const [addOpen, setAddOpen] = useState(false)

  return (
    <>
      <h1 className="adm-page-title">رانندگان</h1>
      <div className="adm-drivers-grid">
        {DRIVERS.map(d => (
          <div key={d.id} className="adm-driver-card">
            <div className="adm-driver-card__head">
              <div>
                <div className="adm-driver-name">نام راننده: <b>{d.name}</b></div>
                <div className="adm-driver-count">سفارشات تحویل شده: <span className="tnum">{fa(d.delivered)}</span></div>
              </div>
              <div className="row-acts">
                <button className="row-act-btn"><Pencil size={14} /></button>
                <button className="row-act-btn del" onClick={() => setDelDrv(d)}><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 32 }}>
        <button className="adm-btn adm-btn--outline" onClick={() => setAddOpen(true)}>
          <Plus size={15} /><span>افزودن راننده جدید</span>
        </button>
      </div>

      <h2 className="adm-section-title">مدیریت حمل و نقل</h2>
      <div className="adm-table-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr>
              <th>شماره سفارش</th><th>تاریخ تحویل</th><th>ساعت تحویل</th>
              <th>راننده</th><th>وضعیت تحویل</th><th>نوع پرداخت</th>
            </tr></thead>
            <tbody>
              {DELIVERIES.map((d, i) => {
                const ds = DELIVERY_STATUS[d.status]
                return (
                  <tr key={i}>
                    <td className="tnum">#{fa(d.id)}</td>
                    <td className="tnum">{fa(d.date)}</td>
                    <td className="tnum">{fa(d.slot)}</td>
                    <td>
                      <span className={`pill ${d.drvKind === "none" ? "pill--none" : "pill--active"}`}>{d.driver}</span>
                    </td>
                    <td><span className={`pill ${ds.cls}`}>{ds.label}</span></td>
                    <td>{d.pay}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog open={!!delDrv} title="آیا مایل به حذف این راننده هستید؟" onConfirm={() => setDelDrv(null)} onCancel={() => setDelDrv(null)} />
      {addOpen && <AddDriverModal onClose={() => setAddOpen(false)} />}
    </>
  )
}
