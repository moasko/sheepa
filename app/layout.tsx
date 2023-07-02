import AuthProviders from '@/providers/AuthProvider'
import './globals.css'
import { Poppins, Roboto } from 'next/font/google'
import QueryProvider from '@/providers/QueryProvider'



const poppins = Roboto({
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
        <QueryProvider>
          <AuthProviders>
            {children}
          </AuthProviders>
        </QueryProvider>
      </body>
    </html>
  )
}
