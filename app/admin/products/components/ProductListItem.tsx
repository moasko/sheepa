import type { FC } from 'react';
import { ProductProps } from "@/lib/interfaces/modelsInterfaces"
import { Image } from 'antd';
import Link from 'next/link';
import { Badge, DeleteIcon, EditIcon, MoreIcon, Switch, Tooltip } from 'evergreen-ui';
import { priceFormatter } from '@/lib/helpers/priceFormatter';

interface ProductListItemProps {
    product: ProductProps;
    onDelete?: ()=>void;
    onEdit?: ()=>void;
}

const ProductListItem: FC<ProductListItemProps> = ({ product,onDelete,onEdit }) => {


    return (
        <tr role="row" >
            <td>{product.id}</td>
            <td className="w-[40%]">
                <Link href={"#"}>
                    <div className="flex">
                        <div className="relative w-16 h-16 mr-3 flex items-center justify-center bg-slate-400">
                            <Image alt="product image" src={product?.images?.length !== 0 ? product?.images[0].imageUrl : "/product_placeholder.png"} />
                        </div>

                        <div className="product-table-type-title">
                            <div>{product?.name}</div>
                            <div className="product-table-type-date">
                                12/05/2022
                            </div>
                        </div>
                    </div>
                </Link>
            </td>
            <td>
                <div className="flex space-x-1 items-center h-full">
                    <Switch onChange={(e) => console.log(e)} height={16} />
                    <Badge color="green" marginRight={8}>
                        En ligne
                    </Badge>
                </div>

            </td>
            <td>{1}</td>

            <td>{priceFormatter.format(Number(product?.price))}</td>
            <td className="pr-10">
                <Tooltip
                    position="left"
                    appearance="card"
                    statelessProps={{
                        padding: "unset",
                        overflow: "hidden",
                        minWidth: "max-content",
                    }}
                    content={
                        <div className="flex items-center">
                            <button onClick={onEdit} className="flex items-center space-x-2 p-2 hover:bg-slate-200">
                                <EditIcon color="gray" size={14} />
                                <span className="text-sm text-gray-600">
                                    Editer
                                </span>
                            </button>
                            <button onClick={onDelete} className="flex items-center space-x-2 p-2 hover:bg-red-400/20">
                                <DeleteIcon color="red" size={14} />
                                <span className="text-sm text-red-600">
                                    Supprimer
                                </span>
                            </button>
                        </div>
                    }
                >
                    <MoreIcon color="gray" size={14} />
                </Tooltip>
            </td>
        </tr>
    );
}
export default ProductListItem;