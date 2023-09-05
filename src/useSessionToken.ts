import axios from "axios";
import { useState, useEffect } from "react";

const SESSION_TOKEN_KEY = "sessionToken"; // Ключ для хранения токена в локальном хранилище

export function useSessionToken() {
    // Используйте useState для управления токеном
    const [sessionToken, setSessionToken] = useState<string | null>(null);

    // Функция для генерации токена
    async function generateSessionToken() {
        try {
            const response = await axios.post<{ sessionToken: string }>('https://brand-outlet.shop/api/order/create-session');
            const newSessionToken = response.data.sessionToken;
            console.log('Сессионный токен получен:', newSessionToken);

            // Сохраните сессионный токен в локальном хранилище
            localStorage.setItem('sessionToken', newSessionToken);

            // Обновите состояние с полученным токеном
            setSessionToken(newSessionToken);
        } catch (error) {
            console.error('Ошибка при генерации токена сессии:', error);
        }
    }

    // Возвращаем текущий токен и функцию для его обновления
    return { sessionToken, generateSessionToken };
}
