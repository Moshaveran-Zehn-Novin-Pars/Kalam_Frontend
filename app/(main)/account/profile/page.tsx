"use client"

import { useState } from "react"
import { User, Phone, Mail, MapPin } from "lucide-react"
import "../account.css"

export default function ProfilePage() {
    const [form, setForm] = useState({
        firstName: "سوگند", lastName: "سلحشور",
        phone: "۰۹۰۳۷۰۲۹۱۲۱", email: "", address: "",
    })
    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

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
                            <input className="acc-input" value={form.phone} readOnly style={{ border: "none", padding: 0, height: "100%", background: "transparent", color: "var(--acc-fg-3)" }} />
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

                <div>
                    <label className="acc-label">آدرس</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--acc-border-s)", borderRadius: "var(--acc-r-sm)", padding: "0 12px", height: 48 }}>
                        <MapPin size={16} style={{ color: "var(--acc-fg-3)", flexShrink: 0 }} />
                        <input className="acc-input" value={form.address} onChange={e => set("address", e.target.value)} style={{ border: "none", padding: 0, height: "100%" }} />
                    </div>
                </div>

                <button className="acc-btn acc-btn--filled" style={{ alignSelf: "flex-start" }}>ذخیره تغییرات</button>
            </div>
        </div>
    )
}
