"use client"

import { ShoppingCart, Search } from "lucide-react"
import Button from "@/components/ui/Button"
import Link from "next/link"
import { useCartStore } from "@/store/cartStore"

export default function Header() {
    const openCart = useCartStore((s) => s.openCart)
    const items = useCartStore((s) => s.items)

    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <header className="flex items-center justify-between px-10 py-4 border-b bg-white">

            {/* راست (لوگو) */}
            <Link href="/" className="text-xl font-bold text-[#51A46B]">
                کلم
            </Link>

            {/* وسط (منو) */}
            <nav className="flex gap-10 text-[16px]">
                <Link href="/">صفحه اصلی</Link>
                <Link href="/products">محصولات</Link>
                <Link href="#">تماس با ما</Link>
                <Link href="#">درباره ما</Link>
            </nav>

            {/* چپ */}
            <div className="flex items-center gap-3">

                {/* دکمه ثبت نام */}
                <button
                    className="w-[166px] h-[49px] border rounded-[10px] flex items-center justify-center text-[18px]"
                    style={{
                        borderColor: "#51A46B",
                    }}
                >
                    ورود / ثبت‌نام
                </button>

                {/* سبد خرید */}
                <button
                    onClick={openCart}
                    className="relative w-[49px] h-[49px] border rounded-[10px] flex items-center justify-center"
                    style={{ borderColor: "#51A46B" }}
                >
                    <ShoppingCart size={20} color="#51A46B" />

                    {totalCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {totalCount}
            </span>
                    )}
                </button>

                {/* سرچ */}
                <button
                    className="w-[49px] h-[49px] border rounded-[10px] flex items-center justify-center"
                    style={{ borderColor: "#51A46B" }}
                >
                    <Search size={20} color="#51A46B" />
                </button>

            </div>
        </header>
    )
}