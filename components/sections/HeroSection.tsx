import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
      <section className="relative overflow-hidden" dir="rtl">
        {/* Background */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#DDEEE2] rounded-full opacity-60 blur-[80px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute top-40 left-20 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply blur-[100px] opacity-70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">

          {/* راست: متن */}
          <div className="md:w-1/2 space-y-8 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-[#212121] leading-[1.4]">
              از <span className="text-[#51A46B]">مزرعه</span>، تا در خانه‌ی شما
            </h1>
            <p className="text-[#505050] text-lg md:text-xl leading-relaxed max-w-lg">
              با تازه‌ترین میوه‌ها و سبزیجات، چه برای یک سفارش کوچک یا یک جشن بزرگ، ما همیشه کنار شما هستیم.
            </p>

            <Link
                href="/products"
                className="bg-[#51A46B] text-white pl-2 pr-6 py-2 rounded-full flex items-center gap-4 hover:bg-[#417F56] transition shadow-[0_8px_24px_rgba(81,164,107,0.25)] w-fit"
            >
              <span className="font-bold text-lg">شروع خرید</span>
              {/* دایره سفید و آیکون سبز مثل فیگما */}
              <div className="bg-white rounded-full flex items-center justify-center w-11 h-11">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#51A46B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 17L7 7" />
                  <path d="M17 7H7v10" />
                </svg>
              </div>
            </Link>
          </div>

          {/* چپ: تصویر */}
          <div className="md:w-1/2 relative z-10">
            <div className="relative w-full max-w-2xl mx-auto">
              <Image
                  src="/images/hero-vegetables.png"
                  alt="سبد سبزیجات تازه"
                  width={700}
                  height={560}
                  className="w-full object-contain drop-shadow-2xl"
                  priority
                  loading="eager"
              />

              {/* Badge ارگانیک (حالت دالبری فیگما) */}
              <div className="absolute -top-4 right-2 md:right-8 z-20 animate-bounce">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full text-[#F5A623] drop-shadow-lg" fill="currentColor">
                    <path d="M60,5 C66,5 71,8 75,12 C79,8 85,9 89,13 C93,17 93,23 98,26 C103,29 104,35 105,40 C109,43 108,50 108,55 C112,60 112,66 108,70 C108,75 109,82 105,86 C104,91 103,96 98,100 C93,103 93,109 89,113 C85,116 79,117 75,114 C71,118 66,120 60,120 C54,120 49,118 45,114 C41,117 35,116 31,113 C27,109 27,103 22,100 C17,96 16,91 15,86 C11,82 12,75 12,70 C8,66 8,60 12,55 C12,50 11,43 15,40 C16,35 17,29 22,26 C27,23 27,17 31,13 C35,9 41,8 45,12 C49,8 54,5 60,5 Z" />
                  </svg>
                  <span className="relative z-10 font-bold text-black text-[17px] -rotate-12">ارگانیک</span>
                </div>
              </div>

              {/* برگ‌های معلق با افکت تاری (عمق میدان) */}
              <div className="absolute top-4 -left-6 text-7xl opacity-80 select-none blur-[3px] animate-float">🍃</div>
              <div className="absolute bottom-8 right-0 text-6xl opacity-90 select-none blur-[1.5px] animate-float-reverse">🍃</div>
            </div>
          </div>
        </div>
      </section>
  )
}