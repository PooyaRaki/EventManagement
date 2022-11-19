import {
    Transport,
    ClientProviderOptions,
} from '@nestjs/microservices';

export const UserMicroserviceConfig: ClientProviderOptions = {
    name: 'USER_SERVICE',
    transport: Transport.RMQ,
    options: {
        queue: process.env.USER_API_QUEUE,
        urls: process.env.USER_API_URI?.split(','),
        queueOptions: {
            durable: true,
        },
    },
}