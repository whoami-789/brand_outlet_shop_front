import axios from "axios";

let sessionToken: string | null = null;

async function generateSessionToken() {
    try {
        const response = await axios.post<{ sessionToken: string }>('https://brand-outlet.shop/api/order/create-session');
        sessionToken = response.data.sessionToken; // Предположим, что сервер возвращает токен в поле sessionToken
        console.log(sessionToken);
    } catch (error) {
        console.error('Ошибка при генерации токена сессии:', error);
    }
}

export { sessionToken, generateSessionToken };