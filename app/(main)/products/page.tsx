"use client"

import { useState } from "react"
import Link from "next/link"
import { SlidersHorizontal, Plus, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import type { Product } from "@/types"

const CATEGORIES = [
    { key: "all", label: "همه" },
    { key: "sabzijat", label: "سبزیجات" },
    { key: "mive", label: "میوه" },
    { key: "sayfijat", label: "صیفی‌جات" },
]

const USAGES = ["لیموگذاری", "مجلسی", "آشپزی", "یک مراسم"]

const MOCK: Product[] = Array.from({ length: 12 }, (_, i) => ({
    id: `p${i}`,
    farmerId: "f1",
    categoryId: `c${i % 3}`,
    name: ["توت‌فرنگی خارجی", "گیلاس", "موز", "انگور", "پرتقال", "هلو", "تمشک", "لیمو", "سیب", "گلابی", "انار", "خیار"][i],
    slug: `product-${i}`,
    description: null,
    origin: "ایران",
    harvestDate: null,
    qualityGrade: (["A","B","A","B","A","A","B","A","A","B","A","A"] as const)[i],
    unit: "کیلو",
    pricePerUnit: String(800000 + i * 100000),
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

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState("all")
    const [priceRange, setPriceRange] = useState(850)
    const [selectedUsages, setSelectedUsages] = useState<string[]>([])
    const { addItem } = useCartStore()

    const toggleUsage = (u: string) =>
        setSelectedUsages((prev) => prev.includes(u) ? prev.filter((x) => x !== u) : [...prev, u])

    return (
        <div className="w-[90%] md:w-4/5 mx-auto py-8">
            <div className="flex gap-8">

                {/* راست: فیلترها */}
                <aside className="hidden md:flex flex-col gap-6 w-[200px] shrink-0 text-right">
                    <div className="flex items-center gap-2 text-[#51A46B] font-bold text-[15px]">
                        <SlidersHorizontal size={16} />
                        <span>فیلترها</span>
                    </div>

                    {/* دسته‌بندی */}
                    <div>
                        <h4 className="font-bold text-[14px] text-[#212121] mb-3">دسته‌بندی‌ها</h4>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((c) => (
                                <button key={c.key} onClick={() => setActiveCategory(c.key)}
                                        className={`px-3 py-1 rounded-full text-[13px] border transition-colors ${
                                            activeCategory === c.key
                                                ? "bg-[#51A46B] text-white border-[#51A46B]"
                                                : "border-[#E9E8E3] text-[#505050] hover:border-[#51A46B]"
                                        }`}>
                                    {c.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* موارد مصرف */}
                    <div>
                        <h4 className="font-bold text-[14px] text-[#212121] mb-3">موارد مصرف</h4>
                        <div className="flex flex-col gap-2">
                            {USAGES.map((u) => (
                                <label key={u} className="flex items-center justify-end gap-2 cursor-pointer text-[13px] text-[#505050]">
                                    {u}
                                    <input type="checkbox" checked={selectedUsages.includes(u)}
                                           onChange={() => toggleUsage(u)}
                                           className="accent-[#51A46B] w-4 h-4" />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* قیمت */}
                    <div>
                        <h4 className="font-bold text-[14px] text-[#212121] mb-3">قیمت</h4>
                        <input type="range" min={100} max={2000} value={priceRange}
                               onChange={(e) => setPriceRange(Number(e.target.value))}
                               className="w-full accent-[#51A46B]" />
                        <div className="flex justify-between text-[12px] text-[#505050] mt-1">
                            <span>۱۰۰ تومان</span>
                            <span>{priceRange.toLocaleString("fa-IR")} تومان</span>
                        </div>
                    </div>
                </aside>

                {/* چپ: محصولات */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <button className="flex items-center gap-1 text-[13px] text-[#505050] border border-[#E9E8E3] rounded-[8px] px-3 py-1.5">
                            مرتب سازی بر اساس ↓
                        </button>
                        <h1 className="text-[22px] font-bold text-[#212121]">محصولات</h1>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {MOCK.map((p) => (
                            <PLPCard key={p.id} product={p} onAdd={() => addItem(p)} />
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link href="#" className="text-[#51A46B] text-[15px] font-medium hover:underline">
                            محصولات بیشتر...
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

function PLPCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
    const img = product.images?.[0]?.url ?? null
    const price = parseFloat(product.pricePerUnit)
    const priceFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(price / 10))

    return (
        <div className="bg-white border border-[#E9E8E3] rounded-[20px] overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
            <Link href={`/products/${product.slug || product.id}`}
                  className="h-[160px] flex items-center justify-center p-4">
                {img
                    ? <img src={img} alt={product.name} className="h-full w-full object-contain" />
                    : <div className="w-14 h-14 rounded-full bg-[#E5F2E9] flex items-center justify-center">
                        <ShoppingCart className="w-6 h-6 text-[#51A46B]" />
                    </div>}
            </Link>

            <div className="h-px bg-[#E9E8E3]" />

            <div className="p-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#505050] border border-[#E9E8E3] rounded-[8px] px-2 py-1">هر {product.unit}</span>
                    <Link href={`/products/${product.slug || product.id}`}
                          className="text-[14px] font-bold text-[#212121] truncate mr-2 hover:text-[#51A46B] transition-colors">
                        {product.name}
                    </Link>
                </div>
                <div className="flex items-center justify-between">
                    <button onClick={onAdd}
                            className="flex items-center gap-1 border border-[#51A46B] text-[#51A46B] rounded-[10px] px-3 py-1.5 text-[13px] font-medium hover:bg-[#51A46B] hover:text-white transition-colors">
                        <Plus size={14} />افزودن
                    </button>
                    <span className="text-[13px] font-medium text-[#212121] tabular-nums">{priceFormatted} تومان</span>
                </div>
            </div>
        </div>
    )
}