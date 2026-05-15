"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Camera, PenLine, Check, X } from "lucide-react"
import Link from "next/link"

export default function DeliverPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const [step, setStep] = useState<"proof" | "signature" | "done">("proof")
    const [photoTaken, setPhotoTaken] = useState(false)
    const [signed, setSigned] = useState(false)

    return (
        <>
            <div className="adm-detail-head">
                <h1 className="adm-page-title" style={{ marginBottom: 0 }}>ثبت تحویل</h1>
                <span className="pill pill--shipped">تحویل</span>
                <button onClick={() => router.back()} className="adm-btn adm-btn--ghost" style={{ fontSize: 13, padding: "6px 14px", marginInlineStart: "auto" }}>
                    ← بازگشت
                </button>
            </div>

            {step === "done" ? (
                <div style={{ textAlign: "center", padding: "48px 24px" }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--adm-shipped-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                        <Check size={36} style={{ color: "var(--adm-shipped-fg)" }} />
                    </div>
                    <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--adm-fg)", marginBottom: 8 }}>تحویل با موفقیت ثبت شد</h2>
                    <p style={{ fontSize: 13, color: "var(--adm-fg-3)", marginBottom: 24 }}>سفارش #{fa(id)} به مقصد تحویل داده شد.</p>
                    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                        <Link href="/driver/history" className="adm-btn adm-btn--filled">مشاهده تاریخچه</Link>
                        <Link href="/driver/dashboard" className="adm-btn adm-btn--ghost">بازگشت به داشبورد</Link>
                    </div>
                </div>
            ) : step === "proof" ? (
                <div className="adm-card" style={{ textAlign: "center", padding: "40px 24px" }}>
                    <div style={{ width: 100, height: 100, borderRadius: "var(--adm-r-lg)", background: "var(--adm-accent-50)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                        <Camera size={44} style={{ color: "var(--adm-accent)" }} />
                    </div>
                    <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--adm-fg)", marginBottom: 8 }}>عکس تحویل</h2>
                    <p style={{ fontSize: 13, color: "var(--adm-fg-3)", marginBottom: 32 }}>
                        از محموله تحویل داده شده عکس بگیرید.
                    </p>
                    {photoTaken ? (
                        <div style={{ width: 240, height: 180, margin: "0 auto 24px", borderRadius: "var(--adm-r-lg)", background: "var(--adm-accent-50)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--adm-accent)" }}>
                            <div style={{ fontSize: 48 }}>📸</div>
                        </div>
                    ) : (
                        <div style={{ width: 240, height: 180, margin: "0 auto 24px", borderRadius: "var(--adm-r-lg)", border: "2px dashed var(--adm-border-s)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Camera size={40} style={{ color: "var(--adm-fg-4)" }} />
                        </div>
                    )}
                    <button onClick={() => setPhotoTaken(true)}
                        className="adm-btn adm-btn--filled" style={{ padding: "12px 36px" }}>
                        {photoTaken ? "📸 عکس گرفته شد" : "گرفتن عکس"}
                    </button>
                    <div style={{ marginTop: 16 }}>
                        <button onClick={() => setStep("signature")}
                            className="adm-btn adm-btn--filled" style={{ opacity: photoTaken ? 1 : 0.5, padding: "12px 36px" }}
                            disabled={!photoTaken}>
                            مرحله بعد: امضا
                        </button>
                    </div>
                </div>
            ) : (
                <div className="adm-card" style={{ textAlign: "center", padding: "40px 24px" }}>
                    <div style={{ width: 100, height: 100, borderRadius: "var(--adm-r-lg)", background: "var(--adm-accent-50)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                        <PenLine size={44} style={{ color: "var(--adm-accent)" }} />
                    </div>
                    <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--adm-fg)", marginBottom: 8 }}>امضای دیجیتال</h2>
                    <p style={{ fontSize: 13, color: "var(--adm-fg-3)", marginBottom: 24 }}>
                        از دریافت‌کننده بخواهید امضا کند.
                    </p>
                    <div style={{ width: 320, height: 160, margin: "0 auto 24px", border: "2px solid var(--adm-border)", borderRadius: "var(--adm-r-lg)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => setSigned(true)}>
                        {signed ? (
                            <span style={{ fontFamily: "cursive", fontSize: 42, color: "var(--adm-accent)", opacity: 0.8 }}>رضایی</span>
                        ) : (
                            <span style={{ fontSize: 14, color: "var(--adm-fg-4)" }}>کلیک کنید تا امضا شود</span>
                        )}
                    </div>
                    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                        <button onClick={() => setSigned(true)}
                            className="adm-btn adm-btn--ghost" style={{ color: "var(--adm-fg-3)" }}>
                            پاک کردن
                        </button>
                        <button onClick={() => setStep("done")}
                            className="adm-btn adm-btn--filled" style={{ padding: "12px 36px" }}>
                            ثبت نهایی تحویل
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
