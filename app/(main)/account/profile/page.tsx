"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { X, MapPin, Phone, Mail, User } from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [form, setForm] = useState({
    firstName: user?.firstName ?? "",
    lastName:  user?.lastName  ?? "",
    phone:     user?.phone     ?? "",
    email:     "",
    address:   "",
  })

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-[24px] font-semibold text-right text-black">اطلاعات حساب کاربری</h1>

      {/* Form */}
      <div className="flex flex-col gap-6">
        {/* Row 1: نام + نام خانوادگی */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-right text-[18px] text-black mb-2">نام خانوادگی</label>
            <div className="border border-[#D1D5DB] rounded-[10px] h-[48px] flex items-center px-4 gap-2">
              <User size={20} className="text-[#9CA3AF]" />
              <input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="flex-1 text-right outline-none text-[18px]"
                placeholder="نام خانوادگی"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-right text-[18px] text-black mb-2">نام</label>
            <div className="border border-[#D1D5DB] rounded-[10px] h-[48px] flex items-center px-4 gap-2">
              <User size={20} className="text-[#9CA3AF]" />
              <input
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="flex-1 text-right outline-none text-[18px]"
                placeholder="نام"
              />
            </div>
          </div>
        </div>

        {/* Row 2: موبایل + ایمیل */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-right text-[18px] text-black mb-2">شماره موبایل</label>
            <div className="border border-[#D1D5DB] rounded-[10px] h-[48px] flex items-center px-4 gap-2">
              <Phone size={20} className="text-[#9CA3AF]" />
              <input
                value={form.phone}
                dir="ltr"
                className="flex-1 outline-none text-[18px]"
                placeholder="شماره موبایل"
                readOnly
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-right text-[18px] text-black mb-2">ایمیل</label>
            <div className="border border-[#D1D5DB] rounded-[10px] h-[48px] flex items-center px-4 gap-2">
              <Mail size={20} className="text-[#9CA3AF]" />
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                dir="ltr"
                className="flex-1 outline-none text-[18px]"
                placeholder="ایمیل"
              />
            </div>
          </div>
        </div>

        {/* آدرس */}
        <div>
          <label className="block text-right text-[18px] text-black mb-2">آدرس</label>
          <div className="border border-[#D1D5DB] rounded-[10px] h-[48px] flex items-center px-4 gap-2">
            <MapPin size={20} className="text-[#9CA3AF] shrink-0" />
            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="flex-1 text-right outline-none text-[18px]"
              placeholder="آدرس"
            />
          </div>
        </div>

        {/* ذخیره */}
        <div className="flex justify-start">
          <button className="border border-[#51A46B] text-[#51A46B] text-[16px] font-medium px-5 py-3 rounded-[10px] hover:bg-[#E5F2E9] transition-colors">
            ذخیره کردن تغییرات
          </button>
        </div>
      </div>

      {/* Modal خروج */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowLogoutModal(false)} />
            <motion.div
              className="relative bg-white rounded-[20px] w-[453px] p-8 text-center"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            >
              <button onClick={() => setShowLogoutModal(false)} className="absolute top-4 left-4">
                <X size={22} />
              </button>
              <p className="text-[18px] text-black leading-[1.8] mb-6">
                آیا برای خروج از حساب کاربری خود اطمینان دارید؟
              </p>
              <div className="flex flex-col gap-4 items-center">
                <button
                  onClick={handleLogout}
                  className="bg-[#51A46B] text-white text-[18px] px-8 py-3 rounded-[10px] hover:bg-[#417F56] transition-colors"
                >
                  خروج از حساب کاربری
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
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