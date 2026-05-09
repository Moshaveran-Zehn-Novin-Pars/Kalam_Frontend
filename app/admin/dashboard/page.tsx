"use client"

import { useState, useEffect, useRef } from "react"
import { ShoppingBag, Wallet, Users, TrendingUp, TrendingDown, Package, X } from "lucide-react"
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, ReferenceArea, Tooltip
} from "recharts"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

function useCountUp(target: number, duration = 900) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start: number | null = null; let raf: number
    const step = (t: number) => {
      if (!start) start = t
      const p = Math.min((t - start) / duration, 1)
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target])
  return val
}

const PERIOD_DATA: Record<string, { m: string; v: number }[]> = {
  year: [
    { m: "فروردین", v: 48 },{ m: "اردیبهشت", v: 56 },{ m: "خرداد", v: 72 },
    { m: "تیر", v: 60 },{ m: "مرداد", v: 50 },{ m: "شهریور", v: 65.5 },
    { m: "مهر", v: 48 },{ m: "آبان", v: 55 },{ m: "آذر", v: 62 },
    { m: "دی", v: 51 },{ m: "بهمن", v: 78 },{ m: "اسفند", v: 58 },
  ],
  half: [
    { m: "مهر", v: 48 },{ m: "آبان", v: 55 },{ m: "آذر", v: 62 },
    { m: "دی", v: 51 },{ m: "بهمن", v: 78 },{ m: "اسفند", v: 58 },
  ],
  quarter: [
    { m: "دی", v: 51 },{ m: "بهمن", v: 78 },{ m: "اسفند", v: 58 },
  ],
}
const PERIODS = [
  { id: "year", label: "سال" },
  { id: "half", label: "شش ماه" },
  { id: "quarter", label: "سه ماه" },
]

function Dropdown({ value, options, onChange }: { value: string; options: {id:string;label:string}[]; onChange:(v:string)=>void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener("mousedown", h)
    return () => document.removeEventListener("mousedown", h)
  }, [])
  const current = options.find(o => o.id === value)
  return (
    <div className="adm-dd" ref={ref}>
      <button className="adm-dd-btn" onClick={() => setOpen(o => !o)}>
        <span>{current?.label}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }}><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <div className="adm-dd-menu">
          {options.map(o => (
            <button key={o.id} className={`adm-dd-item ${o.id === value ? "active" : ""}`} onClick={() => { onChange(o.id); setOpen(false) }}>{o.label}</button>
          ))}
        </div>
      )}
    </div>
  )
}

const STATUS_MAP: Record<string, {label:string;cls:string}> = {
  pending: { label: "در انتظار تایید", cls: "pill--pending" },
  prep:    { label: "آماده‌سازی",       cls: "pill--prep"    },
  shipped: { label: "ارسال شده",        cls: "pill--shipped" },
  cancel:  { label: "لغو شده",          cls: "pill--cancel"  },
}

const ORDERS = [
  { id: "2345923", date: "1404/9/12", user: "سلحشور",  cat: "سبزیجات و صیفی‌جات", status: "pending", total: 1389000 },
  { id: "2345924", date: "1404/9/12", user: "محمدی",    cat: "میوه‌ها",             status: "prep",    total: 2150000 },
  { id: "2345925", date: "1404/9/12", user: "احمدی",    cat: "نان و غلات",          status: "prep",    total: 489000  },
  { id: "2345926", date: "1404/9/11", user: "رضایی",    cat: "لبنیات",              status: "shipped", total: 1879000 },
  { id: "2345927", date: "1404/9/11", user: "حسینی",   cat: "گوشت و پروتئین",      status: "shipped", total: 3290000 },
  { id: "2345928", date: "1404/9/11", user: "کریمی",    cat: "سبزیجات",             status: "pending", total: 670000  },
  { id: "2345929", date: "1404/9/10", user: "موسوی",    cat: "خشکبار",              status: "cancel",  total: 945000  },
  { id: "2345930", date: "1404/9/10", user: "شریفی",    cat: "میوه‌ها",             status: "shipped", total: 1389000 },
]

type Order = typeof ORDERS[0]

