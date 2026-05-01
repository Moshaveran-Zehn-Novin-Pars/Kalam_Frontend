"use client";
import Button from "@/components/ui/Button";
import {ShoppingCart} from "lucide-react";

type ProductCardProps = {
    id: string;
    imageUrl: string;
    productName: string;
    unit: string;
    price: number;
    addToCartHandler: () => void;
};

export default function ProductCard({
                                        id,
                                        imageUrl,
                                        productName,
                                        unit,
                                        price,
                                        addToCartHandler,
                                    }: ProductCardProps) {
    return (
        <div className="bg-white flex flex-col items-start justify-start
                       w-[283px] h-[387px] box-border border border-[#E9E8E3]
                       rounded-[20px]   p-[24px_24px_12px_24px] gap-[10px] relative"
             style={{opacity: 1, transform: 'rotate(0deg)'}}>
            <div className="w-[210px] h-[196px] flex items-center justify-center overflow-hidden rounded-[10px] mx-auto"
                 style={{opacity: 1, transform: 'rotate(0deg)'}}>
                <img
                    src={imageUrl}
                    alt={productName}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="w-full h-[1px] bg-[#E9E8E3] my-2" style={{opacity: 1}}></div>

            <div className="w-full flex items-center justify-between gap-2">
                <span className="text-base font-medium text-gray-800">{productName}</span>
                <div
                    className="flex items-center justify-center    w-[61px] h-[31px] box-border
                               border border-[#E9E8E3]  rounded-[10px]
                               py-[6px] px-[12px] gap-[10px]" style={{opacity: 1, transform: 'rotate(0deg)'}}>
                    <span className="text-xs font-normal text-gray-600">{unit}</span>
                </div>
            </div>

            <div className="w-full h-[1px] bg-[#E9E8E3] my-2" style={{opacity: 1}}></div>

            <div className="w-full flex items-center justify-between mt-auto">
                <span className="text-xl font-bold text-gray-900">
                    {`${price.toLocaleString('fa-IR')} تومان`}
                </span>

                <Button
                    label="افزودن به سبد"
                    variant="greenOutline"
                    icon={<ShoppingCart size={18}/>}
                    onClick={addToCartHandler}
                    href={'product/'+id}
                />
            </div>
        </div>
    );
}
