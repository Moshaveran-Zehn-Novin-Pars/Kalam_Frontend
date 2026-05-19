"use client"

import { useState, useEffect } from "react"
import { Camera, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { farmerService } from "@/services/farmer"
import { toast } from "sonner"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

export default function FarmerProfilePage() {
    const [form, setForm] = useState({
        firstName: "", lastName: "", phone: "", businessName: "",
        farmLocation: "", nationalId: "", bio: "",
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

    useEffect(() => {
        farmerService.getMyProfile().then((profile: any) => {
            setForm({
                firstName: profile.firstName || "",
                lastName: profile.lastName || "",
                phone: profile.phone || "",
                businessName: profile.businessName || "",
                farmLocation: profile.farmLocation || "",
                nationalId: profile.nationalId || "",
                bio: profile.bio || "",
            })
        }).catch(() => {}).finally(() => setLoading(false))
    }, [])

    const handleSave = async () => {
        setSaving(true)
        try {
            await farmerService.updateProfile({
                firstName: form.firstName,
                lastName: form.lastName,
                businessName: form.businessName,
                bio: form.bio,
            } as any)
            toast.success("تغییرات با موفقیت ذخیره شد")
        } catch {
            toast.error("خطا در ذخیره تغییرات")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <div style={{ textAlign: "center", padding: 48 }}><Loader2 size={24} className="animate-spin inline-block" /></div>
    }

    return (
        <>
            <h1 className="f-title">پروفایل من</h1>

            <div className="f-card" style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid var(--f-border)" }}>
                    <div style={{ position: "relative" }}>
                        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--f-accent-100)", display: "grid", placeItems: "center", fontSize: 28, fontWeight: 700, color: "var(--f-accent)" }}>{form.firstName[0] || "?"}</div>
                        <button style={{ position: "absolute", bottom: 0, insetInlineEnd: 0, width: 26, height: 26, borderRadius: "50%", background: "var(--f-surface)", border: "1px solid var(--f-border-s)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--f-accent)" }}>
                            <Camera size={12} />
                        </button>
                    </div>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 16 }}>{form.firstName} {form.lastName}</div>
                        <div style={{ fontSize: 13, color: "var(--f-fg-3)", marginTop: 3 }}>{form.businessName}</div>
                    </div>
                </div>

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

            <button className="f-btn f-btn--filled" onClick={handleSave} disabled={saving}>
                {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
        </>
    )
}
