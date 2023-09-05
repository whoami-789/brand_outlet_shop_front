import axios from "axios";

// Функция для сохранения токена в localStorage
function setSessionToken(token: string) {
    localStorage.setItem("sessionToken", token);
}

// Функция для получения токена из localStorage
function getSessionToken() {
    return localStorage.getItem("sessionToken");
}

let sessionToken: string | null = getSessionToken() || null;

async function generateSessionToken() {
    try {
        console.log('Запрос на генерацию токена сессии отправлен');
        const response = await axios.post<{ sessionToken: string }>('https://brand-outlet.shop/api/order/create-session');
        sessionToken = response.data.sessionToken;

        // Сохраняем токен в localStorage
        setSessionToken(sessionToken);
        console.log('Сессионный токен получен:', sessionToken);
        console.log(localStorage)
    } catch (error) {
        console.error('Ошибка при генерации токена сессии:', error);
    }
}

export { sessionToken, generateSessionToken };
