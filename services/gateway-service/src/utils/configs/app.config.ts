export const AppConfig = {
    addr: process.env.ADDR || '0.0.0.0',
    port: ~~(process.env.PORT || 3000),
    environment: process.env.NODE_ENV,
    inDevelopment: process.env.NODE_ENV === 'development',
    inProduction: process.env.NODE_ENV === 'production',
}