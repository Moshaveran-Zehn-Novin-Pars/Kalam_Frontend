import { Truck, ShieldCheck, CreditCard } from "lucide-react"

const features = [
    {
        icon: <Truck size={36} className="text-[#51A46B]" />,
        title: "تحویل سریع",
        desc: "با ایجاد آدرس منزل خود در پروفایل کاربری، محصول خود را درب منزل تحویل بگیرید",
    },
    {
        icon: <ShieldCheck size={36} className="text-[#51A46B]" />,
        title: "ضمانت تازگی محصول",
        desc: "پس از دریافت محصول در صورت وجود مشکل می‌توانید مرجوع کنید",
    },
    {
        icon: <CreditCard size={36} className="text-[#51A46B]" />,
        title: "پرداخت امن",
        desc: "برای ایجاد اطمینان خاطر مشتریان، امکان پرداخت از درگاه مطمئن وجود دارد",
    },
]

export default function FeaturesSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-8" dir="rtl">
            <div className="bg-white border border-[#E9E8E3] rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 shadow-sm">
                {features.map((f, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-5 w-full md:w-1/3">
                        <div className="w-24 h-24 bg-[#E5F2E9] rounded-full flex items-center justify-center">
                            {f.icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-[#212121] text-xl mb-2">{f.title}</h3>
                            <p className="text-[#505050] text-sm leading-relaxed">{f.desc}</p>
                        </div>
                        {i < 2 && <div className="hidden md:block absolute" />}
                    </div>
                ))}
            </div>
        </section>
    )
}