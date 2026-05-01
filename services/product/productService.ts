export interface Product {
    id: string;
    imageUrl: string;
    productName: string;
    unit: string;
    price: number;
}

// دیتا نمونه
const sampleProducts: Product[] = [
    {
        id: "1",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6e5QA02QniPtNkLNohnGjtfVduFMMWqv4dzRp0XT-Z_mijRrUGruLRAiYWyw1HEG2_8e-s8qQlM9g0mRAAZQNWGcJznFNKSoJg1uV&s=10",
        productName: "توت فرنگی",
        unit: "کیلو",
        price: 120000,
    },
    {
        id: "2",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpvsLi4TWju6HLe8u2kfmk7kfRyLR1kVFR5g&s",
        productName: "آناناس",
        unit: "کیلو",
        price: 98000,
    },
    {
        id: "3",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpBuv9BvfChhah0axEIstyz6Y_-Dtp7hB5PKBLrbZpmX8D58DD2ItZ2e-8uJSbHIUuc_sbJ1HjegvSuyk7xvv-3acqrjMSFSoeE3yJTA&s=10",
        productName: "آووکادو",
        unit: "کیلو",
        price: 55000,
    },
];

// توابع برای دریافت نمونه دیتا

export const productService = {
    // گرفتن لیست نمونه محصولات
    async getAllProducts(): Promise<Product[]> {
        // در حالت واقعی درخواست fetch می‌دادیم
        return new Promise((resolve) => {
            setTimeout(() => resolve(sampleProducts), 300); // شبیه‌سازی درخواست واقعی با فاصله زمانی
        });
    },

    // گرفتن جزئیات محصول خاص (در اینجا از نمونه دیتا)
    async getProductById(id: string): Promise<Product | undefined> {
        return new Promise((resolve) => {
            const product = sampleProducts.find(p => p.id === id);
            setTimeout(() => resolve(product), 200);
        });
    }
};
