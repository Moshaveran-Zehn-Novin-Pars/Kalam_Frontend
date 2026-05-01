"use client"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import React from "react"

type Variant =
    | "primary"
    | "outline"
    | "ghost"
    | "greenOutline" // 👈 همونی که گفتی

type Size = "sm" | "md" | "lg"

type Props = {
    label: string
    icon?: React.ReactNode
    variant?: Variant
    size?: Size
    loading?: boolean
    disabled?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    href?: string
    target?: "_self" | "_blank"
}

/* 🎯 variants آماده */
const variants: Record<Variant, string> = {
    primary: "bg-[#51A46B] text-white border border-[#51A46B]",
    outline:
        "bg-transparent text-[#51A46B] border border-[#51A46B] hover:bg-[#51A46B] hover:text-white",
    ghost: "bg-transparent text-black",

    /* 💎 preset مورد نیاز تو */
    greenOutline:
        "bg-transparent text-[#51A46B] border border-[#51A46B]",
}

/* 🎯 sizes */
const sizes: Record<Size, string> = {
    sm: "px-3 py-1 text-[14px]",
    md: "px-4 py-2 text-[16px]", // 👈 همونی که گفتی
    lg: "px-6 py-3 text-[18px]",
}

export default function Button({
                                   label,
                                   icon,
                                   variant = "primary",
                                   size = "md",
                                   loading = false,
                                   disabled = false,
                                   onClick,
                                   href,
                                   target = "_self",
                               }: Props) {
    const isDisabled = disabled || loading

    const className = cn(
        "inline-flex items-center justify-center gap-2 rounded-xl transition-all",
        variants[variant],
        sizes[size],
        isDisabled && "opacity-50 cursor-not-allowed"
    )

    const content = (
        <>
            {loading ? (
                <Loader2 className="animate-spin" size={18} />
            ) : (
                icon && <span className="flex items-center">{icon}</span>
            )}

            <span>{label}</span>
        </>
    )

    /* لینک */
    if (href && !isDisabled) {
        return (
            <Link href={href} target={target}>
                <span className={className}>{content}</span>
            </Link>
        )
    }

    /* دکمه */
    return (
        <button onClick={onClick} disabled={isDisabled} className={className}>
            {content}
        </button>
    )
}