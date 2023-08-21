"use client";

import { useCartContext } from '@/contexts/CartContext';
import { priceFormatter } from '@/lib/helpers/priceFormatter';
import useStore from '@/lib/useStore';
import { calculateTotalCart } from '@/lib/utils/calculateTotalPrice';
import { store } from '@/store';
import { Empty } from 'antd';
import { TrashIcon } from 'evergreen-ui';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, type FC, useState } from 'react'
import { BiChevronDown, BiChevronUp } from "react-icons/bi"



const CartPage = ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {

  type TotalPriceType = {
    total: number,
    deliveryPrice: number
  }

  const storecart = useStore(store, (state) => state.cart)

  const deleteCart = useStore(store, (state) => state)
  const incrementQuantity = useStore(store, (state) => state)
  const decrementQuantity = useStore(store, (state) => state)

  const [totalPrices, setTotalPrices] = useState<TotalPriceType>({
    total: 0,
    deliveryPrice: 0
  })

  useEffect(() => {
    setTotalPrices(calculateTotalCart({ cart: storecart as any }))
  }, [storecart])

  return (
    <section className="row">
      <div className="mx-auto w-full">
        <div className="mx-auto w-full">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Votre panier</h1>
          </header>

          <div className="mt-8 flex space-x-2">
            <ul className="space-y-4 w-4/6">
              {
                storecart?.length !== 0 ?
                  storecart?.map((item) => {
                    return (
                      <li className="flex items-center shadow p-3 gap-4">
                        <Image
                          width={100}
                          height={100}
                          src={item.image}
                          alt="image"
                          className="rounded object-cover"
                        />

                        <div>
                          <h3 className="text-sm text-gray-900">{item.name}</h3>

                          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                              <dt className="inline">Taille:</dt>
                              <div className="inline">XXS</div>
                            </div>

                            <div>
                              <dt className="inline">Couleure:</dt>
                              <div className="inline">rouge</div>
                            </div>
                          </dl>
                        </div>

                        <div className="flex flex-1 items-center justify-end gap-2">
                          <span>{priceFormatter.format(item.price)}</span>
                          x
                          <div className="flex flex-col border overflow-hidden rounded">
                            <button onClick={() => { incrementQuantity?.incrementQuantity(item.id) }} className="bg-slate-200 flex items-center justify-center h-6"><BiChevronUp /></button>
                            <input
                              disabled
                              type="number"
                              min="1"
                              value={item.quantity}
                              className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            <button onClick={() => { decrementQuantity?.decrementQuantity(item.id) }} className="bg-slate-200 flex items-center justify-center h-6"><BiChevronDown /></button>
                          </div>
                          =
                          <span className='font-medium'>{priceFormatter.format(item.price * item.quantity)}</span>
                          <button onClick={() => { deleteCart?.deleteCart(item.id) }} className="text-gray-600 transition hover:text-red-600">
                            <span className="sr-only">Remove item</span>
                            <TrashIcon />
                          </button>
                        </div>
                      </li>)
                  }) : <Empty
                    description={
                      <span>
                        <h3 className='text-xl'>Votre panier est vide</h3>
                      </span>
                    }
                  />
              }
            </ul>

            <div className="flex px-8 bg-slate-100 rounded relative  justify-end border-t border-gray-100 pt-8 w-2/6">
              <div className="w-screen max-w-lg space-y-4">
                <div className="space-y-5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <h3>Sous Total</h3>
                    <div><div>{priceFormatter.format(totalPrices.total)}</div></div>
                  </div>

                  <div className="flex justify-between">
                    <h3>Livraison</h3>
                    <div><div>{priceFormatter.format(totalPrices.deliveryPrice)}</div></div>
                  </div>

                  <div className="flex justify-between !text-base font-medium">
                    <h3>Total</h3>
                    <div className='text-lg'>{priceFormatter.format(totalPrices.total)}</div>
                  </div>
                </div>

                <div className="flex absolute bottom-4 right-4 justify-end">
                  <Link
                    href="/checkout"
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Valider ma commande
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CartPage;