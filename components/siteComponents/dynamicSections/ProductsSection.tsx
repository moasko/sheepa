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
    headerBgColor?: string,
    category?: string
}

const ProductsSection: FC<ProductsSectionProps> = ({
    showHeader = false,
    title,
    link,
    linkTitle = "VOIR PLUS",
    headerBgColor = "#00ff00",
    category = ""
}) => {
    const { data, isLoading, refetch } = useQuery(['products', { category }], () => getSectionsProducts({ category }), {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    useEffect(() => {
        // Appeler à nouveau la requête lorsque la catégorie change
        refetch();
    }, [category]);

    return (
        <div className='row w-full'>
            <div className='bg-white w-full shadow overflow-hidden rounded-[4px]'>
                {/* group crard header Dive */}
                {showHeader && (
                    <div className={`bg-${headerBgColor} w-full flex justify-between items-center px-4 py-2`}>
                        {title}
                        <div className='flex space-x-1 items-center'>
                            {link && <Link className='text-white' href={link}>{linkTitle}</Link>}
                            <BiChevronRight size={20} color='white' />
                        </div>
                    </div>
                )}

                {/* group crard header body */}
                <div className={`inline-grid grid-cols-6 gap-1 p-2 w-full border`}>
                    {isLoading ? (
                        <ProductsLoading />
                    ) : (
                        data?.products.map((item: ProductProps, index: number) => (
                            <ProductCard key={index} product_data={item} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsSection;
