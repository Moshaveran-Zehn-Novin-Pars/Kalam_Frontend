import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"
import { UserPlus, Search, ShoppingCart, CheckCircle, Truck } from "lucide-react"

export const metadata = { title: "راهنما | کلم" }

const STEPS_BUYER = [
    { icon: <UserPlus size={24} />, title: "ثبت‌نام", desc: "با شماره موبایل خود ثبت‌نام کنید و اطلاعات کسب‌وکار خود را تکمیل کنید." },
    { icon: <Search size={24} />, title: "جستجوی محصول", desc: "محصولات مورد نیاز خود را با فیلترهای پیشرفته جستجو کنید." },
    { icon: <ShoppingCart size={24} />, title: "ثبت سفارش", desc: "محصولات را به سبد خرید اضافه کنید و آدرس تحویل را مشخص کنید." },
    { icon: <CheckCircle size={24} />, title: "پرداخت", desc: "از طریق درگاه آنلاین یا کیف پول پرداخت را انجام دهید." },
    { icon: <Truck size={24} />, title: "دریافت کالا", desc: "سفارش در زمان مقرر توسط راننده به آدرس شما تحویل داده می‌شود." },
]

const STEPS_FARMER = [
    { icon: <UserPlus size={24} />, title: "ثبت‌نام", desc: "به عنوان باغدار ثبت‌نام کنید و مدارک خود را بارگذاری کنید." },
    { icon: <CheckCircle size={24} />, title: "ثبت محصول", desc: "محصولات خود را با مشخصات کامل و قیمت ثبت کنید." },
    { icon: <ShoppingCart size={24} />, title: "دریافت سفارش", desc: "سفارشات را در داشبورد خود مشاهده و تأیید کنید." },
    { icon: <Truck size={24} />, title: "ارسال بار", desc: "پس از تأیید، محصولات را برای تحویل آماده کنید." },
    { icon: <CheckCircle size={24} />, title: "تسویه حساب", desc: "وجه سفارش پس از تحویل به حساب شما واریز می‌شود." },
]

export default function HowItWorksPage() {
    return (<><Header />
        <main className="min-h-screen bg-white py-16 md:py-24" dir="rtl">
            <div className="max-w-5xl mx-auto px-4">
                <h1 className="text-[32px] md:text-[40px] font-extrabold text-[#212121] text-center mb-4">کلم چگونه کار می‌کند؟</h1>
                <p className="text-[#8A8A8A] text-[16px] text-center max-w-2xl mx-auto mb-16">پلتفرم B2B خرید و فروش عمده میوه و تره‌بار. ارتباط مستقیم باغداران با خریداران عمده.</p>

                <div className="mb-20">
                    <h2 className="text-[22px] font-bold text-[#212121] text-center mb-10">خرید از کلم</h2>
                    <div className="grid md:grid-cols-5 gap-6">
                        {STEPS_BUYER.map((step, i) => (
                            <div key={i} className="text-center">
                                <div className="w-16 h-16 rounded-full bg-[#E5F2E9] flex items-center justify-center mx-auto mb-4 text-[#51A46B] relative">
                                    {step.icon}
                                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#51A46B] text-white text-[12px] font-bold flex items-center justify-center">{i + 1}</span>
                                </div>
                                <h3 className="text-[15px] font-bold text-[#212121] mb-2">{step.title}</h3>
                                <p className="text-[13px] text-[#8A8A8A] leading-6">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-20">
                    <h2 className="text-[22px] font-bold text-[#212121] text-center mb-10">فروش در کلم (باغداران)</h2>
                    <div className="grid md:grid-cols-5 gap-6">
                        {STEPS_FARMER.map((step, i) => (
                            <div key={i} className="text-center">
                                <div className="w-16 h-16 rounded-full bg-[#F0F9F3] flex items-center justify-center mx-auto mb-4 text-[#51A46B] relative">
                                    {step.icon}
                                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#51A46B] text-white text-[12px] font-bold flex items-center justify-center">{i + 1}</span>
                                </div>
                                <h3 className="text-[15px] font-bold text-[#212121] mb-2">{step.title}</h3>
                                <p className="text-[13px] text-[#8A8A8A] leading-6">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#F0F9F3] rounded-[20px] p-8 md:p-12 text-center">
                    <h2 className="text-[22px] font-bold text-[#212121] mb-4">همین حالا شروع کنید</h2>
                    <p className="text-[#505050] text-[14px] mb-8 max-w-lg mx-auto">ثبت‌نام در کلم رایگان است. بدون هزینه اشتراک، فقط هنگام فروش کمیسیون پرداخت می‌کنید.</p>
                    <div className="flex gap-4 justify-center">
                        <a href="/auth/login" className="bg-[#51A46B] text-white px-8 py-3 rounded-[12px] font-bold text-[15px] hover:bg-[#417F56] transition-colors">شروع خرید</a>
                        <a href="/auth/onboarding" className="border border-[#51A46B] text-[#51A46B] px-8 py-3 rounded-[12px] font-bold text-[15px] hover:bg-[#E5F2E9] transition-colors">ثبت‌نام باغدار</a>
                    </div>
                </div>
            </div>
        </main>
        <Footer /></>)
}