import Image from "next/image"
import Link from "next/link"
import FeatureBox from "@/components/shared/FeatureBox"
import { Truck, ShieldCheck, RefreshCw } from "lucide-react"

export default function Banner() {
    return (
        <section className="relative w-full py-24">

            <div className="absolute inset-0 -z-10 opacity-85">
                <Image
                    src="/images/banner-bg.svg"
                    alt=""
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="w-[90%] md:w-4/5 mx-auto flex flex-col gap-10">

                <div className="w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

                    <div className="flex flex-col md:w-[50%]">
                        <h1 className="text-right text-[32px] md:text-[48px] font-bold leading-[60px] md:leading-[80px]">
                            از{" "}
                            <span className="text-primary">مزرعه</span>
                            ، تا در خانه‌ی شما
                        </h1>

                        <p className="mt-4 text-[18px] md:text-[24px] leading-[32px] md:leading-[38px] text-black">
                            با تازه‌ترین میوه‌ها و سبزیجات، چه برای یک سفارش کوچک یا یک جشن
                            بزرگ، ما همیشه کنار شما هستیم.
                        </p>

                        <Link
                            href="/products"
                            className="mt-6 flex items-center w-fit rounded-[10px] overflow-hidden"
                        >
                            <span className="px-6 py-3 text-[16px] md:text-[18px] bg-primary text-white">
                                مشاهده محصولات
                            </span>
                            <span className="w-[55px] h-[55px] bg-white flex items-center justify-center border-r border-[#DDEEE2]">
                                ←
                            </span>
                        </Link>
                    </div>

                    <div className="w-full md:w-[50%] flex justify-center">
                        <Image
                            src="/images/banner-image.png"
                            alt="محصولات تازه کلم"
                            width={700}
                            height={700}
                            className="object-contain w-auto"   // اضافه کن w-auto
                            priority
                            loading="eager"
                        />
                    </div>
                </div>

                <div className="flex flex-row justify-between items-stretch md:p-10 bg-white border border-[#E9E8E3] rounded-[20px]">
                    <FeatureBox
                        icon={<Truck />}
                        title="تحویل سریع"
                        description="با ایجاد آدرس منزل خود در پروفایل کاربری، محصول خود را درب منزل تحویل بگیرید"
                    />
                    <FeatureBox
                        icon={<ShieldCheck />}
                        title="ضمانت تازگی محصول"
                        description="پس از دریافت محصول در صورت وجود مشکل می‌توانید مرجوع کنید"
                    />
                    <FeatureBox
                        icon={<RefreshCw />}
                        title="پرداخت امن"
                        description="برای ایجاد اطمینان خاطر مشتریان، امکان پرداخت از درگاه مطمئن وجود دارد"
                    />
                </div>
            </div>
        </section>
    )
}