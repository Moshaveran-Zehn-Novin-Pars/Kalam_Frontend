"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, ChevronLeft, Plus, Minus, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import type { Product } from "@/types"

const PRESET_QTYS = ["۰.۵ کیلو", "۱ کیلو", "۲ کیلو", "۵ کیلو"]

const MOCK_PRODUCT: Product = {
    id: "p1",
    farmerId: "f1",
    categoryId: "c1",
    name: "توت وحشی",
    slug: "wild-berry",
    description: "این توت‌ها به‌صورت تازه و دست‌چین‌شده از باغ‌های سالم و پاک برداشت شده‌اند تا بیشترین طعم، شیرینی طبیعی و ارزش غذایی را برای شما حفظ کنند. مناسب برای مصرف روزانه، تزئین دسرها، اسموتی‌های انرژی‌زا یا حتی میان‌وعده‌های سالم.",
    origin: "ایران",
    harvestDate: null,
    qualityGrade: "A",
    unit: "کیلو",
    pricePerUnit: "1285000",
    minOrderQty: "0.5",
    maxOrderQty: null,
    stockQty: "500",
    reservedQty: "0",
    status: "ACTIVE",
    requiresColdChain: false,
    storageTempMin: null,
    storageTempMax: null,
    shelfLifeDays: null,
    viewsCount: 0,
    salesCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [],
}

const MOCK_RELATED: Product[] = Array.from({ length: 5 }, (_, i) => ({
    ...MOCK_PRODUCT,
    id: `r${i}`,
    name: ["توت‌فرنگی خارجی", "گیلاس", "انگور سبز", "بلوبری", "انار"][i],
    slug: `related-${i}`,
}))

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
    const [qty, setQty] = useState(1)
    const [selectedPreset, setSelectedPreset] = useState("۱ کیلو")
    const { addItem } = useCartStore()

    const product = MOCK_PRODUCT
    const img = product.images?.[0]?.url ?? null
    const price = parseFloat(product.pricePerUnit)
    const priceFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(price / 10))

    return (
        <div className="w-[90%] md:w-4/5 mx-auto py-8">

            {/* Breadcrumb */}
            <div className="flex items-center gap-1 text-[13px] text-[#505050] mb-8 flex-row-reverse justify-end">
                <Link href="/" className="hover:text-[#51A46B] transition-colors">
                    <Home size={14} />
                </Link>
                <ChevronLeft size={12} />
                <Link href="/products" className="hover:text-[#51A46B] transition-colors">میوه</Link>
                <ChevronLeft size={12} />
                <span className="text-[#51A46B] font-medium">{product.name}</span>
            </div>

            {/* Main layout */}
            <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* چپ: متن */}
                <div className="w-full md:w-[55%] flex flex-col gap-5 text-right order-2 md:order-1">
                    <h1 className="text-[28px] md:text-[32px] font-bold text-[#212121]">{product.name}</h1>

                    {/* توضیح */}
                    <div className="bg-[#F5F9F6] rounded-[16px] p-5">
                        <p className="text-[14px] text-[#505050] leading-[2]">{product.description}</p>
                    </div>

                    {/* قیمت */}
                    <div className="flex items-baseline gap-2 justify-end">
                        <span className="text-[14px] text-[#505050]">هر {product.unit}</span>
                        <span className="text-[26px] font-bold text-[#212121]">{priceFormatted} تومان</span>
                    </div>

                    {/* preset مقدار */}
                    <div className="flex gap-2 justify-end flex-wrap">
                        {PRESET_QTYS.map((q) => (
                            <button key={q} onClick={() => setSelectedPreset(q)}
                                    className={`px-4 py-2 rounded-[10px] border text-[14px] transition-colors ${
                                        selectedPreset === q
                                            ? "border-[#51A46B] text-[#51A46B] bg-[#E5F2E9]"
                                            : "border-[#E9E8E3] text-[#505050] hover:border-[#51A46B]"
                                    }`}>
                                {q}
                            </button>
                        ))}
                    </div>

                    {/* counter + add to cart */}
                    <div className="flex items-center gap-3 justify-end">
                        {/* counter */}
                        <div className="flex items-center border border-[#E9E8E3] rounded-[10px] overflow-hidden">
                            <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F5F5] transition-colors">
                                <Minus size={16} />
                            </button>
                            <span className="w-10 text-center text-[16px] font-bold">{qty}</span>
                            <button onClick={() => setQty((q) => q + 1)}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F5F5] transition-colors">
                                <Plus size={16} />
                            </button>
                        </div>

                        {/* add */}
                        <button
                            onClick={() => addItem(product, qty)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#51A46B] text-white
                         rounded-[10px] px-8 py-3 text-[16px] font-medium
                         hover:bg-[#417F56] transition-colors"
                        >
                            <ShoppingCart size={18} />
                            افزودن به سبد خرید
                        </button>
                    </div>
                </div>

                {/* راست: تصویر */}
                <div className="w-full md:w-[40%] order-1 md:order-2">
                    <div className="bg-[#F5F9F6] rounded-[20px] p-6 flex items-center justify-center aspect-square">
                        {img
                            ? <img src={img} alt={product.name} className="w-full h-full object-contain" />
                            : <div className="w-32 h-32 rounded-full bg-[#E5F2E9] flex items-center justify-center">
                                <ShoppingCart className="w-12 h-12 text-[#51A46B]" />
                            </div>}
                    </div>
                </div>

            </div>

            {/* محصولات مشابه */}
            <div className="mt-16">
                <h2 className="text-[22px] font-bold text-[#212121] text-right mb-6">محصولات مشابه</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide flex-row-reverse">
                    {MOCK_RELATED.map((p) => (
                        <RelatedCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function RelatedCard({ product }: { product: Product }) {
    const img = product.images?.[0]?.url ?? null
    const price = parseFloat(product.pricePerUnit)
    const priceFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(price / 10))
    const { addItem } = useCartStore()

    return (
        <div className="bg-white border border-[#E9E8E3] rounded-[20px] overflow-hidden shrink-0 w-[200px]
                    hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="h-[140px] flex items-center justify-center p-4">
                {img
                    ? <img src={img} alt={product.name} className="h-full w-full object-contain" />
                    : <div className="w-12 h-12 rounded-full bg-[#E5F2E9] flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-[#51A46B]" />
                    </div>}
            </div>
            <div className="h-px bg-[#E9E8E3]" />
            <div className="p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#505050] border border-[#E9E8E3] rounded-[6px] px-2 py-0.5">هر {product.unit}</span>
                    <span className="text-[13px] font-bold text-[#212121] truncate mr-1">{product.name}</span>
                </div>
                <div className="flex items-center justify-between">
                    <button onClick={() => addItem(product)}
                            className="flex items-center gap-1 border border-[#51A46B] text-[#51A46B] rounded-[8px] px-2.5 py-1 text-[12px] hover:bg-[#51A46B] hover:text-white transition-colors">
                        <Plus size={12} />افزودن
                    </button>
                    <span className="text-[12px] font-medium text-[#212121]">{priceFormatted} تومان</span>
                </div>
            </div>
        </div>
    )
}