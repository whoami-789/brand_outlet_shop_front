import axios from "axios";
import { useState } from "react";

// Инициализация токена пустой строкой
const initialSessionToken = "";

export function useSessionToken() {
    // Используйте useState для управления токеном
    const [sessionToken, setSessionToken] = useState(initialSessionToken);

    // Функция для генерации токена
    async function generateSessionToken() {
        try {
            console.log('Запрос на генерацию токена сессии отправлен');
            const response = await axios.post<{ sessionToken: string }>('https://brand-outlet.shop/api/order/create-session');
            const newSessionToken = response.data.sessionToken;
            console.log('Сессионный токен получен:', newSessionToken);

            // Обновите состояние с полученным токеном
            setSessionToken(newSessionToken);
        } catch (error) {
            console.error('Ошибка при генерации токена сессии:', error);
        }
    }

    // Возвращаем текущий токен и функцию для его обновления
    return { sessionToken, generateSessionToken };
}
