if (!process.env.NODE_ENV) {
    require('dotenv').config();
}

export * from './app.config';
export * from './auth.config';
export * from './compression.config';
export * from './microservice.config';