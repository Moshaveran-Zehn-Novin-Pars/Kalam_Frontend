export default function FeatureBox({
                                       icon,
                                       title,
                                       description,
                                   }: {
    icon: React.ReactNode
    title: string
    description: string
}) {
    return (
        <div className="flex flex-col items-center text-center gap-3 px-4 md:px-8 py-4">
            <div className="w-[72px] h-[72px] rounded-full bg-[#E5F2E9] flex items-center justify-center shrink-0">
                {icon}
            </div>
            <h3 className="text-[18px] md:text-[20px] font-bold text-[#212121]">{title}</h3>
            <p className="text-[13px] md:text-[14px] text-[#505050] leading-[1.8] max-w-[240px]">{description}</p>
        </div>
    )
}