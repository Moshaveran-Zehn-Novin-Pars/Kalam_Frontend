"use client"

import { useState } from "react"
import { MapPin, Pencil, Trash2, Plus, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

const MOCK_ADDRESSES = [
  {
    id: "1",
    fullAddress: "خیابان بهشتی، خیابان سرافراز، کوچه یازدهم، پلاک ۱۰، واحد ۱۳",
    receiverName: "سوگند سلحشور",
    receiverPhone: "۰۹۴۳۸۴۷۵۷۲۱",
  },
  {
    id: "2",
    fullAddress: "خیابان بهشتی، خیابان سرافراز، کوچه یازدهم، پلاک ۱۰، واحد ۱۳",
    receiverName: "سوگند سلحشور",
    receiverPhone: "۰۹۴۳۸۴۷۵۷۲۱",
  },
]

export default function AddressesPage() {
  const [addresses, setAddresses]     = useState(MOCK_ADDRESSES)
  const [showModal, setShowModal]     = useState(false)
  const [form, setForm]               = useState({ name: "", phone: "", address: "" })

  const handleAdd = () => {
    setAddresses((prev) => [...prev, {
      id: String(Date.now()),
      fullAddress: form.address,
      receiverName: form.name,
      receiverPhone: form.phone,
    }])
    setShowModal(false)
    setForm({ name: "", phone: "", address: "" })
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowModal(true)}
          className="border border-[#51A46B] text-[#51A46B] text-[16px] font-medium px-5 py-3 rounded-[10px] hover:bg-[#E5F2E9] transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          افزودن آدرس جدید
        </button>
        <h1 className="text-[24px] font-semibold text-black">آدرس ها</h1>
      </div>

      {/* Empty state */}
      {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6">
          {/* Map illustration */}
          <div className="relative w-[280px] h-[280px]">
            <div className="absolute inset-8 rounded-full bg-emerald-50" />
            <div className="absolute top-12 left-16 w-6 h-6 rounded-full bg-emerald-50" />
            <div className="absolute top-6 right-20 w-10 h-10 rounded-full bg-emerald-50" />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 280">
              <ellipse cx="140" cy="190" rx="60" ry="20" stroke="#86EFAC" strokeWidth="4" fill="none"/>
              <path d="M110 160 L140 200 L170 160 A30 30 0 1 0 110 160Z" fill="#ECFDF5" stroke="#86EFAC" strokeWidth="4"/>
              <circle cx="140" cy="148" r="12" fill="white" stroke="#86EFAC" strokeWidth="4"/>
              <path d="M80 175 L100 195 L120 175 A20 20 0 1 0 80 175Z" fill="#86EFAC" stroke="#86EFAC" strokeWidth="4"/>
              <circle cx="100" cy="165" r="8" fill="white" stroke="#86EFAC" strokeWidth="4"/>
            </svg>
          </div>
          <p className="text-[18px] font-semibold text-black">هنوز آدرسی ثبت نشده است.</p>
          <button
            onClick={() => setShowModal(true)}
            className="border border-[#51A46B] text-[#51A46B] text-[16px] font-medium px-5 py-3 rounded-[10px] hover:bg-[#E5F2E9] transition-colors"
          >
            افزودن آدرس جدید
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {addresses.map((addr) => (
            <div key={addr.id} className="border border-[#E9E8E3] rounded-[20px] px-6 py-5">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <button className="text-[#51A46B] hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                  <button className="text-[#51A46B] hover:text-[#417F56] transition-colors">
                    <Pencil size={20} />
                  </button>
                </div>
                <div className="text-right">
                  <div className="flex items-start gap-2 justify-end">
                    <p className="text-[14px] font-semibold text-[#505050]">{addr.fullAddress}</p>
                    <MapPin size={18} className="text-[#505050] mt-0.5 shrink-0" />
                  </div>
                  <div className="flex gap-6 mt-1">
                    <span className="text-[14px] text-[#505050]">شماره موبایل: {addr.receiverPhone}</span>
                    <span className="text-[14px] text-[#505050]">گیرنده: {addr.receiverName}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal افزودن آدرس */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
            <motion.div
              className="relative bg-white rounded-[20px] w-[546px] p-8"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            >
              <button onClick={() => setShowModal(false)} className="absolute top-4 left-4 hover:text-[#51A46B]">
                <X size={22} />
              </button>
              <h2 className="text-[24px] font-semibold text-right mb-6">افزودن آدرس</h2>

              <div className="flex flex-col gap-4">
                {/* Row: نام + نام خانوادگی */}
                <div className="flex gap-4">
                  <div className="flex-1 relative border border-[#D1D5DB] rounded-[10px] h-[48px] flex items-center px-4">
                    <input placeholder="نام" className="w-full text-right outline-none text-[18px]"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="flex-1 relative border border-[#D1D5DB] rounded-[10px] h-[48px] flex items-center px-4">
                    <input placeholder="نام خانوادگی" className="w-full text-right outline-none text-[18px]" />
                  </div>
                </div>

                {/* شماره موبایل */}
                <div className="border border-[#D1D5DB] rounded-[10px] h-[48px] flex items-center px-4">
                  <input placeholder="شماره موبایل" dir="ltr" className="w-full outline-none text-[18px]"
                    value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>

                {/* آدرس */}
                <div className="border border-[#D1D5DB] rounded-[10px] h-[48px] flex items-center px-4 gap-2">
                  <MapPin size={20} className="text-[#9CA3AF] shrink-0" />
                  <input placeholder="آدرس" className="w-full text-right outline-none text-[18px]"
                    value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                </div>

                <button
                  onClick={handleAdd}
                  className="bg-[#51A46B] text-white text-[18px] h-[48px] rounded-[10px] hover:bg-[#417F56] transition-colors"
                >
                  ثبت آدرس
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}