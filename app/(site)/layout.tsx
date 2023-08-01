import AdminToolBar from "@/components/AdminToolBar";
import Footer from "@/components/siteComponents/siteLayout/Footer"
import Header from "@/components/siteComponents/siteLayout/Header"


export const metadata = {
    title: 'Zangochap',
    description: 'Mieux s\'habiller à bas prix',
}

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <AdminToolBar />
            <Header />
            {children}
            <Footer />
        </>

    )
}

