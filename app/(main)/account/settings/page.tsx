"use client"

import { useState } from "react"
import { Bell, Globe, Lock } from "lucide-react"
import "../account.css"

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        smsNotification: true, emailNotification: false,
        pushNotification: true, darkMode: false, persianDigits: true,
    })
    const toggle = (key: keyof typeof settings) => setSettings(prev => ({ ...prev, [key]: !prev[key] }))

    return (
        <div>
            <h1 className="acc-title">تنظیمات</h1>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <SettingsSection title="اعلان‌ها" icon={<Bell size={16} />}>
                    <ToggleRow label="اعلان پیامکی" checked={settings.smsNotification} onChange={() => toggle("smsNotification")} />
                    <ToggleRow label="اعلان ایمیلی" checked={settings.emailNotification} onChange={() => toggle("emailNotification")} />
                    <ToggleRow label="اعلان درون برنامه‌ای" checked={settings.pushNotification} onChange={() => toggle("pushNotification")} />
                </SettingsSection>

                <SettingsSection title="نمایش" icon={<Globe size={16} />}>
                    <ToggleRow label="حالت تاریک" checked={settings.darkMode} onChange={() => toggle("darkMode")} />
                    <ToggleRow label="اعداد فارسی" checked={settings.persianDigits} onChange={() => toggle("persianDigits")} />
                </SettingsSection>

                <SettingsSection title="امنیت" icon={<Lock size={16} />}>
                    <SettingsLink label="تغییر رمز عبور" />
                    <SettingsLink label="مدیریت دستگاه‌ها" />
                </SettingsSection>
            </div>
        </div>
    )
}

function SettingsSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="acc-card">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ color: "var(--acc-accent)" }}>{icon}</span>
                <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{title}</h3>
            </div>
            <div>{children}</div>
        </div>
    )
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
            <button onClick={onChange} className={`acc-toggle ${checked ? "acc-toggle--on" : "acc-toggle--off"}`}>
                <div className="acc-toggle-knob" style={{ [checked ? "left" : "right"]: 2 }} />
            </button>
            <span style={{ fontSize: 13, color: "var(--acc-fg)" }}>{label}</span>
        </div>
    )
}

function SettingsLink({ label }: { label: string }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", cursor: "pointer" }}>
            <span style={{ fontSize: 12, color: "var(--acc-fg-3)" }}>←</span>
            <span style={{ fontSize: 13, color: "var(--acc-fg-2)" }}>{label}</span>
        </div>
    )
}
