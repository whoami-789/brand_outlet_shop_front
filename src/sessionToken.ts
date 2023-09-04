import axios from "axios";

let sessionToken: string | null = null;

export async function generateSessionToken() {
    try {
        console.log('Запрос на генерацию токена сессии отправлен');
        const response = await axios.post<{ sessionToken: string }>('https://brand-outlet.shop/api/order/create-session');
        sessionToken = response.data.sessionToken;
        console.log('Сессионный токен получен:', sessionToken);
    } catch (error) {
        console.error('Ошибка при генерации токена сессии:', error);
    }
}

export { sessionToken };
