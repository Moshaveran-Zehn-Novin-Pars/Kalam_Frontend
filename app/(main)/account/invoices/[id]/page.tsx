"use client"

import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, Download } from "lucide-react"
import "../../account.css"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const INVOICE = {
    number: "INV-1404-001", date: "۱۴۰۴/۹/۱۲", dueDate: "۱۴۰۴/۱۰/۱۲", status: "paid",
    seller: "باغ سیب نقره‌ای (علی محمدی)", buyer: "سوپرمارکت رضایی",
    items: [
        { name: "سیب درختی درجه A", qty: 150, unit: "کیلو", price: 68000, total: 10200000 },
        { name: "سیب درختی درجه B", qty: 50, unit: "کیلو", price: 56000, total: 2800000 },
    ],
    subtotal: 13000000, deliveryFee: 350000, tax: 0, total: 13350000,
}

export default function InvoiceDetailPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const inv = INVOICE

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <button onClick={() => router.back()} className="acc-btn acc-btn--ghost" style={{ padding: "7px 14px" }}>
                    <ChevronLeft size={14} /> بازگشت
                </button>
                <h1 className="acc-title" style={{ margin: 0 }}>فاکتور {id}</h1>
                <span className="acc-badge acc-badge--success">پرداخت شده</span>
            </div>

            <div className="acc-card" style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--acc-border)", fontSize: 13 }}>
                    <div style={{ textAlign: "right" }}><span style={{ color: "var(--acc-fg-3)" }}>فروشنده</span><br /><b>{inv.seller}</b></div>
                    <div style={{ textAlign: "left" }}><span style={{ color: "var(--acc-fg-3)" }}>خریدار</span><br /><b>{inv.buyer}</b></div>
                </div>

                <div style={{ display: "flex", gap: 24, fontSize: 13, marginBottom: 20 }}>
                    <span><span style={{ color: "var(--acc-fg-3)" }}>تاریخ صدور: </span><b>{fa(inv.date)}</b></span>
                    <span><span style={{ color: "var(--acc-fg-3)" }}>سررسید: </span><b>{fa(inv.dueDate)}</b></span>
                </div>

                <div className="acc-table-wrap" style={{ marginBottom: 20 }}>
                    <table className="acc-table">
                        <thead><tr><th>کالا</th><th>مقدار</th><th>قیمت واحد</th><th>جمع</th></tr></thead>
                        <tbody>
                            {inv.items.map((item, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 500 }}>{item.name}</td>
                                    <td>{faNum(item.qty)} {item.unit}</td>
                                    <td>{faNum(item.price)} تومان</td>
                                    <td style={{ fontWeight: 600 }}>{faNum(item.total)} تومان</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ borderTop: "1px solid var(--acc-border)", paddingTop: 16, fontSize: 13, maxWidth: 280, marginInlineStart: "auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ color: "var(--acc-fg-3)" }}>جمع کالاها</span><span>{faNum(inv.subtotal)} تومان</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ color: "var(--acc-fg-3)" }}>هزینه حمل</span><span>{faNum(inv.deliveryFee)} تومان</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 700, borderTop: "1px solid var(--acc-border)", paddingTop: 8, marginTop: 4 }}>
                        <span>مبلغ کل</span><span style={{ color: "var(--acc-accent)" }}>{faNum(inv.total)} تومان</span>
                    </div>
                </div>
            </div>

            <button className="acc-btn acc-btn--filled">
                <Download size={15} /> دانلود PDF
            </button>
        </div>
    )
}
