"use client"

import { useState } from "react"
import { ChevronLeft, ChevronDown, Plus, Pencil, Trash2, Camera, ImageIcon } from "lucide-react"
import { X } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

type View = "categories" | "products" | "add-cat" | "add-product" | "edit-product"

const CATEGORIES = [
  { id: "c1", name: "سبزیجات", count: 24, status: "active" },
  { id: "c2", name: "میوه‌ها",  count: 18, status: "active" },
  { id: "c3", name: "لبنیات",  count: 12, status: "active" },
  { id: "c4", name: "خشکبار",  count: 8,  status: "inactive" },
  { id: "c5", name: "نان",     count: 5,  status: "active" },
  { id: "c6", name: "گوشت",    count: 7,  status: "inactive" },
]
const PRODUCTS = [
  { id: "p1", name: "لیمو شیرین", cat: "میوه", stock: "100 کیلوگرم", price: 120000 },
  { id: "p2", name: "گوجه فرنگی", cat: "سبزیجات", stock: "200 کیلوگرم", price: 45000 },
  { id: "p3", name: "سیب درختی",  cat: "میوه", stock: "80 کیلوگرم",  price: 65000 },
  { id: "p4", name: "خیار",       cat: "سبزیجات", stock: "150 کیلوگرم", price: 28000 },
  { id: "p5", name: "انگور",      cat: "میوه", stock: "60 کیلوگرم",  price: 85000 },
  { id: "p6", name: "اسفناج",     cat: "سبزیجات", stock: "50 کیلوگرم",  price: 32000 },
]

function Breadcrumb({ items, onNav }: { items: {label:string;active?:boolean}[]; onNav: (i:number)=>void }) {
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {items.map((it, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {i > 0 && <ChevronLeft size={12} style={{ color: "var(--adm-fg-4)", transform: "scaleX(-1)" }} />}
          {it.active
            ? <span style={{ fontSize: 14, color: "var(--adm-accent)" }}>{it.label}</span>
            : <button style={{ fontSize: 14, color: "var(--adm-accent)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--adm-font)", padding: 0 }} onClick={() => onNav(i)}>{it.label}</button>}
        </span>
      ))}
    </nav>
  )
}

function RowActions({ onEdit, onDelete }: { onEdit: ()=>void; onDelete: ()=>void }) {
  return (
    <div className="row-acts">
      <button className="row-act-btn" onClick={onEdit}><Pencil size={15} /></button>
      <button className="row-act-btn del" onClick={onDelete}><Trash2 size={15} /></button>
    </div>
  )
}

function ConfirmDialog({ open, title, onConfirm, onCancel }: any) {
  if (!open) return null
  return (
    <div className="adm-dlg-overlay" onClick={onCancel}>
      <div className="adm-dlg" onClick={e => e.stopPropagation()}>
        <button className="adm-dlg-close" onClick={onCancel}><X size={14} /></button>
        <p className="adm-dlg-title">{title}</p>
        <div className="adm-dlg-actions">
          <button className="adm-btn adm-btn--filled" onClick={onConfirm}>حذف کردن</button>
          <button className="adm-btn adm-btn--outline" onClick={onCancel}>انصراف</button>
        </div>
      </div>
    </div>
  )
}

