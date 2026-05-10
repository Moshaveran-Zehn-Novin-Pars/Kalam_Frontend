"use client"

import Link from "next/link"
import { Plus, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"
import { useCartStore } from "@/store/cartStore"
import type { Product } from "@/types"

interface ProductCardProps {
    product: Partial<Product>
    withLink?: boolean      //  (default: true)
    withMotion?: boolean    //  (default: true)
}

function toFa(num: string | number) {
    return num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)])
}

export default function ProductCard({
                                        product,
                                        withLink = true,
                                        withMotion = true,
                                    }: ProductCardProps) {
    const addItem = useCartStore((s) => s.addItem)

    // تصویر: اول primary، بعد اولین
    const img =
        (product.images as { url: string; isPrimary?: boolean }[] | undefined)
            ?.find(i => i.isPrimary)?.url ??
        (product.images as { url: string }[] | undefined)?.[0]?.url ??
        null

    const price = parseFloat(product.pricePerUnit ?? "0")
    const priceFormatted = toFa(new Intl.NumberFormat("en-US").format(price))

    const href = `/products/${(product as Product).slug || product.id}`

    const ImageWrapper = withLink
        ? ({ children }: { children: React.ReactNode }) => (
            <Link href={href}
                  className="w-full aspect-[4/3] sm:h-[180px] sm:aspect-auto flex items-center justify-center overflow-hidden mb-3 sm:mb-5 pb-3 sm:pb-5 border-b border-[#E9E8E3]">
                {children}
            </Link>
        )
        : ({ children }: { children: React.ReactNode }) => (
            <div className="bg-[#F5F9F6] rounded-xl p-4 mb-4 h-48 flex items-center justify-center">
                {children}
            </div>
        )

    const cardContent = (
        <div className="bg-white rounded-[16px] sm:rounded-[20px] p-3 sm:p-5 border border-[#E9E8E3] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col h-full w-full">

            {/* تصویر */}
            <ImageWrapper>
                {img
                    ? <img src={img} alt={product.name} className="max-h-full object-contain hover:scale-105 transition-transform duration-500" />
                    : <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#E5F2E9] flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 sm:w-7 sm:h-7 text-[#51A46B] opacity-80" />
                    </div>
                }
            </ImageWrapper>

            {/* نام و واحد */}
            <div className="flex justify-between items-center mb-4 sm:mb-7 gap-2">
                {withLink
                    ? <Link href={href}
                            className="font-bold text-[#212121] text-[13px] sm:text-[15px] hover:text-[#51A46B] transition-colors line-clamp-1 text-right">
                        {product.name}
                    </Link>
                    : <h3 className="font-bold text-[#212121] text-[13px] sm:text-[15px] line-clamp-1 text-right">
                        {product.name}
                    </h3>
                }
                <div className="border border-[#E9E8E3] rounded-[6px] sm:rounded-[8px] px-1.5 sm:px-2.5 py-0.5 sm:py-1 shrink-0">
                    <span className="text-[10px] sm:text-[12px] text-[#505050] whitespace-nowrap">هر {product.unit}</span>
                </div>
            </div>

            {/* قیمت و دکمه */}
            <div className="flex flex-row justify-between items-center mt-auto w-full gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1 shrink-0">
                    <span className="font-bold text-[#212121] text-[14px] sm:text-[17px] tracking-tight mt-0.5">
                        {priceFormatted}
                    </span>
                    <span className="text-[10px] sm:text-[12px] text-[#505050] font-medium pt-1 hidden min-[360px]:inline-block">
                        تومان
                    </span>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        if (product.id) addItem(product as Product)
                    }}
                    className="flex items-center justify-center gap-1 border border-[#51A46B] text-[#51A46B] px-2 sm:px-3.5 h-[32px] sm:h-[38px] bg-white rounded-[8px] sm:rounded-[10px] hover:bg-[#51A46B] hover:text-white transition-colors text-[12px] sm:text-[14px] font-medium shrink-0"
                >
                    <Plus size={14} strokeWidth={2.5} className="sm:w-4 sm:h-4" />
                    <span>افزودن</span>
                </button>
            </div>
        </div>
    )

    if (withMotion) {
        return (
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
            >
                {cardContent}
            </motion.div>
        )
    }

    return cardContent
}