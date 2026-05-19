"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, CheckCircle, Loader2 } from "lucide-react"
import { addressService } from "@/services/address"
import "../../account.css"

export default function NewAddressPage() {
    const router = useRouter()
    const [form, setForm] = useState({
        title: "", province: "", city: "", fullAddress: "", postalCode: "", receiverName: "", receiverPhone: "",
    })
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

    const handleSave = async () => {
        setSaving(true)
        try {
            await addressService.create({
                fullAddress: form.fullAddress,
                receiverName: form.receiverName,
                receiverPhone: form.receiverPhone,
            } as any)
            setSaved(true)
        } catch {
            setSaved(false)
        } finally {
            setSaving(false)
        }
    }

    if (saved) {
        return (
            <div style={{ textAlign: "center", padding: "48px 24px" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--acc-accent-100)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <CheckCircle size={28} style={{ color: "var(--acc-accent)" }} />
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--acc-fg)", marginBottom: 8 }}>آدرس ثبت شد</h2>
                <p style={{ fontSize: 13, color: "var(--acc-fg-3)", marginBottom: 24 }}>آدرس جدید با موفقیت اضافه شد.</p>
                <button onClick={() => router.push("/account/addresses")} className="acc-btn acc-btn--filled">بازگشت به آدرس‌ها</button>
            </div>
        )
    }

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <button onClick={() => router.back()} className="acc-btn acc-btn--ghost" style={{ padding: "7px 14px" }}>
                    <ChevronLeft size={14} /> بازگشت
                </button>
                <h1 className="acc-title" style={{ margin: 0 }}>آدرس جدید</h1>
            </div>

            <div className="acc-card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div><label className="acc-label">عنوان آدرس</label><input className="acc-input" value={form.title} onChange={e => set("title", e.target.value)} placeholder="مثال: انبار مرکزی" /></div>
                    <div><label className="acc-label">استان</label><input className="acc-input" value={form.province} onChange={e => set("province", e.target.value)} placeholder="تهران" /></div>
                    <div><label className="acc-label">شهر</label><input className="acc-input" value={form.city} onChange={e => set("city", e.target.value)} placeholder="تهران" /></div>
                    <div><label className="acc-label">کد پستی</label><input className="acc-input" value={form.postalCode} onChange={e => set("postalCode", e.target.value)} placeholder="۱۲۳۴۵۶۷۸۹۰" /></div>
                </div>
                <div>
                    <label className="acc-label">آدرس کامل</label>
                    <textarea className="acc-textarea" value={form.fullAddress} onChange={e => set("fullAddress", e.target.value)} rows={3} placeholder="خیابان، کوچه، پلاک، طبقه..." />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div><label className="acc-label">نام تحویل‌گیرنده</label><input className="acc-input" value={form.receiverName} onChange={e => set("receiverName", e.target.value)} placeholder="علی رضایی" /></div>
                    <div><label className="acc-label">شماره تماس</label><input className="acc-input" value={form.receiverPhone} onChange={e => set("receiverPhone", e.target.value)} placeholder="۰۹۱۲۳۴۵۶۷۸۹" /></div>
                </div>

                <button onClick={handleSave} disabled={saving}
                    className="acc-btn acc-btn--filled" style={{ justifyContent: "center", padding: "14px 18px", width: "100%" }}>
                    {saving ? <><Loader2 size={16} className="animate-spin" /> در حال ثبت...</> : "ثبت آدرس"}
                </button>
            </div>
        </div>
    )
}
