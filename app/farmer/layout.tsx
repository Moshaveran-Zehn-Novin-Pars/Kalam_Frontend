"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
    LayoutDashboard, Package, ShoppingBag, Wallet,
    Star, UserCircle, LogOut, Menu, X, Bell, ChevronLeft,
    Search, ShoppingCart, LogIn, Home, LayoutGrid,
    BarChart3, AlertTriangle, Award, BrainCircuit, TrendingUp, ClipboardList
} from "lucide-react"
import "./farmer.css"

function fa(n: string | number) {
    return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d])
}

const SIDEBAR_ITEMS = [
    { href: "/farmer/dashboard",    label: "داشبورد",           icon: LayoutDashboard },
    { href: "/farmer/analytics",    label: "تحلیل فروش",        icon: BarChart3 },
    { href: "/farmer/products",     label: "محصولات من",        icon: Package },
    { href: "/farmer/inventory",    label: "موجودی انبار",      icon: ClipboardList },
    { href: "/farmer/orders",       label: "سفارش‌های دریافتی", icon: ShoppingBag },
    { href: "/farmer/finance",      label: "مالی و تسویه",      icon: Wallet },
    { href: "/farmer/certificates", label: "گواهی‌ها",          icon: Award },
    { href: "/farmer/reviews",      label: "نظرات خریداران",    icon: Star },
    { href: "/farmer/tools/price-prediction", label: "ابزارهای هوشمند", icon: BrainCircuit },
    { href: "/farmer/profile",      label: "پروفایل من",        icon: UserCircle },
]

const TOP_NAV = [
    { href: "/",         label: "صفحه اصلی" },
    { href: "/products", label: "محصولات" },
    { href: "/about",    label: "درباره‌ی ما" },
    { href: "/contact",  label: "تماس با ما" },
]

