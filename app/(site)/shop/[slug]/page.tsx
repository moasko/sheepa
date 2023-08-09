"use client";

import { useEffect, useState, FC } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Slider, InputNumber, Pagination } from 'antd';
import { Button } from 'evergreen-ui';
import { IoGridSharp } from 'react-icons/io5';
import { TfiLayoutListThumbAlt } from 'react-icons/tfi';
import Link from 'next/link';

import ProductCard from '@/components/siteComponents/cardes/products/ProductCard';
import { getAllProducts } from '@/services/products.sercices';
import ProductsLoading from '@/components/siteComponents/dynamicSections/loaders/ProductsLoading';
import { ProductProps, CategoryProps } from '@/lib/interfaces/modelsInterfaces';
import { useParams, useSearchParams } from 'next/navigation'


interface PriceRange {
    minPrice: number;
    maxPrice: number;
}

interface ProductsResProps {
    currentPage: number;
    total: number;
    pageSize?:number;
    products: ProductProps[];
    categories: CategoryProps[];
    prices: PriceRange;
}

interface CategorieResProps { }

const CategorieRes: FC<CategorieResProps> = () => {

    const queryClient = useQueryClient();
    const params = useParams()
    const { slug } = params
    const [queryOptions, setQueryOptions] = useState({
        perPage: 4,
        page: 1,
        category:slug
    });

    const { data, isLoading, error } = useQuery<ProductsResProps>(
        ['catalogProducts', queryOptions.page],
        () => getAllProducts(queryOptions),
        {
            keepPreviousData: true,
            refetchInterval: 60000,
            retry: 1,
            retryDelay: 1000,
        }
    );

    const onPaginate = (page: number) => {
        setQueryOptions({ ...queryOptions, page })
    };

    const [range, setRange] = useState<PriceRange>({
        minPrice: data?.prices.minPrice || 0,
        maxPrice: data?.prices.maxPrice || 0,
    });

    const handleSliderChange = (newRange: [number, number]) => {
        setRange({ minPrice: newRange[0], maxPrice: newRange[1] });
    };

    useEffect(() => {
            queryClient.refetchQueries(['catalogProducts']);
            console.log(data)
    }, [range,queryOptions]);

    return (
        <div className="row">
            <div className="w-full flex space-x-5">
                <aside className="bg-white border rounded-[4px] w-3/12">
                    <div className="text-[.875rem] uppercase px-4 pt-2 font-bold">Catégorie</div>
                    <ul className="w-full mt-4">
                        {data?.categories.map((category) => (
                            <li key={category.id} className="hover:bg-slate-100">
                                <Link className="text-[.875rem] block px-4 py-2" href={category.slug}>
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="px-4 border-t pt-4">
                        <div>
                            <h2 className="font-semibold text-[.875rem]">PRIX (R)</h2>
                        </div>
                        <Slider
                            range
                            min={range.minPrice}
                            max={range.maxPrice}
                            onChange={handleSliderChange}
                        />
                        <div className="flex w-full justify-between items-center">
                            <InputNumber size="large" value={range.minPrice} width={'100%'} />
                            <InputNumber size="large" value={range.maxPrice} width={'100%'} onChange={(r) => console.log(r)} />
                        </div>
                    </div>
                </aside>

                <section className="w-8/12 bg-white rounded-[4px] border">
                    <header className="w-full">
                        <div className="w-full min-h-[48px] flex justify-between items-center px-5 border-b">
                            <h2 className="font-semibold text-lg">Mode Hommes</h2>
                            <Button>sort by</Button>
                        </div>
                        <div className="w-full min-h-[48px] flex justify-between items-center px-5 border-b">
                            <h2 className="text-sm text-gray-600">{data?.total} produits</h2>
                            <div>
                                <Button border="none">
                                    <TfiLayoutListThumbAlt size={20} color="gray" />
                                </Button>
                                <Button border="none">
                                    <IoGridSharp size={20} color="orangered" />
                                </Button>
                            </div>
                        </div>
                    </header>

                    <div className="p-3">
                        <div className="grid grid-cols-4 gap-2">
                            {isLoading ? (
                                <ProductsLoading limite={40} />
                            ) : (
                                data?.products?.map((product: ProductProps) => (
                                    <ProductCard key={product.id} showButton={true} product_data={product} />
                                ))
                            )}
                        </div>
                        <div className="w-full mt-8 flex justify-center items-center">
                            <Pagination
                                onChange={onPaginate}
                                current={data?.currentPage}
                                defaultCurrent={data?.currentPage}
                                total={data?.total}
                               pageSize={data?.pageSize}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CategorieRes;
