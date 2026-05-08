export default function ProductDetailPage({ params }: { params: { productId: string } }) {
    return (
        <div className="p-10">
            <p>صفحه محصول: {params.productId}</p>
        </div>
    )
}