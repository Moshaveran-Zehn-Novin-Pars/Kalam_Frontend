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
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-[#212121] leading-[1.4]">
              از <span className="text-[#51A46B]">مزرعه</span>، تا در خانه‌ی شما
            </h1>
            <p className="text-[#505050] text-lg md:text-xl leading-relaxed max-w-lg">
              با تازه‌ترین میوه‌ها و سبزیجات، چه برای یک سفارش کوچک یا یک جشن بزرگ، ما همیشه کنار شما هستیم.
            </p>
            <Link
                href="/products"
                className="bg-[#51A46B] text-white px-8 py-4 rounded-[20px] flex items-center gap-3 hover:bg-[#417F56] transition shadow-lg shadow-green-200 w-fit"
            >
              <span className="font-bold text-lg">شروع خرید</span>
              <div className="bg-white/20 p-1.5 rounded-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
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

              {/* Badge ارگانیک */}
              <div className="absolute -top-6 right-4 md:right-12 z-20 animate-bounce">
                <div
                    className="w-28 h-28 bg-[#FFC107] rounded-full flex items-center justify-center shadow-lg"
                    style={{ transform: "rotate(-12deg)" }}
                >
                  <span className="font-bold text-white text-lg">ارگانیک</span>
                </div>
              </div>

              {/* برگ‌های تزئینی */}
              <div className="absolute top-10 -left-4 text-5xl opacity-60 rotate-12 select-none">🌿</div>
              <div className="absolute bottom-10 right-0 text-5xl opacity-80 select-none">🌿</div>
            </div>
          </div>
        </div>
      </section>
  )
}