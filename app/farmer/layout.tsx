"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
    LayoutDashboard, Package, ShoppingBag, Wallet,
    Star, UserCircle, LogOut, Menu, X, Bell, ChevronLeft
} from "lucide-react"
import "./farmer.css"

function fa(n: string | number) {
    return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d])
}

const NAV = [
    { href: "/farmer/dashboard", label: "داشبورد",         icon: LayoutDashboard },
    { href: "/farmer/products",  label: "محصولات من",       icon: Package },
    { href: "/farmer/orders",    label: "سفارش‌های دریافتی", icon: ShoppingBag },
    { href: "/farmer/finance",   label: "مالی و تسویه",      icon: Wallet },
    { href: "/farmer/reviews",   label: "نظرات خریداران",    icon: Star },
    { href: "/farmer/profile",   label: "پروفایل من",        icon: UserCircle },
]

export default function FarmerLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false)
    const [logoutOpen, setLogoutOpen] = useState(false)

    return (
        <div dir="rtl" className="farmer-root">

            {/* ── Topbar ── */}
            <header className="farmer-topbar">
                <div className="farmer-topbar-inner">
                    <button className="farmer-ham" onClick={() => setMenuOpen(true)}>
                        <Menu size={20} />
                    </button>

                    <Link href="/" className="farmer-logo">کلم</Link>

                    <div className="farmer-topbar-actions">
                        <button className="farmer-notif-btn">
                            <Bell size={18} />
                            <span className="farmer-notif-dot" />
                        </button>
                        <div className="farmer-topbar-user">
                            <div className="farmer-topbar-avatar">ب</div>
                            <span className="farmer-topbar-name">باغدار گرامی</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── Body ── */}
            <div className="farmer-body">
                <main className="farmer-main">{children}</main>

                {/* Sidebar — سمت راست */}
                {menuOpen && <div className="farmer-backdrop" onClick={() => setMenuOpen(false)} />}
                <aside className={`farmer-sidebar ${menuOpen ? "is-open" : ""}`}>
                    <button className="farmer-sidebar-close" onClick={() => setMenuOpen(false)}>
                        <X size={18} />
                    </button>

                    <div className="farmer-profile-block">
                        <div className="farmer-profile-avatar">ب</div>
                        <div>
                            <div className="farmer-profile-name">باغدار گرامی</div>
                            <div className="farmer-profile-phone">{fa("09111111111")}</div>
                        </div>
                    </div>

                    <nav className="farmer-nav">
                        {NAV.map(item => {
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
                        <button className="farmer-nav-item farmer-logout"
                                onClick={() => setLogoutOpen(true)}>
                            <LogOut size={17} /><span>خروج از حساب</span>
                        </button>
                    </nav>
                </aside>
            </div>

            {/* Logout confirm */}
            {logoutOpen && (
                <div className="farmer-dlg-overlay" onClick={() => setLogoutOpen(false)}>
                    <div className="farmer-dlg" onClick={e => e.stopPropagation()}>
                        <button className="farmer-dlg-close" onClick={() => setLogoutOpen(false)}><X size={14} /></button>
                        <p className="farmer-dlg-title">آیا می‌خواهید از حساب خود خارج شوید؟</p>
                        <div className="farmer-dlg-actions">
                            <button className="farmer-btn farmer-btn--filled"
                                    onClick={() => router.push("/auth/login")}>خروج</button>
                            <button className="farmer-btn farmer-btn--outline"
                                    onClick={() => setLogoutOpen(false)}>انصراف</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}