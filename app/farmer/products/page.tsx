"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Pencil, Trash2, X } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const PRODUCTS = [
    { id: "p1", name: "سیب درختی",   cat: "میوه",      price: 65000,  stock: 500, unit: "کیلو", status: "ACTIVE", emoji: "🍎" },
    { id: "p2", name: "گوجه فرنگی",  cat: "سبزیجات",  price: 45000,  stock: 200, unit: "کیلو", status: "ACTIVE", emoji: "🍅" },
    { id: "p3", name: "انگور بی‌دانه",cat: "میوه",     price: 80000,  stock: 150, unit: "کیلو", status: "ACTIVE", emoji: "🍇" },
    { id: "p4", name: "خیار گلخانه", cat: "سبزیجات",  price: 28000,  stock: 300, unit: "کیلو", status: "ACTIVE", emoji: "🥒" },
    { id: "p5", name: "هلو شیراز",   cat: "میوه",      price: 95000,  stock: 80,  unit: "کیلو", status: "DRAFT",  emoji: "🍑" },
    { id: "p6", name: "اسفناج",       cat: "سبزیجات",  price: 32000,  stock: 0,   unit: "کیلو", status: "ACTIVE", emoji: "🥬" },
]

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
    const [del, setDel] = useState<any>(null)

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
                            <th>محصول</th><th>دسته‌بندی</th><th>قیمت (کیلو)</th>
                            <th>موجودی</th><th>وضعیت</th><th>عملیات</th>
                        </tr></thead>
                        <tbody>
                        {PRODUCTS.map(p => (
                            <tr key={p.id}>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <div className="f-product-img">{p.emoji}</div>
                                        <span style={{ fontWeight: 500 }}>{p.name}</span>
                                    </div>
                                </td>
                                <td>{p.cat}</td>
                                <td className="tnum" style={{ fontWeight: 600 }}>{faNum(p.price)} تومان</td>
                                <td className="tnum">
                    <span style={{ color: p.stock === 0 ? "var(--f-down)" : "inherit" }}>
                      {p.stock === 0 ? "ناموجود" : `${faNum(p.stock)} ${p.unit}`}
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
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmDialog open={!!del} title={`آیا می‌خواهید "${del?.name}" را حذف کنید؟`}
                           onConfirm={() => setDel(null)} onCancel={() => setDel(null)} />
        </>
    )
}