"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  BarChart3, Pencil, ShoppingCart, Send, Users, LogOut,
  Search, Menu, X, Home, LayoutGrid, UserCircle, LogIn, ChevronLeft,
  Shield, CreditCard, Wallet, Scale, AlertTriangle, Truck,
  Warehouse, TrendingUp, Bell, FileText, Settings, CheckSquare
} from "lucide-react"
import "./admin.css"

function fa(n: string | number) {
  return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d])
}

const SIDEBAR_ITEMS = [
  { href: "/admin/dashboard",   label: "پیشخوان",               icon: BarChart3 },
  { href: "/admin/users",       label: "کاربران",               icon: Users },
  { href: "/admin/kyc",         label: "احراز هویت",            icon: Shield },
  { href: "/admin/products",    label: "محصولات",               icon: Pencil },
  { href: "/admin/orders",      label: "سفارش‌ها",              icon: ShoppingCart },
  { href: "/admin/payments",    label: "تراکنش‌ها",             icon: CreditCard },
  { href: "/admin/settlements", label: "تسویه‌حساب‌ها",         icon: Wallet },
  { href: "/admin/commissions", label: "کمیسیون‌ها",            icon: Scale },
  { href: "/admin/disputes",    label: "اعتراضات",              icon: AlertTriangle },
  { href: "/admin/shipping",    label: "حمل و نقل",             icon: Send },
  { href: "/admin/deliveries/drivers", label: "رانندگان",       icon: Truck },
  { href: "/admin/warehouses",  label: "سردخانه‌ها",            icon: Warehouse },
  { href: "/admin/analytics",   label: "گزارش‌ها",              icon: TrendingUp },
  { href: "/admin/notifications", label: "اعلان‌ها",            icon: Bell },
  { href: "/admin/content",     label: "محتوا",                 icon: FileText },
  { href: "/admin/settings",    label: "تنظیمات",               icon: Settings },
]

