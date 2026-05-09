"use client"

import { useEffect, useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight, Plus, ShoppingCart } from "lucide-react"
import Link from "next/link"
import type { Product } from "@/types"

function pad(n: number) { return String(n).padStart(2, "0") }

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
      <div className="flex flex-col items-center gap-1">
        <div className="w-14 h-14 border-2 border-[#51A46B] rounded-xl flex items-center justify-center bg-white/50 text-2xl font-bold text-[#212121] tabular-nums">
          {pad(value)}
        </div>
        <span className="text-[11px] text-[#505050]">{label}</span>
      </div>
  )
}

const MOCK: Partial<Product>[] = Array.from({ length: 8 }, (_, i) => ({
  id: `m${i}`,
  name: ["طالبی شیرین","لیمو ترش تازه","گیلاس تک‌دانه","انگور بی‌دانه","توت‌فرنگی","هلو","تمشک","انار"][i],
  pricePerUnit: String((285 + i * 150) * 1000),
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
        if (--s < 0) { s = 59; if (--m < 0) { m = 59; if (--h < 0) h = 0 } }
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
      <section className="bg-[#E4F1E8] py-16 mt-16" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8 items-center">

          {/* راست: info */}
          <div className="lg:w-1/4 flex flex-col items-center lg:items-end text-center lg:text-right gap-6">
            <span className="text-[#51A46B] font-bold text-lg">فروش ویژه</span>
            <h2 className="text-3xl font-bold text-[#212121]">
              ویژه‌های امروز <span className="text-[#51A46B]">کلم</span>
            </h2>
            <div className="flex items-end gap-1" dir="ltr">
              <CountdownBox value={time.h} label="ساعت" />
              <span className="text-[#51A46B] text-2xl font-bold mb-5">:</span>
              <CountdownBox value={time.m} label="دقیقه" />
              <span className="text-[#51A46B] text-2xl font-bold mb-5">:</span>
              <CountdownBox value={time.s} label="ثانیه" />
            </div>
            <Link
                href="/products?special=true"
                className="border-2 border-[#51A46B] text-[#51A46B] px-8 py-3 rounded-xl hover:bg-[#51A46B] hover:text-white transition font-bold"
            >
              مشاهده همه
            </Link>
          </div>

          {/* چپ: carousel */}
          <div className="lg:w-3/4 w-full relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {items.map((p, i) => (
                    <div key={p.id ?? i} className="shrink-0 w-64">
                      <ProductCard product={p} />
                    </div>
                ))}
              </div>
            </div>
            <button onClick={next}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md hidden md:flex items-center justify-center hover:bg-[#E5F2E9] transition z-10">
              <ChevronRight size={20} className="text-[#51A46B]" />
            </button>
            <button onClick={prev}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md hidden md:flex items-center justify-center hover:bg-[#E5F2E9] transition z-10">
              <ChevronLeft size={20} className="text-[#51A46B]" />
            </button>
          </div>
        </div>
      </section>
  )
}

function ProductCard({ product }: { product: Partial<Product> }) {
  const img = (product.images as { url: string }[] | undefined)?.[0]?.url ?? null
  const price = parseFloat(product.pricePerUnit ?? "0")
  const priceFormatted = new Intl.NumberFormat("fa-IR").format(Math.round(price / 10))

  return (
      <div className="bg-white rounded-2xl p-4 border border-[#E9E8E3] hover:shadow-md transition duration-300 flex flex-col h-full">
        <div className="bg-[#F5F9F6] rounded-xl p-4 mb-4 h-48 flex items-center justify-center">
          {img
              ? <img src={img} alt={product.name} className="max-h-full object-contain hover:scale-105 transition duration-300" />
              : <div className="w-16 h-16 rounded-full bg-[#E5F2E9] flex items-center justify-center">
                <ShoppingCart className="w-7 h-7 text-[#51A46B]" />
              </div>}
        </div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-[#212121] text-sm">{product.name}</h3>
          <span className="text-[10px] text-[#505050] border border-[#E9E8E3] rounded px-2 py-1 whitespace-nowrap">
          هر {product.unit}
        </span>
        </div>
        <div className="flex justify-between items-center mt-auto pt-2">
          <div className="flex flex-col">
            <span className="font-bold text-[#212121] text-lg">{priceFormatted}</span>
            <span className="text-xs text-[#505050]">تومان</span>
          </div>
          <button className="flex items-center gap-1 border border-[#51A46B] text-[#51A46B] px-3 py-2 rounded-lg hover:bg-[#51A46B] hover:text-white transition text-sm font-medium">
            <Plus size={14} />
            افزودن
          </button>
        </div>
      </div>
  )
}