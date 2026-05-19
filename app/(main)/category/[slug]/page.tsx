"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Home, ChevronLeft, SlidersHorizontal } from "lucide-react"
import { productService } from "@/services/product"
import { categoryService } from "@/services/category"
import type { Product, Category } from "@/types"
import ProductCard from "@/components/shared/ProductCard/ProductCard"

export default function CategoryPage() {
    const { slug } = useParams<{ slug: string }>()
    const [products, setProducts] = useState<Product[]>([])
    const [category, setCategory] = useState<Category | null>(null)
    const [loading, setLoading] = useState(true)
    const [priceRange, setPriceRange] = useState(2000)
    const [qualityFilter, setQualityFilter] = useState<string>("all")

    useEffect(() => {
        if (!slug) return
        setLoading(true)
        Promise.all([
            categoryService.getCategories().then(cats => cats.find((c: any) => c.slug === slug)),
            productService.getProducts({ pageSize: 50 }),
        ]).then(([cat, res]) => {
            setCategory(cat || null)
            const allProducts = res.items || []
            setProducts(cat ? allProducts.filter(p => p.categoryId === cat.id) : allProducts)
        }).catch(() => { setCategory(null); setProducts([]) })
        .finally(() => setLoading(false))
    }, [slug])

    const filtered = products.filter(p => {
        const price = parseFloat(p.pricePerUnit) / 10 / 10000
        if (price > priceRange) return false
        if (qualityFilter !== "all" && p.qualityGrade !== qualityFilter) return false
        return true
    })

    return (
        <div className="w-[90%] md:w-4/5 mx-auto py-8">
            <div className="flex items-center gap-2 text-[13px] text-[#8A8A8A] mb-6">
                <Link href="/" className="hover:text-[#51A46B] flex items-center gap-1"><Home size={14} />خانه</Link>
                <ChevronLeft size={14} /><Link href="/products" className="hover:text-[#51A46B]">محصولات</Link>
                <ChevronLeft size={14} /><span className="text-[#212121]">{category?.name || slug}</span>
            </div>

            <div className="mb-8"><h1 className="text-[28px] font-extrabold text-[#212121]">{category?.name || slug}</h1></div>

            <div className="flex gap-8">
                <aside className="hidden md:block w-64 flex-shrink-0">
                    <div className="sticky top-24 space-y-6">
                        <div><h3 className="font-semibold text-[14px] text-[#212121] mb-3 flex items-center gap-2"><SlidersHorizontal size={15} /> فیلترها</h3></div>
                        <div><h4 className="text-[13px] font-medium text-[#212121] mb-3">درجه کیفیت</h4>
                            <div className="space-y-2">{["all","A","B","C"].map(g => (
                                <button key={g} onClick={() => setQualityFilter(g)}
                                    className={`block w-full text-right px-3 py-2 rounded-lg text-[13px] transition-colors ${qualityFilter === g ? "bg-[#F0F9F3] text-[#51A46B] font-medium" : "text-[#8A8A8A] hover:bg-gray-50"}`}>
                                    {g === "all" ? "همه" : `درجه ${g}`}</button>))}</div></div>
                        <div><h4 className="text-[13px] font-medium text-[#212121] mb-3">حداکثر قیمت (تومان)</h4>
                            <input type="range" min={1} max={2000} value={priceRange} onChange={e => setPriceRange(Number(e.target.value))} className="w-full accent-[#51A46B]" />
                            <div className="flex justify-between text-[12px] text-[#8A8A8A] mt-1"><span>۱۰٬۰۰۰</span><span>{new Intl.NumberFormat("fa-IR").format(priceRange * 10000)}</span></div></div>
                    </div>
                </aside>

                <div className="flex-1 min-w-0">
                    {loading ? (<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">{Array.from({length:6}).map((_,i)=>(<div key={i} className="border border-[#E9E8E3] rounded-[16px] p-4 animate-pulse"><div className="w-full h-40 bg-gray-100 rounded-[12px] mb-3"/><div className="h-4 bg-gray-100 rounded w-3/4 mb-2"/><div className="h-4 bg-gray-100 rounded w-1/2"/></div>))}</div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20"><p className="text-[#8A8A8A]">محصولی با این فیلترها یافت نشد.</p></div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">{filtered.map(product => (<ProductCard key={product.id} product={product} />))}</div>
                    )}
                </div>
            </div>
        </div>
    )
}
