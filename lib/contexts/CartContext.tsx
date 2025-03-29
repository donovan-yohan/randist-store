'use client'

import { useLocalStorage } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { createContext, useContext } from 'react'

type CartItem = {
    productId: string
    optionId: string
    imageUrl: string
    name: string
    price: number
    option: string
    size: string
    quantity: number
}

type CartId = {
    productId: string
    optionId: string
    size: string
}

type CartContextType = {
    cart: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (id: CartId) => void
    clearCart: () => void
    addQuantity: (id: CartId) => void
    removeQuantity: (id: CartId) => void
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useLocalStorage<CartItem[]>({
        key: 'randist-cart',
        defaultValue: [],
    })

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existingIndex = prev.findIndex(
                (i) =>
                    i.productId === item.productId &&
                    i.optionId === item.optionId &&
                    i.size === item.size
            )
            if (existingIndex !== -1) {
                const updated = [...prev]
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + item.quantity
                }
                return updated
            }
            return [...prev, item]
        })
        notifications.show({
            title: `${item.name} added to cart!`,
            message: 'You can view your cart in the top right corner.',
        })
    }

    const addQuantity = ({ productId, optionId, size }: CartId) => {
        setCart((prev) => {
            const existingIndex = prev.findIndex(
                (i) =>
                    i.productId === productId &&
                    i.optionId === optionId &&
                    i.size === size
            )
            if (existingIndex !== -1) {
                const updated = [...prev]
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + 1
                }
                return updated
            }
            return prev
        })
    }

    const removeQuantity = ({ productId, optionId, size }: CartId) => {
        setCart((prev) => {
            const existingIndex = prev.findIndex(
                (i) =>
                    i.productId === productId &&
                    i.optionId === optionId &&
                    i.size === size
            )
            if (existingIndex !== -1) {
                if (prev[existingIndex].quantity === 0) { return prev }
                const updated = [...prev]
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity - 1
                }
                return updated
            }
            return prev
        })
    }


    const removeFromCart = ({ productId, optionId, size }: CartId) => {
        setCart((prev) =>
            prev.filter(
                (item) =>
                    !(
                        item.productId === productId &&
                        item.optionId === optionId &&
                        item.size === size
                    )
            )
        )
    }

    const clearCart = () => setCart([])

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, addQuantity, removeQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const ctx = useContext(CartContext)
    if (!ctx) { throw new Error('useCart must be used within a CartProvider') }
    return ctx
}
