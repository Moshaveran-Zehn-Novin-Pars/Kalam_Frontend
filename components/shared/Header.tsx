"use client"

import { ShoppingCart, Search } from "lucide-react"
import Button from "@/components/ui/Button"

export default function Header() {
    return (
        <header className="flex items-center justify-between px-10 py-4 border-b">

            {/* راست (لوگو) */}
            <div className="text-xl font-bold text-green-600">
                کلم
            </div>

            {/* وسط (منو) */}
            <nav className="flex gap-8 text-sm">
                <a href="/">صفحه اصلی</a>
                <a href="/products">محصولات</a>
                <a href="#">تماس با ما</a>
                <a href="#">درباره ما</a>
            </nav>

            {/* چپ */}
            <div className="flex items-center gap-3">
                <Button label="ورود / ثبت‌نام" variant="outline" />

                <button className="border p-2 rounded-lg">
                    <ShoppingCart size={18} />
                </button>

                <button className="border p-2 rounded-lg">
                    <Search size={18} />
                </button>
            </div>
        </header>
    )
}