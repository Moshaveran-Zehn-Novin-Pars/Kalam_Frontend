import Button from "@/components/ui/Button"

type Props = {
    id: number
    title: string
    description: string
    image: string
    color: string
}

export default function CategoryCard({
                                         title,
                                         description,
                                         image,
                                         color,
                                     }: Props) {
    return (
        <div
            className="flex w-[384px] h-[192px] rounded-[20px] border-2 overflow-hidden"
            style={{ borderColor: color }}
        >
            {/* تصویر (40%) */}
            <div className="w-[40%] h-full bg-gray-100 flex items-center justify-center">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* محتوا (60%) */}
            <div className="w-[60%] p-4 flex flex-col justify-between text-right">

                {/* متن */}
                <div>
                    <h3 className="text-[20px] font-semibold leading-none">
                        {title}
                    </h3>

                    <p className="text-[16px] mt-2 leading-none text-gray-600">
                        {description}
                    </p>
                </div>

                {/* دکمه */}
                <div className="mt-2">
                    <Button
                        label="صفحه محصولات"
                        variant="outline"
                    />
                </div>
            </div>
        </div>
    )
}