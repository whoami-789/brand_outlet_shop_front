import React from 'react';
import {BrowserRouter, Link, Route, Router, Routes} from "react-router-dom";
import {Products_page} from "./pages/Products";
import {Cart_page} from "./pages/Cart";
import {ProductsSwetshot_page} from "./pages/Product-Sewtshot";
import {Product_Unlimited_Page} from "./pages/Product_Unlimited_Page";

function App() {
    // @ts-ignore
    const tg = window.Telegram.WebApp;
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Product_Unlimited_Page />} />
                <Route path="/cart" element={<Cart_page />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
