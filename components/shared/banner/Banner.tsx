import Image from "next/image"
import FeatureBox from "@/components/shared/FeatureBox"
import {Truck, ShieldCheck, RefreshCw, PanelsTopLeft} from "lucide-react"

export default function Banner() {
    return (
        <section className="relative w-full py-16">

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/banner-bg.svg"
                    alt="bg"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="w-[90%] md:w-4/5 mx-auto flex flex-col gap-10">

                <div className="w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

                    <div className="flex flex-col md:w-[50%] ">

                        <h1 className="text-right text-[32px] md:text-[48px] font-bold leading-[60px] md:leading-[80px]">
                            از{" "}
                            <span className="text-[#51A46B]">مزرعه</span>
                            ، تا در خانه‌ی شما
                        </h1>

                        <p className="mt-4 text-[18px] md:text-[24px] leading-[32px] md:leading-[38px] text-black">
                            با تازه‌ترین میوه‌ها و سبزیجات، چه برای یک سفارش کوچک یا یک جشن
                            بزرگ، ما همیشه کنار شما هستیم.
                        </p>

                        <button className="mt-6 flex items-center  rounded-[10px] overflow-hidden">

                        <span className="px-6 py-3 text-[16px] md:text-[18px] bg-[#51A46B] text-white">
                          مشاهده محصولات
                        </span>

                            <span className="w-[55px] h-[55px] bg-white flex items-center justify-center border-r border-[#DDEEE2]">
                                         <PanelsTopLeft size={24} />

                             </span>

                        </button>

                    </div>

                    <div className="w-full md:w-[50%] flex justify-center">
                        <Image
                            src="/images/banner-image.png"
                            alt="banner"
                            width={700}
                            height={700}
                            className="object-contain"
                        />
                    </div>

                </div>

                <div className="flex flex-row justify-between items-stretch md:p-10  bg-white border border-[#E9E8E3] rounded-[20px]">

                    <FeatureBox
                        icon={<Truck/>}
                        title="تحویل سریع"
                        description="با ایجاد آدرس منزل خود در پروفایل کاربری،محصول خود را درب منزل تحویل بگیرید"
                    />

                    <FeatureBox
                        icon={<ShieldCheck/>}
                        title="ضمانت تازگی محصول"
                        description=" پس از دریافت محصول در صورت وجود مشکل میتوانید مرجوع کنید"
                    />

                    <FeatureBox
                        icon={<RefreshCw/>}
                        title="پرداخت امن"
                        description="برای ایجاد اطمینان خاطر مشتریان، امکان پرداخت از درگاه مطمئن وجود دارد"
                    />
                </div>
            </div>
        </section>
)
}