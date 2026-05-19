"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { SfIcon } from "@/components/shared/SfIcon"
import { useCartStore } from "@/store/cartStore"
import type { Product } from "@/types"

const UNIT_LABELS: Record<string, string> = { KG: "کیلو", TON: "تن", GR: "گرم" }

interface ProductCardProps {
    product: Partial<Product>
    withLink?: boolean
    withMotion?: boolean
}

function fa(n: string | number) {
    return n.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)])
}

function faPrice(n: number) {
    return fa(n.toLocaleString("en-US")).replace(/,/g, "،")
}

export default function ProductCard({
    product,
    withLink = true,
    withMotion = true,
}: ProductCardProps) {
    const addItem = useCartStore((s) => s.addItem)

    const img = product.images?.[0]?.url ?? null

    const price = parseFloat(product.pricePerUnit ?? "0")
    const href = `/products/${(product as Product).slug || product.id}`

    const card = (
        <article className="prod-card" onClick={() => {
            if (withLink && typeof window !== "undefined") {
                window.location.href = href
            }
        }}>
            <div className="prod-card__thumb">
                {img ? (
                    <img src={img} alt={product.name} className="prod-img" />
                ) : (
                    <img
                        src="/images/product-pomegranate.png"
                        alt={product.name}
                        className="prod-img"
                    />
                )}
            </div>
            <div className="prod-card__divider" />
            <div className="prod-card__head">
                <div className="prod-card__name">{product.name}</div>
                <span className="prod-card__unit">هر {product.unit ? (UNIT_LABELS[product.unit] || product.unit) : ""}</span>
            </div>
            <div className="prod-card__foot">
                <button
                    className="prod-card__add"
                    onClick={(e) => {
                        e.stopPropagation()
                        if (product.id) addItem(product as Product)
                    }}
                >
                    <SfIcon.Plus />
                    <span>افزودن</span>
                </button>
                <div className="prod-card__price tnum">{faPrice(price)} تومان</div>
            </div>
        </article>
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
                {card}
            </motion.div>
        )
    }

    return card
}
