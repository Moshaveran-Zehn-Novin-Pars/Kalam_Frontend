"use client"

import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { toast } from "sonner"
import Link from "next/link"

type Product = {
    id: number | string
    title?: string
    name?: string
    price: number
    image: string
}

type Props = { product: Product }

export default function ProductCard({ product }: Props) {
    const addItem = useCartStore((s) => s.addItem)

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault()
        toast.success("محصول به سبد اضافه شد 🛒")
    }

    const title = product.name ?? product.title ?? "محصول"

    return (
        <Link href={`/products/${product.id}`}
              className="border border-[#E9E8E3] rounded-[20px] p-4 shadow-sm hover:shadow-lg transition-all bg-white flex flex-col gap-3">
            <div className="h-48 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                {product.image
                    ? <img src={product.image} alt={title} className="h-full object-contain" />
                    : <ShoppingCart className="w-10 h-10 text-gray-300" />}
            </div>
            <h2 className="font-bold text-[15px] text-right">{title}</h2>
            <p className="text-[#505050] text-[14px] text-right">{product.price.toLocaleString("fa-IR")} تومان</p>
            <button onClick={handleAdd}
                    className="flex items-center justify-center gap-2 border border-[#51A46B] text-[#51A46B] rounded-[10px] py-2 text-[14px] hover:bg-[#51A46B] hover:text-white transition-colors">
                <ShoppingCart size={16} />
                افزودن به سبد
            </button>
        </Link>
    )
}
