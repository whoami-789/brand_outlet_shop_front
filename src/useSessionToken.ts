// sessionToken.ts

import axios from "axios";

let sessionToken: string = '';

async function generateSessionToken() {
    try {
        const response = await axios.post<{ sessionToken: string }>('https://brand-outlet.shop/api/order/create-session');
        sessionToken = response.data.sessionToken;
        console.log(sessionToken);

        // Возвращаем сгенерированный токен
        return sessionToken;
    } catch (error) {
        console.error('Ошибка при генерации токена сессии:', error);
        throw error; // Если нужно обработать ошибку в другом месте
    }
}

export { sessionToken, generateSessionToken };
