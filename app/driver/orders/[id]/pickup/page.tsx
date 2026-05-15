"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Camera, Check, X, Package } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

export default function PickupPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const [scanned, setScanned] = useState(false)
    const [scanning, setScanning] = useState(false)

    const handleScan = () => {
        setScanning(true)
        setTimeout(() => { setScanning(false); setScanned(true) }, 1500)
    }

    return (
        <>
            <div className="adm-detail-head">
                <h1 className="adm-page-title" style={{ marginBottom: 0 }}>ثبت بارگیری</h1>
                <span className="pill pill--prep">بارگیری</span>
                <button onClick={() => router.back()} className="adm-btn adm-btn--ghost" style={{ fontSize: 13, padding: "6px 14px", marginInlineStart: "auto" }}>
                    ← بازگشت
                </button>
            </div>

            {scanned ? (
                <div style={{ textAlign: "center", padding: "48px 24px" }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--adm-shipped-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                        <Check size={36} style={{ color: "var(--adm-shipped-fg)" }} />
                    </div>
                    <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--adm-fg)", marginBottom: 8 }}>بارگیری ثبت شد</h2>
                    <p style={{ fontSize: 13, color: "var(--adm-fg-3)", marginBottom: 24 }}>
                        سفارش #{fa(id)} با موفقیت بارگیری شد.
                    </p>
                    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                        <Link href={`/driver/orders/${id}/navigate`}
                            className="adm-btn adm-btn--filled">
                            شروع مسیریابی
                        </Link>
                        <Link href="/driver/active"
                            className="adm-btn adm-btn--ghost">
                            بازگشت
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="adm-card" style={{ textAlign: "center", padding: "40px 24px" }}>
                    <div style={{ width: 100, height: 100, borderRadius: "var(--adm-r-lg)", background: "var(--adm-accent-50)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                        <Package size={48} style={{ color: "var(--adm-accent)" }} />
                    </div>
                    <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--adm-fg)", marginBottom: 8 }}>اسکن QR کد</h2>
                    <p style={{ fontSize: 13, color: "var(--adm-fg-3)", marginBottom: 32, maxWidth: 360, marginInline: "auto" }}>
                        برای ثبت بارگیری، QR کد سفارش را اسکن کنید. QR کد روی محموله یا در اپلیکیشن باغدار قابل مشاهده است.
                    </p>

                    <div style={{ width: 200, height: 200, margin: "0 auto 32px", border: "2px dashed var(--adm-border-s)", borderRadius: "var(--adm-r-lg)", display: "flex", alignItems: "center", justifyContent: "center", background: scanning ? "var(--adm-accent-50)" : "transparent" }}>
                        {scanning ? (
                            <div style={{ fontSize: 14, color: "var(--adm-accent)", fontWeight: 500 }}>در حال اسکن...</div>
                        ) : (
                            <Camera size={48} style={{ color: "var(--adm-fg-4)" }} />
                        )}
                    </div>

                    <button onClick={handleScan} disabled={scanning}
                        className="adm-btn adm-btn--filled" style={{ padding: "12px 36px", fontSize: 15, opacity: scanning ? 0.6 : 1 }}>
                        {scanning ? "در حال اسکن..." : "اسکن QR کد"}
                    </button>

                    <div style={{ marginTop: 16 }}>
                        <button onClick={() => { setScanned(true) }}
                            className="adm-btn adm-btn--ghost" style={{ fontSize: 12, color: "var(--adm-fg-3)" }}>
                            ورود دستی کد
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
