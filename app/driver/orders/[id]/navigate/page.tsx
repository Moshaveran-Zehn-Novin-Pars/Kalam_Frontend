"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Navigation, MapPin, Phone } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const DEST = { lat: 35.789, lng: 51.418, address: "تهران، نیاوران، خیابان باهنر، پلاک ۴۵" }
const PICKUP = { lat: 29.615, lng: 52.482, address: "شیراز، دشت ارژن، باغ سیب نقره‌ای" }

export default function NavigatePage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()

    return (
        <>
            <div className="adm-detail-head">
                <h1 className="adm-page-title" style={{ marginBottom: 0 }}>مسیریابی</h1>
                <span className="pill pill--prep">در مسیر</span>
                <button onClick={() => router.back()} className="adm-btn adm-btn--ghost" style={{ fontSize: 13, padding: "6px 14px", marginInlineStart: "auto" }}>
                    ← بازگشت
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, marginBottom: 20 }}>
                <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
                    <div className="driver-map" style={{ height: 400 }}>
                        {[20, 40, 60, 80].map(p => (
                            <div key={p} className="driver-map-grid-h" style={{ top: `${p}%` }} />
                        ))}
                        {[14, 28, 42, 57, 71, 85].map(p => (
                            <div key={p} className="driver-map-grid-v" style={{ right: `${p}%` }} />
                        ))}
                        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                            <polyline points="80,265 150,205 240,165 330,135 420,110 510,88"
                                fill="none" stroke="#51A46B" strokeWidth="3" strokeDasharray="9 5" />
                            <circle cx="80" cy="265" r="8" fill="#51A46B" />
                            <circle cx="510" cy="88" r="8" fill="#EF4444" />
                        </svg>
                        <div className="driver-map-label driver-map-label--origin">📦 {PICKUP.address}</div>
                        <div className="driver-map-label driver-map-label--dest">📍 {DEST.address}</div>
                        <div className="driver-map-truck">🚛</div>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div className="adm-card">
                        <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>مسیر</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
                            <div style={{ display: "flex", gap: 8 }}>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--adm-accent)", marginTop: 4, flexShrink: 0 }} />
                                <div>
                                    <div style={{ fontWeight: 500 }}>بارگیری</div>
                                    <div style={{ color: "var(--adm-fg-3)", fontSize: 12 }}>{PICKUP.address}</div>
                                </div>
                            </div>
                            <div style={{ width: 2, height: 24, background: "var(--adm-border)", marginInlineStart: 3 }} />
                            <div style={{ display: "flex", gap: 8 }}>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444", marginTop: 4, flexShrink: 0 }} />
                                <div>
                                    <div style={{ fontWeight: 500 }}>مقصد</div>
                                    <div style={{ color: "var(--adm-fg-3)", fontSize: 12 }}>{DEST.address}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="adm-card">
                        <div className="driver-eta" style={{ fontFamily: "var(--adm-font)" }}>
                            <span>⏱ زمان تخمینی</span>
                            <span className="driver-eta-value">۲۵ دقیقه</span>
                        </div>
                        <div style={{ fontSize: 13, color: "var(--adm-fg-3)", marginTop: 6 }}>
                            فاصله: ۱۲ کیلومتر
                        </div>
                    </div>

                    <Link href={`/driver/orders/${id}/pickup`}
                        className="adm-btn adm-btn--filled" style={{ justifyContent: "center", padding: "12px" }}>
                        <Navigation size={16} /> شروع مسیریابی
                    </Link>
                </div>
            </div>
        </>
    )
}
