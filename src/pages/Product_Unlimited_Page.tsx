import React from "react";
import {useProducts} from "../hooks/products";
import {Products_Unlimited} from "../components/Product_unlimited";
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export function Product_Unlimited_Page() {
    const {products, loading, error} = useProducts()

    return (
        <>
            <div className="bg-gray-300 w-full">
                <div className="mb-3 ml-20">
                    <TextField
                        id="input-with-icon-textfield"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                </div>
                <>
                    <div className="flex  overflow-x-scroll whitespace-nowrap">
                        <div className="rounded-full bg-white mb-2 w-fit h-1/6 ml-2">
                            <div className="text-center font-bold text-base mb-2">New Balance</div>
                        </div>
                        <div className="rounded-full bg-white mb-2 w-fit h-1/6 ml-2">
                            <div className="text-center font-bold text-l mb-2">Другой бренд</div>
                        </div>
                        <div className="rounded-full bg-white mb-2 w-fit h-1/6 ml-2">
                            <div className="text-center font-bold text-l mb-2">Другой бренд</div>
                        </div>
                        <div className="rounded-full bg-white mb-2 w-fit h-1/6 ml-2">
                            <div className="text-center font-bold text-l mb-2">Еще бренд</div>
                        </div>
                        <div className="rounded-full bg-white mb-2 w-fit h-1/6 ml-2">
                            <div className="text-center font-bold text-l mb-2">Еще бренд</div>
                        </div>
                        <div className="rounded-full bg-white mb-2 w-fit h-1/6 ml-2">
                            <div className="text-center font-bold text-l mb-2">Еще бренд</div>
                        </div>
                        <div className="rounded-full bg-white mb-2 w-fit h-1/6 ml-2">
                            <div className="text-center font-bold text-l mb-2">Еще бренд</div>
                        </div>
                        <div className="rounded-full bg-white mb-2 w-fit h-1/6 ml-2">
                            <div className="text-center font-bold text-l mb-2">Еще бренд</div>
                        </div>
                    </div>
                    <div className="grid gap-2 grid-cols-2 grid-rows-2 w-fit mb-2">
                        {products.map(product => <Products_Unlimited product={product} key={product.id}/>)}
                    </div>
                    <div className="grid gap-2 grid-cols-2 grid-rows-2 w-fit mb-2">
                        {products.map(product => <Products_Unlimited product={product} key={product.id}/>)}
                    </div>
                    <div className="grid gap-2 grid-cols-2 grid-rows-2 w-fit mb-2">
                        {products.map(product => <Products_Unlimited product={product} key={product.id}/>)}
                    </div>
                    <div className="grid gap-2 grid-cols-2 grid-rows-2 w-fit mb-2">
                        {products.map(product => <Products_Unlimited product={product} key={product.id}/>)}
                    </div>
                </>
            </div>
        </>
    )
}