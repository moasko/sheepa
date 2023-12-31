"use client";


import { Popover } from 'evergreen-ui'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { SlBasket } from 'react-icons/sl'
import SearchInput from '../SearchInput'
import { signIn, signOut, useSession } from 'next-auth/react'
import { AiOutlineUser } from "react-icons/ai"
import { BiBox } from "react-icons/bi"
import { LiaUserCheckSolid } from "react-icons/lia"
import { isAuthentificated } from '@/lib/helpers/authHelper';
import { store } from '@/store';
import useStore from '@/lib/useStore';

function Header() {
  const session = useSession()

const cart = useStore(store,(state)=>state.cart)

  return (
    <header className='sticky top-0 max-h-[72px] z-10 bg-white p-[12px]  w-full shadow-[0_4px_4px_-4px_#0000001f]' >
      <section className="wrapper">
        <div className="rowser">
          <div className="mr-10">
            <Link href="/">
              <Image src="/logo.webp" width={134} height={30} alt="asfat" />
            </Link>
          </div>
     
          <div className="col">
            <div className="trils ml15 _df _ai-c _jc-c _fw-w w100">

              {/* user megamenu */}
              <Popover

                content={
                  <div className='p-3 space-y-3'>

                    {
                      isAuthentificated() ? null :
                        <div className='p-1'>
                          <div className='p-1'>
                            <button onClick={()=>signIn()} className='text-white text-md rounded bg-orange-600 w-full py-2 font-bold'>
                              Se connecter
                            </button>
                          </div>
                        </div>
                    }

                    <div>
                      <div className='hover:bg-slate-200 px-4 rounded'>
                        <Link className="py-4 flex space-x-2 items-center" href="/user_profile">
                          <AiOutlineUser size={22} />
                          <span className='text-[14px] text-slate-700 font-bold'>
                            Mon Comte
                          </span>

                        </Link>
                      </div>
                      <div className='hover:bg-slate-200 px-4 rounded'>
                        <Link className="py-4 flex space-x-2 items-center" href="/">
                          <BiBox size={20} />
                          <span className='text-[14px] text-slate-700 font-bold'>
                            Mes commandes
                          </span>
                        </Link>
                      </div>
                      {
                      isAuthentificated() ? 
                        <div className='p-1'>
                          <div className='p-1'>
                            <button onClick={()=>signOut()} className='text-white hover:bg-red-500 text-md rounded bg-orange-600 w-full py-4 font-bold'>
                              Se deconnecter
                            </button>
                          </div>
                        </div>:null
                    }
                    </div>
                  </div>
                }
              >

                {
                  isAuthentificated() ?
                    <div className="flex justify-center items-center px-4 rounded mr-10 hover:text-orange-500 bg-slate-200 py-2">
                      <div className="flex space-x-2 hover:text-orange-500">
                        <LiaUserCheckSolid size={25} />
                        <span className='text-[16px] hidden lg:block text-slate-700 font-semibold hover:text-orange-500'>Salut, {session.data?.user.name}</span>
                      </div>
                    </div> :
                    <div className="flex justify-center items-center px-4 hover:bg-slate-200 py-2">
                      <div className="flex space-x-2">
                        <BiUser size={25} />
                        <span className='text-[16px] text-slate-700'>Se connecter</span>
                      </div>
                    </div>
                }
              </Popover>

              {/* user megamenu */}

              <div className="panier relative"> <Link href="/cart">
                <SlBasket size={20} />
                <div className='absolute border-[3px] bg-orange-500 w-5 h-5 flex justify-center items-center rounded-full text-white font-semibold bottom-1 left-4'><span>{cart?.length}</span></div>
              </Link>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </header>
  )
}

export default Header
