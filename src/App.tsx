import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Cart_page} from "./pages/Cart";
import {Product_Unlimited_Page} from "./pages/Product_Unlimited_Page";
import AdminPanel from "./admin/AdminPanel";

function App() {
    // @ts-ignore
    const tg = window.Telegram.WebApp;
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Product_Unlimited_Page/>}/>
                <Route path="/cart" element={<Cart_page/>}/>
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
