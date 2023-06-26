"use client"

import React, { useState } from 'react';
import AddProductSlideSheet from './AddProductSlideSheet';

import { formatPrice } from '@/lib/utils/priceFormater';



const ProductTable: React.FC = () => {

    return (
        <div>
            <AddProductSlideSheet isShown={true} onClose={() => console.log("closef")} refreshProducts={() => console.log("red")} />
        </div>
    );
};

export default ProductTable;
