export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
    return <div className="p-10">جزئیات سفارش: {params.orderId}</div>
}