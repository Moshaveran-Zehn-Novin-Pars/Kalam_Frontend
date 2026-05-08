import Link from "next/link"

export default function Footer() {
    return (
        <footer className="relative overflow-hidden" style={{ background: "#E8F5EC" }}>
            {/* تصویر کلم سفید - background */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: "url('/images/footer-cauliflower.png')" }}
            />

            <div className="relative z-10 w-[90%] md:w-4/5 mx-auto py-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* راست: برند */}
                    <div className="flex flex-col items-end gap-5 text-right">
                        <span className="text-[40px] font-bold text-[#51A46B]">کلم</span>
                        <p className="text-[14px] text-[#505050] leading-[1.9] max-w-[280px]">
                            در کَلَم سعی داریم با فراهم کردن دسترسی آسان به تازه‌ترین محصولات و ایجاد یک فرآیند خرید شفاف و راحت، نیازهای روزمره شما را در تهیه میوه و سبزیجات برآورده کنیم. از انتخاب باکیفیت‌ترین اقلام تا بسته‌بندی و تحویل، تمام مراحل با دقت و توجه انجام می‌شود تا تجربه‌ای قابل اعتماد برای شما شکل بگیرد.
                        </p>
                        <div className="text-right">
                            <p className="text-[13px] text-[#505050]">تلفن پشتیبانی:</p>
                            <p className="text-[16px] font-bold text-[#212121] mt-1" dir="ltr">۰۲۱-۲۴۴۴</p>
                        </div>

                        {/* social icons - دقیق مثل Figma */}
                        <div className="flex gap-3">
                            {/* Instagram */}
                            <a href="#" aria-label="اینستاگرام"
                               className="w-9 h-9 rounded-full border border-[#C8DDD0] bg-white/60 flex items-center justify-center
                           text-[#505050] hover:text-[#51A46B] hover:border-[#51A46B] transition-colors">
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                                    <circle cx="12" cy="12" r="4"/>
                                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                                </svg>
                            </a>
                            {/* Telegram */}
                            <a href="#" aria-label="تلگرام"
                               className="w-9 h-9 rounded-full border border-[#C8DDD0] bg-white/60 flex items-center justify-center
                           text-[#505050] hover:text-[#51A46B] hover:border-[#51A46B] transition-colors">
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.269c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.28 14.087l-2.95-.924c-.642-.204-.654-.642.136-.954l11.52-4.44c.537-.194 1.006.131.576 1.48z"/>
                                </svg>
                            </a>
                            {/* LinkedIn */}
                            <a href="#" aria-label="لینکدین"
                               className="w-9 h-9 rounded-full border border-[#C8DDD0] bg-white/60 flex items-center justify-center
                           text-[#505050] hover:text-[#51A46B] hover:border-[#51A46B] transition-colors">
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                                    <circle cx="4" cy="4" r="2"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* وسط: درباره‌ی کلم */}
                    <div className="flex flex-col items-end gap-3 text-right">
                        <h4 className="text-[16px] font-bold text-[#212121] border-b border-[#C8DDD0] pb-3 w-full">
                            درباره‌ی کلم
                        </h4>
                        <Link href="/contact" className="text-[15px] text-[#505050] hover:text-[#51A46B] transition-colors">تماس با ما</Link>
                        <Link href="/about" className="text-[15px] text-[#505050] hover:text-[#51A46B] transition-colors">درباره‌ی ما</Link>
                    </div>

                    {/* چپ: محصولات */}
                    <div className="flex flex-col items-end gap-3 text-right">
                        <h4 className="text-[16px] font-bold text-[#212121] border-b border-[#C8DDD0] pb-3 w-full">
                            محصولات
                        </h4>
                        <Link href="/products" className="text-[15px] text-[#505050] hover:text-[#51A46B] transition-colors">فروشگاه</Link>
                        <Link href="/products?category=fruits" className="text-[15px] text-[#505050] hover:text-[#51A46B] transition-colors">میوه</Link>
                        <Link href="/products?category=greens" className="text-[15px] text-[#505050] hover:text-[#51A46B] transition-colors">صنفی‌جات</Link>
                        <Link href="/products?category=vegetables" className="text-[15px] text-[#505050] hover:text-[#51A46B] transition-colors">سبزیجات</Link>
                    </div>

                </div>
            </div>

            {/* bottom bar */}
            <div className="relative z-10 border-t border-[#C8DDD0]">
                <div className="w-[90%] md:w-4/5 mx-auto py-5 flex items-center justify-between text-[13px] text-[#505050]">
                    <span>طراحی و توسعه توسط تیم کلم</span>
                    <span>© ۱۴۰۴ کلم</span>
                </div>
            </div>
        </footer>
    )
}