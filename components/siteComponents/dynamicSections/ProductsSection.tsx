"use client";

import { getSectionsProducts } from '@/services/products.sercices';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../cardes/products/ProductCard';
import { ProductProps } from "@/lib/interfaces/modelsInterfaces"
import ProductsLoading from './loaders/ProductsLoading';

interface ProductsSectionProps {
    showHeader?: boolean
    title?: JSX.Element[] | JSX.Element | string,
    link?: string
    linkTitle?: string
    category?: string
    limit?: number
    size?: number
}

const ProductsSection: FC<ProductsSectionProps> = ({
    showHeader = false,
    title,
    link,
    category = "",
    limit = 6,
    size = 6
}) => {
    const { data, isLoading, refetch } = useQuery(['products', { category, limit }], () => getSectionsProducts({ category, limit }), {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    useEffect(() => {
        // Appeler à nouveau la requête lorsque la catégorie change
        refetch();
    }, [category]);

    return (
        <section className='row w-full'>
            <div className='bg-white w-full shadow-[0_2px_5px_0_#0000000d] overflow-hidden'>
                {/* group crard header Dive */}
                {showHeader && (
                    <div className="w-full flex justify-between items-center px-4 py-2">
                        <h2 className='text-black font-semibold text-[1.25rem]'>{title}</h2>
                        <div className='flex space-x-1 items-center'>
                            <Link className='uppercase text-[orangered]' href={"/"}>{"Voir plus"}</Link>
                            <BiChevronRight color='orangered' size={20} />
                        </div>
                    </div>
                )}

                {/* group crard header body */}
                <div className="inline-grid grid-cols-2 lg:grid-cols-6 gap-1 p-2 w-full">
                    {isLoading ? (
                        <ProductsLoading />
                    ) : (
                        data?.products.map((item: ProductProps, index: number) => (
                            <ProductCard key={index} product_data={item} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;
