"use client"

import Link from "next/link"
import { FileText, Download } from "lucide-react"
import "../account.css"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const INVOICES = [
    { id: "INV-1404-001", date: "۱۴۰۴/۹/۱۲", amount: 13000000, status: "paid", orderId: "2345923" },
    { id: "INV-1404-002", date: "۱۴۰۴/۹/۵", amount: 4500000, status: "paid", orderId: "2345920" },
    { id: "INV-1404-003", date: "۱۴۰۴/۸/۲۸", amount: 24000000, status: "paid", orderId: "2345915" },
]

export default function InvoicesPage() {
    return (
        <div>
            <h1 className="acc-title">فاکتورها</h1>

            <div className="acc-table-wrap acc-card" style={{ padding: 0, overflow: "hidden" }}>
                <table className="acc-table">
                    <thead><tr>
                        <th>شماره فاکتور</th><th>تاریخ</th><th>مبلغ</th><th>وضعیت</th><th>دریافت</th>
                    </tr></thead>
                    <tbody>
                        {INVOICES.map(inv => (
                            <tr key={inv.id}>
                                <td>
                                    <Link href={`/account/invoices/${inv.id}`}
                                        style={{ fontSize: 13, fontWeight: 500, color: "var(--acc-accent)", textDecoration: "none" }}>
                                        {inv.id}
                                    </Link>
                                </td>
                                <td style={{ fontSize: 13 }}>{fa(inv.date)}</td>
                                <td style={{ fontSize: 13, fontWeight: 600 }}>{faNum(inv.amount)} تومان</td>
                                <td><span className="acc-badge acc-badge--success">پرداخت شده</span></td>
                                <td>
                                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--acc-fg-3)", padding: 4 }}>
                                        <Download size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
