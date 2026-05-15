"use client"

import Link from "next/link"
import { ArrowLeft, ArrowUpRight, CheckCircle, XCircle } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const PAYOUTS = [
    { id: "po1", amount: 45000000, date: "1404/8/12", iban: "IR550170000000123456789001", status: "success", ref: "PAY-1001" },
    { id: "po2", amount: 62000000, date: "1404/9/12", iban: "IR550170000000123456789001", status: "success", ref: "PAY-1002" },
    { id: "po3", amount: 38000000, date: "1404/10/12", iban: "IR550170000000123456789001", status: "success", ref: "PAY-1003" },
    { id: "po4", amount: 71000000, date: "1404/11/12", iban: "IR550170000000123456789001", status: "pending", ref: "—" },
]

export default function PayoutsPage() {
    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <Link href="/farmer/finance" className="f-btn f-btn--ghost" style={{ padding: "7px 14px" }}>
                    <ArrowLeft size={14} /> بازگشت
                </Link>
                <h1 className="f-title" style={{ margin: 0 }}>پرداخت‌ها به من</h1>
            </div>

            <div className="f-card" style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ color: "var(--f-fg-3)", fontSize: 13, marginBottom: 4 }}>شماره شبا ثبت شده</div>
                        <div style={{ fontFamily: "monospace", fontWeight: 600, fontSize: 13, direction: "ltr", textAlign: "right" }}>
                            IR۵۵۰۱۷۰۰۰۰۰۰۰۱۲۳۴۵۶۷۸۹۰۰۱
                        </div>
                    </div>
                    <Link href="/farmer/profile" className="f-btn f-btn--ghost" style={{ padding: "6px 14px", fontSize: 12 }}>
                        ویرایش
                    </Link>
                </div>
            </div>

            <div className="f-table-card">
                <div className="f-table-wrap">
                    <table className="f-table">
                        <thead><tr>
                            <th>تاریخ</th><th>مبلغ</th><th>شماره شبا</th><th>کد پیگیری</th><th>وضعیت</th>
                        </tr></thead>
                        <tbody>
                        {PAYOUTS.map(p => (
                            <tr key={p.id}>
                                <td className="tnum">{fa(p.date)}</td>
                                <td className="tnum" style={{ fontWeight: 600 }}>{faNum(p.amount)} تومان</td>
                                <td style={{ fontFamily: "monospace", fontSize: 11, color: "var(--f-fg-3)", direction: "ltr", textAlign: "right" }}>
                                    {p.iban}
                                </td>
                                <td style={{ fontFamily: "monospace", fontSize: 12, color: "var(--f-fg-3)" }}>{p.ref}</td>
                                <td>
                                    {p.status === "success" ? (
                                        <span className="f-pill f-pill--shipped">
                                            <CheckCircle size={11} style={{ marginLeft: 4 }} /> واریز شده
                                        </span>
                                    ) : (
                                        <span className="f-pill f-pill--pending">
                                            <XCircle size={11} style={{ marginLeft: 4 }} /> در انتظار
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
