import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Products_page} from "./pages/Products";
import {Cart_page} from "./pages/Cart";
import {ProductsSwetshot_page} from "./pages/Product-Sewtshot";
import {Start_Page} from "./pages/StartPage";

function App() {

    // @ts-ignore
    const tg = window.Telegram.WebApp;
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/product" element={ <Products_page/>}/>
                    <Route path="/cart" element={ <Cart_page/>}/>
                    <Route path="/swetshot" element={ <ProductsSwetshot_page/>}/>
                    <Route path="/" element={ <Start_Page/>}/>
                </Routes>
            </BrowserRouter>
    );
}

export default App;
