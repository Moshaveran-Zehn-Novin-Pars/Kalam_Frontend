"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Home, ChevronLeft, SlidersHorizontal } from "lucide-react"
import ProductCard from "@/components/shared/ProductCard/ProductCard"
import type { Product, QualityGrade } from "@/types"

const CATEGORIES: Record<string, { name: string; desc: string }> = {
    "sabzijat": { name: "سبزیجات", desc: "سبزیجات تازه و ارگانیک از باغات سراسر ایران" },
    "mive": { name: "میوه", desc: "انواع میوه‌های فصلی و وارداتی با بالاترین کیفیت" },
    "sayfijat": { name: "صیفی‌جات", desc: "صیفی‌جات تازه و درجه یک برای مصارف عمده" },
    "khojaste": { name: "خشکبار", desc: "خشکبار و آجیل با کیفیت عالی" },
}

const PRODUCTS_BY_CATEGORY: Record<string, Product[]> = {
    "sabzijat": Array.from({ length: 8 }, (_, i) => ({
        id: `v${i}`,
        farmerId: "f1",
        categoryId: "c1",
        name: ["گوجه فرنگی", "خیار", "کاهو", "اسفناج", "فلفل دلمه", "بادمجان", "کدو سبز", "هویج"][i],
        slug: `veg-${i}`,
        description: null,
        origin: ["شیراز", "اصفهان", "تهران", "اهواز"][i % 4],
        harvestDate: null,
        qualityGrade: (["A", "A", "B", "A", "A", "B", "A", "A"] as const)[i],
        unit: "کیلو",
        pricePerUnit: String(300000 + i * 40000),
        minOrderQty: "1",
        maxOrderQty: null,
        stockQty: "500",
        reservedQty: "0",
        status: "ACTIVE" as const,
        requiresColdChain: false,
        storageTempMin: null,
        storageTempMax: null,
        shelfLifeDays: null,
        viewsCount: 0,
        salesCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        images: [],
    })),
    "mive": Array.from({ length: 8 }, (_, i) => ({
        id: `f${i}`,
        farmerId: "f2",
        categoryId: "c2",
        name: ["سیب درختی", "پرتقال شمال", "انگور بی‌دانه", "هلو شیراز", "انار", "کیوی", "موز", "توت فرنگی"][i],
        slug: `fruit-${i}`,
        description: null,
        origin: ["شیراز", "مازندران", "تبریز", "خراسان"][i % 4],
        harvestDate: null,
        qualityGrade: (["A", "A", "B", "A", "A", "A", "B", "A"] as const)[i],
        unit: "کیلو",
        pricePerUnit: String(500000 + i * 60000),
        minOrderQty: "1",
        maxOrderQty: null,
        stockQty: "500",
        reservedQty: "0",
        status: "ACTIVE" as const,
        requiresColdChain: i % 2 === 0,
        storageTempMin: i % 2 === 0 ? 2 : null,
        storageTempMax: i % 2 === 0 ? 8 : null,
        shelfLifeDays: null,
        viewsCount: 0,
        salesCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        images: [],
    })),
    "sayfijat": Array.from({ length: 6 }, (_, i) => ({
        id: `s${i}`,
        farmerId: "f3",
        categoryId: "c3",
        name: ["هندوانه", "خربزه", "طالبی", "کدو حلوایی", "بادمجان", "فلفل سبز"][i],
        slug: `sayfi-${i}`,
        description: null,
        origin: "اصفهان",
        harvestDate: null,
        qualityGrade: (["A", "B", "A", "A", "B", "A"] as const)[i],
        unit: "کیلو",
        pricePerUnit: String(200000 + i * 50000),
        minOrderQty: "1",
        maxOrderQty: null,
        stockQty: "500",
        reservedQty: "0",
        status: "ACTIVE" as const,
        requiresColdChain: false,
        storageTempMin: null,
        storageTempMax: null,
        shelfLifeDays: null,
        viewsCount: 0,
        salesCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        images: [],
    })),
}

