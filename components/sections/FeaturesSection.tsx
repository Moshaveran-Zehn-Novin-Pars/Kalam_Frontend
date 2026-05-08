import { Truck, ShieldCheck, CreditCard } from "lucide-react"

const features = [
    {
        icon: <Truck size={32} className="text-[#51A46B]" />,
        title: "تحویل سریع",
        desc: "با ایجاد آدرس منزل خود در پروفایل کاربری، محصول خود را درب منزل تحویل بگیرید",
    },
    {
        icon: <ShieldCheck size={32} className="text-[#51A46B]" />,
        title: "ضمانت تازگی محصول",
        desc: "پس از دریافت محصول در صورت وجود مشکل می‌توانید مرجوع کنید",
    },
    {
        icon: <CreditCard size={32} className="text-[#51A46B]" />,
        title: "پرداخت امن",
        desc: "برای ایجاد اطمینان خاطر مشتریان، امکان پرداخت از درگاه مطمئن وجود دارد",
    },
]

export default function FeaturesSection() {
    return (
        <section className="w-[90%] md:w-4/5 mx-auto my-8">
            <div className="bg-white border border-[#E9E8E3] rounded-[20px] shadow-sm py-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="flex flex-col items-center text-center gap-3">
                            <div className="w-[80px] h-[80px] rounded-full bg-[#E5F2E9] flex items-center justify-center">
                                {f.icon}
                            </div>
                            <h3 className="text-[18px] font-bold text-[#212121]">{f.title}</h3>
                            <p className="text-[13px] text-[#505050] leading-[1.8] max-w-[220px]">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}