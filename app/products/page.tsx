import ProductCard from "@/features/product/components/ProductCard"

const products = [
    {
        id: 1,
        title: "Nike Shoes",
        price: 120,
        image: "https://api2.kojaro.com/media/2016-8-f3e4fdd1-8538-4182-b154-f861d08b5ee9-67c460c1c1067c5ba75d7044?w=1920&q=80"
    },
    {
        id: 2,
        title: "Smart Watch",
        price: 250,
        image: "https://api2.kojaro.com/media/2016-8-f3e4fdd1-8538-4182-b154-f861d08b5ee9-67c460c1c1067c5ba75d7044?w=1920&q=80"
    },
]

export default function ProductsPage() {
    return (
        <div className="p-10 grid grid-cols-3 gap-6">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    )
}