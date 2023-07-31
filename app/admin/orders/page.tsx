"use client";

import { useState, type FC, useEffect } from 'react';
import { Badge } from "@nextui-org/react";
import { CiCalendar, CiUser } from "react-icons/ci"
import { HiChevronDown } from "react-icons/hi"
import { LiaPhoneSolid } from "react-icons/lia"
import { Text, SelectMenu, Button, IconButton, PrintIcon, PhoneIcon, UserIcon } from 'evergreen-ui';
import { Image } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from '@/services/order.services';
import { OrderProps } from "@/lib/interfaces/modelsInterfaces"


interface OrdersPageProps { }




const page: FC<OrdersPageProps> = ({ }) => {
    const [selected, setSelected] = useState({
        label: 'En cours',
        value: 'inProgress',
        color: "blue"
    })

    const orderStatus = [
        {
            label: 'En cours',
            value: 'inProgress',
            color: "blue"
        }, {
            label: 'Livré',
            value: 'delivered',
            color: "green"
        }, {
            label: 'Retour',
            value: 'returned',
            color: "orange"
        }, {
            label: 'Annulé',
            value: 'cancelled',
            color: "red"
        }
    ]

    const { data, isLoading, isError, error } = useQuery(['admOrder'], getAllOrders)


    return (
        <div className='w-full'>
            {
                data?.map((items: OrderProps) => {
                    return (
                        <div className='w-full p-5 shadow-md rounded-md bg-white mt-3'>
                            <div className='flex justify-between'>
                                <div>
                                    <div className='flex items-center mb-5'>
                                        <Text fontWeight="bold" fontSize="25px" color="gray">Commande <span className="text-black">#000247 </span></Text>
                                        <div className={`px-3 text-white text-xs font-semibold py-1 rounded-full`} style={{ backgroundColor: selected.color }}>{selected.label}</div>
                                    </div>
                                    <div className='flex items-center space-x-5 mt-3'>
                                        <div className='flex space-x-3 items-center'>
                                            <div className='p-1 rounded-md bg-slate-200 flex justify-center items-center'>
                                                <CiCalendar size={20} />
                                            </div>
                                            <p className='text-[12px]'>12, jan 2023  a 12:45</p>
                                        </div>
                                        <div className='flex items-center space-x-3'>
                                            <div className='p-1 rounded-md bg-slate-200 flex justify-center items-center'>
                                                <CiUser size={20} />
                                            </div>

                                            <p className='text-[15px]'>{items.name}</p>
                                        </div>
                                        <div className='flex items-center space-x-3'>
                                            <div className='p-1 rounded-md bg-slate-200 flex justify-center items-center'>
                                                <LiaPhoneSolid size={20} />
                                            </div>
                                            <p className='text-[15px]'>{items.phone}  / {items.supPhone}</p>
                                        </div>
                                    </div>


                                </div>


                                <Text color="black" fontSize='30px' fontWeight="bolder">{items.total} FCFA</Text>
                            </div>
                            <div className='mt-3 w-full flex justify-between items-center'>
                                <div>
                                    <SelectMenu
                                        hasFilter={false}
                                        options={orderStatus.map((item) => ({ label: item.label, value: item.label }))}
                                        width={280}
                                        height={200}
                                        selected={selected.value}
                                        onSelect={(item) => setSelected(item)}
                                    >
                                        <Button iconAfter={<HiChevronDown />}>{selected.label}</Button>
                                    </SelectMenu>
                                </div>

                                <div className='space-x-4'>
                                    <IconButton icon={PrintIcon} />
                                    <Button appearance='primary'>Voir les details</Button>
                                </div>
                            </div>

                            <div className='mt-5'>
                                {
                                    items.products.map(product => {
                                        return (
                                            <div>
                                                <div className='flex space-x-3 hover:bg-slate-100 p-2 rounded-lg cursor-pointer'>
                                                    <Image
                                                        className='rounded-md'
                                                        src={product.images?.length !== 0 ? product?.images[0]?.imageUrl : "/product_placeholder.png"}
                                                        width={70}
                                                        height={70}
                                                        alt='er'
                                                    />
                                                    <div>
                                                        <h5>{product.name}</h5>
                                                        <Text fontSize={15}>Quantité : 1</Text>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })
                                }


                            </div>
                        </div>
                    )
                })
            }



        </div>
    );
}
export default page;