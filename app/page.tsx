"use client";
import CategoryCard from "@/components/shared/CategoryCard/CategoryCard";
import Banner from "@/components/shared/banner/Banner";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { productService, Product } from "@/services/product/productService";
import {Category, categoryService} from "@/services/category/categoryService";
import Button from "@/components/ui/Button"

export default async function ProductsPage() {
    // فراخوانی سرویس به صورت مستقیم در سرور (Next.js Server Components)
    const products: Product[] = await productService.getAllProducts();
    const categories: Category[] = await categoryService.getAllCategories();

    return (
        <div className="flex flex-col font-sans dark:bg-black">
            <main className="flex flex-col">
                <Banner></Banner>

                <div className="flex flex-col gap-4 text-right">
                    <h2 className="font-semibold text-[24px] text-center">همه‌چیز برای آشپزی، مهمانی و زندگی
                        روزمره‌</h2>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                        {categories.map((item) => (
                            <CategoryCard
                                key={item.id}
                                id={item.id}
                                description={item.description}
                                image={item.image}
                                title={item.title}
                                bgColor={item.bgColor}
                                borderColor={item.borderColor}
                            />
                        ))}

                    </div>
                </div>


                {products.map((item) => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        productName={item.productName}
                        unit={item.unit}
                        price={item.price}
                        addToCartHandler={() => console.log("افزوده شد:", item.id)}
                    />
                ))}

                {/*<Button label="مشاهده" variant="outline"/>*/}

                {/*<Button label="در حال بارگذاری" loading/>*/}

            </main>
        </div>
    );
}
