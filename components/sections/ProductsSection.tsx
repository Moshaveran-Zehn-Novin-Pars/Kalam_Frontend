"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, ShoppingCart } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useCartStore } from "@/store/cartStore"
import type { Product } from "@/types"

const TABS = [
  { value: "all",      label: "همه" },
  { value: "mive",     label: "میوه" },
  { value: "sabzijat", label: "سبزیجات" },
  { value: "sayfijat", label: "صیفی‌جات" },
]

const MOCK: Product[] = Array.from({ length: 12 }, (_, i) => ({
  id: `m${i}`, farmerId: "f1", categoryId: `c${i % 3}`,
  name: ["انار ساوه","بلوبری وارداتی","موز اکوادور","توت‌فرنگی","هلو زعفرانی","طالبی","تمشک","لیمو ترش","پشن فروت","گیلاس","انگور بی‌دانه","لیمو شیرین"][i],
  slug: `product-${i}`, description: null, origin: "ایران", harvestDate: null,
  qualityGrade: (["A","B","A","B","A","A","B","A","A","B","A","A"] as const)[i],
  unit: "کیلو", pricePerUnit: String((550 + i * 100) * 1000),
  minOrderQty: i % 3 === 0 ? "50" : "10", maxOrderQty: null,
  stockQty: "500", reservedQty: "0", status: "ACTIVE" as const,
  requiresColdChain: false, storageTempMin: null, storageTempMax: null,
  shelfLifeDays: null, viewsCount: 0, salesCount: 0,
  createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  images: [],
}))

export default function ProductsSection({ products }: { products?: Product[] }) {
  const [active, setActive] = useState("all")
  const items = products?.length ? products : MOCK
  const shown = active === "all" ? items : items.filter(p => p.category?.slug === active)

  return (
      <section className="max-w-7xl mx-auto px-4 py-16" dir="rtl">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-3xl font-bold text-[#212121] mb-6">محصولات</h2>
          <div className="flex gap-8 border-b border-[#E9E8E3] w-full max-w-md justify-center">
            {TABS.map((tab) => (
                <button key={tab.value} onClick={() => setActive(tab.value)}
                        className={`pb-2.5 text-[16px] relative transition-colors ${
                            active === tab.value ? "text-[#51A46B] font-bold" : "text-[#505050] hover:text-[#212121]"
                        }`}>
                  {tab.label}
                  {active === tab.value && (
                      <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#51A46B] rounded-full" />
                  )}
                </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {shown.slice(0, 12).map((p) => <ProductCard key={p.id} product={p} />)}
          </AnimatePresence>
        </div>

        <div className="text-center mt-12">
          <Link href="/products" className="text-[#51A46B] font-bold hover:underline text-lg">
            محصولات بیشتر...
          </Link>
        </div>
      </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem)
  const img = product.images?.find(i => i.isPrimary)?.url ?? product.images?.[0]?.url
  const price = parseFloat(product.pricePerUnit)
  const priceFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(price / 10))

  return (
      <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl p-4 border border-[#E9E8E3] hover:shadow-md transition duration-300 flex flex-col h-full">
        <Link href={`/products/${product.slug || product.id}`}
              className="bg-[#F5F9F6] rounded-xl p-4 mb-4 h-48 flex items-center justify-center">
          {img
              ? <img src={img} alt={product.name} className="max-h-full object-contain hover:scale-105 transition duration-300" />
              : <div className="w-14 h-14 rounded-full bg-[#E5F2E9] flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-[#51A46B]" />
              </div>}
        </Link>
        <div className="flex justify-between items-start mb-3">
          <Link href={`/products/${product.slug || product.id}`}
                className="font-bold text-[#212121] text-sm hover:text-[#51A46B] transition truncate">
            {product.name}
          </Link>
          <span className="text-[10px] text-[#505050] border border-[#E9E8E3] rounded px-2 py-1 whitespace-nowrap shrink-0 mr-2">
          هر {product.unit}
        </span>
        </div>
        {parseFloat(product.minOrderQty) > 1 && (
            <p className="text-[12px] text-right mb-2">
              حداقل سفارش: <span className="font-bold text-[#51A46B]">{product.minOrderQty} {product.unit}</span>
            </p>
        )}
        <div className="flex justify-between items-center mt-auto pt-2">
          <div className="flex flex-col">
            <span className="font-bold text-[#212121] text-lg">{priceFormatted}</span>
            <span className="text-xs text-[#505050]">تومان</span>
          </div>
          <button onClick={() => addItem(product)}
                  className="flex items-center gap-1 border border-[#51A46B] text-[#51A46B] px-3 py-2 rounded-lg hover:bg-[#51A46B] hover:text-white transition text-sm font-medium">
            <Plus size={14} />
            افزودن
          </button>
        </div>
      </motion.div>
  )
}