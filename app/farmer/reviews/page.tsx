"use client"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const REVIEWS = [
    { id: "r1", buyer: "سوپرمارکت رضایی", product: "سیب درختی",   rating: 5, comment: "کیفیت عالی و ارسال به موقع. ممنون از همکاری خوبتون.", date: "1404/9/10" },
    { id: "r2", buyer: "رستوران آرارات",   product: "گوجه فرنگی", rating: 4, comment: "محصول تازه بود ولی بسته‌بندی می‌تونست بهتر باشه.", date: "1404/9/8"  },
    { id: "r3", buyer: "هایپرمی",          product: "انگور",       rating: 5, comment: "خوشمزه‌ترین انگوری که تا حالا گرفتیم!", date: "1404/9/5"  },
    { id: "r4", buyer: "فروشگاه ستاره",    product: "هلو",         rating: 3, comment: "هلوها کمی نرسیده بودند.", date: "1404/9/2"  },
    { id: "r5", buyer: "کافه گلدن",        product: "اسفناج",      rating: 5, comment: "تازگی محصول فوق‌العاده. حتماً دوباره سفارش می‌دم.", date: "1404/8/28" },
]

function Stars({ rating }: { rating: number }) {
    return (
        <div className="f-stars">
            {[1,2,3,4,5].map(i => (
                <span key={i} className={`f-star ${i <= rating ? "" : "f-star--empty"}`}>★</span>
            ))}
        </div>
    )
}

const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)

export default function FarmerReviewsPage() {
    return (
        <>
            <h1 className="f-title">نظرات خریداران</h1>

            {/* summary */}
            <div className="f-card" style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 32 }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 40, fontWeight: 700, color: "var(--f-accent)", fontVariantNumeric: "tabular-nums" }}>{avgRating}</div>
                    <Stars rating={Math.round(Number(avgRating))} />
                    <div style={{ fontSize: 12, color: "var(--f-fg-3)", marginTop: 4 }}>{fa(REVIEWS.length)} نظر</div>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                    {[5,4,3,2,1].map(star => {
                        const count = REVIEWS.filter(r => r.rating === star).length
                        const pct = Math.round((count / REVIEWS.length) * 100)
                        return (
                            <div key={star} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                                <span style={{ color: "var(--f-fg-3)", width: 14 }}>{star}</span>
                                <span style={{ color: "#f5a623" }}>★</span>
                                <div style={{ flex: 1, height: 6, background: "var(--f-border)", borderRadius: 3, overflow: "hidden" }}>
                                    <div style={{ width: `${pct}%`, height: "100%", background: "var(--f-accent)", borderRadius: 3 }} />
                                </div>
                                <span style={{ color: "var(--f-fg-3)", width: 28 }}>{fa(count)}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* reviews list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {REVIEWS.map(r => (
                    <div key={r.id} className="f-card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{r.buyer}</div>
                                <div style={{ fontSize: 12, color: "var(--f-fg-3)" }}>محصول: {r.product}</div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                                <Stars rating={r.rating} />
                                <span style={{ fontSize: 12, color: "var(--f-fg-3)", fontVariantNumeric: "tabular-nums" }}>{fa(r.date)}</span>
                            </div>
                        </div>
                        <p style={{ margin: 0, fontSize: 13, color: "var(--f-fg-2)", lineHeight: 1.7 }}>{r.comment}</p>
                    </div>
                ))}
            </div>
        </>
    )
}