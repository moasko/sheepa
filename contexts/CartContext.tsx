"use client";

// contexts/CartContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Definimos el tipo del contexto
interface CartContextType {
    cartItems: string[],
    totalPrice: number,
    addToCart: (item: string) => void;
}

// Creamos el contexto con un valor predeterminado
const CartContext = createContext<CartContextType>({
    cartItems: [],
    totalPrice: 0,
    addToCart: () => { },
});

// Hook personalizado para acceder al contexto
export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext debe ser usado dentro de un CartProvider');
    }
    return context;
};

// Proveedor del contexto
export const CartProvider = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
    const [cartItems, setCartItems] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const addToCart = (item: string) => {
        setCartItems((prevItems) => [...prevItems, item]);
        setTotalPrice(prevTotalPrice => prevTotalPrice + item.length);
    };

    const contextValue: CartContextType = {
        cartItems,
        totalPrice,
        addToCart,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
