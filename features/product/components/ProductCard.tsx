"use client"

import { ShoppingCart } from "lucide-react"

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
    return (
        <div className="border rounded-2xl p-4 shadow-sm hover:shadow-xl transition duration-300">

            {/* تصویر */}
            <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain h-full"
                />
            </div>

            {/* عنوان */}
            <h2 className="mt-4 font-semibold text-lg line-clamp-1">
                {product.title}
            </h2>

            {/* قیمت */}
            <p className="text-gray-600 mt-2">تومان{product.price}</p>

            {/* دکمه */}
            <button
                className="mt-4 w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
            >
                <ShoppingCart size={18} />
                افزودن
            </button>
        </div>
    )
}