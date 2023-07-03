import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Products_page} from "./pages/Products";
import {Cart_page} from "./pages/Cart";
import {ProductsSwetshot_page} from "./pages/Product-Sewtshot";

function App() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/product" element={ <Products_page/>}/>
                    <Route path="/cart" element={ <Cart_page/>}/>
                    <Route path="/swetshot" element={ <ProductsSwetshot_page/>}/>
                </Routes>
            </BrowserRouter>
    );
}

export default App;
