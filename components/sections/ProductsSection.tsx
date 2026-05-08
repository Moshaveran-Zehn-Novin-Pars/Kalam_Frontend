"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Plus, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import type { Product } from "@/types"

const TABS = [
  { value: "all",       label: "همه" },
  { value: "mive",      label: "میوه" },
  { value: "sabzijat",  label: "سبزیجات" },
  { value: "sayfijat",  label: "صیفی جات" },
]

const MOCK: Product[] = Array.from({ length: 12 }, (_, i) => ({
  id: `m${i}`,
  farmerId: "f1",
  categoryId: `c${i % 3}`,
  name: ["توت‌فرنگی", "گیلاس", "موز", "انگور", "پرتقال", "هلو", "تمشک", "لیمو", "سیب", "گلابی", "انار", "خیار"][i],
  slug: `product-${i}`,
  description: null,
  origin: "ایران",
  harvestDate: null,
  qualityGrade: (["A","B","A","B","A","A","B","A","A","B","A","A"] as const)[i],
  unit: "کیلوگرم",
  pricePerUnit: String(800000 + i * 100000),
  minOrderQty: i % 3 === 0 ? "50" : "10",
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

export default function ProductsSection({ products }: { products?: Product[] }) {
  const [active, setActive] = useState("all")
  const items = products?.length ? products : MOCK

  const filtered = active === "all" ? items : items.filter(
      (p) => p.category?.name?.includes(TABS.find((t) => t.value === active)?.label ?? "")
  )
  const shown = filtered.slice(0, 12)

  return (
      <section className="w-[90%] md:w-4/5 mx-auto py-12">

        {/* header + tabs — وسط صفحه */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <h2 className="text-[22px] md:text-[24px] font-bold text-[#212121]">محصولات</h2>

          {/* tabs با underline style مثل Figma */}
          <div className="flex gap-6 border-b border-[#E9E8E3]">
            {TABS.map((t) => (
                <button
                    key={t.value}
                    onClick={() => setActive(t.value)}
                    className={`pb-2.5 text-[16px] transition-all duration-200 relative whitespace-nowrap ${
                        active === t.value
                            ? "text-[#51A46B] font-bold"
                            : "text-[#505050] hover:text-[#212121]"
                    }`}
                >
                  {t.label}
                  {active === t.value && (
                      <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#51A46B] rounded-full" />
                  )}
                </button>
            ))}
          </div>
        </div>

        {/* grid 4 ستونه */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
          </AnimatePresence>
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="text-[#51A46B] text-[16px] font-medium hover:underline">
            محصولات بیشتر...
          </Link>
        </div>
      </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem)
  const img = product.images?.find((i) => i.isPrimary)?.url ?? product.images?.[0]?.url
  const price = parseFloat(product.pricePerUnit)
  const priceFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(price / 10))
  const minQty = parseFloat(product.minOrderQty)

  return (
      <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="bg-white border border-[#E9E8E3] rounded-[20px] overflow-hidden
                 hover:shadow-lg hover:-translate-y-1 transition-all duration-300
                 flex flex-col"
      >
        {/* image */}
        <Link href={`/products/${product.slug || product.id}`}
              className="h-[160px] md:h-[196px] flex items-center justify-center p-4">
          {img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img} alt={product.name}
                   className="h-full w-full object-contain hover:scale-105 transition-transform duration-300" />
          ) : (
              <div className="w-16 h-16 rounded-full bg-[#E5F2E9] flex items-center justify-center">
                <ShoppingCart className="w-7 h-7 text-[#51A46B]" />
              </div>
          )}
        </Link>

        <div className="h-px bg-[#E9E8E3]" />

        {/* info */}
        <div className="p-4 flex flex-col gap-2.5">
          {/* نام + واحد */}
          <div className="flex items-center justify-between gap-2">
          <span className="text-[12px] text-[#505050] border border-[#E9E8E3] rounded-[8px] px-2 py-1 shrink-0">
            هر {product.unit}
          </span>
            <Link href={`/products/${product.slug || product.id}`}
                  className="text-[14px] font-bold text-[#212121] text-right truncate hover:text-[#51A46B] transition-colors">
              {product.name}
            </Link>
          </div>

          {/* MOQ */}
          {minQty > 1 && (
              <p className="text-[12px] text-right">
                حداقل سفارش:{" "}
                <span className="font-bold text-[#51A46B]">{minQty} {product.unit}</span>
              </p>
          )}

          {/* قیمت + افزودن */}
          <div className="flex items-center justify-between mt-1">
            <button
                onClick={() => addItem(product)}
                className="flex items-center gap-1 border border-[#51A46B] text-[#51A46B]
                       rounded-[10px] px-3 py-1.5 text-[13px] font-medium
                       hover:bg-[#51A46B] hover:text-white transition-colors"
            >
              <Plus size={14} />
              افزودن
            </button>
            <span className="text-[13px] font-medium text-[#212121] tabular-nums">
            {priceFormatted} تومان
          </span>
          </div>
        </div>
      </motion.div>
  )
}