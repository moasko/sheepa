import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';


export interface CategiresHomePageListProps {
  prop?: string;
}

const CategiresHomePageList = ({ prop = 'default value' }: CategiresHomePageListProps) => {
  return (
    <div className='row w-full'>
      <div className='bg-white w-full shadow overflow-hidden rounded-[4px]'>
        <div className={`inline-grid grid-cols-6 gap-1 p-2 w-full border`}>
          <div className='bg-white hover:shadow-lg hover:scale-105 rounded-lg transition-transform'>
            <Image alt='aa' src={"/cat2.png"} height={300} width={300} />
            <p className='m-[8px] text-center'>Vente Flash</p>
          </div>
          <div className='bg-white hover:shadow-lg hover:scale-105 rounded-lg transition-transform'>
            <Image alt='aa' src={"/cat4.png"} height={300} width={300} />
            <p className='m-[8px] text-center'>Mode Femme</p>
          </div>
          <div className='bg-white hover:shadow-lg hover:scale-105 rounded-lg transition-transform'>
            <Image alt='aa' src={"/cat3.png"} height={300} width={300} />
            <p className='m-[8px] text-center'>Mode Femme</p>
          </div>
          <div className='bg-white hover:shadow-lg hover:scale-105 rounded-lg transition-transform'>
            <Image alt='aa' src={"/cat.png"} height={300} width={300} />
            <p className='m-[8px] text-center'>Mode Homme</p>
          </div>
          <div className='bg-white hover:shadow-lg hover:scale-105 rounded-lg transition-transform'>
            <Image alt='aa' src={"/cat.png"} height={300} width={300} />
            <p className='m-[8px] text-center'>Mode Homme</p>
          </div>
          <div className='bg-white hover:shadow-lg hover:scale-105 rounded-lg transition-transform'>
            <Image alt='aa' src={"/cat.png"} height={300} width={300} />
            <p className='m-[8px] text-center'>Mode Homme</p>
          </div>
          <div className='bg-white hover:shadow-lg hover:scale-105 rounded-lg transition-transform'>
            <Image alt='aa' src={"/cat.png"} height={300} width={300} />
            <p className='m-[8px] text-center'>Mode Homme</p>
          </div>
          <div className='bg-white hover:shadow-lg hover:scale-105 rounded-lg transition-transform'>
            <Image alt='aa' src={"/cat.png"} height={300} width={300} />
            <p className='m-[8px] text-center'>Mode Homme</p>
          </div>
          <div className='bg-white hover:shadow-lg hover:scale-105 rounded-lg transition-transform'>
            <Image alt='aa' src={"/cat.png"} height={300} width={300} />
            <p className='m-[8px] text-center'>Mode Homme</p>
          </div>
          <div className='bg-white hover:shadow-lg hover:scale-105 rounded-lg transition-transform'>
            <Image alt='aa' src={"/cat.png"} height={300} width={300} />
            <p className='m-[8px] text-center'>Mode Homme</p>
          </div>
          <div className='bg-white hover:shadow-lg hover:scale-105 rounded-lg transition-transform'>
            <Image alt='aa' src={"/cat.png"} height={300} width={300} />
            <p className='m-[8px] text-center'>Mode Homme</p>
          </div>
          <div className='bg-white hover:shadow-lg hover:scale-105 rounded-lg transition-transform'>
            <Image alt='aa' src={"/cat.png"} height={300} width={300} />
            <p className='m-[8px] text-center'>Mode Homme</p>
          </div>
        </div>
      </div>
    </div>


  );
}


export default CategiresHomePageList