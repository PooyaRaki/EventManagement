if (!process.env.NODE_ENV) {
    require('dotenv').config();
}

export * from './app.database';
export * from './appTest.database';