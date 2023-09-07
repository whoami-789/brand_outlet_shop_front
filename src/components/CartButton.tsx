import React from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface CartButtonProps {
    onClick: () => void;
    cartItemCount: number; // Добавьте пропс для количества товаров в корзине
}

export function CartButton({ onClick, cartItemCount }: CartButtonProps) {
    return (
        <div className="relative">
            <button
                className="fixed bottom-4 right-4 rounded-full bg-white p-2"
                onClick={onClick}
            >
                <ShoppingCartIcon />
            </button>
            {cartItemCount > 0 && (
                <div className="bg-red-500 text-white rounded-full w-6 h-6 text-center absolute bottom-2 right-2">
                    {cartItemCount}
                </div>
            )}
        </div>
    );
}
