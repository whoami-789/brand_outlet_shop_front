import React, { useState, useEffect } from "react";
import axios from "axios";
import { Cart } from "../components/Cart";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface CartItem {
    cartItemId: number;
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
    quantity: number;
}

export function Cart_page() {
    const [products, setProducts] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [telegramFeed, setTelegramFeed] = useState<string>("");

    useEffect(() => {
        const sessionToken = localStorage.getItem("sessionToken");

        if (sessionToken) {
            axios
                .get(`https://brand-outlet.shop/api/cart/view?sessionToken=${sessionToken}`)
                .then((response) => {
                    const cartItems = response.data;
                    setProducts(cartItems);
                })
                .catch((error) => {
                    console.error("Ошибка при получении данных корзины:", error);
                });
        }
    }, []);

    useEffect(() => {
        const calculatedTotalPrice = products.reduce((total, product) => {
            return total + product.productSize.priceRub;
        }, 0);
        setTotalPrice(calculatedTotalPrice);
    }, [products]);

    return (
        <div className="bg-gray-300 w-full mr-2">
            <Link
                to="/"
                className="mb-3 mt-3 ml-5 flex items-center text-gray-700 hover:underline"
            >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-2">
                    <ArrowBackIcon />
                </div>
            </Link>
            <div className="mt-2 inline-block w-full max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide overflow-hidden">
                {products.map((cartItem) => (
                    <Cart key={cartItem.product.id} product={cartItem.product} productSize={cartItem.productSize} />
                ))}
            </div>
            <div className="flex ml-16">
                <p className="font-bold text-lg w-44">Общая стоимость:</p>
                <p className="font-bold text-lg w-40">
                    {totalPrice.toFixed(2)} ₽
                </p>
            </div>
            <div className="mb-6 ml-12 w-44" style={{ height: '2rem' }}>
                <TextField
                    label="Ваш TelegramID"
                    variant="outlined"
                    value={telegramFeed}
                    onChange={(e) => setTelegramFeed(e.target.value)}
                />
            </div>

            <div>
                <Button
                    sx={{
                        mb: 3,
                        mt: 1,
                        ml: 10,
                        minWidth: 220,
                        height: 30,
                        backgroundColor: "#949494",
                        "&:hover": {
                            background: "#767676",
                        },
                    }}
                    variant="contained"
                >
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}
