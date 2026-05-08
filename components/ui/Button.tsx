import * as React from "react"
import { cn } from "@/lib/utils"


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "destructive"
    size?: "sm" | "md" | "lg" | "icon"
    asChild?: boolean
}

const variants = {
    default:     "bg-[#51A46B] text-white hover:bg-[#417F56]",
    outline:     "border border-[#51A46B] text-[#51A46B] bg-transparent hover:bg-[#E5F2E9]",
    ghost:       "bg-transparent text-[#505050] hover:bg-[#F5F5F5]",
    destructive: "bg-red-500 text-white hover:bg-red-600",
}
const sizes = {
    sm:   "h-8 px-3 text-sm rounded-[8px]",
    md:   "h-10 px-4 text-[15px] rounded-[10px]",
    lg:   "h-12 px-6 text-[16px] rounded-[10px]",
    icon: "h-10 w-10 rounded-[10px]",
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "md", children, ...props }, ref) => (
        <button
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
)
Button.displayName = "Button"
export { Button }
