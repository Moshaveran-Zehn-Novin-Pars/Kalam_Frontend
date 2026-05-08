import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"
import MiniCart from "@/features/cart/components/MiniCart"

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
            <MiniCart />
        </>
    )
}
