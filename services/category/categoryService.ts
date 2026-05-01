
export interface Category {
    id: number;
    title: string;
    description: string;
    image: string;
    bgColor?: string;
    borderColor?: string;
}

const sampleCategories: Category[] = [
    {
        id: 1,
        title: "میوه",
        description: "میوه‌هایی که هر روزتان را و رنگارنگ می‌کنند.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCKYey1jZCIVi3Y_BVPBt6ddOE44oECyb35g&s",
        bgColor: "#FDE5B7",
        borderColor: "#F5B129",
    },
    {
        id: 2,
        title: "سبزیجات",
        description: "سبزیجات سبز، سفره‌ی شما را پرطراوت می‌کند.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn4eZKtFtNq6ixwslUcizt995kdw-rNONwLA&s",
        bgColor: "#D6E0D6",
        borderColor: "#8BA78B",
    },
    {
        id: 3,
        title: "صیفی جات",
        description: "صیفی‌جات تازه، راز آشپزی سالم و خوشمزه شما هستند.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-AjgmBYW3FVZeItYsRg4RjvrJYv78PgtjQQ&s",
        bgColor: "#EFDCE1",
        borderColor: "#BF7387",
    },
];

export const categoryService = {
    async getAllCategories(): Promise<Category[]> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(sampleCategories), 300); // شبیه‌سازی تاخیر درخواست
        });
    }
};
