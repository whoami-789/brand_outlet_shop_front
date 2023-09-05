import axios from "axios";
import { useState, useEffect } from "react";

const SESSION_TOKEN_KEY = "sessionToken"; // Ключ для хранения токена в локальном хранилище

export function useSessionToken() {
    // Используйте useState для управления токеном
    const [sessionToken, setSessionToken] = useState<string | null>(null);

    // Функция для генерации токена
    async function generateSessionToken() {
        try {
            // Проверяем, есть ли токен в локальном хранилище
            const storedSessionToken = localStorage.getItem(SESSION_TOKEN_KEY);

            if (storedSessionToken) {
                console.log('Сессионный токен взят из локального хранилища:', storedSessionToken);
                setSessionToken(storedSessionToken);
            } else {
                console.log('Запрос на генерацию токена сессии отправлен');
                const response = await axios.post<{ sessionToken: string }>('https://brand-outlet.shop/api/order/create-session');
                const newSessionToken = response.data.sessionToken;
                console.log('Сессионный токен получен:', newSessionToken);

                // Сохраняем токен в локальное хранилище
                localStorage.setItem(SESSION_TOKEN_KEY, newSessionToken);

                // Обновите состояние с полученным токеном
                setSessionToken(newSessionToken);
            }
        } catch (error) {
            console.error('Ошибка при генерации токена сессии:', error);
        }
    }

    // Возвращаем текущий токен и функцию для его обновления
    return { sessionToken, generateSessionToken };
}
