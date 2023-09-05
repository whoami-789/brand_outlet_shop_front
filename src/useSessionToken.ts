// sessionToken.ts

import axios from "axios";

let sessionToken: string | null = null;

async function generateSessionToken() {
    try {
        const response = await axios.post<string>('https://brand-outlet.shop/api/order/create-session'); // Изменим тип ответа на строку
        const newSessionToken = response.data; // Токен уже является строкой, не нужно обращаться к response.data.sessionToken
        console.log(newSessionToken);

        // Сохраняем токен в localStorage
        localStorage.setItem("sessionToken", newSessionToken);

        // Присваиваем его переменной sessionToken
        sessionToken = newSessionToken;
        console.log(sessionToken);
        console.log(localStorage.getItem("sessionToken"));

        return newSessionToken;
    } catch (error) {
        console.error('Ошибка при генерации токена сессии:', error);
        throw error;
    }
}

// При инициализации, попытайтесь восстановить токен из localStorage
const storedSessionToken = localStorage.getItem("sessionToken");
if (storedSessionToken) {
    sessionToken = storedSessionToken;
}

export { sessionToken, generateSessionToken };
