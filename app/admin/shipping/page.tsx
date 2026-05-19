"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, X, UserCircle, ShoppingBag, Loader2 } from "lucide-react"
import { usersService } from "@/services/users"
import { deliveryService } from "@/services/delivery"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

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

const DELIVERY_STATUS_MAP: Record<string, { label: string; cls: string }> = {
  PENDING_ASSIGNMENT: { label: "در انتظار تخصیص", cls: "pill--sending" },
  ASSIGNED: { label: "تخصیص داده شده", cls: "pill--sending" },
  PICKING_UP: { label: "در حال بارگیری", cls: "pill--sending" },
  IN_TRANSIT: { label: "در حال ارسال", cls: "pill--sending" },
  DELIVERED: { label: "ارسال شده", cls: "pill--shipped" },
  FAILED: { label: "لغو شده", cls: "pill--cancel" },
}

export default function ShippingPage() {
  const [delDrv, setDelDrv] = useState<any>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [drivers, setDrivers] = useState<any[]>([])
  const [deliveries, setDeliveries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      usersService.findAll({ role: 'driver' }).catch(() => []),
      deliveryService.findAll().catch(() => []),
    ]).then(([d, dl]) => {
      setDrivers(Array.isArray(d) ? d : [])
      setDeliveries(Array.isArray(dl) ? dl : [])
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="adm-loading"><Loader2 size={24} className="spin" /></div>

  return (
    <>
      <h1 className="adm-page-title">رانندگان</h1>
      <div className="adm-drivers-grid">
        {drivers.map((d: any) => (
          <div key={d.id} className="adm-driver-card">
            <div className="adm-driver-card__head">
              <div>
                <div className="adm-driver-name">نام راننده: <b>{d.name || [d.firstName, d.lastName].filter(Boolean).join(' ') || d.phone}</b></div>
                <div className="adm-driver-count">سفارشات تحویل شده: <span className="tnum">{fa(d.delivered ?? d.driver?.ordersDelivered ?? 0)}</span></div>
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
              {deliveries.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: 24, color: "var(--adm-fg-3)" }}>هیچ حمل و نقلی یافت نشد.</td></tr>
              ) : (
                deliveries.map((d: any, i: number) => {
                  const ds = DELIVERY_STATUS_MAP[d.status] || { label: d.status, cls: "pill--sending" }
                  const driverName = d.driver?.user
                    ? [d.driver.user.firstName, d.driver.user.lastName].filter(Boolean).join(' ')
                    : d.driverId ? `راننده #${d.driverId.slice(-4)}` : 'ندارد'
                  const drvKind = d.driverId ? 'active' : 'none'
                  return (
                    <tr key={d.id || i}>
                      <td className="tnum">#{fa(d.orderId || d.id)}</td>
                      <td className="tnum">{d.scheduledAt ? fa(new Date(d.scheduledAt).toLocaleDateString('fa-IR')) : '—'}</td>
                      <td className="tnum">{d.scheduledAt ? fa(new Date(d.scheduledAt).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })) : '—'}</td>
                      <td>
                        <span className={`pill ${drvKind === "none" ? "pill--none" : "pill--active"}`}>{driverName}</span>
                      </td>
                      <td><span className={`pill ${ds.cls}`}>{ds.label}</span></td>
                      <td>—</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog open={!!delDrv} title="آیا مایل به حذف این راننده هستید؟" onConfirm={() => setDelDrv(null)} onCancel={() => setDelDrv(null)} />
      {addOpen && <AddDriverModal onClose={() => setAddOpen(false)} />}
    </>
  )
}
