import React from "react";
import {Products} from "../components/Products";

export function Products_page() {
    return (
        <div className="bg-gray-300 w-full">
            <div className="grid gap-2 grid-cols-2 grid-rows-2 w-fit">
                <Products/>
                <Products/>
                <Products/>
                <Products/>
                <Products/>
                <Products/>
                <Products/>
                <Products/>
                <Products/>
                <Products/>
                <Products/>
                <Products/>
                <Products/>
            </div>
        </div>
    );
}
