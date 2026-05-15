"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Search, SlidersHorizontal, X } from "lucide-react"
import ProductCard from "@/components/shared/ProductCard/ProductCard"
import type { Product } from "@/types"

const ALL_PRODUCTS: Product[] = Array.from({ length: 20 }, (_, i) => ({
    id: `p${i}`,
    farmerId: "f1",
    categoryId: `c${i % 4}`,
    name: ["توت‌فرنگی خارجی", "گیلاس", "موز", "انگور", "پرتقال", "هلو", "تمشک", "لیمو", "سیب درختی", "گلابی", "انار", "خیار", "گوجه فرنگی", "کاهو", "اسفناج", "فلفل دلمه", "بادمجان", "کدو سبز", "هویج", "پیاز"][i],
    slug: `product-${i}`,
    description: null,
    origin: "ایران",
    harvestDate: null,
    qualityGrade: (["A","B","A","B","A","A","B","A","A","B","A","A","A","B","A","B","A","A","B","A"] as const)[i],
    unit: "کیلو",
    pricePerUnit: String(500000 + i * 75000),
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
}))

function SearchContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const q = searchParams.get("q") || ""
    const [query, setQuery] = useState(q)

    useEffect(() => { setQuery(q) }, [q])

    const results = q.trim()
        ? ALL_PRODUCTS.filter(p => p.name.includes(q) || p.origin?.includes(q))
        : []

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
        }
    }

    return (
        <div className="w-[90%] md:w-4/5 mx-auto py-8">
            {/* Search input */}
            <form onSubmit={handleSearch} className="mb-8">
                <div className="relative w-full max-w-2xl mx-auto">
                    <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="جستجوی محصولات..."
                        className="w-full h-[56px] border border-[#E9E8E3] rounded-[14px] pr-12 pl-12 text-[15px] text-[#212121] outline-none focus:border-[#51A46B] transition-all bg-white"
                        autoFocus
                    />
                    {query && (
                        <button type="button" onClick={() => { setQuery(""); router.push("/search") }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <X size={18} />
                        </button>
                    )}
                </div>
            </form>

            {q.trim() ? (
                <>
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-[#8A8A8A] text-[14px]">
                            {results.length} نتیجه برای <span className="text-[#212121] font-medium">&ldquo;{q}&rdquo;</span>
                        </p>
                    </div>

                    {results.length === 0 ? (
                        <div className="text-center py-20">
                            <Search size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-[18px] font-semibold text-[#212121] mb-2">نتیجه‌ای یافت نشد</h3>
                            <p className="text-[#8A8A8A] text-[14px]">محصولی با عبارت &ldquo;{q}&rdquo; پیدا نشد.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {results.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20">
                    <Search size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-[18px] font-semibold text-[#212121] mb-2">جستجو در محصولات</h3>
                    <p className="text-[#8A8A8A] text-[14px]">نام محصول مورد نظر خود را جستجو کنید.</p>
                </div>
            )}
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="text-center py-20">در حال بارگذاری...</div>}>
            <SearchContent />
        </Suspense>
    )
}
