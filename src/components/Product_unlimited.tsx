import React from "react";
import {
    Box,
    Button,
    SelectChangeEvent,
    useTheme
} from "@mui/material";
import {autoPlay} from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import {IProduct, Product} from "../models";
import {useProducts} from "../hooks/products";


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface ProductsProps {
    product: IProduct
}

export function Products_Unlimited({product}: ProductsProps) {
    const images = [
        {
            label: product.title,
            imgPath: product.image,
        },
        {
            label: product.title,
            imgPath: product.image,
        },
    ]

    const {products, loading, error} = useProducts()


    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    const [size, setSize] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSize(event.target.value as string);

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
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            {images.map((step, index) => (
                                <div className="mt-1" key={index} style={{ height: 140 }}>
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

                    <div className="ml-4 mt-1.5">
                        <p className="text-xs">{product.title}</p>
                        <p className="font-bold text-sm">Размер: какой то</p>
                        {/*<p className="font-bold text-sm">{product.price} ₽</p>*/}
                    </div>
                    <div className="ml-4 z-1">
                        <div className="ml-2 mt-0 self-center w-full relative z-10">
                            <Button
                                sx={{
                                    mt: 1,
                                    mb: 2,
                                    minWidth: 120,
                                    height: 30,
                                    backgroundColor: '#000000',
                                    '&:hover': {
                                        background: "#767676",
                                    },
                                }}
                                variant="contained">В корзину</Button>
                        </div>
                    </div>
                </Box>
            </div>
        </>
    )
}