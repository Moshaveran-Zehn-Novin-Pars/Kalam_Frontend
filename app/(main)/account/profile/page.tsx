"use client"

import { useState, useEffect } from "react"
import { User, Phone, Mail, MapPin, Loader2 } from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { usersService } from "@/services/users"
import { toast } from "sonner"
import "../account.css"

export default function ProfilePage() {
    const { user, setUser } = useAuthStore()
    const [form, setForm] = useState({
        firstName: "", lastName: "", email: "",
    })
    const [saving, setSaving] = useState(false)
    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

    useEffect(() => {
        if (user) {
            setForm({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: (user as any).email || "",
            })
        }
    }, [user])

    const handleSave = async () => {
        setSaving(true)
        try {
            const updated = await usersService.updateProfile({
                firstName: form.firstName,
                lastName: form.lastName,
            } as any)
            setUser(updated)
            toast.success("پروفایل با موفقیت به‌روزرسانی شد")
        } catch {
            toast.error("خطا در ذخیره اطلاعات")
        } finally {
            setSaving(false)
        }
    }

    const phoneDisplay = user?.phone?.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]) || ""

    return (
        <div>
            <h1 className="acc-title">اطلاعات حساب کاربری</h1>

            <div className="acc-card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                        <label className="acc-label">نام</label>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--acc-border-s)", borderRadius: "var(--acc-r-sm)", padding: "0 12px", height: 48 }}>
                            <User size={16} style={{ color: "var(--acc-fg-3)", flexShrink: 0 }} />
                            <input className="acc-input" value={form.firstName} onChange={e => set("firstName", e.target.value)} style={{ border: "none", padding: 0, height: "100%" }} />
                        </div>
                    </div>
                    <div>
                        <label className="acc-label">نام خانوادگی</label>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--acc-border-s)", borderRadius: "var(--acc-r-sm)", padding: "0 12px", height: 48 }}>
                            <User size={16} style={{ color: "var(--acc-fg-3)", flexShrink: 0 }} />
                            <input className="acc-input" value={form.lastName} onChange={e => set("lastName", e.target.value)} style={{ border: "none", padding: 0, height: "100%" }} />
                        </div>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                        <label className="acc-label">شماره موبایل</label>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--acc-border-s)", borderRadius: "var(--acc-r-sm)", padding: "0 12px", height: 48, background: "var(--acc-surface-2)" }}>
                            <Phone size={16} style={{ color: "var(--acc-fg-3)", flexShrink: 0 }} />
                            <input className="acc-input" value={phoneDisplay} readOnly style={{ border: "none", padding: 0, height: "100%", background: "transparent", color: "var(--acc-fg-3)" }} />
                        </div>
                    </div>
                    <div>
                        <label className="acc-label">ایمیل</label>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--acc-border-s)", borderRadius: "var(--acc-r-sm)", padding: "0 12px", height: 48 }}>
                            <Mail size={16} style={{ color: "var(--acc-fg-3)", flexShrink: 0 }} />
                            <input className="acc-input" value={form.email} onChange={e => set("email", e.target.value)} style={{ border: "none", padding: 0, height: "100%" }} />
                        </div>
                    </div>
                </div>

                <button onClick={handleSave} disabled={saving}
                    className="acc-btn acc-btn--filled" style={{ alignSelf: "flex-start" }}>
                    {saving ? <><Loader2 size={16} className="animate-spin" /> در حال ذخیره...</> : "ذخیره تغییرات"}
                </button>
            </div>
        </div>
    )
}
