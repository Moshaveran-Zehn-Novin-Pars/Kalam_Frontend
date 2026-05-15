import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"
import { CheckCircle, Percent, Shield, Headphones } from "lucide-react"

export const metadata = { title: "قیمت‌ها | کلم" }

export default function PricingPage() {
    return (<><Header />
        <main className="min-h-screen bg-white py-16 md:py-24" dir="rtl">
            <div className="max-w-5xl mx-auto px-4">
                <h1 className="text-[32px] md:text-[40px] font-extrabold text-[#212121] text-center mb-4">مدل درآمدی کلم</h1>
                <p className="text-[#8A8A8A] text-[16px] text-center max-w-2xl mx-auto mb-16">کلم به عنوان یک پلتفرم B2B، صرفاً از طریق کمیسیون درآمدزایی می‌کند. هیچ هزینه اشتراک یا عضویتی از باغداران یا خریداران دریافت نمی‌شود.</p>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        { icon: <Percent size={28} />, title: "کمیسیون فروش", desc: "کلم درصدی از هر تراکنش موفق را به عنوان کارمزد دریافت می‌کند.", rate: "۵-۸٪", detail: "بر اساس دسته‌بندی محصول" },
                        { icon: <Shield size={28} />, title: "بدون هزینه ماهانه", desc: "هیچ هزینه اشتراک، عضویت یا نگهداری برای هیچ کاربری وجود ندارد.", rate: "رایگان", detail: "برای همه کاربران" },
                        { icon: <Headphones size={28} />, title: "پشتیبانی رایگان", desc: "پشتیبانی تلفنی و آنلاین برای همه کاربران در تمام ساعات روز.", rate: "۲۴/۷", detail: "رایگان" },
                    ].map(item => (
                        <div key={item.title} className="border border-[#E9E8E3] rounded-[20px] p-8 text-center hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 rounded-full bg-[#E5F2E9] flex items-center justify-center mx-auto mb-6 text-[#51A46B]">{item.icon}</div>
                            <div className="text-[28px] font-extrabold text-[#51A46B] mb-2">{item.rate}</div>
                            <h3 className="text-[18px] font-bold text-[#212121] mb-2">{item.title}</h3>
                            <p className="text-[14px] text-[#8A8A8A] mb-3">{item.desc}</p>
                            <span className="text-[12px] text-[#51A46B] font-medium">{item.detail}</span>
                        </div>
                    ))}
                </div>

                <h2 className="text-[24px] font-bold text-[#212121] text-center mb-8">شفافیت در هزینه‌ها</h2>
                <div className="border border-[#E9E8E3] rounded-[20px] overflow-hidden max-w-3xl mx-auto">
                    <table className="w-full">
                        <thead><tr className="bg-[#F9FAFB] border-b border-[#E9E8E3]">
                            <th className="text-right px-6 py-4 text-[14px] text-[#8A8A8A] font-medium">دسته‌بندی</th>
                            <th className="text-right px-6 py-4 text-[14px] text-[#8A8A8A] font-medium">نرخ کمیسیون</th>
                            <th className="text-right px-6 py-4 text-[14px] text-[#8A8A8A] font-medium">توضیحات</th>
                        </tr></thead>
                        <tbody>
                            {[
                                { cat: "میوه", rate: "۶٪", desc: "انواع میوه‌های سردرختی و گرمسیری" },
                                { cat: "سبزیجات", rate: "۵٪", desc: "سبزیجات برگی، ریشه‌ای و گلخانه‌ای" },
                                { cat: "صیفی‌جات", rate: "۵٪", desc: "هندوانه، خربزه، طالبی و..." },
                                { cat: "خشکبار", rate: "۸٪", desc: "خشکبار، آجیل و محصولات فرآوری شده" },
                            ].map(row => (
                                <tr key={row.cat} className="border-b border-[#E9E8E3] last:border-0">
                                    <td className="px-6 py-4 text-[14px] font-medium text-[#212121]">{row.cat}</td>
                                    <td className="px-6 py-4 text-[14px] font-bold text-[#51A46B]">{row.rate}</td>
                                    <td className="px-6 py-4 text-[14px] text-[#8A8A8A]">{row.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
        <Footer /></>)
}