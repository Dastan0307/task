<<<<<<< HEAD
	'use client'
=======
'use client'
>>>>>>> af39b28b79ea6ef0a604641d7493a76578105537

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Product {
    id: string | number
    image: string
    name: string
    description: string
    price: number
    available: boolean
}

interface CartItem extends Product {
    quantity: number
}

interface CartContextType {
    cart: CartItem[]
    addToCart: (product: Product) => void
    totalItems: number
    removeFromCart: (id: string | number) => void
    updateQuantity: (id: string | number, newQuantity: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
    // Используем useState с функцией инициализации, чтобы загрузить данные из localStorage
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

    // Используем useEffect для сохранения корзины в localStorage при каждом ее изменении
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id)
            if (!existingItem) {
                return [...prevCart, { ...product, quantity: 1 }]
            }
            return prevCart;
        })
    }

    const removeFromCart = (id: string | number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string | number, newQuantity: number) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, totalItems, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}