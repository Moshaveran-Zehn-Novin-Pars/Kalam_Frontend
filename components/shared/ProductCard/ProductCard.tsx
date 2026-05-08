"use client"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { toast } from "sonner"
import Link from "next/link"

type ProductCardProps = {
    id: string
    imageUrl: string
    productName: string
    unit: string
    price: number
    addToCartHandler?: () => void
}

export default function ProductCard({ id, imageUrl, productName, unit, price, addToCartHandler }: ProductCardProps) {
    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault()
        addToCartHandler?.()
        toast.success("محصول به سبد اضافه شد 🛒")
    }

    return (
        <Link href={`/products/${id}`}
              className="bg-white flex flex-col items-start justify-start w-[283px] h-[387px] border border-[#E9E8E3] rounded-[20px] p-[24px_24px_12px_24px] gap-[10px] relative hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="w-[210px] h-[196px] flex items-center justify-center overflow-hidden rounded-[10px] mx-auto">
                {imageUrl
                    ? <img src={imageUrl} alt={productName} className="object-contain w-full h-full" />
                    : <div className="w-16 h-16 rounded-full bg-[#E5F2E9] flex items-center justify-center"><ShoppingCart className="w-7 h-7 text-[#51A46B]" /></div>}
            </div>
            <div className="w-full h-[1px] bg-[#E9E8E3] my-2" />
            <div className="w-full flex items-center justify-between gap-2">
                <span className="text-base font-medium text-gray-800">{productName}</span>
                <div className="flex items-center justify-center w-[61px] h-[31px] border border-[#E9E8E3] rounded-[10px] py-[6px] px-[12px]">
                    <span className="text-xs font-normal text-gray-600">{unit}</span>
                </div>
            </div>
            <div className="w-full h-[1px] bg-[#E9E8E3] my-2" />
            <div className="w-full flex items-center justify-between mt-auto">
                <span className="text-xl font-bold text-gray-900">{price.toLocaleString("fa-IR")} تومان</span>
                <button onClick={handleAdd}
                        className="flex items-center gap-1.5 border border-[#51A46B] text-[#51A46B] rounded-[10px] px-3 py-2 text-[13px] hover:bg-[#51A46B] hover:text-white transition-colors">
                    <ShoppingCart size={14} />
                    افزودن
                </button>
            </div>
        </Link>
    )
}
