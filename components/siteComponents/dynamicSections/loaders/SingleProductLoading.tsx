"use client";

import type { FC } from 'react';

interface SingleProductLoadingProps { }

const SingleProductLoading: FC<SingleProductLoadingProps> = ({ }) => {
    return (
        <section className='row'>
            {
                <div className="relative mx-auto max-w-screen-xl card py-8 animate-pulse">
                    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                            <div className='flex'>

                                <div className="h-full flex flex-col space-y-1 mr-2">
                                    <div className="aspect-square w-[100px] h-[100px] bg-gray-200 rounded object-cover" />
                                    <div className="aspect-square w-[100px] h-[100px] bg-gray-200 rounded object-cover" />
                                    <div className="aspect-square w-[100px] h-[100px] bg-gray-200 rounded object-cover" />
                                    <div className="aspect-square w-[100px] h-[100px] bg-gray-200 rounded object-cover" />
                                </div>

                                <div className="aspect-square bg-gray-200 w-full rounded-xl object-cover" />
                            </div>



                        </div>

                        <div className="sticky top-0">
                            <div className='flex space-x-3'>
                                <span className="group inline-flex h-6 w-16 bg-gray-200 items-center justify-center rounded-md border text-xs font-medium" />
                                <span className="group inline-flex h-6 w-16 bg-gray-200 items-center justify-center rounded-md border text-xs font-medium" />
                            </div>


                            <div className="mt-8">
                                <div className="max-w-full space-y-2">
                                    <div className=' space-y-1'>
                                        <div className="text-xl w-full h-4 bg-slate-200" />
                                        <div className="text-xl w-3/5 h-4 bg-slate-200" />
                                    </div>
                                </div>
                                <div className="text-xl mt-10 w-28 h-8 bg-slate-200" />



                            </div>

                            <div className="mt-4">
                                <div className="prose max-w-none">
                                    <div className=' space-y-1'>
                                        <div className="text-xl w-full h-4 bg-slate-200" />
                                        <div className="text-xl w-3/5 h-4 bg-slate-200" />
                                        <div className="text-xl w-3/5 h-4 bg-slate-200" />
                                        <div className="text-xl w-full h-4 bg-slate-200" />
                                        <div className="text-xl w-3/5 h-4 bg-slate-200" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="mt-4">
                                    <div className="text-xl w-10 mb-2 h-3 bg-slate-200" />

                                    <div className="flex flex-wrap gap-1">
                                        <span className="group inline-flex h-6 w-16 bg-gray-200 items-center justify-center rounded-md border text-xs font-medium" />
                                        <span className="group inline-flex h-6 w-16 bg-gray-200 items-center justify-center rounded-md border text-xs font-medium" />
                                        <span className="group inline-flex h-6 w-16 bg-gray-200 items-center justify-center rounded-md border text-xs font-medium" />

                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="text-xl w-10 mb-2 h-3 bg-slate-200" />

                                    <div className="flex flex-wrap gap-1">
                                        <span className="group inline-flex h-8 w-8 bg-gray-200 items-center justify-center rounded-full border text-xs font-medium" />
                                        <span className="group inline-flex h-8 w-8 bg-gray-200 items-center justify-center rounded-full border text-xs font-medium" />
                                        <span className="group inline-flex h-8 w-8 bg-gray-200 items-center justify-center rounded-full border text-xs font-medium" />
                                        <span className="group inline-flex h-8 w-8 bg-gray-200 items-center justify-center rounded-full border text-xs font-medium" />
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-4">
                                    <div className="block rounded w-full bg-gray-200  py-5 text-xs font-medium" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    );
}
export default SingleProductLoading;