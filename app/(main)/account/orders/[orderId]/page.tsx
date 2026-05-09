import Link from "next/link"
import { MapPin } from "lucide-react"

const MOCK_ITEMS = [
  { name: "بلوبری", qty: "۳ کیلو", price: "۲۱۰ تومان", img: null },
  { name: "بلوبری", qty: "۳ کیلو", price: "۲۱۰ تومان", img: null },
  { name: "بلوبری", qty: "۳ کیلو", price: "۲۱۰ تومان", img: null },
]

export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[24px] font-semibold text-right text-black">جزئیات سفارش</h1>

      {/* خلاصه سفارش */}
      <div className="border border-[#E9E8E3] rounded-[20px] px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-6 text-[18px] text-[#505050]">
          <span>شماره سفارش: <strong>۲۳۴۵۹۲۳#</strong></span>
          <span>تاریخ:<strong>1404/12/10</strong></span>
          <span>روش پرداخت: <strong>کارت به کارت</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-[#FDF2B9] text-[#505050] text-[14px] font-semibold px-4 py-1 rounded-full">در انتظار تایید</span>
          <span className="text-[#505050] text-[18px]">وضعیت سفارش:</span>
        </div>
      </div>

      {/* آدرس */}
      <div className="border border-[#E9E8E3] rounded-[20px] px-6 py-5">
        <div className="flex items-start gap-2 justify-end">
          <div className="text-right">
            <p className="text-[14px] font-semibold text-[#505050]">خیابان بهشتی، خیابان سرافراز، کوچه یازدهم، پلاک ۱۰، واحد ۱۳</p>
            <div className="flex gap-6 mt-1">
              <span className="text-[14px] text-[#505050]">شماره موبایل: ۰۹۴۳۸۴۷۵۷۲۱</span>
              <span className="text-[14px] text-[#505050]">گیرنده: سوگند سلحشور</span>
            </div>
          </div>
          <MapPin size={20} className="text-[#505050] mt-0.5 shrink-0" />
        </div>
        <p className="text-right text-[18px] text-[#505050] mt-2">
          زمان تحویل: <strong>۱۲ بهمن/ صبح</strong>
        </p>
      </div>

      {/* محصولات */}
      <div>
        <h2 className="text-[24px] font-semibold text-right mb-4">
          محصولات <span className="text-[#505050] text-[16px] font-semibold">(۳)</span>
        </h2>
        <div className="flex flex-col gap-4">
          {MOCK_ITEMS.map((item, i) => (
            <div key={i} className="border border-[#E9E8E3] rounded-[20px] p-4 flex items-center justify-between">
              <p className="text-[20px] font-semibold text-[#505050]">{item.price}</p>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[20px] font-semibold text-black">{item.name}</p>
                  <p className="text-[20px] font-semibold text-[#505050]">{item.qty}</p>
                  <p className="text-[20px] font-semibold text-[#505050]">قیمت کل: {item.price}</p>
                </div>
                <div className="w-[80px] h-[80px] border border-[#E9E8E3] rounded-[20px] bg-white flex items-center justify-center">
                  {item.img
                    ? <img src={item.img} alt={item.name} className="w-[64px] h-[64px] object-contain" />
                    : <span className="text-3xl">🫐</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* خلاصه مالی */}
      <div className="border border-[#51A46B] rounded-[20px] px-8 py-8 flex flex-col gap-6">
        <div className="flex justify-between text-[20px] font-semibold text-[#505050]">
          <span>۳،۵۴۳،۵۰۰ تومان</span>
          <span>قیمت کالاها:</span>
        </div>
        <div className="flex justify-between text-[20px] font-semibold text-[#505050]">
          <span>۱،۰۰۰،۰۰۰ تومان</span>
          <span>تخفیف:</span>
        </div>
        <div className="flex justify-between text-[20px] font-semibold text-[#505050]">
          <span>۴۰۰،۰۰۰ تومان</span>
          <span>هزینه ارسال:</span>
        </div>
        <div className="h-px bg-[#E9E8E3]" />
        <div className="flex justify-between text-[20px] font-semibold text-[#505050]">
          <span>۲،۵۴۳،۵۰۰ تومان</span>
          <span>جمع سبد خرید:</span>
        </div>
      </div>

      {/* رسید پرداختی */}
      <h2 className="text-[24px] font-semibold text-right">رسید پرداختی</h2>
      <div className="border border-[#E9E8E3] rounded-[20px] p-4 h-[192px] flex items-center justify-center">
        <div className="border border-[#D0D0D0] rounded-[20px] w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-[#51A46B]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#51A46B" strokeWidth="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}