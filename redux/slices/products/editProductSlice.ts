import { createSlice,PayloadAction } from "@reduxjs/toolkit";


interface productData{

}

interface editProductSatate{
    productId: number | null,
    isOpen: boolean,
    productData: productData
}

const initialState:editProductSatate = {
    productId: null,
    isOpen: false,
    productData: {}
}

export const editProductSlice = createSlice({
    name: "editProduct",
    initialState,

    reducers: {

        setProductId: (state, action:PayloadAction<number>) => {
            state.productId = action.payload;

        },

        setIsOpen: (state, action:PayloadAction<boolean>) => {
            state.isOpen = action.payload
        },

        setProductData: (state, action:PayloadAction<productData>) => {
            const products = action.payload;
            const selectedProduct = Array.isArray(products) ? products.find(product => product.id === state.productId) : null;
            state.productData = selectedProduct || {};
        }
    }
})


export const { setIsOpen, setProductId, setProductData } = editProductSlice.actions

export default editProductSlice.reducer