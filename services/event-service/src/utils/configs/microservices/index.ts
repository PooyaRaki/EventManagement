if (!process.env.NODE_ENV) {
    require('dotenv').config();
}

export * from './app.microservice';
export * from './notification.microservice';