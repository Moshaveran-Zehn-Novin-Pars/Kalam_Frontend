import Link from "next/link"

type Props = {
    id: string | number
    title: string
    description: string
    image: string
    bgColor?: string
    borderColor?: string
}

export default function CategoryCard({ title, description, image, bgColor = "#FFFFFF", borderColor = "#51A46B" }: Props) {
    return (
        <div
            className="flex flex-row justify-around items-center max-w-[95%] md:max-w-[33%] md:w-[384px] h-[192px] p-2 rounded-[20px] border-2 overflow-hidden"
            style={{ backgroundColor: bgColor, borderColor }}
        >
            <div className="w-[60%] p-4 flex flex-col justify-start gap-2 text-right">
                <h3 className="text-[20px] font-semibold leading-none">{title}</h3>
                <p className="text-[16px] mt-2 leading-none text-gray-600">{description}</p>
                <div className="mt-2">
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center border border-[#51A46B] text-[#51A46B] rounded-[10px] px-4 py-2 text-[14px] font-medium hover:bg-[#51A46B] hover:text-white transition-colors"
                    >
                        مشاهده محصولات
                    </Link>
                </div>
            </div>

            <div className="w-[40%] h-2/3">
                {image
                    ? <img src={image} alt={title} className="h-full w-full object-cover" />
                    : <div className="h-full w-full bg-white/40 rounded-lg" />}
            </div>
        </div>
    )
}