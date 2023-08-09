"use client";

import React from 'react';
import Image from 'next/image';
import { Carousel } from '@trendyol-js/react-carousel';
import { Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/services/categories.services';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { CategoryProps } from '@/lib/interfaces/modelsInterfaces';
import Link from 'next/link';

export interface CategiresHomePageListProps {
  prop?: string;
}

const CategiresHomePageList = ({ prop = 'default value' }: CategiresHomePageListProps) => {

  const { data, isLoading, error } = useQuery(["clientCategorys"], getAllCategories)

  return (
    <div className='row w-full'>

      <div className='bg-white w-full shadow-sm rounded-[4px]'>
        {
          isLoading ? null
            :
            <Carousel
              show={8}
              slide={2}
              transition={0.5}
              rightArrow={<div className='flex justify-center items-center'><div className=' bg-slate-800/40 rounded-full w-[40px] h-[40px] flex justify-center items-center'><MdKeyboardArrowRight color='white' /></div></div>}
              leftArrow={<div className='flex justify-center items-center'><div className=' bg-slate-800/40 rounded-full w-[40px] h-[40px] flex justify-center items-center'><MdKeyboardArrowLeft color='white' /></div></div>}
              className='mt-2 mb-2 pt-3 pb-3'
            >
              {
                data?.map((category: CategoryProps) => {
                  return (
                    <Link href={`/shop/${category.slug}`}>
                     <div className='bg-white hover:shadow-lg flex flex-col justify-center items-center hover:scale-105 rounded-lg transition-transform'>
                      <Image alt='aa' src={"/WomenDresses23.png"} height={125} width={125} />
                      <p className='m-[8px] text-center'>{category.name}</p>
                    </div>
                    </Link>
                  )
                })
              }
            </Carousel>
        }
      </div>

    </div>


  );
}


export default CategiresHomePageList