"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Phone, MapPin, Package, Clock, Check, X } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const MOCK = {
    id: "DLV-041", orderId: "ORD-2041", buyer: "سوپرمارکت ستاره",
    phone: "۰۹۱۲۱۲۳۴۵۶۷", address: "تهران، نیاوران، خیابان باهنر، پلاک ۴۵",
    pickupAddress: "شیراز، دشت ارژن، باغ سیب نقره‌ای",
    weight: "۱۸۰ کیلو", slot: "۱۴:۰۰–۱۶:۰۰", distance: "۱۲ کیلومتر", fee: 350000,
    items: [
        { name: "سیب درختی", qty: "۱۰۰ کیلو" },
        { name: "گوجه فرنگی", qty: "۵۰ کیلو" },
        { name: "انگور", qty: "۳۰ کیلو" },
    ],
}

export default function DriverOrderDetail() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const d = MOCK

    return (
        <>
            <div className="adm-detail-head">
                <h1 className="adm-page-title" style={{ marginBottom: 0 }}>جزئیات تحویل</h1>
                <span className="pill pill--pending">در انتظار قبول</span>
                <button onClick={() => router.back()} className="adm-btn adm-btn--ghost" style={{ fontSize: 13, padding: "6px 14px", marginInlineStart: "auto" }}>
                    ← بازگشت
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 20 }}>
                <div className="adm-card">
                    <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>اطلاعات تحویل</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
                        <div><span style={{ color: "var(--adm-fg-3)" }}>خریدار: </span><b>{d.buyer}</b></div>
                        <div><span style={{ color: "var(--adm-fg-3)" }}>وزن: </span><b>{d.weight}</b></div>
                        <div><span style={{ color: "var(--adm-fg-3)" }}>زمان تحویل: </span><b>{fa(d.slot)}</b></div>
                        <div><span style={{ color: "var(--adm-fg-3)" }}>فاصله: </span><b>{d.distance}</b></div>
                    </div>
                    <div style={{ marginTop: 12, padding: "10px 14px", background: "var(--adm-accent-50)", borderRadius: "var(--adm-r-sm)", fontSize: 13 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                            <MapPin size={13} style={{ color: "var(--adm-accent)" }} /> <b>آدرس تحویل:</b>
                        </div>
                        <span style={{ color: "var(--adm-fg-2)" }}>{d.address}</span>
                    </div>
                    <div style={{ marginTop: 8, padding: "10px 14px", background: "var(--adm-accent-50)", borderRadius: "var(--adm-r-sm)", fontSize: 13 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                            <Package size={13} style={{ color: "var(--adm-accent)" }} /> <b>آدرس بارگیری:</b>
                        </div>
                        <span style={{ color: "var(--adm-fg-2)" }}>{d.pickupAddress}</span>
                    </div>
                </div>

                <div className="adm-card">
                    <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>تماس</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                        <Phone size={16} style={{ color: "var(--adm-accent)" }} />
                        <span style={{ fontSize: 14, direction: "ltr", textAlign: "right" }}>{fa(d.phone)}</span>
                    </div>

                    <h3 style={{ margin: "16px 0 10px", fontSize: 14, fontWeight: 600 }}>دستمزد حمل</h3>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "var(--adm-accent)", marginBottom: 4 }}>{faNum(d.fee)}</div>
                    <div style={{ fontSize: 12, color: "var(--adm-fg-3)" }}>تومان</div>
                </div>
            </div>

            <div className="adm-card" style={{ marginBottom: 20 }}>
                <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 600 }}>محصولات</h3>
                <div className="adm-table-wrap">
                    <table className="adm-table">
                        <thead><tr><th>محصول</th><th>مقدار</th></tr></thead>
                        <tbody>
                            {d.items.map((item, i) => (
                                <tr key={i}><td>{item.name}</td><td className="tnum">{fa(item.qty)}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
                <Link href={`/driver/orders/${id}/navigate`} className="adm-btn adm-btn--filled">
                    <MapPin size={14} /> مسیریابی
                </Link>
                <Link href={`/driver/orders/${id}/pickup`} className="adm-btn adm-btn--outline">
                    <Package size={14} /> ثبت بارگیری
                </Link>
                <button className="adm-btn adm-btn--ghost" style={{ color: "var(--adm-down)" }}>
                    <X size={14} /> رد درخواست
                </button>
            </div>
        </>
    )
}
