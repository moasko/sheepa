import AdminToolBar from "@/components/AdminToolBar";
import Footer from "@/components/siteComponents/siteLayout/Footer"
import Header from "@/components/siteComponents/siteLayout/Header"
import Navigation from "@/components/siteComponents/siteLayout/navigation";


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
            {/*la section de la bare de navigation*/}
        
            {/*la section de la bare de navigation*/}
            {children}
            <Footer />
        </>

    )
}

