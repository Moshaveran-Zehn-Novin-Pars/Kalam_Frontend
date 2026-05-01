import Image from "next/image";
import {X} from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex flex-col justify-start items-stretch relative overflow-hidden mt-20 p-10 min-h-[300px]
                           text-right gap-5">
            <Image src="/logo.svg" alt="کلم" width={40} height={25}/>

            <div className="absolute inset-0 -z-8 bg-[#DDEEE2] opacity-85"></div>
            <div className="absolute inset-0 -bottom-3/4 -z-10 bg-[#DDEEE2] opacity-85">
                <Image
                    src="/images/bg-footer.png"
                    alt="bg"
                    fill
                    className="!w-1/2 !h-auto m-auto"
                />
            </div>


            <div className="flex flex-col md:flex-row justify-between gap-4">

                <div className="flex flex-col justify-start items-stretch gap-8 md:w-45% md:max-w-[45%]">
                    <p className="text-[#505050] font-normal text-16px leading-180pc tracking-0px text-justify lowercase">
                        در کَلَم سعی داریم با فراهم کردن دسترسی آسان به تازه‌ترین محصولات و ایجاد یک فرآیند خرید شفاف و
                        راحت، نیازهای روزمره شما را در تهیه میوه و سبزیجات برآورده کنیم. از انتخاب باکیفیت‌ترین اقلام تا
                        بسته‌بندی و تحویل، تمام مراحل با دقت و توجه انجام می‌شود تا تجربه‌ای قابل اعتماد برای شما شکل
                        بگیرد.
                    </p>

                    <div className="flex flex-col md:flex-row justify-between items-start p-4">

                        <div className="w-full md:w-3/4 flex flex-col items-start text-right">
                            <div className="flex items-center mb-4">
                                <span className="text-sm font-medium text-gray-700 ml-2">پشتیبانی:</span>
                                <span className="text-lg">0212۴44</span>
                            </div>

                            <div className="flex space-x-4">
                                {/* فرض می‌کنیم X یک کامپوننت آیکون است */}
                                <a href="#" className="text-gray-500 hover:text-blue-600 transition duration-300">
                                    <X/>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-green-600 transition duration-300">
                                    <X/>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-pink-600 transition duration-300">
                                    <X/>
                                </a>
                            </div>
                        </div>

                        <div className="w-full md:w-1/4 flex justify-center md:justify-start mb-4 md:mb-0">
                            <Image src="/images/namad.png" width={50} height={100}
                                   alt="نماد الکترونیک" className=""/>

                        </div>

                    </div>

                </div>

                <div className="flex flex-row justify-center items-stretch gap-4 md:w-45% md:max-w-[45%] w-full">

                    <ul className="w-full md:w-40% md:max-w-[40%] space-y-2">
                        <li className="font-bold text-gray-900">محصولات</li>
                        <li><a href="/shop" >فروشگاه</a></li>
                        <li><a href="/fruits" >میوه</a></li>
                        <li><a href="/groceries" >صنفی جات</a></li>
                        <li><a href="/vegetables" >سبزیجات</a></li>
                    </ul>

                    <ul className="w-full md:w-40% md:max-w-[40%] space-y-2">
                        <li className="font-bold text-gray-900">درباره ی کلم</li>
                        <li><a href="/contact" >تماس با ما</a></li>
                        <li><a href="/about" >درباره ی ما</a></li>
                    </ul>

                </div>


            </div>

        </footer>
    )
}