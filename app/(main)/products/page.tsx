"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { SlidersHorizontal } from "lucide-react"
import { productService } from "@/services/product"
import type { Product } from "@/types"
import ProductCard from "@/components/shared/ProductCard/ProductCard"

const CATEGORIES = [
    { key: "all", label: "همه" },
    { key: "sabzijat", label: "سبزیجات" },
    { key: "mive", label: "میوه" },
    { key: "sayfijat", label: "صیفی‌جات" },
]

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState("all")
    const [priceRange, setPriceRange] = useState(2000)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        setLoading(true)
        productService.getProducts({ page, pageSize: 12, categoryId: activeCategory !== "all" ? activeCategory : undefined })
            .then((res) => {
                setProducts(res.items || [])
                setTotalPages(res.meta?.totalPages || 1)
            })
            .catch(() => {
                setProducts([])
            })
            .finally(() => setLoading(false))
    }, [activeCategory, page])

    return (
        <div className="w-[90%] md:w-4/5 mx-auto py-8">
            <div className="flex gap-8">
                <aside className="hidden md:flex flex-col gap-6 w-[200px] shrink-0 text-right">
                    <div className="flex items-center gap-2 text-[#51A46B] font-bold text-[15px]">
                        <SlidersHorizontal size={16} /><span>فیلترها</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-[14px] text-[#212121] mb-3">دسته‌بندی‌ها</h4>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((c) => (
                                <button key={c.key} onClick={() => { setActiveCategory(c.key); setPage(1) }}
                                    className={`px-3 py-1 rounded-full text-[13px] border transition-colors ${activeCategory === c.key ? "bg-[#51A46B] text-white border-[#51A46B]" : "border-[#E9E8E3] text-[#505050] hover:border-[#51A46B]"}`}>
                                    {c.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-[14px] text-[#212121] mb-3">قیمت</h4>
                        <input type="range" min={100} max={2000} value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full accent-[#51A46B]" />
                        <div className="flex justify-between text-[12px] text-[#505050] mt-1"><span>۱۰۰ تومان</span><span>{priceRange.toLocaleString("fa-IR")} تومان</span></div>
                    </div>
                </aside>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <button className="flex items-center gap-1 text-[13px] text-[#505050] border border-[#E9E8E3] rounded-[8px] px-3 py-1.5">مرتب سازی بر اساس ↓</button>
                        <h1 className="text-[22px] font-bold text-[#212121]">محصولات</h1>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="border border-[#E9E8E3] rounded-[16px] p-4 animate-pulse">
                                    <div className="w-full h-40 bg-gray-100 rounded-[12px] mb-3" />
                                    <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {products.map((p) => (<ProductCard key={p.id} product={p} />))}
                        </div>
                    )}

                    {!loading && products.length === 0 && (
                        <div className="text-center py-20 text-[#8A8A8A]">محصولی یافت نشد</div>
                    )}

                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-10">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button key={p} onClick={() => setPage(p)}
                                    className={`w-8 h-8 rounded-full text-[13px] font-medium ${page === p ? "bg-[#51A46B] text-white" : "border border-[#E9E8E3] text-[#505050] hover:border-[#51A46B]"}`}>
                                    {p.toLocaleString("fa-IR")}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
