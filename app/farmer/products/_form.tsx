// app/farmer/products/_form.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, Camera, ImageIcon } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const MOCK_PRODUCT = {
    name: "سیب درختی", cat: "fruit", priceRetail: "65000",
    priceWholesale: "55000", stock: "500", minOrder: "50",
    unit: "kg", status: "ACTIVE", description: "سیب درختی درجه یک از باغات شیراز",
}

export default function ProductForm({ mode, productId }: { mode: "new" | "edit"; productId?: string }) {
    const router = useRouter()
    const initial = mode === "edit" ? MOCK_PRODUCT : { name: "", cat: "", priceRetail: "", priceWholesale: "", stock: "", minOrder: "", unit: "kg", status: "ACTIVE", description: "" }
    const [form, setForm] = useState(initial)
    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <button className="f-btn f-btn--ghost" onClick={() => router.back()} style={{ padding: "7px 14px" }}>← بازگشت</button>
                <h1 className="f-title" style={{ margin: 0 }}>
                    {mode === "new" ? "افزودن محصول جدید" : "ویرایش محصول"}
                </h1>
            </div>

            <div className="f-card">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 28 }}>
                    {/* image upload */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ aspectRatio: "1", border: "1px dashed var(--f-border-s)", borderRadius: "var(--f-r)", background: "var(--f-accent-50)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", position: "relative" }}>
                            <ImageIcon size={36} style={{ color: "var(--f-accent)", opacity: 0.5 }} />
                            <span style={{ fontSize: 12, color: "var(--f-fg-3)" }}>آپلود تصویر محصول</span>
                            <button style={{ position: "absolute", top: 10, insetInlineEnd: 10, width: 28, height: 28, borderRadius: "50%", background: "var(--f-surface)", border: "1px solid var(--f-border)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--f-accent)" }}>
                                <Camera size={13} />
                            </button>
                        </div>
                    </div>

                    {/* fields */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <div className="f-field">
                            <label className="f-field-label">نام محصول</label>
                            <input className="f-input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="مثال: سیب درختی" />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div className="f-field">
                                <label className="f-field-label">دسته‌بندی</label>
                                <div className="f-select">
                                    <select className="f-input" value={form.cat} onChange={e => set("cat", e.target.value)} style={{ paddingInlineEnd: 36 }}>
                                        <option value="">انتخاب کنید</option>
                                        <option value="fruit">میوه</option>
                                        <option value="veg">سبزیجات</option>
                                        <option value="dairy">لبنیات</option>
                                        <option value="dry">خشکبار</option>
                                    </select>
                                    <ChevronDown size={14} className="f-select-icon" />
                                </div>
                            </div>
                            <div className="f-field">
                                <label className="f-field-label">واحد</label>
                                <div className="f-select">
                                    <select className="f-input" value={form.unit} onChange={e => set("unit", e.target.value)} style={{ paddingInlineEnd: 36 }}>
                                        <option value="kg">کیلوگرم</option>
                                        <option value="ton">تن</option>
                                        <option value="box">جعبه</option>
                                    </select>
                                    <ChevronDown size={14} className="f-select-icon" />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div className="f-field">
                                <label className="f-field-label">قیمت خرده (تومان)</label>
                                <input className="f-input" value={form.priceRetail} onChange={e => set("priceRetail", e.target.value)} placeholder="65000" />
                            </div>
                            <div className="f-field">
                                <label className="f-field-label">قیمت عمده (تومان)</label>
                                <input className="f-input" value={form.priceWholesale} onChange={e => set("priceWholesale", e.target.value)} placeholder="55000" />
                            </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div className="f-field">
                                <label className="f-field-label">موجودی ({form.unit === "kg" ? "کیلو" : form.unit})</label>
                                <input className="f-input" value={form.stock} onChange={e => set("stock", e.target.value)} placeholder="500" />
                            </div>
                            <div className="f-field">
                                <label className="f-field-label">حداقل سفارش</label>
                                <input className="f-input" value={form.minOrder} onChange={e => set("minOrder", e.target.value)} placeholder="50" />
                            </div>
                        </div>
                        <div className="f-field">
                            <label className="f-field-label">وضعیت</label>
                            <div className="f-select">
                                <select className="f-input" value={form.status} onChange={e => set("status", e.target.value)} style={{ paddingInlineEnd: 36 }}>
                                    <option value="ACTIVE">فعال (قابل نمایش)</option>
                                    <option value="DRAFT">پیش‌نویس</option>
                                </select>
                                <ChevronDown size={14} className="f-select-icon" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="f-field" style={{ marginTop: 20 }}>
                    <label className="f-field-label">توضیحات محصول</label>
                    <textarea className="f-textarea" value={form.description} onChange={e => set("description", e.target.value)} placeholder="توضیحات محصول، درجه کیفیت، منشأ و ..." />
                </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button className="f-btn f-btn--filled">{mode === "new" ? "افزودن محصول" : "ذخیره تغییرات"}</button>
                <button className="f-btn f-btn--ghost" onClick={() => router.back()}>انصراف</button>
            </div>
        </>
    )
}