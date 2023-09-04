import axios from "axios";

export let sessionToken: string | null = null;

export async function generateSessionToken() {
    try {
        const response = await axios.post<{ sessionToken: string }>('https://brand-outlet.shop/api/order/create-session');
        sessionToken = response.data.sessionToken;
        console.log('Сессионный токен:', sessionToken); // Проверьте, что значение выводится корректно
        return sessionToken; // Вернуть токен из функции
    } catch (error) {
        console.error('Ошибка при генерации токена сессии:', error);
        return null; // Вернуть null в случае ошибки
    }
}
