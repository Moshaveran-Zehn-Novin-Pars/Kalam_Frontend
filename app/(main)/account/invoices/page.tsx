"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FileText, Download, Loader2 } from "lucide-react"
import { invoiceService } from "@/services/invoice"
import "../account.css"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        invoiceService.findAll().then(setInvoices).catch(() => {}).finally(() => setLoading(false))
    }, [])

    return (
        <div>
            <h1 className="acc-title">فاکتورها</h1>

            <div className="acc-table-wrap acc-card" style={{ padding: 0, overflow: "hidden" }}>
                <table className="acc-table">
                    <thead><tr>
                        <th>شماره فاکتور</th><th>تاریخ</th><th>مبلغ</th><th>وضعیت</th><th>دریافت</th>
                    </tr></thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} style={{ textAlign: "center", padding: 32 }}>
                                <Loader2 size={20} className="animate-spin inline-block" />
                            </td></tr>
                        ) : invoices.length === 0 ? (
                            <tr><td colSpan={5} style={{ textAlign: "center", padding: 32, color: "var(--acc-fg-3)" }}>
                                فاکتوری یافت نشد
                            </td></tr>
                        ) : invoices.map(inv => {
                            const date = (inv as any).createdAt ? new Date((inv as any).createdAt).toLocaleDateString("fa-IR") : ""
                            return (
                                <tr key={inv.id}>
                                    <td>
                                        <Link href={`/account/invoices/${inv.id}`}
                                            style={{ fontSize: 13, fontWeight: 500, color: "var(--acc-accent)", textDecoration: "none" }}>
                                            {(inv as any).number || inv.id}
                                        </Link>
                                    </td>
                                    <td style={{ fontSize: 13 }}>{fa(date)}</td>
                                    <td style={{ fontSize: 13, fontWeight: 600 }}>{faNum(Number((inv as any).totalAmount || (inv as any).total || 0))} تومان</td>
                                    <td><span className={`acc-badge ${inv.status === "paid" ? "acc-badge--success" : "acc-badge--warning"}`}>
                                        {inv.status === "paid" ? "پرداخت شده" : "پرداخت نشده"}
                                    </span></td>
                                    <td>
                                        <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--acc-fg-3)", padding: 4 }}>
                                            <Download size={16} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
