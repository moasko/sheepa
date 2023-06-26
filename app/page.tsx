"use client";

import LoginButton from '@/components/GoogleSignInButton';
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation"
import { useSession } from 'next-auth/react';
import AdminToolBar from '@/components/AdminToolBar';

const HomePage = () => {
    const session = useSession()
    const router = useRouter()



    return (
        <div className='w-full h-[100vh] bg-slate-300'>
            {
                session.data?.user.role === "ADMIN" ? <AdminToolBar /> : null
            }

        </div>
    );
}

export default HomePage;
