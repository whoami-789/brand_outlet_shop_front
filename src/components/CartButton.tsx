import React from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface CartButtonProps {
    onClick: () => void;
}

export function CartButton({ onClick }: CartButtonProps) {
    return (
        <button
            className="fixed bottom-4 right-4 rounded-full bg-white p-2"
            onClick={onClick}
        >
            <ShoppingCartIcon />
        </button>
    );
}
