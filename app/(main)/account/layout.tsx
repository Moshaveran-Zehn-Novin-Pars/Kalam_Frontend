"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ShoppingBag, MapPin, User, LogOut } from "lucide-react"

const NAV_ITEMS = [
  { href: "/account/orders",    label: "سفارش ها",            icon: ShoppingBag, key: "orders"    },
  { href: "/account/addresses", label: "آدرس ها",             icon: MapPin,      key: "addresses" },
  { href: "/account/profile",   label: "اطلاعات حساب کاربری", icon: User,        key: "profile"   },
  { href: "#",                  label: "خروج از حساب کاربری", icon: LogOut,      key: "logout"    },
]

const MOCK_USER = { firstName: "سوگند", lastName: "سلحشور", phone: "۰۹۰۳۷۰۲۹۱۲۱" }

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const activeKey = pathname.includes("addresses") ? "addresses"
      : pathname.includes("profile") ? "profile"
          : "orders"

  return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1192px] mx-auto px-10 py-12 flex gap-8">

          {/* Sidebar — سمت راست */}
          <aside className="w-[280px] shrink-0 border-l border-[#EFEFEF] pr-6">
            {/* User info */}
            <div className="flex items-center gap-3 mb-8 justify-end">
              <div className="text-right">
                <p className="text-[18px] text-[#121212]">{MOCK_USER.firstName} {MOCK_USER.lastName}</p>
                <p className="text-[18px] text-[#417F56]" dir="ltr">{MOCK_USER.phone}</p>
              </div>
              <div className="w-[60px] h-[60px] rounded-full bg-[#EDEDED] flex items-center justify-center shrink-0">
                <User size={28} className="text-[#505050]" />
              </div>
            </div>

            {/* Nav */}
            <div className="flex flex-col gap-[10px]">
              {NAV_ITEMS.map((item) => {
                const isActive = item.key === activeKey
                const Icon = item.icon
                return (
                    <Link
                        key={item.key}
                        href={item.href}
                        className={`flex items-center justify-end gap-3 h-[58px] px-4 rounded-[8px] text-[18px] transition-colors ${
                            isActive
                                ? "bg-[#E4F1E8] text-[#417F56]"
                                : "bg-white text-black hover:bg-[#F5F5F5]"
                        }`}
                    >
                      <span>{item.label}</span>
                      <Icon size={20} className={isActive ? "text-[#417F56]" : "text-black"} />
                    </Link>
                )
              })}
            </div>
          </aside>

          {/* محتوا — سمت چپ */}
          <div className="flex-1 min-w-0">
            {children}
          </div>



        </div>
      </div>
  )
}