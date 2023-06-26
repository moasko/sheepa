"use client";

import LoginButton from '@/components/GoogleSignInButton';
import { useSession } from 'next-auth/react';
import React from 'react';

const HomePage = () => {
    return (
        <div className='w-full h-[100vh] bg-slate-300'>
            home page
            <LoginButton/>
        </div>
    );
}

export default HomePage;