export default function FarmerLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [logoutOpen, setLogoutOpen] = useState(false)

    return (
        <div dir="rtl" className="farmer-root">

            {/* ── Topbar ── */}
            <header className="farmer-topbar">
                <div className="farmer-topbar-inner">
                    <button className="farmer-ham" onClick={() => setMenuOpen(true)}><Menu size={20} /></button>

                    <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                        <img src="/logo.svg" alt="کلم" style={{ height: 32, width: "auto" }} />
                    </Link>

                    <nav className="farmer-top-nav">
                        {TOP_NAV.map(n => (
                            <Link key={n.href} href={n.href}
                                className={`farmer-top-nav-link ${pathname === n.href ? "is-active" : ""}`}>
                                {n.label}
                            </Link>
                        ))}
                    </nav>

                    <button className="farmer-search-btn" onClick={() => setSearchOpen(true)}><Search size={18} /></button>
                    <button className="farmer-icon-btn farmer-mobile-only"><ShoppingCart size={18} /></button>
                    <button className="farmer-login-btn farmer-mobile-only"><LogIn size={16} /><span>ورود</span></button>

                    <div className="farmer-greet farmer-desktop-only">
                        <span className="farmer-greet-text">سلام؛ <b>باغدار گرامی</b></span>
                        <div className="farmer-avatar"><UserCircle size={22} strokeWidth={1.5} /></div>
                    </div>
                </div>
            </header>

            {/* ── Body ── */}
            <div className="farmer-body">
                <main className="farmer-main">{children}</main>

                {menuOpen && <div className="farmer-backdrop" onClick={() => setMenuOpen(false)} />}
                <aside className={`farmer-sidebar ${menuOpen ? "is-open" : ""}`}>
                    <button className="farmer-sidebar-close" onClick={() => setMenuOpen(false)}><X size={18} /></button>

                    <div className="farmer-profile-block">
                        <div className="farmer-profile-avatar">ب</div>
                        <div>
                            <div className="farmer-profile-name">باغدار گرامی</div>
                            <div className="farmer-profile-phone">{fa("09111111111")}</div>
                        </div>
                    </div>

                    <nav className="farmer-nav">
                        {SIDEBAR_ITEMS.map(item => {
                            const Icon = item.icon
                            const isActive = pathname.startsWith(item.href)
                            return (
                                <Link key={item.href} href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`farmer-nav-item ${isActive ? "is-active" : ""}`}>
                                    <Icon size={17} />
                                    <span>{item.label}</span>
                                    {isActive && <ChevronLeft size={13} className="farmer-chevron" />}
                                </Link>
                            )
                        })}
                        <button className="farmer-nav-item farmer-logout" onClick={() => setLogoutOpen(true)}>
                            <LogOut size={17} /><span>خروج از حساب</span>
                        </button>
                    </nav>
                </aside>
            </div>

            {/* ── Mobile tab bar ── */}
            <nav className="farmer-tabbar">
                <Link href="/farmer/dashboard" className={`farmer-tab ${pathname.startsWith("/farmer/dashboard") ? "is-active" : ""}`}>
                    <Home size={20} /><span>خانه</span>
                </Link>
                <Link href="/farmer/products" className={`farmer-tab ${pathname.startsWith("/farmer/products") ? "is-active" : ""}`}>
                    <LayoutGrid size={20} /><span>محصولات</span>
                </Link>
                <button className="farmer-tab" onClick={() => setSearchOpen(true)}>
                    <Search size={20} /><span>جستجو</span>
                </button>
                <button className="farmer-tab" onClick={() => setMenuOpen(true)}>
                    <UserCircle size={20} /><span>پروفایل</span>
                </button>
            </nav>

            {searchOpen && <FarmerSearchModal onClose={() => setSearchOpen(false)} />}

            {/* Logout confirm */}
            {logoutOpen && (
                <div className="farmer-dlg-overlay" onClick={() => setLogoutOpen(false)}>
                    <div className="farmer-dlg" onClick={e => e.stopPropagation()}>
                        <button className="farmer-dlg-close" onClick={() => setLogoutOpen(false)}><X size={14} /></button>
                        <p className="farmer-dlg-title">آیا می‌خواهید از حساب خود خارج شوید؟</p>
                        <div className="farmer-dlg-actions">
                            <button className="farmer-btn farmer-btn--filled" onClick={() => router.push("/auth/login")}>خروج</button>
                            <button className="farmer-btn farmer-btn--outline" onClick={() => setLogoutOpen(false)}>انصراف</button>
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
    pending: { label: "در انتظار تایید", cls: "f-pill f-pill--pending" },
    prep:    { label: "آماده‌سازی",       cls: "f-pill f-pill--prep" },
    shipped: { label: "ارسال شده",        cls: "f-pill f-pill--shipped" },
    cancel:  { label: "لغو شده",          cls: "f-pill f-pill--cancel" },
}

function FarmerSearchModal({ onClose }: { onClose: () => void }) {
    const [q, setQ] = useState("")
    const results = q.trim()
        ? SEARCH_ORDERS.filter(o => o.id.includes(q) || o.user.includes(q) || o.cat.includes(q))
        : SEARCH_ORDERS

    return (
        <div className="farmer-search-overlay" onClick={onClose}>
            <div className="farmer-search-modal" onClick={e => e.stopPropagation()}>
                <div className="farmer-search-input-wrap">
                    <Search size={15} style={{ color: "var(--f-fg-3)", flexShrink: 0 }} />
                    <input autoFocus placeholder="جستجوی سفارش، کاربر، یا دسته‌بندی…"
                        value={q} onChange={e => setQ(e.target.value)}
                        onKeyDown={e => e.key === "Escape" && onClose()} />
                </div>
                <div>
                    {results.length === 0 && <p style={{ padding: "20px", textAlign: "center", color: "var(--f-fg-3)", fontSize: 13 }}>نتیجه‌ای یافت نشد</p>}
                    {results.map(r => {
                        const s = STATUS_LABELS[r.status]
                        return (
                            <button key={r.id} className="farmer-search-result" onClick={onClose}>
                                <div>
                                    <div style={{ fontWeight: 500, fontSize: 13 }}>#{fa(r.id)} · {r.user}</div>
                                    <div style={{ fontSize: 12, color: "var(--f-fg-3)", marginTop: 2 }}>{r.cat}</div>
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
