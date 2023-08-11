import React, { useState, useEffect } from "react";
import axios from "axios";
import { Cart } from "../components/Cart";
import { Button } from "@mui/material";

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

export function Cart_page() {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        axios.get<Product[]>("https://fakestoreapi.com/products")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Ошибка при получении данных о продуктах:", error);
            });
    }, []);

    useEffect(() => {
        const calculatedTotalPrice = products.reduce((total, product) => {
            return total + product.price;
        }, 0);
        setTotalPrice(calculatedTotalPrice);
    }, [products]);

    return (
        <div className="bg-gray-300 w-full mr-2">
            <div
                className="mt-2 inline-block w-full max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide overflow-hidden"
            >
                {products.map((product) => (
                    <Cart key={product.id} product={product} />
                ))}
            </div>
            <div className="flex ml-16">
                <p className="font-bold text-lg w-44">Общая стоимость:</p>
                <p className="font-bold text-lg w-40">{totalPrice.toFixed(2)} ₽</p>
            </div>
            <Button
                sx={{
                    mb: 3,
                    mt: 1,
                    ml: 10,
                    minWidth: 220,
                    height: 30,
                    backgroundColor: '#949494',
                    '&:hover': {
                        background: "#767676",
                    },
                }}
                variant="contained"
            >
                Оформить заказ
            </Button>
        </div>
    );
}
