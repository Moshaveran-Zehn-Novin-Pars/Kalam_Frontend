type Props = {
    title: string
    description: string
    icon: React.ReactNode
}
export default function FeatureBox({ title, description, icon }: Props) {
    return (
        <div className="flex flex-col items-center text-center gap-3 p-4">

            <div className="md:w-[70px] w-[40px] md:h-[70px] h-[40px]
            flex items-center justify-center rounded-full bg-[#E5F2E9] text-[#417F56]">
                {icon}
            </div>

            <h3 className="font-semibold md:text-[20px] text-[12px]">
                {title}
            </h3>

            <p className="text-[14px] text-[#505050] max-w-[300px] hidden md:block">
                {description}
            </p>
        </div>
    )
}