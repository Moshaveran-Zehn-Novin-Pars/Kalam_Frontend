import "./globals.css";
import localFont from "next/font/local"
import { Toaster } from "sonner"
import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"
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
    title: 'کلم | پلتفرم B2B میوه و تره‌بار',
    description: 'اولین پلتفرم عمده‌فروشی میوه و تره‌بار ایران',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa" dir="rtl" className={iranSans.variable}>
        <body className="font-sans bg-white text-neutral-12">
        <AuthProvider>
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </AuthProvider>
        <Toaster position="top-center" richColors />
        </body>
        </html>
    );
}
