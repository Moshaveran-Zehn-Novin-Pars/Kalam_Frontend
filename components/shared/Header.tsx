"use client"

import { ShoppingCart, Search, Menu, LogIn, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/store/cartStore"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function Header() {
    const openCart = useCartStore((s) => s.openCart)
    const items = useCartStore((s) => s.items)

    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <header className="flex justify-center py-4 bg-white border-b border-[#E9E8E3]">
                <div className="w-[90%] md:w-4/5 flex items-center justify-between">
                    <div className="flex items-center gap-3 md:hidden">
                        <button onClick={() => setMobileMenuOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <Image src="/logo.svg" alt="کلم" width={40} height={25} />
                    </div>

                    <nav className="hidden md:flex gap-10 text-[16px] items-center">
                        <Link href="/">
                            <Image src="/logo.svg" alt="کلم" width={50} height={30} />
                        </Link>
                        <Link href="/">صفحه اصلی</Link>
                        <Link href="/products">محصولات</Link>
                        <Link href="#">تماس با ما</Link>
                        <Link href="#">درباره ما</Link>
                    </nav>

                    <div className="flex items-center gap-2 md:gap-3">
                        <button
                            className="w-[40px] h-[40px] md:w-[49px] md:h-[49px] border rounded-[6px] md:rounded-[10px] flex items-center justify-center"
                            style={{ borderColor: "#51A46B" }}
                        >
                            <Search size={18} className="md:w-5 md:h-5" color="#51A46B" />
                        </button>

                        <button
                            onClick={openCart}
                            className="relative w-[40px] h-[40px] md:w-[49px] md:h-[49px] border rounded-[6px] md:rounded-[10px] flex items-center justify-center"
                            style={{ borderColor: "#51A46B" }}
                        >
                            <ShoppingCart size={18} color="#51A46B" />

                            {totalCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                  {totalCount}
                </span>
                            )}
                        </button>

                        <button
                            className="flex items-center gap-1 md:gap-2 border text-[#51A46B] rounded-[6px] md:rounded-[10px] px-2 md:px-4 h-[40px] md:h-[49px]"
                            style={{ borderColor: "#51A46B" }}
                        >
                            <LogIn size={18} color="#51A46B" />
                            <span className="hidden md:inline">ورود / ثبت‌نام</span>
                            <span className="md:hidden">ورود</span>
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} // fade out overlay خیلی آروم
                        transition={{ duration: 0.18, ease: "easeOut" }} // overlay سریع‌تر/ملایم
                    >
                        {/* overlay background */}
                        <button
                            className="absolute inset-0 bg-black/40"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                        />

                        {/* sidebar */}
                        <motion.aside
                            className="absolute right-0 top-0 w-64 h-full bg-white p-5"
                            initial={{ x: 24, opacity: 0 }}   // از کمی بیرون راست + محو
                            animate={{ x: 0, opacity: 1 }}    // سریع بیاد ولی محو خیلی آروم
                            exit={{ x: 24, opacity: 0 }}      // خروج محو
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} // آروم و خوش‌فرم
                        >
                            <button onClick={() => setMobileMenuOpen(false)} className="mb-6">
                                <X />
                            </button>

                            <nav className="flex flex-col gap-4 text-right">
                                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                    صفحه اصلی
                                </Link>
                                <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
                                    محصولات
                                </Link>
                                <Link href="#" onClick={() => setMobileMenuOpen(false)}>
                                    تماس با ما
                                </Link>
                                <Link href="#" onClick={() => setMobileMenuOpen(false)}>
                                    درباره ما
                                </Link>
                            </nav>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
