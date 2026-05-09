import "./globals.css"
import localFont from "next/font/local"
import { Toaster } from "sonner"
import AuthProvider from "@/components/shared/AuthProvider"

const iranSans = localFont({
    src: [
        {
            path: "../public/fonts/IRANSans/woff2/IRANSansWeb(FaNum).woff2",
            weight: "400",
        },
        {
            path: "../public/fonts/IRANSans/woff2/IRANSansWeb(FaNum)_Bold.woff2",
            weight: "700",
        },
    ],
    variable: "--font-iran",
})

export const metadata = {
    title: "کلم | پلتفرم B2B میوه و تره‌بار",
    description: "اولین پلتفرم عمده‌فروشی میوه و تره‌بار ایران",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fa" dir="rtl" className={iranSans.variable}>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </head>
        <body className="font-sans bg-white text-neutral-12">
        <AuthProvider>
            {children}
        </AuthProvider>
        <Toaster position="top-center" richColors />
        </body>
        </html>
    )
}