"use client"

import { useState } from "react"
import { Plus, CheckCircle, XCircle, AlertCircle, Download, Trash2, Award } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const CERTIFICATES = [
    { id: "c1", name: "گواهی ارگانیک", issuer: "سازمان حفظ نباتات", issuedAt: "۱۴۰۳/۶/۱", expiresAt: "۱۴۰۵/۶/۱", status: "verified", type: "organic" },
    { id: "c2", name: "گواهی بهداشت", issuer: "سازمان غذا و دارو", issuedAt: "۱۴۰۳/۸/۱۵", expiresAt: "۱۴۰۴/۸/۱۵", status: "verified", type: "health" },
    { id: "c3", name: "گواهی GlobalGAP", issuer: "شرکت بازرسی بین‌المللی", issuedAt: "۱۴۰۴/۱/۱۰", expiresAt: "۱۴۰۶/۱/۱۰", status: "pending", type: "quality" },
    { id: "c4", name: "گواهی سبز", issuer: "وزارت جهاد کشاورزی", issuedAt: "۱۴۰۲/۱۱/۲۰", expiresAt: "۱۴۰۴/۱۱/۲۰", status: "expired", type: "organic" },
]

export default function FarmerCertificatesPage() {
    const [showUpload, setShowUpload] = useState(false)

    const verified = CERTIFICATES.filter(c => c.status === "verified").length
    const pending = CERTIFICATES.filter(c => c.status === "pending").length
    const expired = CERTIFICATES.filter(c => c.status === "expired").length

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <h1 className="f-title" style={{ margin: 0 }}>گواهی‌ها و مدارک</h1>
                <button className="f-btn f-btn--filled" onClick={() => setShowUpload(true)}>
                    <Plus size={15} /> افزودن گواهی
                </button>
            </div>

            <div className="f-stat-grid" style={{ marginBottom: 24 }}>
                <div className="f-stat">
                    <div className="f-stat__label"><CheckCircle size={14} />تأیید شده</div>
                    <div className="f-stat__value" style={{ color: "var(--f-up)" }}>{fa(verified)}</div>
                </div>
                <div className="f-stat">
                    <div className="f-stat__label"><AlertCircle size={14} />در انتظار تأیید</div>
                    <div className="f-stat__value" style={{ color: "var(--f-pending-fg)" }}>{fa(pending)}</div>
                </div>
                <div className="f-stat">
                    <div className="f-stat__label"><XCircle size={14} />منقضی شده</div>
                    <div className="f-stat__value" style={{ color: "var(--f-down)" }}>{fa(expired)}</div>
                </div>
                <div className="f-stat">
                    <div className="f-stat__label"><Award size={14} />کل گواهی‌ها</div>
                    <div className="f-stat__value">{fa(CERTIFICATES.length)}</div>
                </div>
            </div>

            <div className="f-alert f-alert--info" style={{ marginBottom: 20 }}>
                <Award size={16} />
                محصولاتی که گواهی معتبر داشته باشند، با نشان مخصوص در بازار نمایش داده می‌شوند و اعتماد خریداران را جلب می‌کنند.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {CERTIFICATES.map(c => {
                    let statusIcon, statusClass, statusLabel
                    if (c.status === "verified") {
                        statusIcon = <CheckCircle size={15} />
                        statusClass = "f-pill--shipped"
                        statusLabel = "تأیید شده"
                    } else if (c.status === "pending") {
                        statusIcon = <AlertCircle size={15} />
                        statusClass = "f-pill--pending"
                        statusLabel = "در انتظار تأیید"
                    } else {
                        statusIcon = <XCircle size={15} />
                        statusClass = "f-pill--cancel"
                        statusLabel = "منقضی شده"
                    }

                    return (
                        <div key={c.id} className="f-card" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: "var(--f-r-sm)",
                                background: "var(--f-accent-50)", display: "grid", placeItems: "center",
                                color: "var(--f-accent)", fontSize: 22, flexShrink: 0,
                            }}>
                                <Award size={22} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{c.name}</div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", fontSize: 12, color: "var(--f-fg-3)" }}>
                                    <span>صادرکننده: {c.issuer}</span>
                                    <span>تاریخ صدور: {fa(c.issuedAt)}</span>
                                    <span>انقضا: <span style={{ color: c.status === "expired" ? "var(--f-down)" : "inherit" }}>{fa(c.expiresAt)}</span></span>
                                </div>
                            </div>
                            <span className={`f-pill ${statusClass}`} style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                                {statusIcon} {statusLabel}
                            </span>
                            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                                <button className="f-btn f-btn--ghost" style={{ padding: "6px 10px" }}>
                                    <Download size={13} />
                                </button>
                                <button className="f-btn f-btn--ghost" style={{ padding: "6px 10px", color: "var(--f-down)" }}>
                                    <Trash2 size={13} />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {showUpload && (
                <div className="farmer-dlg-overlay" onClick={() => setShowUpload(false)}>
                    <div className="farmer-dlg" onClick={e => e.stopPropagation()} style={{ minWidth: 440 }}>
                        <button className="farmer-dlg-close" onClick={() => setShowUpload(false)}><XCircle size={14} /></button>
                        <p className="farmer-dlg-title">افزودن گواهی جدید</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            <div className="f-field">
                                <label className="f-field-label">نوع گواهی</label>
                                <div className="f-select">
                                    <select className="f-input" style={{ paddingInlineEnd: 36 }}>
                                        <option value="">انتخاب کنید</option>
                                        <option value="organic">گواهی ارگانیک</option>
                                        <option value="health">گواهی بهداشت</option>
                                        <option value="quality">گواهی کیفیت</option>
                                        <option value="other">سایر</option>
                                    </select>
                                </div>
                            </div>
                            <div className="f-field">
                                <label className="f-field-label">تصویر گواهی</label>
                                <div style={{ border: "1px dashed var(--f-border-s)", borderRadius: "var(--f-r-sm)", padding: 24, textAlign: "center", cursor: "pointer", color: "var(--f-fg-3)", fontSize: 13 }}>
                                    کلیک کنید یا فایل را بکشید
                                </div>
                            </div>
                            <div className="farmer-dlg-actions">
                                <button className="farmer-btn farmer-btn--filled">ثبت گواهی</button>
                                <button className="farmer-btn farmer-btn--outline" onClick={() => setShowUpload(false)}>انصراف</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
