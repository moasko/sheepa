import Footer from "@/components/siteComponents/siteLayout/Footer"
import Header from "@/components/siteComponents/siteLayout/Header"
import AdminToolBar from "@/components/AdminToolBar";
import { CartProvider } from "@/contexts/CartContext";
import { BASE_URL } from "@/lib/helpers/constants";
const { SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : BASE_URL;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    //   default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};


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

