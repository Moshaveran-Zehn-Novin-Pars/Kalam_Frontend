"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart, Search, Menu, X } from "lucide-react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { useCartStore } from "@/store/cartStore"
import { useAuthStore } from "@/store/authStore"

const NAV_LINKS = [
    { href: "/",        label: "صفحه اصلی" },
    { href: "/products", label: "محصولات"   },
    { href: "/contact",  label: "تماس با ما" },
    { href: "/about",    label: "درباره ما"  },
]

export default function Header() {
    const router   = useRouter()
    const openCart = useCartStore((s) => s.openCart)
    const totalItems = useCartStore((s) => s.totalItems)
    const { user, isAuthenticated, logout } = useAuthStore()

    const [mobileOpen,  setMobileOpen]  = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)

    const dashboardHref =
        user?.role === "ADMIN" || user?.role === "SUPPORT" ? "/admin"
            : user?.role === "FARMER" ? "/farmer"
                : user?.role === "DRIVER" ? "/driver"
                    : "/account"

    const handleLogout = async () => {
        await logout()
        setShowUserMenu(false)
        router.push("/")
    }

    return (
        <>
            <header
                className="bg-white sticky top-0 z-50 border-b border-[#E9E8E3]"
                dir="rtl"
            >
                <div className="max-w-7xl mx-auto px-4 h-[84px] flex justify-between items-center">

                    {/* Logo + Nav */}
                    <div className="flex items-center gap-10">
                        <Link href="/">
                            <img src="/logo.svg" alt="کلم" className="h-8 w-auto" />
                        </Link>

                        <nav className="hidden md:flex items-center gap-8">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-[#505050] hover:text-[#51A46B] transition font-medium text-[16px]"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">

                        {/* Search */}
                        <button className="w-12 h-12 flex items-center justify-center border border-[#E9E8E3] rounded-[14px] hover:bg-[#F5F5F5] hover:border-[#51A46B] transition">
                            <Search size={20} className="text-[#51A46B]" />
                        </button>

                        {/* Cart */}
                        <button
                            onClick={openCart}
                            className="w-12 h-12 flex items-center justify-center border border-[#E9E8E3] rounded-[14px] hover:bg-[#F5F5F5] hover:border-[#51A46B] transition relative"
                        >
                            <ShoppingCart size={20} className="text-[#51A46B]" />
                            {totalItems() > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 w-[22px] h-[22px] bg-[#51A46B] text-white text-[11px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                  {totalItems()}
                                </span>
                            )}
                        </button>

                        {/* Guest */}
                        {!isAuthenticated && (
                            <Link
                                href="/auth/login"
                                className="hidden sm:flex items-center gap-2.5 px-6 py-2.5 ml-1 border border-[#E9E8E3] rounded-[14px] hover:border-[#51A46B] hover:text-[#51A46B] transition group font-medium text-[15px] text-[#505050]"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                     stroke="#51A46B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/>
                                    <polyline points="10 17 15 12 10 7"/>
                                    <line x1="15" y1="12" x2="3" y2="12"/>
                                </svg>
                                <span>ورود / ثبت‌نام</span>
                            </Link>
                        )}

                        {/* Logged in */}
                        {isAuthenticated && user && (
                            <>
                                <button className="hidden sm:block bg-[#51A46B] text-white px-4 py-2.5 rounded-[14px] text-[15px] font-medium hover:bg-[#417F56] transition whitespace-nowrap">
                                    سفارش سریع
                                </button>

                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu((v) => !v)}
                                        className="flex items-center gap-2 border border-[#E9E8E3] rounded-[14px] px-3 h-12 hover:border-[#51A46B] transition"
                                    >
                                        <div className="w-[30px] h-[30px] rounded-full bg-[#E5F2E9] flex items-center justify-center overflow-hidden">
                                            {user.avatar
                                                ? <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                                                : <span className="text-[#51A46B] font-bold text-sm">
                                                    {(user.firstName ?? user.phone)?.[0]}
                                                  </span>}
                                        </div>
                                        <span className="hidden md:inline text-[15px] text-[#505050]">
                                          سلام؛ <b className="text-[#212121]">{user.firstName ?? "کاربر"}</b>
                                        </span>
                                    </button>

                                    <AnimatePresence>
                                        {showUserMenu && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute left-0 top-[56px] bg-white border border-[#E9E8E3] rounded-[14px] shadow-lg min-w-[170px] overflow-hidden z-50"
                                            >
                                                <Link href={dashboardHref} onClick={() => setShowUserMenu(false)}
                                                      className="block px-4 py-3 text-right text-[15px] text-[#212121] hover:bg-[#E5F2E9] transition">
                                                    پنل کاربری
                                                </Link>
                                                <Link href="/account/orders" onClick={() => setShowUserMenu(false)}
                                                      className="block px-4 py-3 text-right text-[15px] text-[#212121] hover:bg-[#E5F2E9] transition">
                                                    سفارش‌هایم
                                                </Link>
                                                <Link href="/account/profile" onClick={() => setShowUserMenu(false)}
                                                      className="block px-4 py-3 text-right text-[15px] text-[#212121] hover:bg-[#E5F2E9] transition">
                                                    پروفایل
                                                </Link>
                                                <hr className="border-[#E9E8E3]" />
                                                <button onClick={handleLogout}
                                                        className="w-full text-right px-4 py-3 text-[15px] text-red-500 hover:bg-red-50 transition">
                                                    خروج
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        )}

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="md:hidden w-12 h-12 flex items-center justify-center border border-[#E9E8E3] rounded-[14px]"
                        >
                            <Menu size={22} className="text-[#505050]" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div className="fixed inset-0 z-[100]"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <button className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
                        <motion.aside
                            className="absolute right-0 top-0 w-[280px] h-full bg-white p-6 flex flex-col"
                            dir="rtl"
                            initial={{ x: 280, opacity: 0 }}
                            animate={{ x: 0,   opacity: 1 }}
                            exit={{ x: 280,    opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <button onClick={() => setMobileOpen(false)} className="mb-6 self-start text-[#505050] hover:text-black">
                                <X size={24} />
                            </button>

                            {isAuthenticated && user && (
                                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[#E9E8E3]">
                                    <div className="w-12 h-12 rounded-full bg-[#E5F2E9] flex items-center justify-center text-[#51A46B] font-bold text-lg">
                                        {(user.firstName ?? user.phone)?.[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[16px] text-[#212121]">{user.firstName ?? "کاربر"}</p>
                                        <p className="text-[14px] text-[#505050] mt-0.5">{user.phone}</p>
                                    </div>
                                </div>
                            )}

                            <nav className="flex flex-col gap-5 text-right">
                                {NAV_LINKS.map((link) => (
                                    <Link key={link.href} href={link.href}
                                          onClick={() => setMobileOpen(false)}
                                          className="text-[17px] font-medium text-[#212121] hover:text-[#51A46B] transition">
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-auto pt-6 border-t border-[#E9E8E3]">
                                {!isAuthenticated
                                    ? <Link href="/auth/login" onClick={() => setMobileOpen(false)}
                                            className="flex justify-center items-center gap-2 bg-[#51A46B] text-white rounded-[14px] py-3.5 text-[16px] font-medium hover:bg-[#417F56] transition">
                                        ورود / ثبت‌نام
                                    </Link>
                                    : <button onClick={handleLogout}
                                              className="w-full text-center text-red-500 border border-red-100 bg-red-50 rounded-[14px] py-3.5 text-[16px] font-medium hover:bg-red-100 transition">
                                        خروج از حساب
                                    </button>}
                            </div>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}