const TOP_NAV = [
  { href: "/",         label: "صفحه اصلی" },
  { href: "/products", label: "محصولات" },
  { href: "/about",    label: "درباره‌ی ما" },
  { href: "/contact",  label: "تماس با ما" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)

  return (
    <div dir="rtl" style={{ fontFamily: "var(--adm-font)", minHeight: "100vh", background: "var(--adm-bg-soft)", color: "var(--adm-fg)" }}>

      {/* ── Topbar ── */}
      <header className="adm-topbar">
        <div className="adm-topbar-inner">
          <button className="adm-ham" onClick={() => setMenuOpen(true)}><Menu size={20} /></button>

          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <img src="/logo.svg" alt="کلم" style={{ height: 32, width: "auto" }} />
          </Link>

          <nav className="adm-nav">
            {TOP_NAV.map(n => (
              <Link key={n.href} href={n.href}
                className={`adm-nav-link ${pathname === n.href ? "is-active" : ""}`}>
                {n.label}
              </Link>
            ))}
          </nav>

          <button className="adm-search-btn" onClick={() => setSearchOpen(true)}><Search size={18} /></button>
          <button className="adm-icon-btn adm-mobile-only"><ShoppingCart size={18} /></button>
          <button className="adm-login-btn adm-mobile-only"><LogIn size={16} /><span>ورود</span></button>

          <div className="adm-greet adm-desktop-only">
            <span className="adm-greet-text">سلام؛ <b>سوگند</b></span>
            <div className="adm-avatar"><UserCircle size={22} strokeWidth={1.5} /></div>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="adm-body">

        {/* Main content — LEFT in RTL */}
        <main className="adm-main">
          {children}
        </main>

        {/* Sidebar — RIGHT in RTL */}
        {menuOpen && <div className="adm-backdrop" onClick={() => setMenuOpen(false)} />}
        <aside className={`adm-sidebar ${menuOpen ? "is-open" : ""}`}>
          <button className="adm-sidebar-close" onClick={() => setMenuOpen(false)}><X size={18} /></button>

          <div className="adm-profile">
            <div className="adm-profile-avatar"><UserCircle size={26} strokeWidth={1.5} /></div>
            <div>
              <div className="adm-profile-name">ادمین</div>
              <div className="adm-profile-phone">{fa("09037029121")}</div>
            </div>
          </div>

          <nav className="adm-sidebar-nav">
            {SIDEBAR_ITEMS.map(item => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)
              return (
                <Link key={item.href} href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`adm-nav-item ${isActive ? "is-active" : ""}`}>
                  <Icon size={17} />
                  <span>{item.label}</span>
                  {isActive && <ChevronLeft size={13} className="adm-chevron" />}
                </Link>
              )
            })}
            <button className="adm-nav-item adm-logout" onClick={() => setLogoutOpen(true)}>
              <LogOut size={17} /><span>خروج از حساب کاربری</span>
            </button>
          </nav>
        </aside>
      </div>

      {/* ── Mobile tab bar ── */}
      <nav className="adm-tabbar">
        <Link href="/admin/dashboard" className={`adm-tab ${pathname.startsWith("/admin/dashboard") ? "is-active" : ""}`}>
          <Home size={20} /><span>خانه</span>
        </Link>
        <Link href="/admin/products" className={`adm-tab ${pathname.startsWith("/admin/products") ? "is-active" : ""}`}>
          <LayoutGrid size={20} /><span>محصولات</span>
        </Link>
        <button className="adm-tab" onClick={() => setSearchOpen(true)}>
          <Search size={20} /><span>جستجو</span>
        </button>
        <button className="adm-tab" onClick={() => setMenuOpen(true)}>
          <UserCircle size={20} /><span>پروفایل</span>
        </button>
      </nav>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

      {/* Logout confirm */}
      {logoutOpen && (
        <div className="adm-dlg-overlay" onClick={() => setLogoutOpen(false)}>
          <div className="adm-dlg" onClick={e => e.stopPropagation()}>
            <button className="adm-dlg-close" onClick={() => setLogoutOpen(false)}><X size={14} /></button>
            <p className="adm-dlg-title">آیا برای خروج از حساب کاربری خود اطمینان دارید؟</p>
            <div className="adm-dlg-actions">
              <button className="adm-btn adm-btn--filled" onClick={() => router.push("/auth/login")}>خروج</button>
              <button className="adm-btn adm-btn--outline" onClick={() => setLogoutOpen(false)}>انصراف</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Search Modal ── */
const SEARCH_ORDERS = [
  { id: "2345923", user: "سلحشور",  cat: "سبزیجات",  status: "pending" },
  { id: "2345924", user: "محمدی",    cat: "میوه‌ها",  status: "prep" },
  { id: "2345925", user: "احمدی",    cat: "نان",      status: "shipped" },
  { id: "2345926", user: "رضایی",    cat: "لبنیات",   status: "cancel" },
]
const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  pending: { label: "در انتظار تایید", cls: "pill pill--pending" },
  prep:    { label: "آماده‌سازی",       cls: "pill pill--prep"    },
  shipped: { label: "ارسال شده",        cls: "pill pill--shipped" },
  cancel:  { label: "لغو شده",          cls: "pill pill--cancel"  },
}

function SearchModal({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("")
  const results = q.trim()
    ? SEARCH_ORDERS.filter(o => o.id.includes(q) || o.user.includes(q) || o.cat.includes(q))
    : SEARCH_ORDERS

  return (
    <div className="adm-search-overlay" onClick={onClose}>
      <div className="adm-search-modal" onClick={e => e.stopPropagation()}>
        <div className="adm-search-input-wrap">
          <Search size={15} style={{ color: "var(--adm-fg-3)", flexShrink: 0 }} />
          <input autoFocus placeholder="جستجوی سفارش، کاربر، یا دسته‌بندی…"
            value={q} onChange={e => setQ(e.target.value)}
            onKeyDown={e => e.key === "Escape" && onClose()} />
        </div>
        <div>
          {results.length === 0 && <p style={{ padding: "20px", textAlign: "center", color: "var(--adm-fg-3)", fontSize: 13 }}>نتیجه‌ای یافت نشد</p>}
          {results.map(r => {
            const s = STATUS_LABELS[r.status]
            return (
              <button key={r.id} className="adm-search-result" onClick={onClose}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>#{fa(r.id)} · {r.user}</div>
                  <div style={{ fontSize: 12, color: "var(--adm-fg-3)", marginTop: 2 }}>{r.cat}</div>
                </div>
                <span className={s.cls}>{s.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
