import ProductCard from "@/features/product/components/ProductCard"

const products = [
    {
        id: 1,
        title: "میوه",
        price: 120,
        image: "https://api2.kojaro.com/media/2016-8-f3e4fdd1-8538-4182-b154-f861d08b5ee9-67c460c1c1067c5ba75d7044?w=1920&q=80"
    },
    {
        id: 2,
        title: "میوه",
        price: 250,
        image: "https://elementiranco.com/wp-content/uploads/2026/03/toot-farangi-1.webp"
    },
    {
        id: 3,
        title: "میوه",
        price: 80,
        image: "https://elementiranco.com/wp-content/uploads/2026/03/toot-farangi-1.webp"
    }
]

export default function ProductsPage() {
    return (
        <div className="p-10 grid grid-cols-3 gap-6">
            {products.map((item) => (
                <ProductCard key={item.id} product={item} />
            ))}
        </div>
    )
}