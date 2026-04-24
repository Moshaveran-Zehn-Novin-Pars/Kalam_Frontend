"use client"

import { ShoppingCart, Search, Menu, LogIn, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/store/cartStore"
import { useState } from "react"

export default function Header() {
    const openCart = useCartStore((s) => s.openCart)
    const items = useCartStore((s) => s.items)

    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <header className="flex justify-center py-4 bg-white border-b border-[#E9E8E3]">
                <div className="w-[90%] md:w-4/5 flex items-center justify-between">

                    {/* 🟢 RIGHT (mobile) */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button onClick={() => setMobileMenuOpen(true)}>
                            <Menu size={24} />
                        </button>

                        <Image src="/logo.svg" alt="کلم" width={40} height={25} />
                    </div>

                    {/* 🟢 DESKTOP NAV */}
                    <nav className="hidden md:flex gap-10 text-[16px] items-center">
                        <Link href="/">
                            <Image src="/logo.svg" alt="کلم" width={50} height={30} />
                        </Link>
                        <Link href="/">صفحه اصلی</Link>
                        <Link href="/products">محصولات</Link>
                        <Link href="#">تماس با ما</Link>
                        <Link href="#">درباره ما</Link>
                    </nav>

                    {/* 🟢 LEFT (icons) */}
                    <div className="flex items-center gap-2 md:gap-3">

                        {/* search */}
                        <button className="w-[40px] h-[40px] md:w-[49px] md:h-[49px] border rounded-[6px] md:rounded-[10px] flex items-center justify-center"
                                style={{ borderColor: "#51A46B" }}>
                            <Search size={18} className="md:w-5 md:h-5" color="#51A46B" />
                        </button>

                        {/* cart */}
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

                        {/* login */}
                        <button
                            className="flex items-center gap-1 md:gap-2 border text-[#51A46B]
              rounded-[6px] md:rounded-[10px] px-2 md:px-4 h-[40px] md:h-[49px]"
                            style={{ borderColor: "#51A46B" }}
                        >
                            <LogIn size={18} color="#51A46B" />
                            <span className="hidden md:inline">ورود / ثبت‌نام</span>
                            <span className="md:hidden">ورود</span>
                        </button>

                    </div>
                </div>
            </header>

            {/* 📱 MOBILE MENU */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black/40 z-50">
                    <div className="fixed right-0 top-0 w-64 h-full bg-white p-5">

                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="mb-6"
                        >
                            <X />
                        </button>

                        <nav className="flex flex-col gap-4 text-right">
                            <Link href="/">صفحه اصلی</Link>
                            <Link href="/products">محصولات</Link>
                            <Link href="#">تماس با ما</Link>
                            <Link href="#">درباره ما</Link>
                        </nav>

                    </div>
                </div>
            )}
        </>
    )
}