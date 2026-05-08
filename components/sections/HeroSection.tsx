import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
      <section
          className="relative w-full overflow-hidden"
          style={{ background: "linear-gradient(160deg, #DDEEE2 60%, #c8e6cf 100%)" }}
      >
        {/* برگ‌های تزئینی */}
        <div className="absolute top-4 right-8 opacity-60 pointer-events-none rotate-12">
          <svg width="48" height="60" viewBox="0 0 48 60" fill="none">
            <path d="M24 58C24 58 2 40 2 22C2 11 12 2 24 2C36 2 46 11 46 22C46 40 24 58 24 58Z" fill="#7BC67E" opacity="0.6"/>
          </svg>
        </div>
        <div className="absolute top-16 right-2 opacity-40 pointer-events-none -rotate-6">
          <svg width="32" height="42" viewBox="0 0 48 60" fill="none">
            <path d="M24 58C24 58 2 40 2 22C2 11 12 2 24 2C36 2 46 11 46 22C46 40 24 58 24 58Z" fill="#51A46B"/>
          </svg>
        </div>

        <div className="w-[90%] md:w-4/5 mx-auto flex flex-col-reverse md:flex-row items-center justify-between min-h-[420px] md:min-h-[500px]">

          {/* چپ: تصویر */}
          <div className="w-full md:w-[52%] flex justify-center items-end relative pb-0 md:pb-0">
            {/* badge ارگانیک روی تصویر */}
            <div
                className="absolute top-8 right-8 md:top-12 md:right-12 z-10
                       bg-[#FFC107] text-white text-[15px] font-bold
                       w-[80px] h-[80px] rounded-full flex items-center justify-center shadow-lg"
                style={{ transform: "rotate(-10deg)" }}
            >
              ارگانیک
            </div>

            <div className="relative w-[300px] h-[280px] md:w-[560px] md:h-[440px]">
              <Image
                  src="/images/hero-vegetables.png"
                  alt="محصولات تازه کلم"
                  fill
                  className="object-contain object-bottom"
                  priority
                  loading="eager"
              />
            </div>
          </div>

          {/* راست: متن */}
          <div className="w-full md:w-[44%] flex flex-col items-end text-right pt-12 md:pt-0">
            <h1 className="text-[32px] md:text-[52px] font-bold leading-[1.4] text-[#212121]">
              از <span className="text-[#51A46B]">مزرعه،</span>تا در خانه‌ی شما
            </h1>

            <p className="text-[#505050] text-[15px] md:text-[20px] leading-[1.8] mt-4 mb-8 max-w-[380px]">
              با تازه‌ترین میوه‌ها و سبزیجات، چه برای یک سفارش کوچک یا یک جشن بزرگ، ما همیشه کنار شما هستیم.
            </p>

            {/* دکمه شروع خرید */}
            <Link
                href="/products"
                className="flex items-center rounded-[10px] overflow-hidden shadow-md w-fit"
            >
            <span className="px-7 py-3.5 text-[16px] md:text-[18px] font-medium text-white bg-[#51A46B]">
              شروع خرید
            </span>
              <span className="w-[52px] h-[52px] bg-white flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#51A46B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </span>
            </Link>
          </div>
        </div>
      </section>
  )
}