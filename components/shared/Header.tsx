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
        <header className="flex items-center justify-between px-10 py-4 border-b bg-white sticky top-0 z-50">

            {/* راست (لوگو) */}
            <Link href="/" className="text-xl font-bold text-green-600">
                کلم
            </Link>

            {/* وسط (منو) */}
            <nav className="flex gap-8 text-sm">
                <Link href="/">صفحه اصلی</Link>
                <Link href="/products">محصولات</Link>
                <Link href="#">تماس با ما</Link>
                <Link href="#">درباره ما</Link>
            </nav>

            {/* چپ */}
            <div className="flex items-center gap-3">

                <Button label="ورود / ثبت‌نام" variant="outline" />

                {/* سبد خرید */}
                <button
                    onClick={openCart}
                    className="relative border p-2 rounded-lg hover:bg-gray-100 transition"
                >
                    <ShoppingCart size={18} />

                    {/* badge */}
                    {totalCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {totalCount}
            </span>
                    )}
                </button>

                {/* سرچ */}
                <button className="border p-2 rounded-lg hover:bg-gray-100 transition">
                    <Search size={18} />
                </button>

            </div>
        </header>
    )
}