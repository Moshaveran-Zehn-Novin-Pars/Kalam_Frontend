"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react"
import { productService } from "@/services/product/productService"
import type { Product } from "@/types"
import { toast } from "sonner"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

function ConfirmDialog({ open, title, onConfirm, onCancel }: any) {
    if (!open) return null
    return (
        <div className="farmer-dlg-overlay" onClick={onCancel}>
            <div className="farmer-dlg" onClick={e => e.stopPropagation()}>
                <button className="farmer-dlg-close" onClick={onCancel}><X size={14} /></button>
                <p className="farmer-dlg-title">{title}</p>
                <div className="farmer-dlg-actions">
                    <button className="farmer-btn farmer-btn--filled" onClick={onConfirm}>حذف کردن</button>
                    <button className="farmer-btn farmer-btn--outline" onClick={onCancel}>انصراف</button>
                </div>
            </div>
        </div>
    )
}

export default function FarmerProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [del, setDel] = useState<any>(null)

    useEffect(() => {
        setLoading(true)
        productService.getMyProducts().then(res => setProducts(res.items || [])).catch(() => {}).finally(() => setLoading(false))
    }, [])

    const handleDelete = async (id: string) => {
        try {
            await productService.deleteProduct(id)
            setProducts(prev => prev.filter(p => p.id !== id))
            setDel(null)
            toast.success("محصول حذف شد")
        } catch {
            toast.error("خطا در حذف محصول")
        }
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <h1 className="f-title" style={{ margin: 0 }}>محصولات من</h1>
                <Link href="/farmer/products/new" className="f-btn f-btn--filled">
                    <Plus size={15} /> افزودن محصول
                </Link>
            </div>

            <div className="f-table-card">
                <div className="f-table-wrap">
                    <table className="f-table">
                        <thead><tr>
                            <th>محصول</th><th>دسته‌بندی</th><th>قیمت</th>
                            <th>موجودی</th><th>وضعیت</th><th>عملیات</th>
                        </tr></thead>
                        <tbody>
                        {loading ? (
                            <tr><td colSpan={6} style={{ textAlign: "center", padding: 32 }}><Loader2 size={20} className="animate-spin inline-block" /></td></tr>
                        ) : products.map(p => {
                            const stock = Number(p.stockQty || 0)
                            return (
                            <tr key={p.id}>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <span style={{ fontWeight: 500 }}>{p.name}</span>
                                    </div>
                                </td>
                                <td>{p.category?.name || "—"}</td>
                                <td className="tnum" style={{ fontWeight: 600 }}>{faNum(Number(p.pricePerUnit || 0))} تومان</td>
                                <td className="tnum">
                                    <span style={{ color: stock === 0 ? "var(--f-down)" : "inherit" }}>
                                        {stock === 0 ? "ناموجود" : `${faNum(stock)} ${p.unit || ""}`}
                                    </span>
                                </td>
                                <td>
                                    <span className={`f-pill ${p.status === "ACTIVE" ? "f-pill--active" : "f-pill--draft"}`}>
                                        {p.status === "ACTIVE" ? "فعال" : "پیش‌نویس"}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: "flex", gap: 6 }}>
                                        <Link href={`/farmer/products/${p.id}`} className="f-btn f-btn--ghost" style={{ padding: "5px 10px" }}>
                                            <Pencil size={13} />
                                        </Link>
                                        <button className="f-btn f-btn--ghost" style={{ padding: "5px 10px", color: "var(--f-down)" }} onClick={() => setDel(p)}>
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )})}
                        {!loading && products.length === 0 && (
                            <tr><td colSpan={6} style={{ textAlign: "center", padding: 32, color: "var(--f-fg-3)" }}>محصولی یافت نشد</td></tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmDialog open={!!del} title={`آیا می‌خواهید "${del?.name}" را حذف کنید؟`}
                           onConfirm={() => handleDelete(del.id)} onCancel={() => setDel(null)} />
        </>
    )
}