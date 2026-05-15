"use client"

import { ArrowUpRight, ArrowDownLeft } from "lucide-react"
import "../account.css"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const TRANSACTIONS = [
    { id: "t1", type: "deposit", amount: 50000000, desc: "واریز به کیف پول", date: "۱۴۰۴/۹/۱۰" },
    { id: "t2", type: "purchase", amount: 13000000, desc: "پرداخت سفارش #۲۳۴۵۹۲۳", date: "۱۴۰۴/۹/۱۲" },
    { id: "t3", type: "refund", amount: 2800000, desc: "بازگشت وجه سفارش #۲۳۴۵۹۲۰", date: "۱۴۰۴/۹/۸" },
    { id: "t4", type: "deposit", amount: 25000000, desc: "واریز به کیف پول", date: "۱۴۰۴/۸/۲۵" },
]

export default function WalletPage() {
    return (
        <div>
            <h1 className="acc-title">کیف پول</h1>

            <div style={{
                background: "linear-gradient(135deg, var(--acc-accent), #417F56)", borderRadius: "var(--acc-r-lg)",
                padding: 24, color: "#fff", marginBottom: 20,
            }}>
                <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 8 }}>موجودی کیف پول</p>
                <p style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{faNum(62000000)}</p>
                <p style={{ fontSize: 12, opacity: 0.8 }}>تومان</p>
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                <button className="acc-btn acc-btn--filled" style={{ flex: 1, justifyContent: "center" }}>افزایش موجودی</button>
                <button className="acc-btn acc-btn--ghost" style={{ flex: 1, justifyContent: "center", color: "var(--acc-accent)", borderColor: "var(--acc-accent)" }}>برداشت وجه</button>
            </div>

            <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--acc-fg)", marginBottom: 14 }}>تاریخچه تراکنش‌ها</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {TRANSACTIONS.map(t => {
                    const isInflow = t.type === "deposit" || t.type === "refund"
                    return (
                        <div key={t.id} className="acc-card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px" }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: "50%",
                                background: isInflow ? "var(--acc-accent-100)" : "#FFEEEF",
                                display: "grid", placeItems: "center", flexShrink: 0,
                            }}>
                                {isInflow
                                    ? <ArrowDownLeft size={16} style={{ color: "var(--acc-accent)" }} />
                                    : <ArrowUpRight size={16} style={{ color: "#EF4444" }} />}
                            </div>
                            <div style={{ flex: 1, fontSize: 13 }}>
                                <div style={{ fontWeight: 500, color: "var(--acc-fg)" }}>{t.desc}</div>
                                <div style={{ color: "var(--acc-fg-3)", fontSize: 12, marginTop: 2 }}>{fa(t.date)}</div>
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: isInflow ? "var(--acc-accent)" : "#EF4444" }}>
                                {isInflow ? "+" : "-"}{faNum(t.amount)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
