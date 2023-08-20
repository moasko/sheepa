import { Text } from 'evergreen-ui';
import Image from 'next/image';
import type { FC } from 'react';
import {OrderItems} from "@/lib/interfaces/modelsInterfaces"


interface CheckOutProductItemProps {
    product: OrderItems[];
}


const CheckOutProductItem: FC<CheckOutProductItemProps> = ({ product }) => {
    return (
        <div className='mt-5'>
            {
                product?.map((item, key) => {
                    return (
                        <div key={key}>
                            <div className='flex space-x-3 hover:bg-slate-100 p-2 rounded-lg cursor-pointer'>
                                <Image
                                    className="rounded-md"
                                    src={item?.product.images.at(0)?.imageUrl ?? "/product_placeholder.png"}
                                    width={70}
                                    height={70}
                                    alt="Product Image"
                                />
                                <div>
                                    <h5>{item.product.name}</h5>
                                    <Text fontSize={15}>Quantité : {item.quantity}</Text>
                                </div>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    );
}
export default CheckOutProductItem;