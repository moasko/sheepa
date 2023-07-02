"use client"

import React, { useState } from 'react';
import {
    Badge,
    DeleteIcon,
    DuplicateIcon,
    EditIcon,
    MoreIcon,
    Tooltip,
    Pane,
    Dialog,
    Button,
    Switch
} from "evergreen-ui";
import { Image, Pagination, } from "antd";
import Link from "next/link";
import { toaster } from "evergreen-ui";

import AddProductSlideSheet from './AddProductSlideSheet';
import { formatPrice } from '@/lib/utils/priceFormater';
import { priceFormatter } from '@/lib/helpers/priceFormatter';



const ProductTable: React.FC = () => {

    return (
        <div className="shipa-table-container">
        <div className="shipa-table">
            <table className='w-full caption-bottom'>
                <thead className='border-b p-3'>
                    <tr role="row">
                        <th
                            role="columnheader"
                            className="unselectable"
                            style={{ whiteSpace: "nowrap" }}
                        >
                            ID
                        </th>

                        <th
                            role="columnheader"
                            className="unselectable"
                            style={{ whiteSpace: "nowrap" }}
                        >
                            Produit
                        </th>
                        <th
                            role="columnheader"
                            className="unselectable"
                            style={{ whiteSpace: "nowrap" }}
                        >
                            Status
                        </th>
                        <th
                            role="columnheader"
                            className="unselectable"
                            style={{ whiteSpace: "nowrap" }}
                        >
                            Stock
                        </th>
                        <th
                            role="columnheader"
                            className="unselectable"
                            style={{ whiteSpace: "nowrap" }}
                        >
                            Prix
                        </th>
                    </tr>
                </thead>

                <tbody className=''>

                    <tr role="row" >
                        <td>1</td>
                        <td className="w-[40%]">
                            <Link href={"#"}>
                                <div className="flex">
                                    <div className="relative w-16 h-16 mr-3 flex items-center justify-center bg-slate-400">
                                        <Image
                                            alt="product image"
                                            src={

                                                "/default_product_image.jpg"
                                            }
                                        />
                                    </div>

                                    <div className="product-table-type-title">
                                        <div>mon nom</div>
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
                        <td>{10}</td>

                        <td>{priceFormatter.format(150000)}</td>
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
                                        <button onClick={() => console.log("gf")} className="flex items-center space-x-2 p-2 hover:bg-slate-200">
                                            <EditIcon color="gray" size={14} />
                                            <span className="text-sm text-gray-600">
                                                Editer
                                            </span>
                                        </button>
                                        <button onClick={() => console.log("gf")} className="flex items-center space-x-2 p-2 hover:bg-red-400/20">
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

                </tbody>
            </table>
            <AddProductSlideSheet isShown={true} onClose={() => console.log("closef")} refreshProducts={() => console.log("red")} />
            </div>
        </div>
    );
};

export default ProductTable;
