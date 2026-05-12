"use client"

import { useState } from "react"
import { Camera, CheckCircle, AlertCircle } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

export default function FarmerProfilePage() {
    const [form, setForm] = useState({
        firstName: "علی",
        lastName: "محمدی",
        phone: "09111111111",
        businessName: "باغ سیب نقره‌ای",
        farmLocation: "شیراز، دشت ارژن",
        nationalId: "0012345678",
        bio: "باغدار با بیش از ۱۵ سال سابقه در پرورش میوه‌های درجه یک شیراز.",
    })
    const [saved, setSaved] = useState(false)
    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
    }

    return (
        <>
            <h1 className="f-title">پروفایل من</h1>

            {saved && (
                <div className="f-alert f-alert--success">
                    <CheckCircle size={16} /> تغییرات با موفقیت ذخیره شد.
                </div>
            )}

            <div className="f-card" style={{ marginBottom: 20 }}>
                {/* avatar */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid var(--f-border)" }}>
                    <div style={{ position: "relative" }}>
                        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--f-accent-100)", display: "grid", placeItems: "center", fontSize: 28, fontWeight: 700, color: "var(--f-accent)" }}>ع</div>
                        <button style={{ position: "absolute", bottom: 0, insetInlineEnd: 0, width: 26, height: 26, borderRadius: "50%", background: "var(--f-surface)", border: "1px solid var(--f-border-s)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--f-accent)" }}>
                            <Camera size={12} />
                        </button>
                    </div>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 16 }}>{form.firstName} {form.lastName}</div>
                        <div style={{ fontSize: 13, color: "var(--f-fg-3)", marginTop: 3 }}>{form.businessName}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--f-shipped-fg)", background: "var(--f-shipped-bg)", padding: "3px 10px", borderRadius: 999 }}>
                <CheckCircle size={11} /> تأیید شده
              </span>
                        </div>
                    </div>
                </div>

                {/* fields */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="f-field">
                        <label className="f-field-label">نام</label>
                        <input className="f-input" value={form.firstName} onChange={e => set("firstName", e.target.value)} />
                    </div>
                    <div className="f-field">
                        <label className="f-field-label">نام خانوادگی</label>
                        <input className="f-input" value={form.lastName} onChange={e => set("lastName", e.target.value)} />
                    </div>
                    <div className="f-field">
                        <label className="f-field-label">شماره موبایل</label>
                        <input className="f-input" value={form.phone} readOnly style={{ background: "var(--f-surface-2)", color: "var(--f-fg-3)" }} />
                    </div>
                    <div className="f-field">
                        <label className="f-field-label">کد ملی</label>
                        <input className="f-input" value={form.nationalId} onChange={e => set("nationalId", e.target.value)} />
                    </div>
                    <div className="f-field">
                        <label className="f-field-label">نام کسب‌وکار</label>
                        <input className="f-input" value={form.businessName} onChange={e => set("businessName", e.target.value)} />
                    </div>
                    <div className="f-field">
                        <label className="f-field-label">موقعیت باغ</label>
                        <input className="f-input" value={form.farmLocation} onChange={e => set("farmLocation", e.target.value)} />
                    </div>
                </div>
                <div className="f-field" style={{ marginTop: 16 }}>
                    <label className="f-field-label">معرفی کوتاه</label>
                    <textarea className="f-textarea" value={form.bio} onChange={e => set("bio", e.target.value)} />
                </div>
            </div>

            {/* verification status */}
            <div className="f-card" style={{ marginBottom: 20 }}>
                <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>وضعیت تأیید حساب</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                        { label: "شماره موبایل", done: true },
                        { label: "کد ملی",       done: true },
                        { label: "مدارک کسب‌وکار", done: false },
                        { label: "تأیید توسط کلم", done: false },
                    ].map(item => (
                        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                            {item.done
                                ? <CheckCircle size={16} style={{ color: "var(--f-shipped-fg)", flexShrink: 0 }} />
                                : <AlertCircle  size={16} style={{ color: "var(--f-pending-fg)", flexShrink: 0 }} />}
                            <span style={{ color: item.done ? "var(--f-fg-2)" : "var(--f-fg-3)" }}>{item.label}</span>
                            {!item.done && <span style={{ fontSize: 11, color: "var(--f-pending-fg)", marginInlineStart: "auto" }}>در انتظار</span>}
                        </div>
                    ))}
                </div>
            </div>

            <button className="f-btn f-btn--filled" onClick={handleSave}>ذخیره تغییرات</button>
        </>
    )
}