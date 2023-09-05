import axios from "axios";
import { useEffect, useState } from "react";

export function useSessionToken() {
    const [sessionToken, setSessionToken] = useState<string | null>(null);

    // Функция для генерации сессионного токена
    async function generateSessionToken() {
        try {
            console.log("Запрос на генерацию токена сессии отправлен");
            const response = await axios.post<{ sessionToken: string }>(
                "https://brand-outlet.shop/api/order/create-session"
            );
            const newSessionToken = response.data.sessionToken;
            console.log("Сессионный токен получен:", newSessionToken);

            // Сохраняем токен в локальном хранилище
            localStorage.setItem("sessionToken", newSessionToken);

            // Обновляем состояние с полученным токеном
            setSessionToken(newSessionToken);
        } catch (error) {
            console.error("Ошибка при генерации токена сессии:", error);
        }
    }

    useEffect(() => {
        // Попытка получить токен из локального хранилища при монтировании
        const storedSessionToken = localStorage.getItem("sessionToken");
        if (storedSessionToken) {
            setSessionToken(storedSessionToken);
        }
    }, []);

    return { sessionToken, generateSessionToken };
}
