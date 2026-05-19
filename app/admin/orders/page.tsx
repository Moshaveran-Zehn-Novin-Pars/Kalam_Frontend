"use client"

import { useState, useEffect } from "react"
import { MapPin, Package, ImageIcon, X, ChevronDown } from "lucide-react"
import { orderService } from "@/services/order"
import type { Order } from "@/types"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const STATUS_MAP: Record<string, {label:string;cls:string}> = {
  pending: { label: "در انتظار تایید", cls: "pill--pending" },
  prep:    { label: "آماده‌سازی",       cls: "pill--prep"    },
  shipped: { label: "ارسال شده",        cls: "pill--shipped" },
  cancel:  { label: "لغو شده",          cls: "pill--cancel"  },
}

const API_STATUS_MAP: Record<string, string> = {
  PENDING_PAYMENT: "pending",
  PAID_HELD:       "pending",
  CONFIRMED:       "pending",
  PREPARING:       "prep",
  READY_FOR_PICKUP:"prep",
  SHIPPING:        "shipped",
  DELIVERED:       "shipped",
  COMPLETED:       "shipped",
  CANCELLED:       "cancel",
  REFUNDED:        "cancel",
  DISPUTED:        "cancel",
}

function OrderDetail({ order, onBack }: { order: Order; onBack: ()=>void }) {
  const [status, setStatus] = useState(API_STATUS_MAP[order.status] || "pending")
  const s = STATUS_MAP[status]
  return (
    <>
      <div className="adm-detail-head">
        <h1 className="adm-page-title" style={{ marginBottom: 0 }}>جزئیات سفارش</h1>
        <button className="adm-btn adm-btn--outline" style={{ fontSize: 13, padding: "6px 14px" }} onClick={onBack}>← بازگشت</button>
      </div>

      {/* info card */}
      <div className="adm-detail-info">
        <div className="adm-detail-left">
          <div className="adm-info-row">
            <span className="adm-info-key">شماره سفارش:</span>
            <span className="adm-info-val tnum">#{fa(order.orderNumber || order.id)}</span>
            <span className="adm-info-key" style={{ marginInlineStart: 24 }}>تاریخ:</span>
            <span className="adm-info-val tnum">{fa(new Date(order.createdAt).toLocaleDateString("fa-IR"))}</span>
          </div>
          <div className="adm-info-row">
            <span className="adm-info-key">روش پرداخت:</span>
            <span className="adm-info-val" style={{ fontWeight: 600 }}>کارت به کارت</span>
            <span className="adm-info-key" style={{ marginInlineStart: 24 }}>زمان تحویل:</span>
            <span className="adm-info-val" style={{ fontWeight: 600 }}>{fa("12")} بهمن / صبح</span>
          </div>
        </div>
        <div className="adm-detail-right">
          <span style={{ fontSize: 13, color: "var(--adm-fg-3)" }}>وضعیت سفارش</span>
          <div className="adm-status-select">
            <span className={`pill ${s.cls}`}>{s.label}</span>
            <ChevronDown size={14} style={{ color: "var(--adm-fg-3)", marginInlineStart: "auto" }} />
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="pending">در انتظار تایید</option>
              <option value="prep">آماده‌سازی</option>
              <option value="shipped">ارسال شده</option>
              <option value="cancel">لغو شده</option>
            </select>
          </div>
        </div>
      </div>

      {/* address */}
      <div className="adm-addr-card">
        <MapPin size={18} style={{ color: "var(--adm-fg-3)", flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontSize: 14 }}>خیابان بهشتی، خیابان سرافزاز، کوچه یازدهم، پلاک {fa("10")}، واحد {fa("13")}</div>
          <div className="adm-addr-meta">
            <span>گیرنده: <b>سوگند سلحشور</b></span>
            <span>شماره موبایل: <span className="tnum">{fa("09438475210")}</span></span>
          </div>
        </div>
      </div>

      {/* products */}
      <h2 className="adm-section-title">محصولات <span style={{ color: "var(--adm-fg-3)", fontWeight: 500 }}>({fa((order.items || []).length)})</span></h2>
      <div className="adm-prod-list">
        {(order.items || []).map((it, i) => (
          <div key={i} className="adm-prod-row">
            <div className="adm-prod-thumb">🫐</div>
            <div className="adm-prod-name">{it.productName}</div>
            <div className="adm-prod-qty">{fa(Number(it.quantity))} کیلو</div>
            <div className="adm-prod-total">قیمت کل: <span className="tnum">{faNum(Number(it.subtotal))}</span> تومان</div>
          </div>
        ))}
      </div>

      {/* totals */}
      <div className="adm-totals">
        <div className="adm-totals-row"><span>قیمت کالاها:</span><span>{faNum(Number(order.subtotal))} تومان</span></div>
        <div className="adm-totals-row"><span>تخفیف:</span><span>{faNum(1000000)} تومان</span></div>
        <div className="adm-totals-row"><span>هزینه ارسال:</span><span>{faNum(Number(order.deliveryFee))} تومان</span></div>
        <div className="adm-totals-row"><span>جمع سبد خرید:</span><span style={{ color: "var(--adm-accent)" }}>{faNum(Number(order.total))} تومان</span></div>
      </div>

      {/* receipt */}
      <h2 className="adm-section-title">رسید پرداختی</h2>
      <div className="adm-receipt"><ImageIcon size={44} /></div>
    </>
  )
}

