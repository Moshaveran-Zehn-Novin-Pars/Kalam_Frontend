interface StepperProps {
    steps: string[]
    current: number
}

export default function Stepper({ steps, current }: StepperProps) {
    return (
        <div className="w-full flex items-center justify-between mb-10" dir="rtl">
            {steps.map((s, i) => (
                <div key={s} className="flex items-center flex-1">
                    <div className="flex flex-col items-center gap-2 flex-1">
                        <span className={`text-[14px] font-medium whitespace-nowrap ${
                            i === current ? "text-[#51A46B] font-bold" :
                                i < current ? "text-[#51A46B]" : "text-[#505050]"
                        }`}>
                            {s}
                        </span>
                        <div className={`h-[3px] w-full rounded-full transition-colors ${
                            i <= current ? "bg-[#51A46B]" : "bg-[#E9E8E3]"
                        }`} />
                    </div>
                    {i < steps.length - 1 && <div className="w-2" />}
                </div>
            ))}
        </div>
    )
}