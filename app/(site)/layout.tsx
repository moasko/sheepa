import AdminToolBar from "@/components/AdminToolBar";
import Footer from "@/components/siteComponents/siteLayout/Footer"
import Header from "@/components/siteComponents/siteLayout/Header"


export const metadata = {
    title: 'Sheepa',
    description: 'online commerce cms',
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

