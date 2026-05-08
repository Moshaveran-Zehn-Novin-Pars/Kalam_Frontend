"use client"

import { useEffect, useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronRight, ChevronLeft, Plus, ShoppingCart } from "lucide-react"
import Link from "next/link"
import type { Product } from "@/types"

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
      <div className="flex flex-col items-center gap-1">
        <div
            className="w-[56px] h-[56px] bg-white rounded-[10px] border border-[#51A46B]
                   flex items-center justify-center text-[24px] font-bold text-[#212121] tabular-nums"
        >
          {pad(value)}
        </div>
        <span className="text-[11px] text-[#505050]">{label}</span>
      </div>
  )
}

const MOCK: Partial<Product>[] = Array.from({ length: 8 }, (_, i) => ({
  id: `m${i}`,
  name: ["توت‌فرنگی خارجی", "گیلاس", "لیمو", "انگور سبز", "خربزه", "هلو", "تمشک", "انار"][i],
  pricePerUnit: String(800000 + i * 150000),
  unit: "کیلو",
  minOrderQty: "1",
  images: [],
}))

export default function SpecialOfferSection({ products }: { products?: Partial<Product>[] }) {
  const items = products?.length ? products : MOCK

  const [time, setTime] = useState({ h: 7, m: 35, s: 54 })
  useEffect(() => {
    const t = setInterval(() => {
      setTime((p) => {
        let { h, m, s } = p
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 0; m = 0; s = 0 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const [emblaRef, emblaApi] = useEmblaCarousel(
      { direction: "rtl", loop: true, align: "start", dragFree: true },
      [Autoplay({ delay: 3000, stopOnInteraction: true })]
  )
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
      <section className="py-12" style={{ background: "#E4F1E8" }}>
        <div className="w-[90%] md:w-4/5 mx-auto">

          {/* Layout: کارت‌ها چپ، sidebar راست */}
          <div className="flex flex-col md:flex-row gap-6 items-start">

            {/* چپ: carousel */}
            <div className="flex-1 relative min-w-0">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">
                  {items.map((p, i) => (
                      <div key={p.id ?? i} className="shrink-0 w-[220px] md:w-[250px]">
                        <OfferCard product={p} />
                      </div>
                  ))}
                </div>
              </div>

              {/* arrow buttons */}
              <button
                  onClick={next}
                  className="absolute -right-3 top-[45%] -translate-y-1/2 z-10
                         w-9 h-9 bg-white rounded-full shadow-md
                         flex items-center justify-center
                         hover:bg-[#51A46B] hover:text-white transition-colors"
              >
                <ChevronRight size={18} />
              </button>
              <button
                  onClick={prev}
                  className="absolute -left-3 top-[45%] -translate-y-1/2 z-10
                         w-9 h-9 bg-white rounded-full shadow-md
                         flex items-center justify-center
                         hover:bg-[#51A46B] hover:text-white transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
            </div>

            {/* راست: sidebar */}
            <div className="flex flex-col items-end gap-5 md:w-[200px] shrink-0 text-right">
              <div>
                <p className="text-[13px] font-bold text-[#51A46B]">فروش ویژه</p>
                <h2 className="text-[22px] font-bold text-[#212121] mt-0.5">
                  ویژه‌های امروز{" "}
                  <span className="text-[#51A46B]">کلم</span>
                </h2>
              </div>

              {/* countdown */}
              <div className="flex items-end gap-1.5" dir="ltr">
                <CountdownBox value={time.h} label="ساعت" />
                <span className="text-[#51A46B] text-[24px] font-bold mb-5">:</span>
                <CountdownBox value={time.m} label="دقیقه" />
                <span className="text-[#51A46B] text-[24px] font-bold mb-5">:</span>
                <CountdownBox value={time.s} label="ثانیه" />
              </div>

              <Link
                  href="/products?special=true"
                  className="w-full text-center border border-[#51A46B] text-[#51A46B]
                         rounded-[10px] px-4 py-2.5 text-[14px] font-medium
                         hover:bg-[#51A46B] hover:text-white transition-colors"
              >
                مشاهده همه
              </Link>
            </div>

          </div>
        </div>
      </section>
  )
}

function OfferCard({ product }: { product: Partial<Product> }) {
  const img = (product.images as { url: string }[] | undefined)?.[0]?.url ?? null
  const price = parseFloat(product.pricePerUnit ?? "0")
  const priceFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(price / 10))

  return (
      <div
          className="bg-white rounded-[20px] border border-[#E9E8E3] overflow-hidden
                 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col"
      >
        {/* image */}
        <div className="h-[160px] flex items-center justify-center p-4 bg-white">
          {img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img} alt={product.name} className="h-full w-full object-contain" />
          ) : (
              <div className="w-16 h-16 rounded-full bg-[#E5F2E9] flex items-center justify-center">
                <ShoppingCart className="w-7 h-7 text-[#51A46B]" />
              </div>
          )}
        </div>

        <div className="h-px bg-[#E9E8E3]" />

        {/* info */}
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#505050] border border-[#E9E8E3] rounded-[8px] px-2 py-1">
            هر {product.unit}
          </span>
            <span className="text-[14px] font-bold text-[#212121] truncate mr-2">
            {product.name}
          </span>
          </div>

          <div className="flex items-center justify-between">
            <button
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
      </div>
  )
}