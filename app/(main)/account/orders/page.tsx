"use client"

import {useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import {X} from "lucide-react"
import Link from "next/link"

type OrderStatus = "pending" | "shipped" | "cancelled"

const STATUS_MAP = {
    pending: {label: "در انتظار تایید", bg: "#FDF2B9", color: "#505050"},
    shipped: {label: "ارسال شده", bg: "#DDEEE2", color: "#505050"},
    cancelled: {label: "لغو شده", bg: "#FFEEEF", color: "#505050"},
}

const TABS = [
    {key: "active", label: "جاری"},
    {key: "delivered", label: "تحویل داده شده"},
    {key: "cancelled", label: "لغو شده"},
]

const MOCK_ORDERS = [
    {id: "۲۳۴۵۹۲۳", total: "۱،۳۸۹،۰۰۰", status: "pending" as OrderStatus, tab: "active"},
    {id: "۲۳۴۵۹۲۴", total: "۱،۳۸۹،۰۰۰", status: "shipped" as OrderStatus, tab: "active"},
    {id: "۲۳۴۵۹۲۵", total: "۱،۳۸۹،۰۰۰", status: "cancelled" as OrderStatus, tab: "cancelled"},
]

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState("active")
    const [showQuickModal, setShowQuickModal] = useState(false)

    const filtered = MOCK_ORDERS.filter(
        (o) => activeTab === "active"
            ? o.tab === "active"
            : activeTab === "delivered"
                ? o.tab === "delivered"
                : o.tab === "cancelled"
    )

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-[24px] font-semibold text-right text-black">سفارش ها</h1>

            {/* Card container */}
            <div className="border border-[#E9E8E3] rounded-[20px] overflow-hidden">

                {/* Tabs */}
                <div className="flex items-center justify-end gap-8 px-6 pt-6 pb-0 relative">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`pb-3 text-[18px] relative transition-colors ${
                                activeTab === tab.key
                                    ? "text-[#51A46B] font-bold"
                                    : "text-[#505050]"
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.key && (
                                <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#51A46B] rounded-full"/>
                            )}
                        </button>
                    ))}
                    {/* underline full width */}
                    <div className="absolute bottom-0 right-0 left-0 h-px bg-[#E9E8E3]"/>
                </div>

                {/* Order rows */}
                <div className="flex flex-col divide-y divide-[#E9E8E3]">
                    {filtered.length === 0 ? (
                        <div className="py-16 text-center text-[#505050] text-[16px]">
                            سفارشی یافت نشد
                        </div>
                    ) : (
                        filtered.map((order) => {
                            const s = STATUS_MAP[order.status]
                            return (
                                <div key={order.id} className="flex items-center justify-between px-6 py-5 flex-wrap gap-4">

                                    {/* راست: وضعیت + مبلغ + کد */}
                                    <div className="flex items-center gap-6">
    <span
        className="text-[14px] font-semibold px-4 py-1 rounded-full whitespace-nowrap"
        style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
                                        <p className="text-[14px] text-[#505050] whitespace-nowrap">
                                            مبلغ کل: <span className="font-semibold">{order.total} تومان</span>
                                        </p>
                                        <p className="text-[14px] text-[#505050] whitespace-nowrap">
                                            کد سفارش: <span className="font-semibold">{order.id}</span>
                                        </p>
                                    </div>

                                    {/* چپ: دکمه‌ها */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setShowQuickModal(true)}
                                            className="bg-[#51A46B] text-white text-[14px] font-medium px-4 py-[6px] rounded-[10px] hover:bg-[#417F56] transition-colors whitespace-nowrap"
                                        >
                                            سفارش سریع
                                        </button>
                                        <Link
                                            href={`/account/orders/${order.id}`}
                                            className="border border-[#51A46B] text-[#51A46B] text-[14px] font-medium px-4 py-[6px] rounded-[10px] hover:bg-[#E5F2E9] transition-colors whitespace-nowrap"
                                        >
                                            جزئیات سفارش
                                        </Link>
                                    </div>

                                </div>
                            )
                        })
                    )}
                </div>
            </div>

            {/* Modal سفارش سریع */}
            <AnimatePresence>
                {showQuickModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center"
                        initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                    >
                        <div className="absolute inset-0 bg-black/50" onClick={() => setShowQuickModal(false)}/>
                        <motion.div
                            className="relative bg-white rounded-[20px] w-[649px] p-8 text-center"
                            initial={{scale: 0.9, opacity: 0}} animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.9, opacity: 0}}
                        >
                            <button
                                onClick={() => setShowQuickModal(false)}
                                className="absolute top-4 left-4 hover:text-[#51A46B] transition-colors"
                            >
                                <X size={22}/>
                            </button>
                            <p className="text-[18px] text-black leading-[1.8] mb-6">
                                با انتخاب گزینه ی «<span className="font-semibold">سفارش سریع</span>»، آخرین سفارش شما
                                به صورت خودکار تکرار شده و همان اقلام برایتان ثبت می‌شود. آیا مایل به ثبت سفارش سریع
                                هستید؟
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <button
                                    className="bg-[#51A46B] text-white text-[18px] px-8 py-3 rounded-[10px] hover:bg-[#417F56] transition-colors"
                                >
                                    ثبت سفارش
                                </button>
                                <button
                                    onClick={() => setShowQuickModal(false)}
                                    className="border border-[#51A46B] text-[#51A46B] text-[16px] font-medium px-5 py-3 rounded-[10px] hover:bg-[#E5F2E9] transition-colors"
                                >
                                    انصراف
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}