import "./globals.css";
import localFont from "next/font/local"
import {Toaster} from "sonner"
import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"

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

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa" className={iranSans.variable}>
        <body className="font-sans">
        <Header/>
        {children}
        <Footer/>
        <Toaster position="top-center"/>
        </body>
        </html>
    );
}

