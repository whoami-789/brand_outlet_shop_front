// CartContext.tsx
import React, { createContext, useContext, useState } from "react";

interface CartContextType {
    cartItemCount: number;
    incrementCartItemCount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItemCount, setCartItemCount] = useState(0);

    const incrementCartItemCount = () => {
        setCartItemCount(cartItemCount + 1);
    };

    return (
        <CartContext.Provider value={{ cartItemCount, incrementCartItemCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
