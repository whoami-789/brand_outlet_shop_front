// sessionToken.ts
import axios from "axios";

let sessionToken: string | null = null;

async function generateSessionToken(onTokenGenerated: (token: string) => void) {
    try {
        const response = await axios.post<{ sessionToken: string }>('https://brand-outlet.shop/api/order/create-session');
        const newSessionToken = response.data.sessionToken;
        console.log(newSessionToken);
        onTokenGenerated(newSessionToken); // Вызываем функцию обратного вызова с новым токеном
    } catch (error) {
        console.error('Ошибка при генерации токена сессии:', error);
    }
}


export { sessionToken, generateSessionToken };
