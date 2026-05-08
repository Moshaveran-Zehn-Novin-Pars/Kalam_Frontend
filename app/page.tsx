import CategoryCard from "@/components/shared/CategoryCard/CategoryCard"
import Banner from "@/components/shared/banner/Banner"
import ProductCard from "@/components/shared/ProductCard/ProductCard"
import type { Product } from "@/types"
import type { Category } from "@/types"

// ============================================
// Landing Page - Server Component (no "use client")
// Fetches data from backend; fallback to empty on error
// ============================================

async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch(
            `${process.env.API_URL || 'http://localhost:3000'}/api/v1/products?pageSize=12&status=ACTIVE`,
            { next: { revalidate: 60 } }
        )
        if (!res.ok) return []
        const json = await res.json()
        return json?.data?.items ?? []
    } catch {
        return []
    }
}

async function getCategories(): Promise<Category[]> {
    try {
        const res = await fetch(
            `${process.env.API_URL || 'http://localhost:3000'}/api/v1/categories`,
            { next: { revalidate: 300 } }
        )
        if (!res.ok) return []
        const json = await res.json()
        return json?.data ?? []
    } catch {
        return []
    }
}

export default async function LandingPage() {
    const [products, categories] = await Promise.all([
        getProducts(),
        getCategories(),
    ])

    return (
        <div className="flex flex-col">
            <Banner />

            {/* Category Section */}
            <section className="px-6 py-8">
                <h2 className="font-semibold text-[24px] text-center mb-6">
                    همه‌چیز برای آشپزی، مهمانی و زندگی روزمره‌
                </h2>

                {categories.length > 0 ? (
                    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                        {categories.map((cat) => (
                            <CategoryCard
                                key={cat.id}
                                id={cat.id}
                                title={cat.name}
                                description=""
                                image={cat.imageUrl ?? ""}
                                bgColor="#E5F2E9"
                                borderColor="#51A46B"
                            />
                        ))}
                    </div>
                ) : null}
            </section>

            {/* Products Section */}
            {products.length > 0 && (
                <section className="px-6 py-4">
                    <h2 className="font-semibold text-[24px] text-center mb-6">محصولات</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                imageUrl={product.images?.[0]?.url ?? "/images/placeholder.png"}
                                productName={product.name}
                                unit={product.unit}
                                price={parseFloat(product.pricePerUnit)}
                                addToCartHandler={() => {}}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}