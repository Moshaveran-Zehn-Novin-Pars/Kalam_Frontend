type Props = {
    title: string
    description: string
    icon: React.ReactNode
}
export default function FeatureBox({ title, description, icon }: Props) {
    return (
        <div className="flex flex-col items-center text-center gap-3 p-4">

            {/* آیکون */}
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--accent)] text-white text-xl">
                {icon}
            </div>

            {/* عنوان */}
            <h3 className="font-semibold text-lg">
                {title}
            </h3>

            {/* توضیحات */}
            <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                {description}
            </p>
        </div>
    )
}