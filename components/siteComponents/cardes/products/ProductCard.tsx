import { priceFormatter } from '@/lib/helpers/priceFormatter';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ProductProps } from '@/lib/interfaces/modelsInterfaces';
import { useCartContext } from '@/contexts/CartContext';


interface ProductCardProps {
    product_data: ProductProps;
    showButton?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product_data, showButton = false }) => {
    const { cartItems, addToCart } = useCartContext()


    const { id, images, name, price, slug, reduction } = product_data;
    const placeholderImage = "/product_placeholder.png";
    const imageSrc = images?.length !== 0 ? images?.at(0)?.imageUrl || placeholderImage : placeholderImage;
    const imageSizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

    return (
        <article className="overflow-hidden group relative pb-2 hover:shadow-lg">
            <Link href={{ pathname: `/${slug}`, query: { slug: slug } }} as={{ pathname: `/${slug}` }}>
                <div className="h-[185px] w-full relative">
                    <Image sizes={imageSizes} fill blurDataURL={placeholderImage} src={imageSrc} alt="image" />
                </div>
                <div className='p-1'>
                    <div className="product_name mb-2 line-clamp-1 text-[.75rem]">{name}</div>
                    <div className="price font-semibold text-[.875rem]">{priceFormatter.format(Number(price))}</div>
                    {price != null ? <div data-oprc={priceFormatter.format(price)} className="price_bare text-[#75757a]"><s>{priceFormatter.format(price)}</s></div> : null}
                    {/* {stock <= 0 ? <p className="text-red-600">Rupture de stock</p> : null} */}
                </div>
            </Link>

            <div className="absolute top-1 right-1 bg-red-500/20 text-red-500 rounded p-1">-{reduction}%</div>


            <div className="w-full invisible group-hover:visible flex justify-center px-2">
                <button
                    onClick={() => {
                        addToCart(JSON.stringify({ id, name, price }))
                        console.log(cartItems)
                    }}
                    className="py-2 rounded-sm mt-2 w-full bg-orange-500 font-semibold text-white text-center">Ajouter au Panier</button>
            </div>

        </article>
    );
};

export default ProductCard;
