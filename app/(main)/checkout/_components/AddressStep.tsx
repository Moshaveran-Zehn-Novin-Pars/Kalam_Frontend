"use client"

import { Plus, MapPin, Pencil } from "lucide-react"

const DAYS = [
    { label: "شنبه",     date: "۱۲ بهمن" },
    { label: "یکشنبه",   date: "۱۳ بهمن" },
    { label: "دوشنبه",   date: "۱۴ بهمن" },
    { label: "سه‌شنبه",  date: "۱۵ بهمن" },
    { label: "چهارشنبه", date: "۱۶ بهمن" },
    { label: "پنجشنبه",  date: "۱۷ بهمن" },
    { label: "جمعه",     date: "۱۸ بهمن" },
]

interface AddressStepProps {
    selectedDay: number
    selectedTime: number
    onDayChange: (i: number) => void
    onTimeChange: (i: number) => void
    onAddressChange?: (id: string) => void
}

export default function AddressStep({
                                        selectedDay,
                                        selectedTime,
                                        onDayChange,
                                        onTimeChange,
                                        onAddressChange,
                                    }: AddressStepProps) {
    return (
        <div className="flex flex-col gap-8 text-right" dir="rtl">

            {/* آدرس */}
            <div>
                <h2 className="text-[22px] font-bold text-[#212121] mb-4">آدرس</h2>
                <div className="bg-white border border-[#E9E8E3] rounded-[16px] p-4 flex items-start gap-3">
                    <button className="text-[#51A46B] hover:text-[#417F56] mt-1">
                        <Pencil size={16} />
                    </button>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin size={16} className="text-[#51A46B]" />
                            <span className="text-[14px] text-[#505050]">
                                خیابان بهشتی، خیابان سرافراز، کوچه بازدهم، پلاک ۱۰، واحد ۱۳
                            </span>
                        </div>
                        <div className="flex gap-4 text-[13px] text-[#505050]">
                            <span>شماره موبایل: ۰۹۴۳۸۴۷۵۸۷۲۱</span>
                            <span>گیرنده: سوگند سلحشور</span>
                        </div>
                    </div>
                </div>
                <button className="mt-3 flex items-center gap-1.5 text-[#51A46B] text-[14px] font-medium border border-[#51A46B] rounded-[10px] px-4 py-2 hover:bg-[#E5F2E9] transition-colors">
                    <Plus size={14} />
                    افزودن آدرس جدید
                </button>
            </div>

            {/* زمان تحویل */}
            <div>
                <h2 className="text-[22px] font-bold text-[#212121] mb-4">زمان تحویل</h2>
                <div className="flex gap-2 overflow-x-auto pb-2 flex-row-reverse">
                    {DAYS.map((d, i) => (
                        <button key={i} onClick={() => onDayChange(i)}
                                className={`flex flex-col items-center px-4 py-3 rounded-[12px] border shrink-0 transition-colors ${
                                    selectedDay === i
                                        ? "border-[#51A46B] bg-[#51A46B] text-white"
                                        : "border-[#E9E8E3] text-[#505050] hover:border-[#51A46B]"
                                }`}>
                            <span className="text-[14px] font-bold">{d.label}</span>
                            <span className="text-[12px] mt-0.5">{d.date}</span>
                        </button>
                    ))}
                </div>

                <div className="mt-4 flex flex-col gap-2">
                    {["صبح از ساعت ۶ تا ۱۴", "عصر از ساعت ۱۴ تا ۱۸"].map((t, i) => (
                        <label key={i} className="flex items-center justify-end gap-2 cursor-pointer text-[14px] text-[#505050]">
                            {t}
                            <input type="radio" name="time" checked={selectedTime === i}
                                   onChange={() => onTimeChange(i)}
                                   className="accent-[#51A46B] w-4 h-4" />
                        </label>
                    ))}
                </div>
            </div>

            {/* نحوه ارسال */}
            <div>
                <h2 className="text-[22px] font-bold text-[#212121] mb-4">نحوه‌ی ارسال</h2>
                <div className="bg-white border border-[#51A46B] rounded-[16px] p-4 flex items-center justify-end gap-2">
                    <span className="text-[14px] text-[#505050]">
                        ارسال سریع و به موقع با پیک مجموعه‌ی کلم
                    </span>
                    <input type="radio" defaultChecked className="accent-[#51A46B] w-4 h-4" />
                </div>
            </div>
        </div>
    )
}