import React, {useEffect, useState} from "react";
import {useProducts} from "../hooks/products";
import {Products_Unlimited} from "../components/Product_unlimited";
import axios from "axios";
import {Product} from "../models";
import {CartButton} from "../components/CartButton";
import {Link} from "react-router-dom";
import {useSessionToken} from "../sessionToken"; // Импортируйте компонент кнопки корзины

function getUniqueCategories(products: Product[]) {
    const uniqueCategories = new Set<string>();
    products.forEach((product) => {
        uniqueCategories.add(product.categoryName);
    });
    return Array.from(uniqueCategories);
}

export function Product_Unlimited_Page() {
    const {products} = useProducts();
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [cartVisible, setCartVisible] = useState(false); // Состояние для видимости корзины
    const [dataFetched, setDataFetched] = useState(false);
    const { sessionToken, generateSessionToken } = useSessionToken();


    useEffect(() => {
        const fetchData = async () => {
            if (dataFetched || !hasMore || loading) return;
            setLoading(true);
            try {
                const response = await axios.get<Product[]>(`https://brand-outlet.shop/api/products/`);
                if (response.data.length === 0) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                    const uniqueCategories = getUniqueCategories(response.data);
                    setCategories(uniqueCategories);
                    setDataFetched(true); // Устанавливаем флаг, что данные были загружены
                }
            } catch (error) {
                console.error('Ошибка при получении данных о продуктах:', error);
            }
            setLoading(false);
        };

        fetchData();
    }, [loading, hasMore, dataFetched]);

    useEffect(() => {
        // Вызывайте функцию generateSessionToken при монтировании компонента
        generateSessionToken();
    }, []);

    const filteredProducts = selectedCategory
        ? products.filter(product => product.categoryName === selectedCategory)
        : products;

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };


    return (
        <div className="relative bg-gray-300 w-full h-full">
            {/*<div className="mb-3 ml-16">*/}
            {/*    <TextField*/}
            {/*        id="input-with-icon-textfield"*/}
            {/*        InputProps={{*/}
            {/*            startAdornment: (*/}
            {/*                <InputAdornment position="start">*/}
            {/*                    <SearchIcon/>*/}
            {/*                </InputAdornment>*/}
            {/*            ),*/}
            {/*        }}*/}
            {/*        variant="standard"*/}
            {/*    />*/}
            {/*</div>*/}
            <div className="flex overflow-x-scroll whitespace-nowrap">
                {categories.map((category, index) => (
                    <div
                        className="rounded bg-white m-2 w-fit h-1/6 ml-2"
                        key={index}
                        onClick={() => handleCategoryClick(category)}
                    >
                        <div className="text-center font-bold text-base m-1">{category}</div>
                    </div>
                ))}
            </div>
            <div className="grid gap-2 grid-cols-2 grid-rows-2 w-fit mb-2 z-0">
                {filteredProducts.map(product => <Products_Unlimited product={product} key={product.id}/>)}
            </div>
                <div className="absolute bottom-0 left-0 p-2 z-10" style={{zIndex: 10, position: 'relative'}}>
                    <Link to="/cart">
                        <CartButton onClick={() => setCartVisible(!cartVisible)}/>
                    </Link>
                </div>
        </div>
    )
}
