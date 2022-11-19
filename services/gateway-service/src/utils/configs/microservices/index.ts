if (!process.env.NODE_ENV) {
    require('dotenv').config();
}

export * from './user.microservice';
export * from './auth.microservice';
export * from './event.microservice';