import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: any) {
    app.use(
        '/api', // Здесь указывается путь, по которому будут отправляться запросы к API на бэкенд
        createProxyMiddleware({
            target: 'https://brand-outlet.shop', // Замените на адрес вашего бэкенда
            changeOrigin: true, // Этот параметр обязателен для обхода CORS
        })
    );
};
