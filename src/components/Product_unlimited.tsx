import React, {useState} from "react";
import {
    Box,
    Button, FormControl, InputLabel, MenuItem, Select,
    SelectChangeEvent,
    useTheme
} from "@mui/material";
import {autoPlay} from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import {Product, ProductSize} from "../models";
import axios from "axios";
import {sessionToken} from "../useSessionToken";
import AnimatedButtonComponent from "./AnimatedButtonComponent";


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface ProductsProps {
    product: Product
}

export function Products_Unlimited({product}: ProductsProps) {
    const images = [
        {
            label: product.title,
            imgPath: product.img1,
        },
        {
            label: product.title,
            imgPath: product.img2,
        },
    ]


    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    const handleSizeChange = (event: SelectChangeEvent) => {
        setSelectedSize(event.target.value);
    };


    // Найти цену для выбранного размера
    let selectedPrice: string = "";
    if (selectedSize) {
        const selectedSizeObj: ProductSize | undefined = product.sizes.find(
            (size) => size.size === selectedSize
        );

        if (selectedSizeObj) {
            selectedPrice = `${selectedSizeObj.priceRub} ₽`;
        }
    }

    // Функция для добавления товара в корзину
    const addToCart = () => {
        if (selectedSize) {
            const selectedProductSize = product.sizes.find(
                (size) => size.size === selectedSize
            );

            if (selectedProductSize) {
                const requestData = {
                    productId: product.id,
                    quantity: 1,
                    productSizeId: selectedProductSize.id, // Извлекаем id размера из объекта
                    sessionToken: sessionToken,
                };

                axios.post('https://brand-outlet.shop/api/cart/add', requestData)
                    .then((response) => {
                        console.log('Товар успешно добавлен в корзину', response.data);
                        setIsAddedToCart(true); // Устанавливаем флаг, что товар добавлен в корзину
                    })
                    .catch((error) => {
                        console.error('Ошибка при добавлении товара в корзину', error);
                    });
            }
        }
    };

    const bubblesStyle: React.CSSProperties = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
    };

    const bubbleStyle: React.CSSProperties = {
        backgroundColor: "#00FF80",
        borderRadius: "100%",
        position: "absolute",
        top: "50%",
        left: "50%",
        display: "block",
        zIndex: -1,
        animation: "move-bubble 1.5s infinite",
    };
    return (
        <>
            <div className="ml-2">
                <Box
                    sx={{
                        width: 165,
                        // height: 260,
                        backgroundColor: '#ffff',
                        borderRadius: '7px',
                    }}
                >
                    <div>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                            style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        >
                            {images.map((step, index) => (
                                <div className="mt-1" key={index} style={{height: 140}}>
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        <Box
                                            component="img"
                                            sx={{
                                                display: 'block',
                                                overflow: 'hidden',
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                width: 'auto',
                                                height: '100%',
                                                margin: '0 auto', // Центрирование изображения по горизонтали
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
                                    mt: '-8px',
                                    fontSize: '12px',
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
                                        color: 'white', // Цвет стрелки
                                    },
                                    "& .MuiSelect-select.MuiSelect-select": {
                                        color: 'white', // Цвет текста
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: 'white', // Цвет метки
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: '150px', // Установите максимальную высоту после клика
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="">
                                    Выберите размер
                                </MenuItem>
                                {product.sizes.map((size, index) => (
                                    <MenuItem key={index} value={size.size}
                                              sx={{
                                                  fontSize: '12px',
                                              }}>
                                        {size.size}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {selectedSize && (
                            <p className="font-bold text-sm mt-2">
                                Цена: {product.sizes.find(size => size.size === selectedSize)?.priceRub} ₽
                            </p>
                        )}
                    </div>
                    <div className="ml-4 z-1">
                        <div className="ml-2 mt-0 self-center w-full relative z-10">
                            <AnimatedButtonComponent
                                onClick={addToCart}
                                isAddedToCart={isAddedToCart}
                                variant="contained"
                            >
                                {isAddedToCart ? "В КОРЗИНЕ" : "В корзину"}
                                {isAddedToCart && (
                                    <>
                                        <div className="bubble" style={{ left: "20px", top: "20px" }}></div>
                                        <div className="bubble" style={{ left: "40px", top: "10px" }}></div>
                                        <div className="bubble" style={{ left: "60px", top: "20px" }}></div>
                                    </>
                                )}
                                <div className="bubbles"></div>
                            </AnimatedButtonComponent>
                        </div>
                    </div>
                </Box>
            </div>
        </>
    )
}