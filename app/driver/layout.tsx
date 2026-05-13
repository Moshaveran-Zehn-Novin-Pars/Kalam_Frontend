"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
    LayoutDashboard, Package, Navigation,
    History, Wallet, User, LogOut, ChevronLeft, X,
    Search, ShoppingCart, LogIn, Home, LayoutGrid, Menu
} from "lucide-react"
import "../admin/admin.css"
import "./driver.css"

function fa(n: string | number) {
    return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d])
}

const SIDEBAR_ITEMS = [
    { href: "/driver/dashboard",  label: "داشبورد",     icon: LayoutDashboard },
    { href: "/driver/deliveries", label: "سفارش‌ها",    icon: Package },
    { href: "/driver/active",     label: "تحویل فعال",  icon: Navigation },
    { href: "/driver/history",    label: "تاریخچه",     icon: History },
    { href: "/driver/earnings",   label: "درآمد",       icon: Wallet },
    { href: "/driver/profile",    label: "پروفایل",     icon: User },
]

const TOP_NAV = [
    { href: "/",         label: "صفحه اصلی" },
    { href: "/products", label: "محصولات" },
    { href: "/about",    label: "درباره‌ی ما" },
    { href: "/contact",  label: "تماس با ما" },
]

export default function DriverLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [online, setOnline] = useState(true)
    const [logoutOpen, setLogoutOpen] = useState(false)

    return (
        <div dir="rtl" className="driver-root">

            {/* ── Topbar ── */}
            <header className="driver-topbar">
                <div className="driver-topbar-inner">
                    <button className="driver-ham" onClick={() => setMenuOpen(true)}><Menu size={20} /></button>

                    <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                        <img src="/logo.svg" alt="کلم" style={{ height: 32, width: "auto" }} />
                    </Link>

                    <nav className="driver-top-nav">
                        {TOP_NAV.map(n => (
                            <Link key={n.href} href={n.href}
                                className={`driver-top-nav-link ${pathname === n.href ? "is-active" : ""}`}>
                                {n.label}
                            </Link>
                        ))}
                    </nav>

                    <button className="driver-search-btn" onClick={() => setSearchOpen(true)}><Search size={18} /></button>
                    <button className="driver-icon-btn driver-mobile-only"><ShoppingCart size={18} /></button>
                    <button className="driver-login-btn driver-mobile-only"><LogIn size={16} /><span>ورود</span></button>

                    <div className="driver-greet driver-desktop-only">
                        <span className="driver-greet-text">سلام؛ <b>علی جان</b></span>
                        <div className="driver-avatar"><User size={22} strokeWidth={1.5} /></div>
                    </div>
                </div>
            </header>

            {/* ── Body ── */}
            <div className="driver-body">
                <main className="driver-main">{children}</main>

                {menuOpen && <div className="driver-backdrop" onClick={() => setMenuOpen(false)} />}
                <aside className={`driver-sidebar ${menuOpen ? "is-open" : ""}`}>
                    <button className="driver-sidebar-close" onClick={() => setMenuOpen(false)}><X size={18} /></button>

                    <div className="driver-profile-block">
                        <div className="driver-profile-avatar">ر</div>
                        <div>
                            <div className="driver-profile-name">راننده گرامی</div>
                            <div className="driver-profile-phone">{fa("09111111111")}</div>
                        </div>
                    </div>

                    <nav className="driver-nav">
                        {SIDEBAR_ITEMS.map(({ href, label, icon: Icon }) => {
                            const isActive = pathname === href || (href !== "/driver/dashboard" && pathname.startsWith(href))
                            return (
                                <Link key={href} href={href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`driver-nav-item${isActive ? " is-active" : ""}`}>
                                    <Icon size={17} />
                                    <span>{label}</span>
                                    {isActive && <ChevronLeft size={13} className="driver-chevron" />}
                                </Link>
                            )
                        })}

                        <button className="driver-nav-item driver-logout" onClick={() => setLogoutOpen(true)}>
                            <LogOut size={17} /><span>خروج از حساب</span>
                        </button>
                    </nav>

                    <div className={`driver-online-toggle ${online ? "is-online" : "is-offline"}`}
                        onClick={() => setOnline(p => !p)}>
                        <span>{online ? "🟢 آنلاین" : "⚫ آفلاین"}</span>
                        <div className="driver-toggle-track">
                            <div className="driver-toggle-thumb" />
                        </div>
                    </div>
                </aside>
            </div>

            {/* ── Mobile tab bar ── */}
            <nav className="driver-tabbar">
                <Link href="/driver/dashboard" className={`driver-tab ${pathname.startsWith("/driver/dashboard") ? "is-active" : ""}`}>
                    <Home size={20} /><span>خانه</span>
                </Link>
                <Link href="/driver/deliveries" className={`driver-tab ${pathname.startsWith("/driver/deliveries") ? "is-active" : ""}`}>
                    <Package size={20} /><span>سفارش‌ها</span>
                </Link>
                <button className="driver-tab" onClick={() => setSearchOpen(true)}>
                    <Search size={20} /><span>جستجو</span>
                </button>
                <button className="driver-tab" onClick={() => setMenuOpen(true)}>
                    <User size={20} /><span>پروفایل</span>
                </button>
            </nav>

            {searchOpen && <DriverSearchModal onClose={() => setSearchOpen(false)} />}

            {/* Logout confirm */}
            {logoutOpen && (
                <div className="driver-dlg-overlay" onClick={() => setLogoutOpen(false)}>
                    <div className="driver-dlg" onClick={e => e.stopPropagation()}>
                        <button className="driver-dlg-close" onClick={() => setLogoutOpen(false)}><X size={14} /></button>
                        <p className="driver-dlg-title">آیا می‌خواهید از حساب خود خارج شوید؟</p>
                        <div className="driver-dlg-actions">
                            <button className="driver-btn driver-btn--filled" onClick={() => router.push("/auth/login")}>خروج</button>
                            <button className="driver-btn driver-btn--outline" onClick={() => setLogoutOpen(false)}>انصراف</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

/* ── Search Modal ── */
const SEARCH_ORDERS = [
    { id: "DLV-041", user: "سوپرمارکت ستاره", cat: "تحویل", status: "pending" },
    { id: "DLV-042", user: "رستوران آرمان",    cat: "تحویل", status: "active" },
    { id: "DLV-039", user: "کافه سبز",        cat: "تحویل", status: "done" },
    { id: "DLV-038", user: "هایپرمارکت نور",  cat: "تحویل", status: "done" },
]
const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
    pending: { label: "در انتظار", cls: "driver-pill driver-pill--pending" },
    active:  { label: "در مسیر",   cls: "driver-pill driver-pill--active" },
    done:    { label: "تحویل شده", cls: "driver-pill driver-pill--done" },
}

function DriverSearchModal({ onClose }: { onClose: () => void }) {
    const [q, setQ] = useState("")
    const results = q.trim()
        ? SEARCH_ORDERS.filter(o => o.id.includes(q) || o.user.includes(q))
        : SEARCH_ORDERS

    return (
        <div className="driver-search-overlay" onClick={onClose}>
            <div className="driver-search-modal" onClick={e => e.stopPropagation()}>
                <div className="driver-search-input-wrap">
                    <Search size={15} style={{ color: "var(--d-fg-3)", flexShrink: 0 }} />
                    <input autoFocus placeholder="جستجوی تحویل یا خریدار…"
                        value={q} onChange={e => setQ(e.target.value)}
                        onKeyDown={e => e.key === "Escape" && onClose()} />
                </div>
                <div>
                    {results.length === 0 && <p style={{ padding: "20px", textAlign: "center", color: "var(--d-fg-3)", fontSize: 13 }}>نتیجه‌ای یافت نشد</p>}
                    {results.map(r => {
                        const s = STATUS_LABELS[r.status]
                        return (
                            <button key={r.id} className="driver-search-result" onClick={onClose}>
                                <div>
                                    <div style={{ fontWeight: 500, fontSize: 13 }}>{r.id} · {r.user}</div>
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
