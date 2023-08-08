import React from "react";
import {Cart} from "../components/Cart";
import {Button} from "@mui/material";

export function Cart_page() {
    return (
        <>
            <div className="bg-gray-300 w-full mr-2">
                <div
                    className="mt-2 inline-block w-full max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide overflow-hidden"
                >
                    <Cart/>
                    <Cart/>
                    <Cart/>
                    <Cart/>
                    <Cart/>
                    <Cart/>
                    <Cart/>
                    <Cart/>
                </div>
                <div className="flex ml-16">
                    <p className="font-bold text-lg w-44">Общая стоимость:</p>
                    <p className="font-bold text-lg w-40">22 000 ₽</p>
                </div>
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
        </>
    );
}
