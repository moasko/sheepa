import Footer from "@/components/siteComponents/siteLayout/Footer"
import Header from "@/components/siteComponents/siteLayout/Header"
import AdminToolBar from "@/components/AdminToolBar";
import { CartProvider } from "@/contexts/CartContext";

export const metadata = {
    title: 'Zangochap',
    description: 'Mieux s\'habiller à bas prix'
}

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <CartProvider>
            <>
                <AdminToolBar />
                <Header />
                {children}
                <Footer />
            </>
        </CartProvider>

    )
}

