import React from "react";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem, Select,
    SelectChangeEvent,
    useTheme
} from "@mui/material";
import photo from '../images/1.jpg'
import {autoPlay} from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const images = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath: photo,
    },
    {
        label: 'Bird',
        imgPath: photo,
    },
]


export function Products() {

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
                        width: 180,
                        height: 190,
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
                        >
                            {images.map((step, index) => (
                                <div>
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        <Box
                                            component="img"
                                            sx={{
                                                display: 'block',
                                                overflow: 'hidden',
                                                width: 160,
                                                height: 80,
                                                ml: 2,
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
                        <p className="text-xs">Nike Dunk Low "Grey Frog"</p>
                        <p className="font-bold text-sm">Размер: </p>
                        <p className="font-bold text-sm">22 000 ₽</p>
                    </div>
                    <div className="ml-6">
                        <div className="ml-1 mt-0 self-center w-full">
                            <Button
                                sx={{
                                    mt: 1,
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