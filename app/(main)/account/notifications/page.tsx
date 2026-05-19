"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, CreditCard, Truck, Star, Settings, Loader2 } from "lucide-react"
import { notificationService } from "@/services/notification"
import "../account.css"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }

const ICONS: Record<string, React.ReactNode> = {
    order: <ShoppingBag size={16} />, payment: <CreditCard size={16} />,
    delivery: <Truck size={16} />, review: <Star size={16} />, system: <Settings size={16} />,
}
const COLORS: Record<string, string> = {
    order: "var(--acc-accent)", payment: "#1A56B0", delivery: "#F59E0B", review: "#EC4899", system: "#6B7280",
}
const BGS: Record<string, string> = {
    order: "var(--acc-accent-100)", payment: "#E8F0FE", delivery: "#FEF3C7", review: "#FDF2F8", system: "#F3F4F6",
}

export default function NotificationsPage() {
    const [filter, setFilter] = useState<"all" | "unread">("all")
    const [notifs, setNotifs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        notificationService.getMyNotifications().then(res => {
            setNotifs(res.items || [])
        }).catch(() => {}).finally(() => setLoading(false))
    }, [])

    const filtered = filter === "all" ? notifs : notifs.filter(n => !n.read)
    const unreadCount = notifs.filter(n => !n.read).length

    const handleMarkAllRead = async () => {
        await notificationService.markAllAsRead()
        setNotifs(prev => prev.map(n => ({ ...n, read: true })))
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h1 className="acc-title" style={{ margin: 0 }}>اعلان‌ها</h1>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {unreadCount > 0 && (
                        <button onClick={handleMarkAllRead}
                            style={{ fontSize: 12, color: "var(--acc-accent)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--acc-font)" }}>
                            خواندن همه
                        </button>
                    )}
                    <div style={{ display: "flex", gap: 4, background: "#F3F4F6", borderRadius: 8, padding: 3 }}>
                        {(["all", "unread"] as const).map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                style={{
                                    padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500,
                                    background: filter === f ? "#fff" : "transparent",
                                    color: filter === f ? "var(--acc-fg)" : "var(--acc-fg-3)",
                                    border: "none", cursor: "pointer", fontFamily: "var(--acc-font)", boxShadow: filter === f ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                                }}>
                                {f === "all" ? "همه" : "نخوانده"}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: "center", padding: 32 }}><Loader2 size={20} className="animate-spin inline-block" /></div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {filtered.map((n: any) => {
                        const notifType = n.type || "system"
                        return (
                            <div key={n.id} className="acc-card" style={{
                                display: "flex", gap: 12, padding: "14px 18px", alignItems: "flex-start",
                                borderColor: !n.read ? "var(--acc-accent)" : "var(--acc-border)",
                                background: !n.read ? "var(--acc-accent-50)" : "var(--acc-surface)",
                            }}>
                                <div style={{ width: 36, height: 36, borderRadius: "50%", background: BGS[notifType], display: "grid", placeItems: "center", color: COLORS[notifType], flexShrink: 0 }}>
                                    {ICONS[notifType]}
                                </div>
                                <div style={{ flex: 1, fontSize: 13 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontSize: 11, color: "var(--acc-fg-3)" }}>
                                            {n.createdAt ? fa(new Date(n.createdAt).toLocaleDateString("fa-IR")) : ""}
                                        </span>
                                        {!n.read && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--acc-accent)", display: "inline-block" }} />}
                                    </div>
                                    <p style={{ fontWeight: 600, color: "var(--acc-fg)", margin: "4px 0 2px" }}>{n.title}</p>
                                    <p style={{ color: "var(--acc-fg-3)", margin: 0 }}>{n.message || n.description || ""}</p>
                                </div>
                            </div>
                        )
                    })}
                    {filtered.length === 0 && (
                        <p style={{ textAlign: "center", color: "var(--acc-fg-3)", fontSize: 13, padding: 32 }}>اعلانی وجود ندارد</p>
                    )}
                </div>
            )}
        </div>
    )
}
