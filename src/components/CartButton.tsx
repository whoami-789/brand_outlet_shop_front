import React from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface CartButtonProps {
    onClick: () => void;
    cartItemCount: number; // Добавьте пропс для количества товаров в корзине
}

export function CartButton({ onClick, cartItemCount }: CartButtonProps) {
    return (
        <button
            className="bottom-4 right-4 rounded-full bg-white p-2 relative"
            onClick={onClick}
        >
            <ShoppingCartIcon />
            {cartItemCount > 0 && (
                <div className="bg-red-500 text-white rounded-full w-6 h-6 text-center absolute -top-6 -right-6">
                    {cartItemCount}
                </div>
            )}
        </button>
    );
}
