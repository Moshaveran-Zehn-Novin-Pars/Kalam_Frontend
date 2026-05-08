// Auth pages don't need Header/Footer
// They have their own layout
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
