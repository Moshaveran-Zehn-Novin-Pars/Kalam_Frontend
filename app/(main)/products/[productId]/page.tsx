"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { SfIcon } from "@/components/shared/SfIcon"
import ProductCard from "@/components/shared/ProductCard/ProductCard"
import { useCartStore } from "@/store/cartStore"
import { productService } from "@/services/product"
import type { Product } from "@/types"

function fa(n: string | number) {
    if (n === null || n === undefined) return ""
    return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)])
}

function faPrice(n: number) {
    return fa(n.toLocaleString("en-US")).replace(/,/g, "،")
}

const WEIGHT_OPTIONS = [
    { id: "0.5", label: "۰.۵ کیلو", mult: 0.5 },
    { id: "1", label: "۱ کیلو", mult: 1 },
    { id: "2", label: "۲ کیلو", mult: 2 },
    { id: "5", label: "۵ کیلو", mult: 5 },
]

export default function ProductDetailPage() {
    const params = useParams()
    const productId = params.productId as string
    const { addItem } = useCartStore()

    const [product, setProduct] = useState<Product | null>(null)
    const [related, setRelated] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [weight, setWeight] = useState("1")
    const [qty, setQty] = useState(1)

    useEffect(() => {
        setLoading(true)
        productService
            .getProduct(productId)
            .then((data) => {
                setProduct(data)
                return productService.getProducts({ pageSize: 8 })
            })
            .then((res) => setRelated(res.items || []))
            .catch(() => setProduct(null))
            .finally(() => setLoading(false))
    }, [productId])

    const selectedWeight = WEIGHT_OPTIONS.find((w) => w.id === weight)

    const displayPrice = useMemo(() => {
        if (!product) return 0
        const base = parseFloat(product.pricePerUnit)
        return selectedWeight ? Math.round(base * selectedWeight.mult) : base
    }, [product, selectedWeight])

    if (loading) {
        return (
            <main className="sf-page pdp-page-bg">
                <div className="w-[90%] md:w-4/5 mx-auto py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-100 rounded w-1/3 mb-8" />
                        <div className="aspect-square bg-gray-100 rounded-[28px] mb-4" />
                        <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-gray-100 rounded w-1/2" />
                    </div>
                </div>
            </main>
        )
    }

    if (!product) {
        return (
            <main className="sf-page">
                <div className="w-[90%] md:w-4/5 mx-auto py-20 text-center">
                    <h1 className="text-[24px] font-bold text-[#212121] mb-4">محصول یافت نشد</h1>
                    <Link href="/products" className="text-[#51A46B] font-medium">بازگشت به محصولات</Link>
                </div>
            </main>
        )
    }

    const categoryName = product.category?.name || "محصولات"

    return (
        <main className="sf-page pdp-page-bg">
            <nav className="pdp-crumbs" aria-label="مسیر">
                <span className="pdp-crumbs__home"><SfIcon.Home size={16} /></span>
                <Link href="/">خانه</Link>
                <span className="pdp-crumbs__sep"><SfIcon.ChevronLeft /></span>
                <Link href="/products">{categoryName}</Link>
                <span className="pdp-crumbs__sep"><SfIcon.ChevronLeft /></span>
                <span className="pdp-crumbs__current">{product.name}</span>
            </nav>

            <section className="pdp-layout">
                <div className="pdp-gallery">
                    {product.images?.[0]?.url ? (
                        <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="pdp-gallery__img"
                        />
                    ) : (
                        <img
                            src="/images/product-pomegranate.png"
                            alt={product.name}
                            className="pdp-gallery__img"
                        />
                    )}
                </div>

                <div className="pdp-info">
                    <div className="pdp-card">
                        <div className="pdp-card__title">{product.name}</div>
                        <p className="pdp-card__body">
                            {product.description || "این محصول به‌صورت تازه و دست‌چین‌شده از باغ‌های سالم و پاک برداشت شده است."}
                        </p>
                    </div>

                    <div className="pdp-price-row">
                        <span className="tnum">{faPrice(displayPrice)} تومان</span>
                        <span className="unit">/{product.unit}</span>
                    </div>

                    <div className="pdp-weights">
                        {WEIGHT_OPTIONS.map((w) => (
                            <button
                                key={w.id}
                                className={`pdp-weight ${weight === w.id ? "is-active" : ""}`}
                                onClick={() => setWeight(w.id)}
                            >
                                {w.label}
                            </button>
                        ))}
                    </div>

                    <div className="pdp-actions">
                        <div className="pdp-stepper">
                            <button onClick={() => setQty((q) => q + 1)} aria-label="افزایش"><SfIcon.Plus /></button>
                            <div className="pdp-stepper__val">{fa(qty)}</div>
                            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="کاهش"><SfIcon.Minus /></button>
                        </div>
                        <button
                            className="pdp-add"
                            onClick={() => {
                                addItem(product, qty)
                            }}
                        >
                            افزودن به سبد خرید
                        </button>
                    </div>
                </div>
            </section>

            {related.length > 0 && (
                <section className="pdp-related">
                    <div className="pdp-related__head">
                        <h2>محصولات مشابه</h2>
                    </div>
                    <div className="pdp-related__rail">
                        <div className="pdp-related__rail-inner">
                            {related.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}
