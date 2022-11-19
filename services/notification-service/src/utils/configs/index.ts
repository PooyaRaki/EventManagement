if (!process.env.NODE_ENV) {
    require('dotenv').config();
}

export * from './microservice.config';