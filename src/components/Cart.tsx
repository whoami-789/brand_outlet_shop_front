import React, {useCallback} from "react";
import {Avatar, Box, Button} from "@mui/material";
import photo from "../images/1.jpg";

export function Cart() {
    return (
        <>
            <div>
                <Box
                    sx={{
                        width: 350,
                        height: 100,
                        backgroundColor: 'primary.white',
                    }}
                >
                    <div className="flex">
                        <Avatar
                            variant="square"
                            src={photo}
                            sx={{
                                width: 130,
                                height: 70,
                                ml: 3,
                            }}
                        />
                        <div className="ml-4 w-48">
                            <p className="text-sm w-48">Nike Dunk Low "Grey Frog"</p>
                            <p className="font-bold text-sm w-40">22 000 ₽</p>
                            <Box
                                sx={{
                                    borderRadius: 1.5,
                                    width: 100,
                                    height: 30,
                                    backgroundColor: '#949494',
                                    display: 'flex',
                                }}>
                                <Button
                                    sx={{
                                        color: '#ffff',
                                        minWidth: 45,
                                        height: 30,
                                        '&:hover': {
                                            background: "#767676",
                                        },
                                    }}
                                    variant="text">-</Button>
                                <p className="text-white pt-0.5" id="num">1</p>
                                <Button
                                    sx={{
                                        color: '#ffff',
                                        minWidth: 45,
                                        height: 30,
                                        '&:hover': {
                                            background: "#767676",
                                        },
                                    }}
                                    variant="text"
                                    >+</Button>
                            </Box>
                        </div>
                    </div>
                </Box>
            </div>
        </>
    )
}