import Image from 'next/image';
import type { FC } from 'react';

interface ProductsLoadingProps {
    limite?:number
}

const ProductsLoading: FC<ProductsLoadingProps> = ({limite=12}) => {
    return (
        <>
            {[...Array(limite)].map((_, key) => {
                return (
                    <div key={key} className="product-cards animate-pulse group rounded overflow-hidden border border-gray-200">
                        <div>
                            <div className="h-[185px] w-full relative">
                                <Image width={300} height={300} src="/product_placeholder.png" alt="image" />
                            </div>
                            <div className="p-3 space-y-2">
                                <div className="w-full h-2 rounded bg-gray-300"></div>
                                <div className="w-2/5 h-4 rounded bg-gray-400"></div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ProductsLoading;
