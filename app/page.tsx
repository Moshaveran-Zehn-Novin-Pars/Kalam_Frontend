import Button from "@/components/ui/Button"
import CategoryCard from "@/features/category/components/CategoryCard";
import FeatureBox from "@/components/shared/FeatureBox"
import { Truck, ShieldCheck, RefreshCw } from "lucide-react"
export default function Home() {
  return (
    //   <Header /> {/* استفاده از کامپوننت Header */}
    // <main>
    //     <HeroSection data={homepageData.hero} /> {/* استفاده از کامپوننت HeroSection با داده‌هایش */}
    //     <FeaturesGrid features={homepageData.features} /> {/* استفاده از کامپوننت FeaturesGrid */}
    //     {/* ... سایر بخش‌های صفحه اصلی */}
    // </main>
    // <Footer /> {/* استفاده از کامپوننت Footer */}
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main
            className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

            <div className="p-10 flex gap-6">
                <CategoryCard
                    id={1}
                    title="میوه تازه"
                    description="خرید انواع میوه با کیفیت بالا"
                    image="https://elementiranco.com/wp-content/uploads/2026/03/toot-farangi-1.webp"
                    color="#f59e0b"
                />
            </div>

            <Button label="مشاهده" variant="outline"/>

            <Button label="در حال بارگذاری" loading/>

            <div className="flex gap-10 p-10 justify-center">

                <FeatureBox
                    icon={<Truck/>}
                    title="ارسال سریع"
                    description="تحویل سریع در کمترین زمان ممکن"
                />

                <FeatureBox
                    icon={<ShieldCheck/>}
                    title="ضمانت کیفیت"
                    description="در صورت مشکل امکان مرجوعی دارید"
                />

                <FeatureBox
                    icon={<RefreshCw/>}
                    title="بازگشت کالا"
                    description="تا ۷ روز امکان بازگشت"
                />
            </div>
        </main>
    </div>
  );
}