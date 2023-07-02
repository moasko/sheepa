"use client";

import { useEffect, useMemo, useState } from 'react';
import { getActiveSession } from '@/lib/helpers/authHelper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';
import { colors } from '@/lib/helpers/constants';


interface User {
  name: string;
  email: string;
}

interface SessionData {
  user: User;
}

interface AdminToolBarProps { }

const AdminToolBar: React.FC<AdminToolBarProps> = () => {
  const [session, setSession] = useState<SessionData | null>(null);

  useEffect(() => {
    getActiveSession().then((res) => {
      setSession(res);
    });
  }, []);
  const sessio = useSession()
  return (
    <>
      {
        sessio.data?.user.role === "ADMIN" ?
          <div className="w-full bg-[#dc5e2e]">
            <div className="w-full p-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Image src="/shipa_logo.png" alt="logo" height={100} width={100} />
                  <h1 className="text-white text-xl font-bold ml-2">Admin</h1>
                </div>
                {/* <div className="flex px-2 py-1 bg-blue-700 rounded space-x-2 items-center">
            <Avatar size={40} name={session?.user?.name} />
            <div className='flex flex-col'>
                 <p className="text-white text-sm font-bold">{session?.user?.name}</p>
            <p className="text-white text-sm">{session?.user.email}</p>
            </div>
          </div> */}
                <Link href="/admin">
                  <button className="bg-black hover:bg-[#e66d3e] text-white font-bold py-2 px-4 rounded">
                    Gestionnaire
                  </button>
                </Link>
              </div>
            </div>
          </div> : null
      }

    </>

  );
};

export default AdminToolBar;
