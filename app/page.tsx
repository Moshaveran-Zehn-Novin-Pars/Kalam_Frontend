import Button from "@/components/ui/Button"
import CategoryCard from "@/features/category/components/CategoryCard";
import Banner from "@/components/shared/banner/Banner";

export default function Home() {
    return (
        <div className="flex flex-col font-sans dark:bg-black">
            <main className="flex flex-col">

                <Banner></Banner>

                <div className="flex flex-col gap-4 text-right">
                    <h2 className="font-semibold text-[24px] text-center">همه‌چیز برای آشپزی، مهمانی و زندگی
                        روزمره‌</h2>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                        <CategoryCard
                            id={2}
                            title="میوه"
                            description="میوه هایی که هر روزتان را و رنگارنگ می کنند."
                            image="/images/cat-1.png"
                            bgColor="#FDE5B7"
                            borderColor="#F5B129"
                        />

                        <CategoryCard
                            id={2}
                            title="سبزیجات"
                            description="سبزیجات سبز، سفره ی شما را پر طراوت می کنند."
                            image="/images/cat-2.png"
                            bgColor="#D6E0D6"
                            borderColor="#8BA78B"
                        />
                        <CategoryCard
                            id={2}
                            title="صیفی جات"
                            description="صیفی‌جات تازه، راز آشپزی سالم و خوشمزه شما هستند."
                            image="/images/cat-3.png"
                            bgColor="#EFDCE1"
                            borderColor="#BF7387"
                        />
                    </div>
                </div>


                {/*<Button label="مشاهده" variant="outline"/>*/}

                {/*<Button label="در حال بارگذاری" loading/>*/}

            </main>
        </div>
    );
}