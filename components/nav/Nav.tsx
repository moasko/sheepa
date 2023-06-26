"use client";


import React from 'react'
import UserMenu from './UserMenu'
import { SearchInput } from 'evergreen-ui'
import Image from 'next/image';

function Header() {
    return (
        <div className='h-[56px] bg-white w-full shadow-sm relative'>
            <div className='w-full h-full flex flex-row items-center relative'>
                {/* logo */ }
                <div className='w-[70px] h-full text-xl font-bold flex justify-center bg-blue-300 items-center'>
                    <Image src='/simple_logo.png' alt='logo' width={30} height={30}/>
                </div>
                {/* nav bar */ }
                <div className='w-[1px] h-[20px] bg-slate-200 '></div>
                <nav className='pr-[1rem] pl-[1rem] w-full flex justify-between items-center '>
                    <div>
                        <SearchInput outline="none" placeholder={ "chercher n'importe quoi" } />
                    </div>

                    <div className='flex items-center justify-center gap-7'>
                        <UserMenu />
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Header