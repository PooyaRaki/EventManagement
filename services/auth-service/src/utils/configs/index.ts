if (!process.env.NODE_ENV) {
    require('dotenv').config();
}

export * from './user.config';
export * from './token.config';
export * from './microservice.config';