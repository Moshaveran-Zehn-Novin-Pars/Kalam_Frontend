"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, ArrowDownLeft, Loader2 } from "lucide-react"
import { paymentService } from "@/services/payment"
import "../account.css"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

export default function WalletPage() {
    const [balance, setBalance] = useState(0)
    const [transactions, setTransactions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            paymentService.getWallet().then(w => setBalance(Number(w.balance || 0))).catch(() => {}),
            paymentService.getTransactions().then(res => setTransactions(res.items || [])).catch(() => {}),
        ]).finally(() => setLoading(false))
    }, [])

    return (
        <div>
            <h1 className="acc-title">کیف پول</h1>

            <div style={{
                background: "linear-gradient(135deg, var(--acc-accent), #417F56)", borderRadius: "var(--acc-r-lg)",
                padding: 24, color: "#fff", marginBottom: 20,
            }}>
                <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 8 }}>موجودی کیف پول</p>
                <p style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
                    {loading ? "..." : faNum(balance)}
                </p>
                <p style={{ fontSize: 12, opacity: 0.8 }}>تومان</p>
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                <button className="acc-btn acc-btn--filled" style={{ flex: 1, justifyContent: "center" }}>افزایش موجودی</button>
                <button className="acc-btn acc-btn--ghost" style={{ flex: 1, justifyContent: "center", color: "var(--acc-accent)", borderColor: "var(--acc-accent)" }}>برداشت وجه</button>
            </div>

            <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--acc-fg)", marginBottom: 14 }}>تاریخچه تراکنش‌ها</h2>
            {loading ? (
                <div style={{ textAlign: "center", padding: 24 }}><Loader2 size={20} className="animate-spin inline-block" /></div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {transactions.map(t => {
                        const isInflow = t.type === "DEPOSIT" || t.type === "REFUND"
                        const date = t.createdAt ? new Date(t.createdAt).toLocaleDateString("fa-IR") : ""
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
                                    <div style={{ fontWeight: 500, color: "var(--acc-fg)" }}>{t.description || t.desc || ""}</div>
                                    <div style={{ color: "var(--acc-fg-3)", fontSize: 12, marginTop: 2 }}>{fa(date)}</div>
                                </div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: isInflow ? "var(--acc-accent)" : "#EF4444" }}>
                                    {isInflow ? "+" : "-"}{faNum(Math.abs(Number(t.amount)))}
                                </div>
                            </div>
                        )
                    })}
                    {transactions.length === 0 && (
                        <p style={{ textAlign: "center", color: "var(--acc-fg-3)", fontSize: 13, padding: 24 }}>تراکنشی وجود ندارد</p>
                    )}
                </div>
            )}
        </div>
    )
}
