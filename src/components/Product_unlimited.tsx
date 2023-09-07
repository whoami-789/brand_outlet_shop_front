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
                            <Button
                                onClick={addToCart}
                                sx={{
                                    mt: 1,
                                    mb: 2,
                                    minWidth: 120,
                                    height: 30,
                                    backgroundColor: isAddedToCart ? "#949494" : "#000000",
                                    color: isAddedToCart ? "#ffffff" : "#ffffff",
                                    transition: "background-color 0.3s, color 0.3s", // Анимация смены цвета
                                    "&:hover": {
                                        background: isAddedToCart ? "#767676" : "#949494",
                                    },
                                    position: "relative", // Добавляем относительное позиционирование
                                    overflow: "hidden", // Скрываем переполнение, чтобы пузырьки не выходили за границы кнопки
                                }}
                                className={`mt-1 mb-2 min-w-[120px] h-30 relative ${
                                    isAddedToCart ? "bg-gray-400 text-white" : "bg-black text-white"
                                } transition-colors duration-300 hover:bg-gray-600`}
                                variant="contained"
                            >
                              <span className="relative z-10">
                                {isAddedToCart ? "В КОРЗИНЕ" : "В корзину"}
                              </span>
                                                            <span className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                                {[...Array(10)].map((_, index) => (
                                    <span
                                        className={`bg-[#00FF80] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 opacity-100 animate-move-bubble`}
                                        key={index}
                                    ></span>
                                ))}
                              </span>
                            </Button>

                        </div>
                    </div>
                </Box>
            </div>
        </>
    )
}