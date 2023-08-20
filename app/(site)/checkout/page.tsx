"use client";

import { priceFormatter } from '@/lib/helpers/priceFormatter';
import useStore from '@/lib/useStore';
import { store } from '@/store';
import { useState, type FC, useEffect } from 'react';
import { CiDeliveryTruck } from "react-icons/ci"
import { LiaPhoneSolid, LiaUserEditSolid } from "react-icons/lia"
import { BsTicketPerforated } from "react-icons/bs"
import { calculateTotalCart } from '@/lib/utils/calculateTotalPrice';
import { CheckOutDataProps, CheckOutDataItemsProps } from "@/lib/interfaces/modelsInterfaces"
import { useMutation } from '@tanstack/react-query';
import { createCheckOut } from '@/services/checkout.service';
import notify from '@/lib/utils/notification';
import { Result } from 'antd';
import Link from 'next/link';

interface pageProps { }

const CheckOutPage: FC<pageProps> = ({ }) => {

    interface TotalTypes {
        total: number,
        additionals?: number
    }

    const storeProducts = useStore(store, (state) => state.cart)
    const initalCheckOutData: CheckOutDataProps = {
        name: "",
        phone: "",
        supPhone: "",
        address: "",
        total: 0,
        items: [],
        code: "",
    };

    const [orderData, setOrderData] = useState<CheckOutDataProps>(initalCheckOutData)
    const [orderPreviewIsLoaded, setOrderPreviewIsLoaded] = useState(true)
    const [total, setTotal] = useState<TotalTypes>({ total: 0, additionals: 0 })

    const checkOutMutation = useMutation({
        mutationFn: createCheckOut,
        onSuccess: () => {
            notify({
                title: "Commande passée",
                message: `${orderData?.name} vous a envoyé un e-mail avec les données de votre commande.`,
            })
            setOrderData(initalCheckOutData)
        },
        onError: (error: any) => {
            console.log(error);
        }
    });

    const validateAndSubmit = (formData: CheckOutDataProps) => {
        if (!formData.phone || !formData.address) {
            notify({
                type: "error",
                title: "Veuillez remplir tous les champs obligatoires.",
                message: "Veuillez remplir tous les champs obligatoires."
            });
            return;
        }

        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(formData.phone)) {
            notify({
                type: 'error',
                title: `Le numéro ${formData.phone} n'est pas valide`,
                message: `Votre téléphone doit être composé d'un nombre et ne peut contenir que des chiffres.`
            });
            return;
        }

        checkOutMutation.mutate(orderData)
    };

    const handleInputChange = (label: keyof CheckOutDataProps, value: any) => {
        setOrderData((prevCheckOutData) => ({
            ...prevCheckOutData,
            [label]: value,
        }));
    }

    useEffect(() => {
        setOrderPreviewIsLoaded(false)
        setTotal(calculateTotalCart({ cart: storeProducts as any }))
        setOrderData({
            // @ts-ignore
            ...orderData, items: storeProducts?.map((itm): CheckOutDataItemsProps => ({
                quantity: itm.quantity,
                unitPrice: itm.price,
                totalPrice: (itm.price * itm.quantity),
                productId: itm.id,
            }))
        })
    }, [storeProducts])

    return (
        <div className='row'>
            {
                checkOutMutation.isSuccess ?
                    <div className=' w-full h-[800px]'>
                        <Result
                            status="success"
                            title="Votre commande a été effectuée avec succès."
                            subTitle="Un commercial va prendre contact avec vous dans quelques instants."
                            extra={[
                                <Link href={"/"} className='px-5 py-2 text-white bg-orange-500'>
                                    Continuer mon Achat
                                </Link>
                            ]}
                        />
                    </div> :

                    <div className="grid lg:grid-cols-2 ">
                        <div className="px-4 pt-8">
                            <p className="text-xl font-medium">Récapitulatif de la commande</p>
                            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                                {
                                    !orderPreviewIsLoaded ?
                                        storeProducts?.map(item => {
                                            return (
                                                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                                                    <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item.image} alt="" />
                                                    <div className="flex w-full flex-col px-4 py-4">
                                                        <span className="font-semibold">{item.name}</span>
                                                        <span className="float-right text-gray-400">{`${priceFormatter.format(item.price)} x ${item.quantity}`}</span>
                                                        <p className="text-lg font-bold">{priceFormatter.format(item.price * item.quantity)}</p>
                                                    </div>
                                                </div>
                                            )
                                        }) :
                                        <div>
                                            {
                                                [...Array(6)].map((_, key) => {
                                                    return (
                                                        <div key={key} className="flex animate-pulse flex-col rounded-lg bg-white sm:flex-row">
                                                            <div className="h-24 w-32 rounded bg-slate-100" />
                                                            <div className="flex w-full space-y-4 flex-col px-4 py-4">
                                                                <div className="w-56 h-3 bg-slate-100"></div>
                                                                <div className="w-12 h-3 bg-slate-100"></div>
                                                                <div className="w-16 h-5 bg-slate-100"></div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                        <div className=' space-y-4'>
                            <div className='mt-10 bg-orange-50 px-4 py-4 lg:mt-0"'>
                                <label htmlFor="card-holder" className=" mb-2 block text-sm font-medium">Avez vous un code promo ?</label>
                                <div className="relative">
                                    <input onChange={(value) => handleInputChange("code", value.target.value)} value={orderData.code} type="text" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Code ici" />
                                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                        <BsTicketPerforated size={20} color='gray' />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                                <p className="text-xl font-medium">Détails de Livraison</p>
                                <p className="text-gray-400">Complétez votre commande en fournissant vos informations</p>
                                <div className="">

                                    <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Votre nom et Prénom</label>
                                    <div className="relative">
                                        <input required onChange={(value) => handleInputChange("name", value.target.value)} value={orderData.name} type="text" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Nom et Prénom" />
                                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                            <LiaUserEditSolid size={20} color='gray' />
                                        </div>
                                    </div>

                                    <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Votre numéro de téléphone principal</label>
                                    <div className="relative">
                                        <input required onChange={(value) => handleInputChange("phone", value.target.value)} value={orderData.phone} type="tel" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Téléphone Principal" />
                                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                            <LiaPhoneSolid size={20} color='gray' />
                                        </div>
                                    </div>


                                    <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Votre numéro de téléphone supplémentaire (facultatif)</label>
                                    <div className="relative">
                                        <input onChange={(value) => handleInputChange("supPhone", value.target.value)} value={orderData.supPhone} type="tel" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Téléphone supplémentaire" />
                                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                            <LiaPhoneSolid size={20} color='gray' />
                                        </div>
                                    </div>


                                    <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Lieu de livraison</label>
                                    <div className="relative">
                                        <input required onChange={(value) => handleInputChange("address", value.target.value)} value={orderData.address} type="text" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Lieu de livraison" />
                                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                            <CiDeliveryTruck size={20} color='gray' />
                                        </div>
                                    </div>


                                    <div className="mt-6 border-t border-b py-2">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-900">Subtotal</p>
                                            <p className="font-semibold text-gray-900">$399.00</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-900">Shipping</p>
                                            <p className="font-semibold text-gray-900">$8.00</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">Total</p>
                                        <p className="text-2xl font-semibold text-gray-900">{priceFormatter.format(total.total)}</p>
                                    </div>
                                </div>
                                <button onClick={() => {
                                    validateAndSubmit({ ...orderData, total: total.total })
                                }} className="mt-4 mb-8 w-full rounded-md flex justify-center items-center bg-gray-900 px-6 py-3 font-medium text-white">{!checkOutMutation.isLoading ? "Valider" : "validation..."}</button>
                            </div>
                        </div>

                    </div>
            }

        </div>
    );
}
export default CheckOutPage;