import Image from "next/image"
import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"

export const metadata = { title: "درباره ما | کلم" }

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-white py-16 md:py-24" dir="rtl">
                {/* تغییر از items-center به items-start برای تراز شدن بالای دو ستون */}
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-start gap-16 lg:gap-20">

                    {/* راست: تصاویر هم‌پوشان */}
                    <div className="w-full md:w-1/2 relative h-[450px] sm:h-[500px]">
                        <div className="relative w-[320px] sm:w-[400px] h-full mx-auto md:ml-0 md:mr-auto">

                            {/* عکس پشتی (بالا راست در RTL) */}
                            <div className="absolute top-0 right-0 w-[220px] sm:w-[260px] h-[280px] sm:h-[320px] rounded-[24px] overflow-hidden shadow-lg z-10 bg-[#f5f5f5]">
                                <Image src="/images/about-1.png" alt="محصولات تازه کلم" fill className="object-cover" />
                            </div>

                            {/* عکس جلویی (پایین چپ در RTL) */}
                            <div className="absolute bottom-0 left-0 w-[220px] sm:w-[260px] h-[280px] sm:h-[320px] rounded-[24px] overflow-hidden shadow-2xl z-20 border-[6px] border-white bg-[#f5f5f5]">
                                <Image src="/images/about-2.png" alt="انتخاب با کیفیت" fill className="object-cover" />
                            </div>

                            {/* بج شناور رضایت مشتری */}
                            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white rounded-[20px] p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center gap-4 w-[260px] sm:w-[280px]">
                                <div className="w-12 h-12 bg-[#E5F2E9] rounded-full flex items-center justify-center shrink-0">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#51A46B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                        <polyline points="9 12 11 14 15 10"/>
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-bold text-[#212121] text-[16px] sm:text-[17px]">٪۹۸ رضایت مشتری</div>
                                    <div className="text-[11px] sm:text-[12px] text-[#8A8A8A] mt-1">بازتاب کیفیت، تازگی و تعهد ما</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* چپ: متن */}
                    <div className="w-full md:w-1/2 space-y-6 text-right">
                        {/* leading-none برای حذف فاصله پیش‌فرض بالای فونت */}
                        <h1 className="text-[28px] sm:text-[32px] font-extrabold text-[#212121] mb-8 leading-none">
                            درباره ما
                        </h1>
                        <p className="text-[#505050] text-[15px] sm:text-[16px] leading-[2] text-justify">
                            ما در کلم تلاش می‌کنیم فاصله بین مزرعه و سفره شما را کوتاه‌تر کنیم. با همکاری مستقیم با کشاورزان و تأمین‌کنندگان معتبر، محصولات تازه و باکیفیت را با دقت انتخاب می‌کنیم تا هر سفارشی، با خیال راحت به دست شما برسد.
                        </p>
                        <p className="text-[#505050] text-[15px] sm:text-[16px] leading-[2] text-justify">
                            کلم فقط یک فروشگاه آنلاین نیست؛ ما یک همراه مطمئن برای خریدهای روزمره، سفارش‌های عمده، مهمانی‌ها و کسب‌وکارها هستیم. تازگی، صداقت، تحویل به‌موقع و احترام به انتخاب شما، ارزش‌هایی هستند که هر روز به آن‌ها پایبندیم.
                        </p>
                        <p className="text-[#505050] text-[15px] sm:text-[16px] leading-[2] text-justify">
                            هدف ما این است که هر بار که از کلم خرید می‌کنید، تجربه‌ای راحت‌تر و بهتر از قبل داشته باشید.
                        </p>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    )
}