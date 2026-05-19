"use client"
import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, MapPin, Loader2 } from "lucide-react"
import { driverService } from "@/services/driver"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

export default function DriverProfile() {
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [online, setOnline] = useState(true)

    useEffect(() => {
        driverService.getMyProfile().then(setProfile).catch(() => {}).finally(() => setLoading(false))
    }, [])

    const name = profile?.fullName || profile?.name || "علی محمدی"
    const phone = profile?.phone || "۰۹۱۲۳۴۵۶۷۸۹"
    const deliveriesCount = profile?.totalDeliveries || profile?.deliveriesCount || 234
    const rating = profile?.rating || "۴.۸"
    const vehicle = profile?.vehicle || profile?.vehicleType || "وانت نیسان"
    const plate = profile?.plateNumber || profile?.plate || "۱۲۳ الف ۴۵"
    const capacity = profile?.capacity || profile?.loadCapacity || "۷۵۰"
    const docs = profile?.documents || [
        { label: "کارت ملی",           verified: true  },
        { label: "گواهینامه پایه یک",  verified: true  },
        { label: "بیمه شخص ثالث",      verified: true  },
        { label: "کارت خودرو",         verified: false },
        { label: "معاینه فنی",         verified: false },
    ]

    if (loading) return <div style={{textAlign:"center",padding:48}}><Loader2 size={20} className="animate-spin inline-block"/></div>

    return (
        <>
            <h1 className="adm-page-title">پروفایل راننده</h1>

            <div className="adm-user-detail-card">
                <div className="adm-user-detail-avatar">{name[0]}</div>
                <div className="adm-user-detail-grid">
                    <div><span>نام راننده: </span><b>{name}</b></div>
                    <div><span>شماره تماس: </span><span className="tnum">{fa(phone)}</span></div>
                    <div><span>تحویل‌ها: </span><b className="tnum">{fa(deliveriesCount)}</b></div>
                    <div><span>امتیاز: </span><b>⭐ {rating}</b></div>
                </div>
                <div
                    className={`driver-online-toggle ${online ? "is-online" : "is-offline"}`}
                    style={{ minWidth: 140, margin: 0 }}
                    onClick={() => setOnline(p => !p)}
                >
                    <span>{online ? "🟢 آنلاین" : "⚫ آفلاین"}</span>
                    <div className="driver-toggle-track">
                        <div className="driver-toggle-thumb" />
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div className="adm-card">
                    <h2 className="adm-section-title" style={{ marginTop: 0 }}>اطلاعات راننده</h2>
                    <div className="adm-info-row" style={{ padding: "10px 0", borderBottom: "1px solid var(--adm-border)" }}>
                        <span className="adm-info-key">نام و نام خانوادگی:</span>
                        <span className="adm-info-val">{name}</span>
                    </div>
                    <div className="adm-info-row" style={{ padding: "10px 0", borderBottom: "1px solid var(--adm-border)" }}>
                        <span className="adm-info-key">شماره موبایل:</span>
                        <span className="adm-info-val">{fa(phone)}</span>
                    </div>
                    <div className="adm-info-row" style={{ padding: "10px 0", borderBottom: "1px solid var(--adm-border)" }}>
                        <span className="adm-info-key">شماره پلاک:</span>
                        <span className="adm-info-val">{plate}</span>
                    </div>
                    <div className="adm-info-row" style={{ padding: "10px 0", borderBottom: "1px solid var(--adm-border)" }}>
                        <span className="adm-info-key">نوع خودرو:</span>
                        <span className="adm-info-val">{vehicle}</span>
                    </div>
                    <div className="adm-info-row" style={{ padding: "10px 0", borderBottom: "1px solid var(--adm-border)" }}>
                        <span className="adm-info-key">ظرفیت بار (کیلو):</span>
                        <span className="adm-info-val">{capacity}</span>
                    </div>
                </div>

                <div className="adm-card">
                    <h2 className="adm-section-title" style={{ marginTop: 0 }}>مدارک</h2>
                    {(Array.isArray(docs) ? docs : []).map((d: any) => {
                        const verified = d.verified || d.done
                        return (
                        <div key={d.label}
                             style={{
                                 display: "flex", alignItems: "center", gap: 10,
                                 padding: "10px 12px", borderRadius: "var(--adm-r-sm)",
                                 marginBottom: 6, background: verified ? "var(--adm-shipped-bg)" : "var(--adm-surface)",
                                 border: verified ? "none" : "1px solid var(--adm-border)"
                             }}>
                            {verified
                                ? <CheckCircle size={16} color="var(--adm-shipped-fg)" style={{ flexShrink: 0 }} />
                                : <AlertCircle size={16} color="var(--adm-pending-fg)" style={{ flexShrink: 0 }} />
                            }
                            <span style={{ fontSize: 13, color: verified ? "var(--adm-fg-2)" : "var(--adm-fg-3)" }}>
                                {d.label}
                            </span>
                            {!verified && (
                                <span style={{ fontSize: 11, color: "var(--adm-pending-fg)", marginInlineStart: "auto" }}>
                                    آپلود کن
                                </span>
                            )}
                        </div>
                    )})}
                </div>
            </div>
        </>
    )
}