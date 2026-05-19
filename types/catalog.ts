export interface CatalogItem {
    id: string
    productId: string
    name: string
    slug: string
    category: string
    image: string | null
    price: string
    unit: string
    moq: number
    qualityGrade: string
    origin: string
    vendorName: string
    vendorRating: number
    inStock: boolean
}
