import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    useTheme,
} from "@mui/material";
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import { Product, ProductSize } from "../models";
import axios from "axios";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface ProductsProps {
    product: Product;
    sessionToken: string; // Принимаем токен как пропс
}

export function Products_Unlimited({ product, sessionToken }: ProductsProps) {
    const images = [
        {
            label: product.title,
            imgPath: product.img1,
        },
        {
            label: product.title,
            imgPath: product.img2,
        },
    ];

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string>("");

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    const handleSizeChange = (event: SelectChangeEvent) => {
        setSelectedSize(event.target.value);
    };

    let selectedPrice: string = "";
    if (selectedSize) {
        const selectedSizeObj: ProductSize | undefined = product.sizes.find(
            (size) => size.size === selectedSize
        );

        if (selectedSizeObj) {
            selectedPrice = `${selectedSizeObj.priceRub} ₽`;
        }
    }

    const addToCart = () => {
        if (selectedSize && sessionToken) {
            const selectedProductSize = product.sizes.find(
                (size) => size.size === selectedSize
            );

            if (selectedProductSize) {
                const requestData = {
                    productId: product.id,
                    quantity: 1,
                    productSizeId: selectedProductSize.id,
                    sessionToken: sessionToken, // Используйте пропс sessionToken
                };

                axios
                    .post("https://brand-outlet.shop/api/cart/add", requestData)
                    .then((response) => {
                        console.log("Товар успешно добавлен в корзину", response.data);
                    })
                    .catch((error) => {
                        console.error("Ошибка при добавлении товара в корзину", error);
                    });
            }
        }
    };

    return (
        <>
            <div className="ml-2">
                <Box
                    sx={{
                        width: 165,
                        backgroundColor: "#ffff",
                        borderRadius: "7px",
                    }}
                >
                    <div>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {images.map((step, index) => (
                                <div className="mt-1" key={index} style={{ height: 140 }}>
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        <Box
                                            component="img"
                                            sx={{
                                                display: "block",
                                                overflow: "hidden",
                                                maxWidth: "100%",
                                                maxHeight: "100%",
                                                width: "auto",
                                                height: "100%",
                                                margin: "0 auto",
                                            }}
                                            src={step.imgPath}
                                            alt={step.label}
                                        />
                                    ) : null}
                                </div>
                            ))}
                        </AutoPlaySwipeableViews>
                    </div>

                    <div className="ml-6 mt-1.5">
                        <p className="text-m mb-1">{product.title}</p>
                        <FormControl className="w-[120px]">
                            <InputLabel
                                sx={{
                                    mt: "-8px",
                                    fontSize: "12px",
                                    color: "white",
                                }}
                            >
                                Размер
                            </InputLabel>
                            <Select
                                label="Размер"
                                value={selectedSize}
                                onChange={handleSizeChange}
                                className="h-8 bg-black text-white"
                                sx={{
                                    "& .MuiSelect-icon": {
                                        color: "white",
                                    },
                                    "& .MuiSelect-select.MuiSelect-select": {
                                        color: "white",
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "white",
                                    },
                                }}
                            >
                                <MenuItem value="">Выберите размер</MenuItem>
                                {product.sizes.map((size, index) => (
                                    <MenuItem
                                        key={index}
                                        value={size.size}
                                        sx={{
                                            fontSize: "12px",
                                        }}
                                    >
                                        {size.size}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {selectedSize && (
                            <p className="font-bold text-sm mt-2">
                                Цена: {product.sizes.find((size) => size.size === selectedSize)?.priceRub} ₽
                            </p>
                        )}
                    </div>
                    <div className="ml-4 z-1">
                        <div className="ml-2 mt-0 self-center w-full relative z-10">
                            <Button
                                onClick={addToCart}
                                sx={{
                                    mt: 1,
                                    mb: 2,
                                    minWidth: 120,
                                    height: 30,
                                    backgroundColor: "#000000",
                                    "&:hover": {
                                        background: "#767676",
                                    },
                                }}
                                variant="contained"
                            >
                                В корзину
                            </Button>
                        </div>
                    </div>
                </Box>
            </div>
        </>
    );
}