const QUALITY_LABELS: Record<QualityGrade, string> = { A: "درجه یک", B: "درجه دو", C: "درجه سه" }
const QUALITY_COLORS: Record<QualityGrade, string> = { A: "bg-green-100 text-green-700", B: "bg-yellow-100 text-yellow-700", C: "bg-gray-100 text-gray-600" }

export default function CategoryPage() {
    const { slug } = useParams<{ slug: string }>()
    const cat = CATEGORIES[slug as string]
    const products = PRODUCTS_BY_CATEGORY[slug as string] || []

    const [priceRange, setPriceRange] = useState(1000)
    const [qualityFilter, setQualityFilter] = useState<QualityGrade | "all">("all")

    const filtered = products.filter(p => {
        const price = parseFloat(p.pricePerUnit) / 10 / 10000
        if (price > priceRange) return false
        if (qualityFilter !== "all" && p.qualityGrade !== qualityFilter) return false
        return true
    })

    if (!cat) {
        return (
            <div className="w-[90%] md:w-4/5 mx-auto py-20 text-center">
                <h1 className="text-[24px] font-bold text-[#212121] mb-4">دسته‌بندی یافت نشد</h1>
                <Link href="/products" className="text-[#51A46B] font-medium">مشاهده همه محصولات</Link>
            </div>
        )
    }

    return (
        <div className="w-[90%] md:w-4/5 mx-auto py-8">
            <div className="flex items-center gap-2 text-[13px] text-[#8A8A8A] mb-6">
                <Link href="/" className="hover:text-[#51A46B] flex items-center gap-1"><Home size={14} />خانه</Link>
                <ChevronLeft size={14} />
                <Link href="/products" className="hover:text-[#51A46B]">محصولات</Link>
                <ChevronLeft size={14} />
                <span className="text-[#212121]">{cat.name}</span>
            </div>

            <div className="flex items-end justify-between mb-8">
                <div>
                    <h1 className="text-[28px] font-extrabold text-[#212121]">{cat.name}</h1>
                    <p className="text-[#8A8A8A] text-[14px] mt-1">{cat.desc}</p>
                </div>
                <p className="text-[#8A8A8A] text-[13px]">{filtered.length} محصول</p>
            </div>

            <div className="flex gap-8">
                <aside className="hidden md:block w-64 flex-shrink-0">
                    <div className="sticky top-24 space-y-6">
                        <div>
                            <h3 className="font-semibold text-[14px] text-[#212121] mb-3 flex items-center gap-2">
                                <SlidersHorizontal size={15} /> فیلترها
                            </h3>
                        </div>
                        <div>
                            <h4 className="text-[13px] font-medium text-[#212121] mb-3">درجه کیفیت</h4>
                            <div className="space-y-2">
                                {(["all", "A", "B", "C"] as const).map(g => (
                                    <button key={g} onClick={() => setQualityFilter(g)}
                                        className={`block w-full text-right px-3 py-2 rounded-lg text-[13px] transition-colors ${
                                            qualityFilter === g ? "bg-[#F0F9F3] text-[#51A46B] font-medium" : "text-[#8A8A8A] hover:bg-gray-50"
                                        }`}>
                                        {g === "all" ? "همه" : `${QUALITY_LABELS[g]} (${g})`}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[13px] font-medium text-[#212121] mb-3">حداکثر قیمت (تومان)</h4>
                            <input type="range" min={1} max={1000} value={priceRange} onChange={e => setPriceRange(Number(e.target.value))}
                                className="w-full accent-[#51A46B]" />
                            <div className="flex justify-between text-[12px] text-[#8A8A8A] mt-1">
                                <span>۱۰٬۰۰۰</span>
                                <span>{new Intl.NumberFormat("fa-IR").format(priceRange * 10000)}</span>
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="flex-1 min-w-0">
                    {filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-[#8A8A8A]">محصولی با این فیلترها یافت نشد.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {filtered.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
