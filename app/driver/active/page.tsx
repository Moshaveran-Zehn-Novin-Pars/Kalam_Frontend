"use client"
import { Phone, CheckCircle, Camera, MapPin, ChevronDown } from "lucide-react"
import Link from "next/link"

function MockMap() {
    return (
        <div className="driver-map">
            {[20,40,60,80].map(p => (
                <div key={p} className="driver-map-grid-h" style={{ top: `${p}%` }} />
            ))}
            {[14,28,42,57,71,85].map(p => (
                <div key={p} className="driver-map-grid-v" style={{ right: `${p}%` }} />
            ))}
            <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}>
                <polyline
                    points="80,265 150,205 240,165 330,135 420,110 510,88"
                    fill="none" stroke="#51A46B" strokeWidth="3" strokeDasharray="9 5"
                />
            </svg>
            <div className="driver-map-label driver-map-label--origin">📦 بارگیری</div>
            <div className="driver-map-label driver-map-label--dest">📍 مقصد</div>
            <div className="driver-map-truck">🚛</div>
        </div>
    )
}

export default function ActiveDelivery() {
    return (
        <>
            <div className="adm-detail-head">
                <h1 className="adm-page-title" style={{ marginBottom: 0 }}>تحویل فعال</h1>
                <span className="pill pill--prep">در مسیر</span>
                <Link href="/driver/deliveries"
                      className="adm-btn adm-btn--outline" style={{ fontSize: 13, padding: "6px 14px", marginInlineStart: "auto" }}>
                    ← بازگشت
                </Link>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:24 }}>
                {/* Map side */}
                <div>
                    <MockMap />
                    <div className="driver-eta" style={{ fontFamily: "var(--adm-font)" }}>
                        <span>⏱ زمان تخمینی رسیدن</span>
                        <span className="driver-eta-value">۲۵ دقیقه</span>
                    </div>
                </div>

                {/* Info side */}
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    {/* Buyer info */}
                    <div className="adm-card" style={{ fontFamily: "var(--adm-font)" }}>
                        <p style={{ fontSize:12, color:"var(--adm-fg-3)", marginBottom:4 }}>خریدار</p>
                        <p style={{ fontWeight:700, fontSize:16, marginBottom:4 }}>سوپرمارکت ستاره</p>
                        <p style={{ fontSize:13, color:"var(--adm-fg-3)", display:"flex", alignItems:"center", gap:4 }}>
                            <MapPin size={13} /> تهران، نیاوران، خیابان ولیعصر
                        </p>

                        <div style={{ margin:"16px 0", height:1, background:"var(--adm-border)" }} />

                        {[
                            ["شماره سفارش", "ORD-2041"],
                            ["وزن بار", "۱۸۰ کیلوگرم"],
                            ["پنجره زمانی", "۱۴:۰۰ – ۱۶:۰۰"],
                        ].map(([k, v]) => (
                            <div key={k} style={{
                                display:"flex", justifyContent:"space-between",
                                fontSize:13, padding:"7px 0",
                                borderBottom:"1px solid var(--adm-border)"
                            }}>
                                <span style={{ color:"var(--adm-fg-3)" }}>{k}</span>
                                <span style={{ fontWeight:600 }}>{v}</span>
                            </div>
                        ))}

                        <button className="adm-btn adm-btn--outline"
                                style={{ marginTop:16, width:"100%", justifyContent:"center" }}>
                            <Phone size={15} /> تماس با خریدار
                        </button>
                    </div>

                    {/* Confirm */}
                    <div className="adm-card" style={{ fontFamily: "var(--adm-font)" }}>
                        <p style={{ fontWeight:600, marginBottom:14 }}>تأیید تحویل</p>
                        <div style={{
                            border:"2px dashed var(--adm-border-s)", borderRadius:"var(--adm-r-sm)",
                            padding:22, textAlign:"center", cursor:"pointer", marginBottom:14,
                            display:"flex", flexDirection:"column", alignItems:"center", gap:6
                        }}>
                            <Camera size={24} color="var(--adm-fg-3)" />
                            <p style={{ fontSize:13, color:"var(--adm-fg-3)" }}>عکس تحویل را آپلود کنید</p>
                        </div>
                        <button className="adm-btn adm-btn--filled"
                                style={{ width:"100%", justifyContent:"center" }}>
                            <CheckCircle size={16} /> تأیید تحویل موفق
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}