const FILTERS = [
  { id: "all", label: "همه" },
  { id: "pending", label: "در انتظار تایید" },
  { id: "prep", label: "آماده‌سازی" },
  { id: "shipped", label: "ارسال شده" },
  { id: "cancel", label: "لغو شده" },
]

export default function OrdersPage() {
  const [filter, setFilter] = useState("all")
  const [detail, setDetail] = useState<Order | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const filtered = filter === "all" ? orders : orders.filter(o => API_STATUS_MAP[o.status] === filter)

  useEffect(() => {
    orderService.getAllOrders()
      .then(res => { setOrders(res.items); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <>
        <h1 className="adm-page-title">مدیریت سفارش‌ها</h1>
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--adm-fg-3)" }}>در حال بارگذاری...</div>
      </>
    )
  }

  if (!orders.length) {
    return (
      <>
        <h1 className="adm-page-title">مدیریت سفارش‌ها</h1>
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--adm-fg-3)" }}>هیچ سفارشی یافت نشد.</div>
      </>
    )
  }

  if (detail) return <OrderDetail order={detail} onBack={() => setDetail(null)} />

  return (
    <>
      <h1 className="adm-page-title">مدیریت سفارش‌ها</h1>
      <div className="adm-filters">
        {FILTERS.map(f => (
          <button key={f.id} className={`adm-filter-btn ${filter === f.id ? "active" : ""}`} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="adm-table-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr>
              <th>شماره سفارش</th><th>تاریخ</th><th>نام کاربر</th>
              <th>دسته‌بندی</th><th>وضعیت</th><th>جمع کل</th>
            </tr></thead>
            <tbody>
              {filtered.map(r => {
                const uiStatus = API_STATUS_MAP[r.status] || "pending"
                const s = STATUS_MAP[uiStatus]
                return (
                  <tr key={r.id} className="clickable" onClick={() => setDetail(r)}>
                    <td className="oid tnum">#{fa(r.orderNumber || r.id)}</td>
                    <td className="tnum">{fa(new Date(r.createdAt).toLocaleDateString("fa-IR"))}</td>
                    <td>{r.buyer ? r.buyer.firstName + ' ' + r.buyer.lastName : ''}</td>
                    <td>{r.items?.[0]?.productName || ''}</td>
                    <td><span className={`pill ${s.cls}`}>{s.label}</span></td>
                    <td className="total">{faNum(Number(r.total))}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
