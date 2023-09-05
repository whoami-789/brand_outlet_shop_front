import React, { useState } from "react";
import { Avatar, Box, Button } from "@mui/material";
import photo from "../images/1.jpg";

interface CartProps {
    product: {
        id: number;
        title: string;
        img1: string;
        img2: string;
        sizes: any[]; // Здесь нужно определить структуру данных для sizes, если это массив
        categoryName: string | null;
    };
    productSize: {
        id: number;
        size: string;
        priceRub: number;
        priceYuan: number;
        deliveryPrice: number;
    };
}

export function Cart({ product, productSize }: CartProps) {
    const [quantity, setQuantity] = useState(1);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div>
            <Box
                sx={{
                    width: 350,
                    height: 100,
                    backgroundColor: 'primary.white',
                }}
            >
                <div className="flex">
                    <div
                        style={{
                            width: 150,
                            height: 90,
                            marginLeft: 3,
                            position: 'relative', // Добавлено для позиционирования
                        }}
                    >
                        <img
                            src={product.img1}
                            alt={product.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                    <div className="ml-4 w-48">
                        <p className="text-sm w-48 truncate">{product.title}</p>
                        <p className="font-bold text-sm w-40">Размер: {productSize.size}</p>
                        <p className="font-bold text-sm w-40">{productSize.priceRub} ₽</p>
                        <Box
                            sx={{
                                borderRadius: 1.5,
                                width: 100,
                                height: 30,
                                backgroundColor: '#949494',
                                display: 'flex',
                            }}
                        >
                            <Button
                                onClick={handleDecrease}
                                sx={{
                                    color: '#ffff',
                                    minWidth: 45,
                                    height: 30,
                                    '&:hover': {
                                        background: "#767676",
                                    },
                                }}
                                variant="text"
                            >
                                -
                            </Button>
                            <p className="text-white pt-0.5" id="num">
                                {quantity}
                            </p>
                            <Button
                                onClick={handleIncrease}
                                sx={{
                                    color: '#ffff',
                                    minWidth: 45,
                                    height: 30,
                                    '&:hover': {
                                        background: "#767676",
                                    },
                                }}
                                variant="text"
                            >
                                +
                            </Button>
                        </Box>
                    </div>
                </div>
            </Box>
        </div>
    )
}
