"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Home, ChevronLeft, Star, MapPin, Award, CheckCircle, Phone, Package, ShoppingBag, MessageSquare } from "lucide-react"
import ProductCard from "@/components/shared/ProductCard/ProductCard"
import type { Product } from "@/types"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const FARMER = {
    name: "علی محمدی",
    farmName: "باغ سیب نقره‌ای",
    location: "شیراز، دشت ارژن",
    phone: "۰۹۱۲۱۱۱۱۱۱۱",
    rating: 4.8,
    reviewCount: 42,
    memberSince: "۱۴۰۱",
    totalSales: 185000000,
    totalOrders: 156,
    description: "باغدار با بیش از ۱۵ سال سابقه در پرورش میوه‌های درجه یک شیراز. تخصص اصلی ما سیب درختی و گوجه فرنگی گلخانه‌ای است. تمام محصولات ما دارای گواهی بهداشت و کیفیت هستند.",
    certificates: ["گواهی ارگانیک", "گواهی بهداشت", "گواهی GlobalGAP"],
    products: Array.from({ length: 6 }, (_, i) => ({
        id: `fp${i}`, farmerId: "f1", categoryId: "c1",
        name: ["سیب درختی", "گوجه فرنگی", "انگور بی‌دانه", "هلو شیراز", "خیار گلخانه", "انار"][i],
        slug: `farmer-product-${i}`, description: null,
        origin: "شیراز", harvestDate: null,
        qualityGrade: (["A","A","B","A","A","A"] as const)[i],
        unit: "کیلو", pricePerUnit: String(500000 + i * 85000),
        minOrderQty: "50", maxOrderQty: null,
        stockQty: "500", reservedQty: "0",
        status: "ACTIVE" as const, requiresColdChain: false,
        storageTempMin: null, storageTempMax: null, shelfLifeDays: null,
        viewsCount: 0, salesCount: 0, createdAt: "", updatedAt: "", images: [],
    }) as Product),
    reviews: [
        { user: "سوپرمارکت رضایی", rating: 5, text: "کیفیت عالی و ارسال به موقع. همیشه راضی بودم.", date: "۱۴۰۴/۹/۱۰" },
        { user: "رستوران آرارات", rating: 4, text: "محصولات تازه و با کیفیت. بسته‌بندی خوبی دارند.", date: "۱۴۰۴/۹/۵" },
        { user: "هایپرمی", rating: 5, text: "یکی از بهترین باغداران پلتفرم. محصولات درجه یک.", date: "۱۴۰۴/۸/۲۸" },
    ],
}

export default function FarmerProfilePage() {
    const { slug } = useParams<{ slug: string }>()
    const [tab, setTab] = useState<"products" | "reviews">("products")

    return (
        <div className="w-[90%] md:w-4/5 mx-auto py-8">
            <div className="flex items-center gap-2 text-[13px] text-[#8A8A8A] mb-6">
                <Link href="/" className="hover:text-[#51A46B] flex items-center gap-1"><Home size={14} />خانه</Link>
                <ChevronLeft size={14} />
                <Link href="/products" className="hover:text-[#51A46B]">محصولات</Link>
                <ChevronLeft size={14} />
                <span className="text-[#212121]">{FARMER.farmName}</span>
            </div>

            <div className="border border-[#E9E8E3] rounded-[20px] p-6 md:p-8 bg-white mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-20 h-20 rounded-full bg-[#E5F2E9] flex items-center justify-center text-[32px] font-bold text-[#51A46B] shrink-0">
                        {FARMER.name[0]}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-[24px] font-extrabold text-[#212121]">{FARMER.farmName}</h1>
                        <p className="text-[15px] text-[#505050] mt-1">{FARMER.name}</p>
                        <div className="flex flex-wrap gap-4 mt-3 text-[13px] text-[#8A8A8A]">
                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={14} className="text-[#51A46B]" />{FARMER.location}</span>
                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={14} style={{ color: "#f5a623" }} />{fa(FARMER.rating)} ({fa(FARMER.reviewCount)} نظر)</span>
                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><ShoppingBag size={14} className="text-[#51A46B]" />{fa(FARMER.totalOrders)} سفارش</span>
                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><CheckCircle size={14} className="text-[#51A46B]" />عضویت از {fa(FARMER.memberSince)}</span>
                        </div>
                        <p className="text-[14px] text-[#505050] leading-7 mt-4">{FARMER.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {FARMER.certificates.map(c => (
                                <span key={c} className="text-[12px] bg-[#E5F2E9] text-[#2F7A4D] px-3 py-1 rounded-full font-medium flex items-center gap-1">
                                    <Award size={12} />{c}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 md:items-end">
                        <div className="text-center md:text-right">
                            <div className="text-[28px] font-bold text-[#51A46B]">{faNum(FARMER.totalSales)}</div>
                            <div className="text-[12px] text-[#8A8A8A]">تومان فروش کل</div>
                        </div>
                        <button className="flex items-center gap-2 border border-[#51A46B] text-[#51A46B] px-5 py-2.5 rounded-[10px] text-[13px] font-medium hover:bg-[#E5F2E9] transition-colors">
                            <MessageSquare size={15} /> پیام به باغدار
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 mb-6 border-b border-[#E9E8E3]">
                {["products", "reviews"].map(t => (
                    <button key={t} onClick={() => setTab(t as typeof tab)}
                        style={{
                            paddingBottom: 10, fontSize: 15, fontWeight: tab === t ? 600 : 400,
                            color: tab === t ? "var(--adm-accent, #51A46B)" : "var(--adm-fg-2, #4a4a4a)",
                            borderBottom: tab === t ? "2px solid var(--adm-accent, #51A46B)" : "2px solid transparent",
                            background: "none", borderInline: "none", borderTop: "none",
                            cursor: "pointer", fontFamily: "inherit",
                        }}>
                        {t === "products" ? "محصولات" : "نظرات"}
                    </button>
                ))}
            </div>

            {tab === "products" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {FARMER.products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {FARMER.reviews.map((r, i) => (
                        <div key={i} className="border border-[#E9E8E3] rounded-[16px] p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#E5F2E9] flex items-center justify-center text-[16px] font-bold text-[#51A46B]">{r.user[0]}</div>
                                    <div>
                                        <p className="text-[14px] font-semibold text-[#212121]">{r.user}</p>
                                        <p className="text-[12px] text-[#8A8A8A]">{fa(r.date)}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= r.rating ? "#f5a623" : "#D4D4D4", fontSize: 14 }}>★</span>)}
                                </div>
                            </div>
                            <p className="text-[14px] text-[#505050] leading-7 m-0">{r.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
