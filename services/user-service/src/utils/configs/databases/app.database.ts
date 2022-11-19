import { MongooseConfiguration } from '@utils/types';

export const MongoDatabaseConfig: MongooseConfiguration = {
    url: process.env.MONGO_URI ?? '',
    options: {
        auth: {
            username: process.env.MONGO_USERNAME,
            password: process.env.MONGO_PASSWORD,
        }
    }
}