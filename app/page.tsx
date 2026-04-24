import Button from "@/components/ui/Button"
import CategoryCard from "@/features/category/components/CategoryCard";
import Banner from "@/components/shared/banner/Banner";

export default function Home() {
    return (
        <div className="flex flex-col font-sans dark:bg-black">
            <main className="flex flex-col">

                <Banner></Banner>
                {/*<div className="p-10 flex gap-6">*/}
                {/*    <CategoryCard*/}
                {/*        id={1}*/}
                {/*        title="میوه تازه"*/}
                {/*        description="خرید انواع میوه با کیفیت بالا"*/}
                {/*        image="https://elementiranco.com/wp-content/uploads/2026/03/toot-farangi-1.webp"*/}
                {/*        color="#f59e0b"*/}
                {/*    />*/}
                {/*</div>*/}

                {/*<Button label="مشاهده" variant="outline"/>*/}

                {/*<Button label="در حال بارگذاری" loading/>*/}

            </main>
        </div>
    );
}