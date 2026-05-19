"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { productService } from "@/services/product"
import type { Product } from "@/types"
import ProductCard from "@/components/shared/ProductCard/ProductCard"

function SearchContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const q = searchParams.get("q") || ""
    const [query, setQuery] = useState(q)
    const [results, setResults] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => { setQuery(q) }, [q])

    useEffect(() => {
        if (!q.trim()) { setResults([]); return }
        setLoading(true)
        productService.getProducts({ search: q, pageSize: 50 })
            .then((res) => setResults(res.items || []))
            .catch(() => setResults([]))
            .finally(() => setLoading(false))
    }, [q])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }

    return (
        <div className="w-[90%] md:w-4/5 mx-auto py-8">
            <form onSubmit={handleSearch} className="mb-8">
                <div className="relative w-full max-w-2xl mx-auto">
                    <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input value={query} onChange={e => setQuery(e.target.value)} placeholder="جستجوی محصولات..."
                        className="w-full h-[56px] border border-[#E9E8E3] rounded-[14px] pr-12 pl-12 text-[15px] text-[#212121] outline-none focus:border-[#51A46B] transition-all bg-white" autoFocus />
                    {query && <button type="button" onClick={() => { setQuery(""); router.push("/search") } }
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={18} /></button>}
                </div>
            </form>

            {q.trim() ? (
                <>
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-[#8A8A8A] text-[14px]">{loading ? "در حال جستجو..." : `${results.length} نتیجه برای "${q}"`}</p>
                    </div>
                    {loading ? (<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">{Array.from({length:4}).map((_,i)=>(<div key={i} className="border border-[#E9E8E3] rounded-[16px] p-4 animate-pulse"><div className="w-full h-40 bg-gray-100 rounded-[12px] mb-3"/><div className="h-4 bg-gray-100 rounded w-3/4 mb-2"/><div className="h-4 bg-gray-100 rounded w-1/2"/></div>))}</div>
                    ) : results.length === 0 ? (
                        <div className="text-center py-20"><Search size={48} className="mx-auto text-gray-300 mb-4" /><h3 className="text-[18px] font-semibold text-[#212121] mb-2">نتیجه‌ای یافت نشد</h3><p className="text-[#8A8A8A] text-[14px]">محصولی با عبارت "{q}" پیدا نشد.</p></div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">{results.map(product => (<ProductCard key={product.id} product={product} />))}</div>
                    )}
                </>
            ) : (
                <div className="text-center py-20"><Search size={48} className="mx-auto text-gray-300 mb-4" /><h3 className="text-[18px] font-semibold text-[#212121] mb-2">جستجو در محصولات</h3><p className="text-[#8A8A8A] text-[14px]">نام محصول مورد نظر خود را جستجو کنید.</p></div>
            )}
        </div>
    )
}

export default function SearchPage() {
    return (<Suspense fallback={<div className="text-center py-20">در حال بارگذاری...</div>}><SearchContent /></Suspense>)
}