function StatCard({ icon, label, value, unit, delta, dir, compare }: any) {
  const v = useCountUp(value)
  return (
    <div className="adm-stat">
      <div className="adm-stat__top">
        <div className="adm-stat__label"><span className="adm-stat__icon">{icon}</span><span>{label}</span></div>
        <span className={`adm-stat__delta ${dir}`}>
          {dir === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {fa(delta)}٪
        </span>
      </div>
      <div className="adm-stat__value">{faNum(v)}<span className="adm-stat__unit">{unit}</span></div>
      <div className="adm-stat__compare">{compare}</div>
    </div>
  )
}

function RevenueChart() {
  const [period, setPeriod] = useState("year")
  const data = PERIOD_DATA[period]
  const [hover, setHover] = useState<any>(null)
  const accent = "#4f9e6b"
  return (
    <div className="adm-chart-card">
      <div className="adm-chart-head">
        <h3 className="adm-chart-title">نمودار درآمد</h3>
        <Dropdown value={period} options={PERIODS} onChange={setPeriod} />
      </div>
      <div className="adm-chart-wrap">
        {hover && (
          <div className="adm-chart-tip" style={{ left: hover.x, top: hover.y - 44 }}>
            {faNum(Math.round(hover.value * 1000) * 1000)} تومان
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 24, right: 12, left: 12, bottom: 12 }}
            onMouseMove={(e: any) => {
              if (e?.activeCoordinate && e?.activePayload?.[0]) {
                setHover({ x: e.activeCoordinate.x, y: e.activeCoordinate.y, value: e.activePayload[0].value, idx: e.activeTooltipIndex })
              }
            }}
            onMouseLeave={() => setHover(null)}>
            <CartesianGrid stroke="var(--adm-border)" strokeDasharray="4 4" vertical={false} />
            {hover && (
              <ReferenceArea x1={data[Math.max(0, hover.idx)]?.m} x2={data[Math.min(data.length-1, hover.idx)]?.m} y1={0} y2={120} fill={accent} fillOpacity={0.08} stroke="none" />
            )}
            <XAxis dataKey="m" reversed tick={{ fill: "var(--adm-fg-3)", fontSize: 11, fontFamily: "var(--adm-font)" }} axisLine={false} tickLine={false} interval={0} />
            <YAxis orientation="right" domain={[0, 120]} ticks={[10,20,40,60,80,100,120]} tick={{ fill: "var(--adm-fg-3)", fontSize: 11, fontFamily: "var(--adm-font)" }} axisLine={false} tickLine={false} tickFormatter={v => fa(v) + "م"} />
            <Tooltip cursor={false} content={() => null} />
            <Line type="monotone" dataKey="v" stroke={accent} strokeWidth={3} dot={false} activeDot={{ r: 5, fill: accent, stroke: "#fff", strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function OrderDrawer({ order, onClose }: { order: Order | null; onClose: () => void }) {
  if (!order) return null
  const s = STATUS_MAP[order.status]
  return (
    <>
      <div className="adm-drawer-overlay" onClick={onClose} />
      <aside className="adm-drawer open">
        <div className="adm-drawer-head">
          <div>
            <div style={{ fontSize: 12, color: "var(--adm-fg-3)" }}>سفارش</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>#{fa(order.id)}</div>
          </div>
          <button className="adm-drawer-close" onClick={onClose}><X size={14} /></button>
        </div>
        <div className="adm-drawer-product">
          <div className="adm-drawer-product-icon"><Package size={20} /></div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{order.cat}</div>
            <div style={{ fontSize: 12, color: "var(--adm-fg-3)", marginTop: 4 }}>{fa(3)} قلم کالا</div>
          </div>
        </div>
        <div className="adm-drawer-row"><span>تاریخ</span><span className="tnum">{fa(order.date)}</span></div>
        <div className="adm-drawer-row"><span>کاربر</span><span>{order.user}</span></div>
        <div className="adm-drawer-row"><span>وضعیت</span><span className={`pill ${s.cls}`}>{s.label}</span></div>
        <div className="adm-drawer-row"><span>روش پرداخت</span><span>درگاه آنلاین</span></div>
        <div className="adm-drawer-row"><span>هزینه ارسال</span><span>{faNum(45000)} تومان</span></div>
        <div className="adm-drawer-row"><span>تخفیف</span><span style={{ color: "var(--adm-down)" }}>-{faNum(50000)} تومان</span></div>
        <div className="adm-drawer-row" style={{ borderTop: "1px solid var(--adm-border)", paddingTop: 13, marginTop: 4, fontWeight: 600 }}>
          <span>جمع کل</span>
          <span style={{ color: "var(--adm-accent)", fontSize: 15 }}>{faNum(order.total)} تومان</span>
        </div>
        <button className="adm-drawer-btn">به‌روزرسانی وضعیت</button>
      </aside>
    </>
  )
}

export default function DashboardPage() {
  const [openOrder, setOpenOrder] = useState<Order | null>(null)
  return (
    <>
      <h1 className="adm-page-title">پیشخوان</h1>
      <div className="adm-stat-grid">
        <StatCard icon={<ShoppingBag size={18} />} label="فروش کل" value={439} unit=" سفارش" delta="43" dir="up" compare={`ماه قبل: ${faNum(312)} سفارش`} />
        <StatCard icon={<Wallet size={18} />} label="درآمد کل" value={198345650} unit=" تومان" delta="43" dir="up" compare={`ماه قبل: ${faNum(59389000)} تومان`} />
        <StatCard icon={<Users size={18} />} label="مشتریان جدید" value={289} unit=" مشتری" delta="43" dir="down" compare={`ماه قبل: ${faNum(342)} مشتری`} />
      </div>
      <RevenueChart />
      <h2 className="adm-section-title">سفارش‌های اخیر</h2>
      <div className="adm-table-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr>
              <th>شماره سفارش</th><th>تاریخ</th><th>نام کاربر</th>
              <th>دسته‌بندی</th><th>وضعیت</th><th>جمع کل</th>
            </tr></thead>
            <tbody>
              {ORDERS.map(r => (
                <tr key={r.id} className="clickable" onClick={() => setOpenOrder(r)}>
                  <td className="oid tnum">#{fa(r.id)}</td>
                  <td className="tnum">{fa(r.date)}</td>
                  <td>{r.user}</td>
                  <td>{r.cat}</td>
                  <td><span className={`pill ${STATUS_MAP[r.status].cls}`}>{STATUS_MAP[r.status].label}</span></td>
                  <td className="total">{faNum(r.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <OrderDrawer order={openOrder} onClose={() => setOpenOrder(null)} />
    </>
  )
}