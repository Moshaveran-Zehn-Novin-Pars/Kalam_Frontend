import HeroSection from "@/components/sections/HeroSection"
import FeaturesSection from "@/components/sections/FeaturesSection"
import CategorySection from "@/components/sections/CategorySection"
import SpecialOfferSection from "@/components/sections/SpecialOfferSection"
import ProductsSection from "@/components/sections/ProductsSection"
import type { Product } from "@/types"

async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch(
            `${process.env.API_URL || "http://localhost:3000"}/api/v1/products?pageSize=12&status=ACTIVE`,
            { next: { revalidate: 60 } }
        )
        if (!res.ok) return []
        const json = await res.json()
        return json?.data?.items ?? []
    } catch {
        return []
    }
}

export default async function LandingPage() {
    const products = await getProducts()
    return (
        <div className="flex flex-col">
            <HeroSection />
            <FeaturesSection />
            <CategorySection />
            <SpecialOfferSection products={products} />
            <ProductsSection products={products} />
        </div>
    )
}