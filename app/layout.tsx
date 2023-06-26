import './globals.css'
import { Poppins } from 'next/font/google'
import Providers from '../components/providers'



const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: "400"
})

export const metadata = {
  title: 'Sheepa',
  description: 'online commerce cms',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
