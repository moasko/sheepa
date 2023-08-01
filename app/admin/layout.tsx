"use client";

import SideBar from '@/components/sideBar/SideBar'
import Nav from '@/components/nav/Nav'
import { NextUIProvider } from '@nextui-org/react';
// import { Metadata } from 'next'

// export const metadata:Metadata = {
//   title: 'Sheepa',
//   description: 'online commerce cms',
// }

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NextUIProvider>
      {/* header */}
      <Nav />
      {/* app body */}
      <div className='w-full max-h-full max-w-full h-full flex flex-1' style={{ height: "calc(946px - 3.5rem)" }}>
        {/* Side Bar */}
        <SideBar />
        <main className='flex-1 overflow-x-hidden overflow-y-auto ml-[68px] min-w-0 bg-[#f5f7f8]'>
          <div className='container-lg h-full max-w-7xl mr-auto ml-auto'>
            <div className="w-full h-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </NextUIProvider>

  )
}

