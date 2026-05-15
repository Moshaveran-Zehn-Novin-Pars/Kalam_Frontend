"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Home, ChevronLeft, Plus, Minus, ShoppingCart, Star, MapPin, Award } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { productService } from "@/services/product"
import type { Product } from "@/types"
import ProductCard from "@/components/shared/ProductCard/ProductCard"
import { formatPrice } from "@/lib/utils"

function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
    const [product, setProduct] = useState<Product | null>(null)
    const [related, setRelated] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [qty, setQty] = useState(1)
    const { addItem } = useCartStore()

    useEffect(() => {
        setLoading(true)
        productService.getProduct(params.productId)
            .then((data) => {
                setProduct(data)
                return productService.getProducts({ pageSize: 4 })
            })
            .then((res) => setRelated(res.items || []))
            .catch(() => setProduct(null))
            .finally(() => setLoading(false))
    }, [params.productId])

    if (loading) return <div className="w-[90%] md:w-4/5 mx-auto py-8"><div className="animate-pulse"><div className="h-8 bg-gray-100 rounded w-1/3 mb-8" /><div className="h-64 bg-gray-100 rounded mb-4" /><div className="h-4 bg-gray-100 rounded w-3/4 mb-2" /><div className="h-4 bg-gray-100 rounded w-1/2" /></div></div>
    if (!product) return <div className="w-[90%] md:w-4/5 mx-auto py-20 text-center"><h1 className="text-[24px] font-bold text-[#212121] mb-4">محصول یافت نشد</h1><Link href="/products" className="text-[#51A46B] font-medium">بازگشت به محصولات</Link></div>

    const price = parseFloat(product.pricePerUnit)
    const priceFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(price / 10))

    return (
        <div className="w-[90%] md:w-4/5 mx-auto py-8">
            <div className="flex items-center gap-2 text-[13px] text-[#8A8A8A] mb-6">
                <Link href="/" className="hover:text-[#51A46B] flex items-center gap-1"><Home size={14} />خانه</Link>
                <ChevronLeft size={14} /><Link href="/products" className="hover:text-[#51A46B]">محصولات</Link>
                <ChevronLeft size={14} /><span className="text-[#212121]">{product.name}</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="w-full md:w-1/2 aspect-square rounded-[20px] bg-[#F5F9F6] flex items-center justify-center overflow-hidden">
                    {product.images?.[0]?.url ? <img src={product.images[0].url} alt={product.name} className="w-full h-full object-contain" /> : <span className="text-6xl opacity-30">🍎</span>}
                </div>

                <div className="flex-1">
                    <h1 className="text-[28px] font-extrabold text-[#212121] mb-2">{product.name}</h1>
                    {product.origin && <p className="text-[#8A8A8A] text-[14px] flex items-center gap-1 mb-4"><MapPin size={14} />{product.origin}</p>}

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-[28px] font-bold text-[#51A46B]">{priceFormatted}<span className="text-[14px] font-medium mr-1">تومان / {product.unit}</span></span>
                        {product.qualityGrade && (
                            <span className={`text-[12px] px-3 py-1 rounded-full font-medium ${product.qualityGrade === "A" ? "bg-green-100 text-green-700" : product.qualityGrade === "B" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}>
                                درجه {product.qualityGrade}
                            </span>
                        )}
                    </div>

                    {product.description && <p className="text-[#505050] text-[14px] leading-7 mb-6">{product.description}</p>}

                    <div className="border-t border-[#E9E8E3] pt-6 mb-6">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 border border-[#E9E8E3] rounded-[10px] flex items-center justify-center hover:bg-gray-50 transition-colors"><Minus size={16} /></button>
                            <span className="w-16 text-center text-[18px] font-bold">{faNum(qty)}</span>
                            <button onClick={() => setQty(qty + 1)} className="w-10 h-10 border border-[#E9E8E3] rounded-[10px] flex items-center justify-center hover:bg-gray-50 transition-colors"><Plus size={16} /></button>
                            <span className="text-[13px] text-[#8A8A8A] mr-4">حداقل سفارش: {faNum(parseFloat(product.minOrderQty))} {product.unit}</span>
                        </div>
                    </div>

                    <button onClick={() => { addItem(product, qty); (window as any).__openCart?.() }} className="w-full bg-[#51A46B] text-white py-4 rounded-[12px] font-bold text-[16px] hover:bg-[#417F56] transition-colors flex items-center justify-center gap-2">
                        <ShoppingCart size={20} /> افزودن به سبد خرید
                    </button>
                </div>
            </div>

            {related.length > 0 && (
                <>
                    <h2 className="text-[20px] font-bold text-[#212121] mb-6">محصولات مشابه</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {related.slice(0, 4).map((p) => (<ProductCard key={p.id} product={p} />))}
                    </div>
                </>
            )}
        </div>
    )
}
