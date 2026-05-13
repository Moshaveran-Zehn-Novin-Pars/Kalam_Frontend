// app/farmer/products/[id]/page.tsx
"use client"
import { useParams } from "next/navigation"
import ProductForm from "../_form"
export default function EditProductPage() {
    const { id } = useParams()
    return <ProductForm mode="edit" productId={id as string} />
}