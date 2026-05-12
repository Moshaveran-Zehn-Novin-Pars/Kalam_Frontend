"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { Product } from "@/types"
import ProductCard from "@/components/shared/ProductCard/ProductCard";

const TABS = [
    { value: "mive",     label: "میوه" },
    { value: "sabzijat", label: "سبزیجات" },
    { value: "sayfijat", label: "صیفی‌جات" },
]

const MOCK: Product[] = Array.from({ length: 8 }, (_, i) => ({
    id: `m${i}`, farmerId: "f1", categoryId: `c0`,
    name: "توت‌فرنگی خارجی",
    slug: `product-${i}`, description: null, origin: "ایران", harvestDate: null,
    qualityGrade: "A",
    unit: "کیلو",
    pricePerUnit: "128500",
    minOrderQty: "1", maxOrderQty: null,
    stockQty: "500", reservedQty: "0", status: "ACTIVE" as const,
    requiresColdChain: false, storageTempMin: null, storageTempMax: null,
    shelfLifeDays: null, viewsCount: 0, salesCount: 0,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    images: [],
}))

export default function ProductsSection({ products }: { products?: Product[] }) {
    const [active, setActive] = useState("mive")
    const items = products?.length ? products : MOCK
    const shown = items

    return (
        <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16" dir="rtl">
            {/* هدر بخش محصولات */}
            <div className="flex flex-col items-center mb-8 sm:mb-12">
                <h2 className="text-[24px] sm:text-[32px] font-extrabold text-[#212121] mb-6 sm:mb-8">محصولات</h2>

                {/* تب‌ها */}
                <div className="flex gap-6 sm:gap-12 border-b border-[#E9E8E3] w-full max-w-sm justify-center">
                    {TABS.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActive(tab.value)}
                            className={`pb-2 sm:pb-3 px-1 sm:px-2 text-[14px] sm:text-[16px] relative transition-colors ${
                                active === tab.value ? "text-[#51A46B] font-bold" : "text-[#505050] hover:text-[#212121]"
                            }`}>
                            {tab.label}
                            {active === tab.value && (
                                <span className="absolute bottom-0 right-0 left-0 h-[2.5px] bg-[#51A46B] rounded-t-md" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* گرید محصولات (در موبایل ۲ ستونه، در تبلت ۳ و در دسکتاپ ۴ ستونه) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                <AnimatePresence mode="popLayout">
                    {shown.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
                </AnimatePresence>
            </div>
        </section>
    )
}
