import React, {useEffect, useState} from "react";
import {useProducts} from "../hooks/products";
import {Products_Unlimited} from "../components/Product_unlimited";
import axios from "axios";
import {Product} from "../models";
import {CartButton} from "../components/CartButton";
import {Link} from "react-router-dom";
import {generateSessionToken} from "../useSessionToken";

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
    const [sessionToken, setSessionToken] = useState(""); // Состояние для хранения токена сессии
    const [cartItemCount, setCartItemCount] = useState(0); // Состояние для количества товаров в корзине


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
        if (!sessionToken) {
            generateSessionToken();
            setSessionToken(sessionToken)// Вызываем функцию только если токен еще не сохранен
        }
    }, [sessionToken]);

    const filteredProducts = selectedCategory
        ? products.filter(product => product.categoryName === selectedCategory)
        : products;

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };


    return (
        <div className="relative bg-gray-300 w-full h-full">
            <div className="flex overflow-x-scroll whitespace-nowrap">
                {categories.map((category, index) => (
                    <div
                        className="rounded bg-white m-2 w-fit h-1/6 ml-2"                        key={index}
                        onClick={() => handleCategoryClick(category)}
                    >
                        <div className="text-center font-bold text-base m-1">{category}</div>
                    </div>
                ))}
            </div>
            <div className="ml-0.5 grid gap-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 w-full mb-2 z-0">
                {filteredProducts.map((product) => (
                    <Products_Unlimited product={product} key={product.id} />
                ))}
            </div>
            <div className="absolute bottom-0 left-0 p-2 z-10" style={{ zIndex: 10, position: 'relative' }}>
                <Link to="/cart">
                    <CartButton onClick={() => setCartVisible(!cartVisible)} cartItemCount={cartItemCount} />
                </Link>
            </div>
            <div className="bg-gray-300 p-4 border -mt-4 w-full md:w-80 ml-5">
                <p>
                    Не нашли нужный товар? Не беда - Напишите нам{' '}
                    <a
                        href="https://t.me/Brand_Outlet_Buy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        в телеграм
                    </a>{' '}
                    и отправьте интересующий вас товар (это может быть фото с пойзона, или еще откуда нибудь) Мы сразу свяжемся с вами и подскажем стоимость
                </p>
            </div>
        </div>
    )
}