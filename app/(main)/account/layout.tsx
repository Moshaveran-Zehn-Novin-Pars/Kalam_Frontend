"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { ShoppingBag, MapPin, User, LogOut, Wallet, CreditCard, FileText, Bell, Settings, ChevronLeft } from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import "./account.css"

const NAV_ITEMS = [
    { href: "/account/orders",    label: "سفارش‌ها",             icon: ShoppingBag, key: "orders"    },
    { href: "/account/wallet",    label: "کیف پول",              icon: Wallet,      key: "wallet"    },
    { href: "/account/credit",    label: "اعتبار خرید",          icon: CreditCard,  key: "credit"    },
    { href: "/account/invoices",  label: "فاکتورها",             icon: FileText,    key: "invoices"  },
    { href: "/account/addresses", label: "آدرس‌ها",              icon: MapPin,      key: "addresses" },
    { href: "/account/notifications", label: "اعلان‌ها",         icon: Bell,        key: "notifications" },
    { href: "/account/settings",  label: "تنظیمات",              icon: Settings,    key: "settings"  },
    { href: "/account/profile",   label: "اطلاعات حساب کاربری",  icon: User,        key: "profile"   },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const { user } = useAuthStore()

    const activeKey = pathname.includes("wallet") ? "wallet"
        : pathname.includes("credit") ? "credit"
        : pathname.includes("invoices") ? "invoices"
        : pathname.includes("addresses") ? "addresses"
        : pathname.includes("notifications") ? "notifications"
        : pathname.includes("settings") ? "settings"
        : pathname.includes("profile") ? "profile"
            : "orders"

    const firstName = user?.firstName || "کاربر"
    const lastName = user?.lastName || ""
    const phone = user?.phone?.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]) || ""

    return (
        <div dir="rtl" className="acc-root">
            <div className="acc-body">
                <main className="acc-main">{children}</main>

                <aside className="acc-sidebar">
                    <div className="acc-profile">
                        <div className="acc-profile-avatar">
                            {firstName[0]}
                        </div>
                        <div>
                            <div className="acc-profile-name">{firstName} {lastName}</div>
                            <div className="acc-profile-phone">{phone}</div>
                        </div>
                    </div>

                    <nav className="acc-nav">
                        {NAV_ITEMS.map(item => {
                            const Icon = item.icon
                            const isActive = item.key === activeKey
                            return (
                                <Link key={item.key} href={item.href}
                                    className={`acc-nav-item ${isActive ? "is-active" : ""}`}>
                                    <Icon size={17} className="acc-nav-icon" />
                                    <span className="acc-nav-text">{item.label}</span>
                                    {isActive && <ChevronLeft size={13} className="acc-chevron" />}
                                </Link>
                            )
                        })}
                        <button className="acc-nav-item acc-logout" onClick={() => router.push("/auth/login")}>
                            <LogOut size={17} className="acc-nav-icon" />
                            <span className="acc-nav-text">خروج از حساب کاربری</span>
                        </button>
                    </nav>
                </aside>
            </div>
        </div>
    )
}
