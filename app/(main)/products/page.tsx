"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { SfIcon } from "@/components/shared/SfIcon"
import ProductCard from "@/components/shared/ProductCard/ProductCard"
import { productService } from "@/services/product"
import type { Product } from "@/types"

const CATEGORIES = [
    { id: "fruit", label: "میوه" },
    { id: "vegetables", label: "سبزیجات" },
    { id: "greens", label: "صیفی‌جات" },
]

const USE_CASES = [
    { id: "juice", label: "آبمیوه‌گیری" },
    { id: "party", label: "مجلسی" },
    { id: "cooking", label: "آشپزی" },
    { id: "celebration", label: "پک مراسم" },
]

const SORT_LABELS: Record<string, string> = {
    default: "مرتب سازی بر اساس",
    "price-asc": "قیمت: ارزان‌ترین",
    "price-desc": "قیمت: گران‌ترین",
    name: "نام محصول",
}

function fa(n: string | number) {
    if (n === null || n === undefined) return ""
    return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)])
}

export default function ProductsPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const initialCat = searchParams.get("category")

    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCats, setSelectedCats] = useState<string[]>(initialCat ? [initialCat] : [])
    const [selectedUses, setSelectedUses] = useState<string[]>([])
    const [priceMax, setPriceMax] = useState(850)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)
    const [sortBy, setSortBy] = useState("default")

    useEffect(() => {
        setLoading(true)
        productService
            .getProducts({ page: 1, pageSize: 50 })
            .then((res) => {
                setAllProducts(res.items || [])
            })
            .catch(() => setAllProducts([]))
            .finally(() => setLoading(false))
    }, [])

    const filtered = useMemo(() => {
        let list = allProducts.slice()

        if (selectedCats.length) {
            list = list.filter((p) => selectedCats.includes(p.categoryId))
        }

        if (selectedUses.length) {
            list = list.filter((p) =>
                selectedUses.some((u) => p.name.includes(u))
            )
        }

        const priceLimit = priceMax * 1000
        list = list.filter((p) => parseFloat(p.pricePerUnit) <= priceLimit)

        if (sortBy === "price-asc") list.sort((a, b) => parseFloat(a.pricePerUnit) - parseFloat(b.pricePerUnit))
        if (sortBy === "price-desc") list.sort((a, b) => parseFloat(b.pricePerUnit) - parseFloat(a.pricePerUnit))
        if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name, "fa"))

        return list
    }, [allProducts, selectedCats, selectedUses, priceMax, sortBy])

    const toggleCat = useCallback((id: string) => {
        setSelectedCats((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
    }, [])

    const toggleUse = useCallback((id: string) => {
        setSelectedUses((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
    }, [])

    const filterContent = (
        <FilterBody
            selectedCats={selectedCats}
            toggleCat={toggleCat}
            selectedUses={selectedUses}
            toggleUse={toggleUse}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
        />
    )

    return (
        <main className="sf-page" data-screen-label="02 PLP">
            <div className="plp-layout">
                <aside className="plp-filters" aria-label="فیلترها">
                    <div className="plp-filters__head">
                        <SfIcon.Filter />
                        <span>فیلترها</span>
                    </div>
                    {filterContent}
                </aside>

                <section className="plp-main">
                    <div className="plp-toolbar">
                        <button className="plp-mobile-filter-btn" onClick={() => setSheetOpen(true)}>
                            <SfIcon.Filter />
                            فیلترها
                        </button>
                        <h1 className="plp-toolbar__title">محصولات</h1>

                        <div className="plp-sort">
                            <button className="plp-sort__btn" onClick={() => setSortOpen((p) => !p)}>
                                <span>{SORT_LABELS[sortBy]}</span>
                                <SfIcon.ChevronDown />
                            </button>
                            {sortOpen && (
                                <div className="plp-sort__menu">
                                    {Object.entries(SORT_LABELS).map(([id, label]) => (
                                        <button
                                            key={id}
                                            className={`plp-sort__item${sortBy === id ? " is-active" : ""}`}
                                            onClick={() => { setSortBy(id); setSortOpen(false) }}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="border border-[#E9E8E3] rounded-[16px] p-4 animate-pulse">
                                    <div className="w-full aspect-square bg-gray-100 rounded-[12px] mb-3" />
                                    <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20 text-[#8A8A8A]">محصولی یافت نشد</div>
                    ) : (
                        <div className="plp-grid">
                            {filtered.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    )}

                    {!loading && filtered.length > 0 && (
                        <a className="more-link" href="/products?show=all">محصولات بیشتر...</a>
                    )}
                </section>
            </div>

            {sheetOpen && (
                <>
                    <div className="sheet-backdrop" onClick={() => setSheetOpen(false)} />
                    <div className="sheet" role="dialog" aria-label="فیلترها">
                        <div className="sheet__head">
                            <div className="sheet__title">
                                <SfIcon.Filter />
                                <span>فیلترها</span>
                            </div>
                            <button className="sheet__close" onClick={() => setSheetOpen(false)} aria-label="بستن">
                                <SfIcon.Close />
                            </button>
                        </div>
                        {filterContent}
                        <button className="sheet__apply" onClick={() => setSheetOpen(false)}>اعمال فیلتر</button>
                    </div>
                </>
            )}
        </main>
    )
}

function FilterBody({
    selectedCats, toggleCat, selectedUses, toggleUse, priceMax, setPriceMax,
}: {
    selectedCats: string[]
    toggleCat: (id: string) => void
    selectedUses: string[]
    toggleUse: (id: string) => void
    priceMax: number
    setPriceMax: (v: number) => void
}) {
    return (
        <>
            <div className="plp-group">
                <h4>دسته‌بندی‌ها</h4>
                <div className="plp-group__chips">
                    {CATEGORIES.map((c) => (
                        <button
                            key={c.id}
                            className={`chip ${selectedCats.includes(c.id) ? "is-active" : ""}`}
                            onClick={() => toggleCat(c.id)}
                        >
                            {c.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="plp-divider" />

            <div className="plp-group">
                <h4>موارد مصرف</h4>
                <div className="plp-checks">
                    {USE_CASES.map((u) => (
                        <label key={u.id} className="plp-check">
                            <span className="plp-check__label">{u.label}</span>
                            <input type="checkbox" checked={selectedUses.includes(u.id)} onChange={() => toggleUse(u.id)} />
                            <span className="plp-check__box"><SfIcon.Check /></span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="plp-divider" />

            <div className="plp-group">
                <h4>قیمت</h4>
                <PriceRange priceMax={priceMax} setPriceMax={setPriceMax} />
            </div>
        </>
    )
}

function PriceRange({ priceMax, setPriceMax }: { priceMax: number; setPriceMax: (v: number) => void }) {
    const minP = 0
    const maxP = 850
    const pct = ((priceMax - minP) / (maxP - minP)) * 100

    return (
        <div>
            <div className="plp-range__bar">
                <div className="plp-range__fill" style={{ insetInlineEnd: 0, width: `${pct}%` }} />
                <div className="plp-range__handle" style={{ insetInlineEnd: `calc(${pct}% - 7px)` }} />
                <input
                    type="range"
                    min={minP}
                    max={maxP}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="plp-range__input"
                />
            </div>
            <div className="plp-range__labels">
                <span>{fa(priceMax)} هزار تومان</span>
                <span>{fa(minP)} تومان</span>
            </div>
        </div>
    )
}
