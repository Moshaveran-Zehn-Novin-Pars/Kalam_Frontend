"use client"

import { CreditCard, CheckCircle } from "lucide-react"
import "../account.css"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

export default function CreditPage() {
    const limit = 200000000; const used = 85000000; const available = limit - used
    const usagePercent = Math.round((used / limit) * 100)

    return (
        <div>
            <h1 className="acc-title">اعتبار خرید</h1>

            <div className="acc-card" style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <CreditCard size={20} style={{ color: "var(--acc-accent)" }} />
                    <span style={{ fontSize: 15, fontWeight: 600 }}>Net 30</span>
                </div>

                <div className="acc-stat-grid" style={{ marginBottom: 16 }}>
                    <div className="acc-stat">
                        <p style={{ fontSize: 12, color: "var(--acc-fg-3)", marginBottom: 4 }}>سقف اعتبار</p>
                        <p style={{ fontSize: 18, fontWeight: 700 }}>{faNum(limit)}</p>
                    </div>
                    <div className="acc-stat">
                        <p style={{ fontSize: 12, color: "var(--acc-fg-3)", marginBottom: 4 }}>مصرف شده</p>
                        <p style={{ fontSize: 18, fontWeight: 700, color: "#EF4444" }}>{faNum(used)}</p>
                    </div>
                    <div className="acc-stat">
                        <p style={{ fontSize: 12, color: "var(--acc-fg-3)", marginBottom: 4 }}>موجود</p>
                        <p style={{ fontSize: 18, fontWeight: 700, color: "var(--acc-accent)" }}>{faNum(available)}</p>
                    </div>
                </div>

                <div style={{ width: "100%", height: 10, background: "var(--acc-border)", borderRadius: 5, overflow: "hidden" }}>
                    <div style={{ width: `${usagePercent}%`, height: "100%", background: "linear-gradient(to left, var(--acc-accent), #F59E0B)", borderRadius: 5 }} />
                </div>
                <p style={{ fontSize: 12, color: "var(--acc-fg-3)", marginTop: 6, textAlign: "left" }}>{fa(usagePercent)}٪ از سقف اعتبار استفاده شده</p>
            </div>

            <div className="acc-alert acc-alert--success">
                <CheckCircle size={16} />
                <span>صورتحساب اعتبار شما در تاریخ ۱۴۰۴/۱۰/۱۲ تسویه خواهد شد.</span>
            </div>
        </div>
    )
}
