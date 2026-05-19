"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, Download, Loader2 } from "lucide-react"
import { invoiceService } from "@/services/invoice"
import "../../account.css"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

export default function InvoiceDetailPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const [inv, setInv] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        invoiceService.getInvoiceData(id).then(setInv).catch(() => setInv(null)).finally(() => setLoading(false))
    }, [id])

    if (loading) {
        return <div style={{ textAlign: "center", padding: 48 }}><Loader2 size={24} className="animate-spin inline-block" /></div>
    }

    if (!inv) {
        return <div style={{ textAlign: "center", padding: 48, color: "var(--acc-fg-3)" }}>فاکتور مورد نظر یافت نشد</div>
    }

    const date = inv.createdAt ? new Date(inv.createdAt).toLocaleDateString("fa-IR") : ""
    const items = inv.items || []

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <button onClick={() => router.back()} className="acc-btn acc-btn--ghost" style={{ padding: "7px 14px" }}>
                    <ChevronLeft size={14} /> بازگشت
                </button>
                <h1 className="acc-title" style={{ margin: 0 }}>فاکتور {id}</h1>
                <span className={`acc-badge ${inv.status === "paid" ? "acc-badge--success" : "acc-badge--warning"}`}>
                    {inv.status === "paid" ? "پرداخت شده" : "پرداخت نشده"}
                </span>
            </div>

            <div className="acc-card" style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--acc-border)", fontSize: 13 }}>
                    <div style={{ textAlign: "right" }}><span style={{ color: "var(--acc-fg-3)" }}>فروشنده</span><br /><b>{inv.seller || "—"}</b></div>
                    <div style={{ textAlign: "left" }}><span style={{ color: "var(--acc-fg-3)" }}>خریدار</span><br /><b>{inv.buyer || "—"}</b></div>
                </div>

                <div style={{ display: "flex", gap: 24, fontSize: 13, marginBottom: 20 }}>
                    <span><span style={{ color: "var(--acc-fg-3)" }}>تاریخ صدور: </span><b>{fa(date)}</b></span>
                </div>

                <div className="acc-table-wrap" style={{ marginBottom: 20 }}>
                    <table className="acc-table">
                        <thead><tr><th>کالا</th><th>مقدار</th><th>قیمت واحد</th><th>جمع</th></tr></thead>
                        <tbody>
                            {items.map((item: any, i: number) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 500 }}>{item.name}</td>
                                    <td>{faNum(item.quantity || item.qty)} {item.unit || ""}</td>
                                    <td>{faNum(item.price)} تومان</td>
                                    <td style={{ fontWeight: 600 }}>{faNum((item.quantity || item.qty) * item.price)} تومان</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ borderTop: "1px solid var(--acc-border)", paddingTop: 16, fontSize: 13, maxWidth: 280, marginInlineStart: "auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ color: "var(--acc-fg-3)" }}>جمع کالاها</span><span>{faNum(Number(inv.subtotal || inv.totalAmount || inv.total || 0))} تومان</span>
                    </div>
                    {inv.deliveryFee ? (
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                            <span style={{ color: "var(--acc-fg-3)" }}>هزینه حمل</span><span>{faNum(inv.deliveryFee)} تومان</span>
                        </div>
                    ) : null}
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 700, borderTop: "1px solid var(--acc-border)", paddingTop: 8, marginTop: 4 }}>
                        <span>مبلغ کل</span><span style={{ color: "var(--acc-accent)" }}>{faNum(Number(inv.totalAmount || inv.total || 0))} تومان</span>
                    </div>
                </div>
            </div>

            <button className="acc-btn acc-btn--filled">
                <Download size={15} /> دانلود PDF
            </button>
        </div>
    )
}
