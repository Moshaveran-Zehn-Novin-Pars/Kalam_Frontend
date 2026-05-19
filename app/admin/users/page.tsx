"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Loader2 } from "lucide-react"
import { usersService } from "@/services/users"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const STATUS_MAP: Record<string, {label:string;cls:string}> = {
  pending: { label: "در انتظار تایید", cls: "pill--pending" },
  prep:    { label: "آماده‌سازی",       cls: "pill--prep"    },
  shipped: { label: "ارسال شده",        cls: "pill--shipped" },
  cancel:  { label: "لغو شده",          cls: "pill--cancel"  },
}

function statusColor(s: string) {
  if (s === "VIP") return "var(--adm-accent)"
  if (s === "غیرفعال") return "var(--adm-fg-3)"
  return "var(--adm-up)"
}

interface UserRow {
  id: string
  name: string
  phone: string
  orders: number
  lastSeen: string
  registered: string
  status: string
}

function UserDetail({ user, onBack }: { user: User; onBack: ()=>void }) {
  return (
    <>
      <div className="adm-detail-head">
        <h1 className="adm-page-title" style={{ marginBottom: 0 }}>جزئیات کاربر</h1>
        <button className="adm-btn adm-btn--outline" style={{ fontSize: 13, padding: "6px 14px" }} onClick={onBack}>← بازگشت</button>
      </div>

      <div className="adm-user-detail-card">
        <div className="adm-user-detail-avatar">{user.name[0]}</div>
        <div className="adm-user-detail-grid">
          <div><span>نام کاربر: </span><b>{user.name}</b></div>
          <div><span>شماره تماس: </span><span className="tnum">{fa(user.phone)}</span></div>
          <div><span>تعداد سفارش: </span><b className="tnum">{fa(user.orders)}</b></div>
          <div><span>تاریخ ثبت نام: </span><span className="tnum">{fa(user.registered)}</span></div>
          <div><span>آخرین ورود: </span><span className="tnum">{fa(user.lastSeen)}</span></div>
        </div>
      </div>

      <h2 className="adm-section-title">سفارشات</h2>
      <div className="adm-table-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr>
              <th>شماره سفارش</th><th>تاریخ</th><th>دسته‌بندی</th><th>وضعیت</th><th>جمع کل</th>
            </tr></thead>
            <tbody>
              {([/* user orders would appear here */] as any[]).map((o: any, i: number) => {
                const s = STATUS_MAP[o.status]
                return (
                  <tr key={i} className="clickable">
                    <td className="tnum">#{fa(o.id)}</td>
                    <td className="tnum">{fa(o.date)}</td>
                    <td>{o.cat}</td>
                    <td><span className={`pill ${s.cls}`}>{s.label}</span></td>
                    <td className="total">{faNum(o.total)}</td>
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

export default function UsersPage() {
  const [detail, setDetail] = useState<UserRow | null>(null)
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    usersService.findAll()
      .then(data => setUsers(data.map(u => ({
        id: u.id,
        name: [u.firstName, u.lastName].filter(Boolean).join(" "),
        phone: u.phone,
        orders: 0,
        lastSeen: u.updatedAt,
        registered: u.createdAt,
        status: u.status === "ACTIVE" ? "فعال" : u.status === "SUSPENDED" || u.status === "BANNED" ? "غیرفعال" : "VIP",
      }))))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (detail) return <UserDetail user={detail} onBack={() => setDetail(null)} />

  return (
    <>
      <div className="adm-toolbar">
        <h1 className="adm-toolbar-title">کاربران</h1>
        <div className="adm-toolbar-controls">
          <button className="adm-tb-pill">مرتب‌سازی <ChevronDown size={13} /></button>
          <div className="adm-tb-input">
            <input placeholder="جستجو" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          </div>
        </div>
      </div>

      <div className="adm-table-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr>
              <th>پروفایل</th><th>نام کاربر</th><th>شماره تماس</th>
              <th>تعداد سفارش</th><th>آخرین ورود</th><th>تاریخ ثبت نام</th>
            </tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: 48 }}><Loader2 size={20} className="animate-spin inline-block" /></td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: 48, color: "var(--adm-fg-3)" }}>کاربری یافت نشد</td></tr>
              ) : users.map(u => (
                <tr key={u.id} className="clickable" onClick={() => setDetail(u)}>
                  <td>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--adm-accent-50)", color: "var(--adm-accent)", display: "grid", placeItems: "center", fontWeight: 600, fontSize: 14 }}>
                      {u.name[0]}
                    </div>
                  </td>
                  <td style={{ fontWeight: 500 }}>{u.name}</td>
                  <td className="tnum">{fa(u.phone)}</td>
                  <td className="tnum">{fa(u.orders)}</td>
                  <td className="tnum">{fa(u.lastSeen)}</td>
                  <td className="tnum">{fa(u.registered)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
