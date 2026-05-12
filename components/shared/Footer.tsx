import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-[#DDEEE2] pt-20 pb-10 relative overflow-hidden mt-10" dir="rtl">
            {/* Background cauliflower */}
            <div
                className="absolute inset-0 opacity-30 mix-blend-color-burn pointer-events-none bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: "url('/images/footer-cauliflower.png')" }}
            />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">

                    {/* ستون برند */}
                    <div className="lg:col-span-5 space-y-6">
                        <img src="/logo.svg" alt="کلم" className="h-10 w-auto" />
                        <p className="text-[#505050] text-sm leading-loose max-w-md">
                            در کلم سعی داریم با فراهم کردن دسترسی آسان به تازه‌ترین محصولات و ایجاد یک فرآیند خرید شفاف و راحت، نیازهای روزمره شما را در تهیه میوه و سبزیجات برآورده کنیم. از انتخاب باکیفیت‌ترین اقلام تا بسته‌بندی و تحویل، تمام مراحل با دقت و توجه انجام می‌شود تا تجربه‌ای قابل اعتماد برای شما شکل بگیرد.
                        </p>
                        <div className="text-[#505050] text-sm font-medium bg-white/50 px-4 py-2 rounded-lg w-fit">
                            تلفن پشتیبانی: <span className="font-bold text-[#212121]" dir="ltr">۰۲۱ - ۲۴۴۴</span>
                        </div>
                        <div className="flex gap-4">
                            {[
                                { label: "اینستاگرام", icon: (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                            <rect x="2" y="2" width="20" height="20" rx="5"/>
                                            <circle cx="12" cy="12" r="4"/>
                                            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                                        </svg>
                                    )},
                                { label: "تلگرام", icon: (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.269c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.28 14.087l-2.95-.924c-.642-.204-.654-.642.136-.954l11.52-4.44c.537-.194 1.006.131.576 1.48z"/>
                                        </svg>
                                    )},
                                { label: "لینکدین", icon: (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                                            <circle cx="4" cy="4" r="2"/>
                                        </svg>
                                    )},
                            ].map((s) => (
                                <a key={s.label} href="#" aria-label={s.label}
                                   className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#505050] hover:text-[#51A46B] hover:shadow-md transition">
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ستون محصولات */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold text-[#212121] text-lg mb-6">محصولات</h4>
                        <ul className="space-y-4 text-[#505050] text-sm font-medium">
                            {[["فروشگاه","/products"],["میوه","/products?category=fruits"],["صیفی‌جات","/products?category=vegetables"],["سبزیجات","/products?category=greens"]].map(([label, href]) => (
                                <li key={label}>
                                    <Link href={href} className="hover:text-[#51A46B] transition">{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ستون درباره */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold text-[#212121] text-lg mb-6">درباره‌ی کلم</h4>
                        <ul className="space-y-4 text-[#505050] text-sm font-medium">
                            {[["تماس با ما","/contact"],["درباره‌ی ما","/about"]].map(([label, href]) => (
                                <li key={label}>
                                    <Link href={href} className="hover:text-[#51A46B] transition">{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-300/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#505050]">
                    <p>طراحی و توسعه توسط تیم کلم</p>
                    <p>© ۱۴۰۴ کلم. تمامی حقوق محفوظ است.</p>
                </div>
            </div>
        </footer>
    )
}