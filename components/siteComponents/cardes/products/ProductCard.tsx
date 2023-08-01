import { priceFormatter } from '@/lib/helpers/priceFormatter';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ProductProps } from "@/lib/interfaces/modelsInterfaces"

interface ProductCardProps {
    product_data: ProductProps;
}
const ProductCard: React.FC<ProductCardProps> = ({ product_data }) => {
    const {
        id,
        images,
        name,
        price,
        slug,
        reduction
    } = product_data;

    const handleAddToCart = () => {
        console.log({
            id,
            images,
            name,
            price,
            slug,
            qt: 1,
        });
    };

    return (
        <div className="product-cards group rounded overflow-hidden border border-gray-200">
            <Link
                href={{ pathname: `/${slug}`, query: { slug: slug } }}
                as={{ pathname: `/${slug}` }}>
                <div className="h-[185px] w-full relative">
                    <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill blurDataURL="./product_placeholder.png" src={'/product_placeholder.png'} alt="image" />
                </div>
                <div className="prduct_name mb-2 line-clamp-2">{name}</div>
                <div className="prix">{priceFormatter.format(Number(price))}</div>
                {price != null ? <div className="prix_bare"><s>{priceFormatter.format(price)}</s></div> : null}
                {/* {stock <= 0 ? <p className="text-red-600">Rupture de stock</p> : null} */}
            </Link>
            <button
                // onClick={()=>handleAddToCart()}
                className="group-hover:opacity-90 w-[90%] block bg-orange-500 text-center text-white text-md uppercase mt-5 py-[8px] rounded-sm m-auto"
            >
                Ajouter au panier
            </button>
            <div className="absolute top-1 right-1 bg-red-500/20 text-red-500 rounded p-1">-{reduction}%</div>
        </div>
    );
};

export default ProductCard;
