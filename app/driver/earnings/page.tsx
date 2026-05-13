"use client"

function fa(n: number | string) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const TXNS = [
    { id:1, date:"۱۴۰۳/۰۲/۱۵", buyer:"سوپرمارکت ستاره", amount:120000, status:"paid"    },
    { id:2, date:"۱۴۰۳/۰۲/۱۵", buyer:"رستوران آرمان",   amount:85000,  status:"paid"    },
    { id:3, date:"۱۴۰۳/۰۲/۱۴", buyer:"هایپرمارکت نور",  amount:220000, status:"paid"    },
    { id:4, date:"۱۴۰۳/۰۲/۱۶", buyer:"کافه سبز",        amount:55000,  status:"waiting" },
]

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
    paid:   { label: "پرداخت شده", cls: "pill--shipped" },
    waiting:{ label: "در انتظار",  cls: "pill--pending" },
}

export default function DriverEarnings() {
    return (
        <>
            <h1 className="adm-page-title">درآمد و تسویه</h1>

            <div className="adm-stat-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                <div className="adm-stat" style={{ background: "var(--adm-accent)", color: "#fff", borderColor: "var(--adm-accent)" }}>
                    <div className="adm-stat__label" style={{ color: "rgba(255,255,255,0.8)" }}>
                        <span>این هفته</span>
                    </div>
                    <div className="adm-stat__value" style={{ color: "#fff" }}>
                        {faNum(1860000)}
                        <span className="adm-stat__unit" style={{ color: "rgba(255,255,255,0.8)" }}>تومان</span>
                    </div>
                    <div className="adm-stat__compare" style={{ color: "rgba(255,255,255,0.7)", borderTopColor: "rgba(255,255,255,0.2)" }}>
                        +۱۲٪ نسبت به هفته قبل
                    </div>
                </div>
                <div className="adm-stat">
                    <div className="adm-stat__label"><span>این ماه</span></div>
                    <div className="adm-stat__value">{faNum(6440000)}<span className="adm-stat__unit">تومان</span></div>
                    <div className="adm-stat__compare">{fa(53)} سفارش تحویل شده</div>
                </div>
                <div className="adm-stat">
                    <div className="adm-stat__label"><span>در انتظار تسویه</span></div>
                    <div className="adm-stat__value">{faNum(55000)}<span className="adm-stat__unit">تومان</span></div>
                    <div className="adm-stat__compare">تسویه بعدی: ۱۴۰۳/۰۲/۲۰</div>
                </div>
            </div>

            <div className="adm-card" style={{ padding: "14px 18px", marginBottom: 20, background: "#e8f4fd", borderColor: "#a8d4f0" }}>
                <p style={{ fontSize: 13, color: "#1565a8", margin: 0 }}>
                    💡 تسویه‌حساب‌ها هر ماه اول به حساب ثبت‌شده واریز می‌شود.
                </p>
            </div>

            <h2 className="adm-section-title">تراکنش‌ها</h2>
            <div className="adm-table-card">
                <div className="adm-table-wrap">
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th>تاریخ</th>
                                <th>خریدار</th>
                                <th>مبلغ (تومان)</th>
                                <th>وضعیت</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TXNS.map(t => {
                                const s = STATUS_MAP[t.status]
                                return (
                                    <tr key={t.id}>
                                        <td className="tnum" style={{ color: "var(--adm-fg-3)" }}>{t.date}</td>
                                        <td style={{ fontWeight: 500 }}>{t.buyer}</td>
                                        <td className="total">{faNum(t.amount)}</td>
                                        <td><span className={`pill ${s.cls}`}>{s.label}</span></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}