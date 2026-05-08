import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "green" | "yellow" | "purple"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

const variants: Record<BadgeVariant, string> = {
  default:     "bg-[#51A46B] text-white",
  secondary:   "bg-[#E5F2E9] text-[#417F56]",
  destructive: "bg-red-100 text-red-700",
  outline:     "border border-[#51A46B] text-[#51A46B] bg-transparent",
  green:       "bg-[#E5F2E9] text-[#417F56]",
  yellow:      "bg-yellow-100 text-yellow-800",
  purple:      "bg-purple-100 text-purple-800",
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[8px] px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
