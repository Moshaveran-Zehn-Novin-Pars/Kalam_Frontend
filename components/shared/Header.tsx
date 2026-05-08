"use client"

import { ShoppingCart, Search, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/store/cartStore"
import { useAuthStore } from "@/store/authStore"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"

const NAV_LINKS = [
    { href: "/", label: "صفحه اصلی" },
    { href: "/products", label: "محصولات" },
    { href: "#", label: "تماس با ما" },
    { href: "#", label: "درباره ی ما" },
]

export default function Header() {
    const router = useRouter()
    const openCart = useCartStore((s) => s.openCart)
    const totalItems = useCartStore((s) => s.totalItems)
    const { user, isAuthenticated, logout } = useAuthStore()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)

    const handleLogout = async () => {
        await logout()
        setShowUserMenu(false)
        router.push("/")
    }

    // Role-based dashboard link
    const dashboardHref =
        user?.role === "ADMIN" || user?.role === "SUPPORT"
            ? "/admin"
            : user?.role === "FARMER"
                ? "/farmer"
                : user?.role === "DRIVER"
                    ? "/driver"
                    : "/account"

    return (
        <>
            <header className="flex justify-center py-4 bg-white border-b border-[#E9E8E3] sticky top-0 z-40">
                <div className="w-[90%] md:w-4/5 flex items-center justify-between">

                    {/* Mobile: hamburger + logo */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button onClick={() => setMobileMenuOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <Link href="/">
                            <Image src="/logo.svg" alt="کلم" width={50} height={30} className="w-auto" />
                        </Link>
                    </div>

                    {/* Desktop: nav links + logo */}
                    <nav className="hidden md:flex gap-8 text-[18px] items-center">
                        <Link href="/">
                            <Image src="/logo.svg" alt="کلم" width={50} height={30} className="w-auto" />
                        </Link>
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-black hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions (right side) */}
                    <div className="flex items-center gap-2 md:gap-3">

                        {/* Search */}
                        <button className="w-[40px] h-[40px] md:w-[49px] md:h-[49px] border border-primary rounded-[10px] flex items-center justify-center hover:bg-primary-light transition-colors">
                            <Search size={18} className="text-primary" />
                        </button>

                        {/* Cart */}
                        <button
                            onClick={openCart}
                            className="relative w-[40px] h-[40px] md:w-[49px] md:h-[49px] border border-primary rounded-[10px] flex items-center justify-center hover:bg-primary-light transition-colors"
                        >
                            <ShoppingCart size={18} className="text-primary" />
                            {totalItems() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems()}
                </span>
                            )}
                        </button>

                        {/* Auth: Guest */}
                        {!isAuthenticated && (
                            <Link
                                href="/auth/login"
                                className="flex items-center gap-2 border border-primary text-primary rounded-[10px] px-3 md:px-4 h-[40px] md:h-[49px] text-[16px] md:text-[18px] hover:bg-primary-light transition-colors"
                            >
                                <span className="hidden md:inline">ورود / ثبت‌نام</span>
                                <span className="md:hidden">ورود</span>
                            </Link>
                        )}

                        {/* Auth: Logged in */}
                        {isAuthenticated && user && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu((v) => !v)}
                                    className="flex items-center gap-2 border border-primary rounded-[10px] px-3 h-[40px] md:h-[49px] hover:bg-primary-light transition-colors"
                                >
                                    {/* Avatar */}
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.firstName ?? ""}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-sm">
                                            {(user.firstName ?? user.phone)?.[0]}
                                        </div>
                                    )}
                                    <span className="hidden md:inline text-[16px] text-black">
                    سلام؛ {user.firstName ?? user.phone}
                  </span>
                                </button>

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute left-0 top-[54px] bg-white border border-[#E9E8E3] rounded-[12px] shadow-card min-w-[160px] overflow-hidden z-50"
                                        >
                                            <Link
                                                href={dashboardHref}
                                                onClick={() => setShowUserMenu(false)}
                                                className="block px-4 py-3 text-right text-[15px] hover:bg-primary-light transition-colors"
                                            >
                                                پنل کاربری
                                            </Link>
                                            <Link
                                                href="/account/orders"
                                                onClick={() => setShowUserMenu(false)}
                                                className="block px-4 py-3 text-right text-[15px] hover:bg-primary-light transition-colors"
                                            >
                                                سفارش‌هایم
                                            </Link>
                                            <Link
                                                href="/account/profile"
                                                onClick={() => setShowUserMenu(false)}
                                                className="block px-4 py-3 text-right text-[15px] hover:bg-primary-light transition-colors"
                                            >
                                                پروفایل
                                            </Link>
                                            <hr className="border-[#E9E8E3]" />
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-right px-4 py-3 text-[15px] text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                خروج
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                    >
                        <button
                            className="absolute inset-0 bg-black/40"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="بستن منو"
                        />
                        <motion.aside
                            className="absolute right-0 top-0 w-64 h-full bg-white p-5 flex flex-col"
                            initial={{ x: 24, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 24, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="mb-6 self-start"
                            >
                                <X />
                            </button>

                            {/* User info in mobile */}
                            {isAuthenticated && user && (
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E9E8E3]">
                                    <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold">
                                        {(user.firstName ?? user.phone)?.[0]}
                                    </div>
                                    <div>
                                        <p className="text-[15px] font-bold">
                                            {user.firstName ?? "کاربر"}
                                        </p>
                                        <p className="text-[13px] text-neutral-10">{user.phone}</p>
                                    </div>
                                </div>
                            )}

                            <nav className="flex flex-col gap-4 text-right text-[17px]">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-auto">
                                {!isAuthenticated ? (
                                    <Link
                                        href="/auth/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block text-center bg-primary text-white rounded-[10px] py-3 text-[16px]"
                                    >
                                        ورود / ثبت‌نام
                                    </Link>
                                ) : (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-center text-red-500 border border-red-200 rounded-[10px] py-3 text-[16px]"
                                    >
                                        خروج از حساب
                                    </button>
                                )}
                            </div>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
