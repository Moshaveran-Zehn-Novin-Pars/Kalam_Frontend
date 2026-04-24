export default function Footer() {
    return (
        <footer className="bg-green-100 mt-20 p-10 text-right">
            <div className="grid grid-cols-3 gap-10">

                {/* درباره */}
                <div>
                    <h3 className="font-semibold mb-3">کلم</h3>
                    <p className="text-sm text-gray-600">
                        در کلم سعی داریم بهترین محصولات را به شما ارائه دهیم...
                    </p>
                </div>

                {/* لینک‌ها */}
                <div>
                    <ul className="space-y-2 text-sm">
                        <li>محصولات</li>
                        <li>فروشگاه</li>
                        <li>میوه</li>
                        <li>سبزیجات</li>
                    </ul>
                </div>

                {/* تماس */}
                <div>
                    <p>تلفن پشتیبانی: 021123456</p>
                </div>
            </div>
        </footer>
    )
}