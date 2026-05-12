import Image from "next/image"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-white" dir="rtl">

            {/* نیمه راست: فرم ورود (دقیقا ۵۰٪) */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10 bg-white">
                <div className="w-full max-w-[400px]">
                    {children}
                </div>
            </div>

            {/* نیمه چپ: تصویر پس‌زمینه (دقیقا ۵۰٪) */}
            <div className="hidden md:block md:w-1/2 relative h-screen">
                <Image
                    src="/images/auth-bg.jpg"
                    alt="سبزیجات تازه کلم"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

        </div>
    )
}