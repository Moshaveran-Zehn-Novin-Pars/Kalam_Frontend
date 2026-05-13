"use client"
import { useState } from "react"
import { CheckCircle, AlertCircle, MapPin } from "lucide-react"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const FIELDS = [
    { label: "نام و نام خانوادگی", value: "علی محمدی" },
    { label: "شماره موبایل",       value: "۰۹۱۲۳۴۵۶۷۸۹" },
    { label: "شماره پلاک",         value: "۱۲۳ الف ۴۵" },
    { label: "نوع خودرو",          value: "وانت نیسان" },
    { label: "ظرفیت بار (کیلو)",   value: "۷۵۰" },
]

const DOCS = [
    { label: "کارت ملی",           done: true  },
    { label: "گواهینامه پایه یک",  done: true  },
    { label: "بیمه شخص ثالث",      done: true  },
    { label: "کارت خودرو",         done: false },
    { label: "معاینه فنی",         done: false },
]

export default function DriverProfile() {
    const [online, setOnline] = useState(true)

    return (
        <>
            <h1 className="adm-page-title">پروفایل راننده</h1>

            <div className="adm-user-detail-card">
                <div className="adm-user-detail-avatar">ع</div>
                <div className="adm-user-detail-grid">
                    <div><span>نام راننده: </span><b>علی محمدی</b></div>
                    <div><span>شماره تماس: </span><span className="tnum">{fa("09123456789")}</span></div>
                    <div><span>تحویل‌ها: </span><b className="tnum">{fa(234)}</b></div>
                    <div><span>امتیاز: </span><b>⭐ ۴.۸</b></div>
                </div>
                {/* Online toggle */}
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
                {/* Info card */}
                <div className="adm-card">
                    <h2 className="adm-section-title" style={{ marginTop: 0 }}>اطلاعات راننده</h2>
                    {FIELDS.map(f => (
                        <div key={f.label} className="adm-info-row" style={{ padding: "10px 0", borderBottom: "1px solid var(--adm-border)" }}>
                            <span className="adm-info-key">{f.label}:</span>
                            <span className="adm-info-val">{f.value}</span>
                        </div>
                    ))}
                </div>

                {/* Documents */}
                <div className="adm-card">
                    <h2 className="adm-section-title" style={{ marginTop: 0 }}>مدارک</h2>
                    {DOCS.map(d => (
                        <div key={d.label}
                             style={{
                                 display: "flex", alignItems: "center", gap: 10,
                                 padding: "10px 12px", borderRadius: "var(--adm-r-sm)",
                                 marginBottom: 6, background: d.done ? "var(--adm-shipped-bg)" : "var(--adm-surface)",
                                 border: d.done ? "none" : "1px solid var(--adm-border)"
                             }}>
                            {d.done
                                ? <CheckCircle size={16} color="var(--adm-shipped-fg)" style={{ flexShrink: 0 }} />
                                : <AlertCircle size={16} color="var(--adm-pending-fg)" style={{ flexShrink: 0 }} />
                            }
                            <span style={{ fontSize: 13, color: d.done ? "var(--adm-fg-2)" : "var(--adm-fg-3)" }}>
                                {d.label}
                            </span>
                            {!d.done && (
                                <span style={{ fontSize: 11, color: "var(--adm-pending-fg)", marginInlineStart: "auto" }}>
                                    آپلود کن
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}