/* ── Categories list ── */
function CategoriesView({ onOpen, onAdd, onEdit }: any) {
  const [del, setDel] = useState<any>(null)
  return (
    <>
      <div className="adm-toolbar">
        <h1 className="adm-toolbar-title">دسته‌بندی‌ها</h1>
        <div className="adm-toolbar-controls">
          <button className="adm-tb-pill">دسته‌بندی‌ها <ChevronDown size={13} /></button>
          <button className="adm-tb-pill">مرتب‌سازی <ChevronDown size={13} /></button>
        </div>
      </div>
      <div className="adm-table-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr>
              <th>عکس</th><th>نام دسته‌بندی</th><th>تعداد محصول</th><th>وضعیت</th><th>ویرایش و حذف</th>
            </tr></thead>
            <tbody>
              {CATEGORIES.map(c => (
                <tr key={c.id} className="clickable" onClick={() => onOpen(c)}>
                  <td>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--adm-accent-50)", display: "grid", placeItems: "center" }}>
                      <span style={{ fontSize: 18 }}>🌿</span>
                    </div>
                  </td>
                  <td>{c.name}</td>
                  <td className="tnum">{fa(c.count)}</td>
                  <td>
                    <span className={`pill ${c.status === "active" ? "pill--active" : "pill--inactive"}`}>
                      {c.status === "active" ? "فعال" : "غیرفعال"}
                    </span>
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <RowActions onEdit={() => onEdit(c)} onDelete={() => setDel(c)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <button className="adm-btn adm-btn--outline" onClick={onAdd}><Plus size={15} /><span>افزودن دسته‌بندی جدید</span></button>
      </div>
      <ConfirmDialog open={!!del} title="آیا مایل به حذف این دسته‌بندی هستید؟" onConfirm={() => setDel(null)} onCancel={() => setDel(null)} />
    </>
  )
}

/* ── Products list ── */
function ProductsView({ cat, onBack, onEdit, onAdd }: any) {
  const [del, setDel] = useState<any>(null)
  return (
    <>
      <div className="adm-toolbar" style={{ marginBottom: 8 }}>
        <h1 className="adm-toolbar-title">محصولات</h1>
        <div className="adm-toolbar-controls">
          <button className="adm-tb-pill">دسته‌بندی‌ها <ChevronDown size={13} /></button>
          <button className="adm-tb-pill">مرتب‌سازی <ChevronDown size={13} /></button>
        </div>
      </div>
      <Breadcrumb items={[{ label: "دسته‌بندی‌ها" }, { label: "محصولات", active: true }]} onNav={i => i === 0 && onBack()} />
      <div style={{ height: 16 }} />
      <div className="adm-table-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr>
              <th>عکس</th><th>نام محصول</th><th>دسته‌بندی</th><th>موجودی</th><th>قیمت هرکیلو</th><th>ویرایش و حذف</th>
            </tr></thead>
            <tbody>
              {PRODUCTS.map(p => (
                <tr key={p.id} className="clickable" onClick={() => onEdit(p)}>
                  <td><div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--adm-accent-50)", display: "grid", placeItems: "center", fontSize: 18 }}>🍋</div></td>
                  <td>{p.name}</td>
                  <td>{p.cat}</td>
                  <td className="tnum">{fa(p.stock)}</td>
                  <td className="tnum">{faNum(p.price)} تومان</td>
                  <td onClick={e => e.stopPropagation()}>
                    <RowActions onEdit={() => onEdit(p)} onDelete={() => setDel(p)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <button className="adm-btn adm-btn--outline" onClick={onAdd}><Plus size={15} /><span>افزودن محصول جدید</span></button>
      </div>
      <ConfirmDialog open={!!del} title="آیا مایل به حذف این محصول هستید؟" onConfirm={() => setDel(null)} onCancel={() => setDel(null)} />
    </>
  )
}

/* ── Add Category form ── */
function AddCatView({ onBack }: any) {
  const [status, setStatus] = useState("active")
  return (
    <>
      <h1 className="adm-page-title">افزودن دسته‌بندی</h1>
      <div className="adm-form-card">
        <div className="adm-form-grid">
          <div className="adm-form-image">
            <button className="adm-form-image-cam"><Camera size={15} /></button>
            <ImageIcon size={40} style={{ color: "var(--adm-accent)", opacity: 0.5 }} />
          </div>
          <div className="adm-form-fields">
            <div className="adm-field">
              <label className="adm-field-label">نام دسته‌بندی</label>
              <input className="adm-field-input" placeholder="نام دسته‌بندی" />
            </div>
            <div className="adm-field">
              <label className="adm-field-label">تعداد محصول</label>
              <div className="adm-field-select">
                <select className="adm-field-input" style={{ paddingInlineEnd: 36 }}>
                  <option value="">انتخاب کنید</option>
                  <option>۰ تا ۱۰</option><option>۱۰ تا ۵۰</option><option>بیش از ۵۰</option>
                </select>
                <ChevronDown size={14} className="adm-field-select-icon" />
              </div>
            </div>
            <div className="adm-field">
              <label className="adm-field-label">وضعیت</label>
              <div className="adm-field-pill-select">
                <span className={`pill ${status === "active" ? "pill--active" : "pill--inactive"}`}>{status === "active" ? "فعال" : "غیرفعال"}</span>
                <ChevronDown size={14} style={{ color: "var(--adm-fg-3)" }} />
                <select value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="active">فعال</option><option value="inactive">غیرفعال</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="adm-field">
          <label className="adm-field-label">توضیحات</label>
          <textarea className="adm-field-textarea" placeholder="توضیحات" />
        </div>
      </div>
      <button className="adm-btn adm-btn--outline" onClick={onBack}>افزودن دسته‌بندی</button>
    </>
  )
}

/* ── Edit Product form ── */
function EditProductView({ product, onBack, mode = "edit" }: any) {
  const [status, setStatus] = useState("instock")
  const isEdit = mode === "edit"
  return (
    <>
      <div className="adm-detail-head">
        <h1 className="adm-page-title" style={{ marginBottom: 0 }}>{isEdit ? "جزئیات محصولات" : "افزودن محصول"}</h1>
        <Breadcrumb items={[{ label: "دسته‌بندی‌ها" }, { label: "میوه" }, { label: product?.name || "لیمو شیرین", active: true }]} onNav={i => i < 2 && onBack()} />
      </div>
      <div className="adm-form-card">
        <div className="adm-form-grid">
          <div className="adm-form-image">
            <button className="adm-form-image-cam"><Camera size={15} /></button>
            <ImageIcon size={40} style={{ color: "var(--adm-accent)", opacity: 0.5 }} />
          </div>
          <div className="adm-form-fields">
            <div className="adm-field">
              <label className="adm-field-label">نام محصول</label>
              <input className="adm-field-input" defaultValue={product?.name || ""} />
            </div>
            <div className="adm-field">
              <label className="adm-field-label">دسته‌بندی</label>
              <div className="adm-field-select">
                <select className="adm-field-input" style={{ paddingInlineEnd: 36 }}>
                  <option>میوه</option><option>سبزیجات</option><option>لبنیات</option>
                </select>
                <ChevronDown size={14} className="adm-field-select-icon" />
              </div>
            </div>
            <div className="adm-field">
              <label className="adm-field-label">قیمت خرده</label>
              <input className="adm-field-input" defaultValue={product?.price || ""} />
            </div>
            <div className="adm-field">
              <label className="adm-field-label">قیمت عمده</label>
              <input className="adm-field-input" />
            </div>
            <div className="adm-field">
              <label className="adm-field-label">وضعیت</label>
              <div className="adm-field-pill-select">
                <span className={`pill ${status === "instock" ? "pill--instock" : "pill--inactive"}`}>{status === "instock" ? "موجود" : "ناموجود"}</span>
                <ChevronDown size={14} style={{ color: "var(--adm-fg-3)" }} />
                <select value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="instock">موجود</option><option value="inactive">ناموجود</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="adm-field">
          <label className="adm-field-label">توضیحات محصول</label>
          <textarea className="adm-field-textarea" placeholder="توضیحات محصول" />
        </div>
      </div>
      <button className="adm-btn adm-btn--outline" onClick={onBack}>{isEdit ? "ذخیره تغییرات" : "افزودن محصول"}</button>
    </>
  )
}

/* ── Main page ── */
export default function ProductsPage() {
  const [view, setView] = useState<View>("categories")
  const [selectedCat, setSelectedCat] = useState<any>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  if (view === "add-cat") return <AddCatView onBack={() => setView("categories")} />
  if (view === "add-product") return <EditProductView mode="add" onBack={() => setView("products")} />
  if (view === "edit-product") return <EditProductView product={selectedProduct} onBack={() => setView("products")} />
  if (view === "products") return (
    <ProductsView
      cat={selectedCat}
      onBack={() => setView("categories")}
      onEdit={(p: any) => { setSelectedProduct(p); setView("edit-product") }}
      onAdd={() => setView("add-product")}
    />
  )
  return (
    <CategoriesView
      onOpen={(c: any) => { setSelectedCat(c); setView("products") }}
      onAdd={() => setView("add-cat")}
      onEdit={(c: any) => { setSelectedCat(c); setView("add-cat") }}
    />
  )
}