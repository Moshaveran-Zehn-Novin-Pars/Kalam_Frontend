"use client"

import { ShoppingCart } from "lucide-react"
import Button from "@/components/ui/Button"
import { useCartStore } from "@/store/cartStore"
import { toast } from "sonner"

type Product = {
    id: number
    title: string
    price: number
    image: string
}

type Props = {
    product: Product
}

export default function ProductCard({ product }: Props) {
    const addToCart = useCartStore((state) => state.addToCart)

    const handleAdd = () => {
        addToCart(product)
        toast.success("محصول به سبد اضافه شد 🛒")
    }

    return (
        <div className="border rounded-2xl p-4 shadow-sm hover:shadow-xl transition">

            {/* تصویر */}
            <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                <img src={product.image} className="h-full object-contain" />
            </div>

            {/* عنوان */}
            <h2 className="mt-4 font-semibold text-lg">
                {product.title}
            </h2>

            {/* قیمت */}
            <p className="text-gray-600 mt-2">
                ${product.price}
            </p>

            {/* دکمه */}
            <Button
                label="افزودن به سبد"
                icon={<ShoppingCart size={18} />}
                onClick={handleAdd}
            />
        </div>
    )
}