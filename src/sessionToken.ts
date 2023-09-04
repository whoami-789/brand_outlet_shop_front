// sessionToken.ts
import axios from "axios";


export async function generateSessionToken() {
    try {
        const response = await axios.post<{ sessionToken: string }>('https://brand-outlet.shop/api/order/create-session');
        let sessionToken = response.data.sessionToken;
        console.log('Сессионный токен:', sessionToken); // Проверьте, что значение выводится корректно
    } catch (error) {
        console.error('Ошибка при генерации токена сессии:', error);
    }
}

