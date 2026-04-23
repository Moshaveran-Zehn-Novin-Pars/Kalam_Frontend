"use client"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

type Props = {
    label: string
    icon?: React.ReactNode
    variant?: "primary" | "outline" | "ghost"
    size?: "sm" | "md" | "lg"
    loading?: boolean
    disabled?: boolean
    onClick?: () => void
}

export default function Button({
                                   label,
                                   icon,
                                   variant = "primary",
                                   size = "md",
                                   loading = false,
                                   disabled = false,
                                   onClick,
                               }: Props) {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={cn(
                "flex items-center justify-center gap-2 rounded-xl transition-all",

                // size
                size === "sm" && "px-3 py-1 text-sm",
                size === "md" && "px-4 py-2 text-base",
                size === "lg" && "px-6 py-3 text-lg",

                // variant
                variant === "primary" &&
                "bg-[var(--primary)] text-white hover:opacity-90",

                variant === "outline" &&
                "border border-[var(--primary)] text-[var(--primary)]",

                variant === "ghost" &&
                "bg-transparent text-[var(--primary)]",

                // disabled
                "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
        >
            {loading ? (
                <Loader2 className="animate-spin" size={18} />
            ) : (
                icon
            )}

            <span>{label}</span>
        </button>
    )
}