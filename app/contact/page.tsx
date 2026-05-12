import Image from "next/image"
import { User, Mail, Phone, MapPin, ChevronDown } from "lucide-react"
import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"

export const metadata = { title: "تماس با ما | کلم" }

export default function ContactPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-white py-12 md:py-20" dir="rtl">
                {/* تغییر از items-center/stretch به items-start برای تراز دقیق از بالا */}
                <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

                    {/* راست: تصویر و اطلاعات */}
                    <div className="w-full lg:w-7/12 flex flex-col gap-6">

                        {/* عکس بزرگ */}
                        <div className="w-full h-[240px] sm:h-[320px] rounded-[24px] overflow-hidden bg-[#f5f5f5] shrink-0">
                            <Image src="/images/contact-img.png" alt="محصولات کلم" width={800} height={400} className="w-full h-full object-cover" />
                        </div>

                        {/* باکس اطلاعات */}
                        <div className="border border-[#E9E8E3] rounded-[24px] p-6 sm:p-8 flex flex-col bg-white shadow-sm">

                            <div className="flex items-center gap-4 py-4 border-b border-[#E9E8E3]">
                                <div className="w-12 h-12 rounded-full bg-[#E5F2E9] flex items-center justify-center text-[#51A46B] shrink-0">
                                    <Mail size={22} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold text-[#212121] text-[15px]">ایمیل</span>
                                    <span className="text-[#8A8A8A] text-[14px]" dir="ltr">kalam.co@gmail.com</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 py-4 border-b border-[#E9E8E3]">
                                <div className="w-12 h-12 rounded-full bg-[#E5F2E9] flex items-center justify-center text-[#51A46B] shrink-0">
                                    <Phone size={22} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold text-[#212121] text-[15px]">شماره تماس</span>
                                    <span className="text-[#8A8A8A] text-[14px]">۰۹۱۲۷۶۵۲۳۴۵</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 py-4">
                                <div className="w-12 h-12 rounded-full bg-[#E5F2E9] flex items-center justify-center text-[#51A46B] shrink-0">
                                    <MapPin size={22} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold text-[#212121] text-[15px]">آدرس</span>
                                    <span className="text-[#8A8A8A] text-[14px] leading-relaxed">خیابان بهشتی، خیابان سرافراز، کوچه یازدهم، پلاک ۱۰، واحد ۱۳</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* چپ: فرم تماس */}
                    <div className="w-full lg:w-5/12 flex flex-col">
                        <div className="text-right mb-8">
                            <h1 className="text-[28px] sm:text-[32px] font-extrabold text-[#212121] mb-3 leading-none">
                                تماس با ما
                            </h1>
                            <p className="text-[#8A8A8A] text-[14px] sm:text-[15px]">
                                هر جا به کمک نیاز داشتید، تیم کلم کنار شماست.
                            </p>
                        </div>

                        <form className="border border-[#E9E8E3] p-6 sm:p-8 rounded-[24px] bg-white w-full shadow-sm">

                            <div className="relative border border-[#E9E8E3] rounded-[12px] h-[52px] px-4 flex items-center focus-within:border-[#51A46B] transition-colors">
                                <label className="absolute -top-[10px] right-4 bg-white px-2 text-[#212121] text-[13px] font-medium z-10">نام</label>
                                <input type="text" className="w-full h-full outline-none bg-transparent text-[15px] text-[#212121]" />
                                <User size={18} className="text-[#8A8A8A] shrink-0" />
                            </div>

                            <div className="relative border border-[#E9E8E3] rounded-[12px] h-[52px] px-4 flex items-center mt-7 focus-within:border-[#51A46B] transition-colors">
                                <label className="absolute -top-[10px] right-4 bg-white px-2 text-[#212121] text-[13px] font-medium z-10">ایمیل</label>
                                <input type="email" dir="ltr" className="w-full h-full outline-none bg-transparent text-left text-[15px] text-[#212121]" />
                                <Mail size={18} className="text-[#8A8A8A] shrink-0 ml-2" />
                            </div>

                            <div className="relative border border-[#E9E8E3] rounded-[12px] h-[52px] px-4 flex items-center mt-7 focus-within:border-[#51A46B] transition-colors">
                                <label className="absolute -top-[10px] right-4 bg-white px-2 text-[#212121] text-[13px] font-medium z-10">موضوع</label>
                                <select className="w-full h-full outline-none bg-transparent appearance-none text-[15px] text-[#212121] cursor-pointer">
                                    <option>خرید عمده</option>
                                    <option>پشتیبانی سفارش</option>
                                    <option>پیشنهاد و انتقاد</option>
                                </select>

                                <div className="absolute inset-y-0 left-4 flex items-center gap-2 pointer-events-none">
                                    <span className="bg-[#FEF0C7] text-[#B54708] text-[11px] px-2 py-1 rounded-full font-bold">خرید عمده</span>
                                    <ChevronDown size={18} className="text-[#8A8A8A]" />
                                </div>
                            </div>

                            <div className="relative border border-[#E9E8E3] rounded-[12px] p-4 mt-7 focus-within:border-[#51A46B] transition-colors">
                                <label className="absolute -top-[10px] right-4 bg-white px-2 text-[#212121] text-[13px] font-medium z-10">پیام</label>
                                <textarea className="w-full h-32 outline-none bg-transparent resize-none text-[15px] text-[#212121] leading-relaxed" />
                            </div>

                            <button type="button" className="w-full h-[52px] bg-[#51A46B] text-white rounded-[12px] text-[16px] font-bold mt-8 hover:bg-[#417F56] transition-colors">
                                ارسال پیام
                            </button>
                        </form>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    )
}