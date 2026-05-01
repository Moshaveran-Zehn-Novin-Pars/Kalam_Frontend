import Button from "@/components/ui/Button"

type Props = {
    id: number
    title: string
    description: string
    image: string

    bgColor?: string
    borderColor?: string
}

export default function CategoryCard({
                                         title,
                                         description,
                                         image,
                                         bgColor = "#FFFFFF",
                                         borderColor = "#51A46B",
                                     }: Props) {
    return (
        <div
            className="flex flex-row justify-around items-center max-w-[95%]  md:max-w-[33%] md:w-[384px] h-[192px] p-2 rounded-[20px] border-2 overflow-hidden"
            style={{
                backgroundColor: bgColor,
                borderColor: borderColor,
            }}
        >

            <div className="w-[60%] p-4 flex flex-col justify-start gap-2 text-right">
                <div>
                    <h3 className="text-[20px] font-semibold leading-none">
                        {title}
                    </h3>

                    <p className="text-[16px] mt-2 leading-none text-gray-600">
                        {description}
                    </p>
                </div>

                {/* 🟢 BUTTON */}
                <div className="mt-2">
                    <Button
                        label="مشاهده محصولات"
                        variant="greenOutline"
                        href="/products"
                    />
                </div>
            </div>

            <div className="w-[40%] h-2/3 ">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    )
}