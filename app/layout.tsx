"use client";

import AuthProviders from '@/providers/AuthProvider'
import './globals.css'
import { Roboto } from 'next/font/google'
import { QueryClientProvider,  QueryClient, } from '@tanstack/react-query';


const poppins = Roboto({
  subsets: ["latin-ext"],
  weight: "400"
})


const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="relative">
        <QueryClientProvider client={queryClient} >
          <AuthProviders>
            {children}
          </AuthProviders>
        </QueryClientProvider>
      </body>
    </html>
  )
}


