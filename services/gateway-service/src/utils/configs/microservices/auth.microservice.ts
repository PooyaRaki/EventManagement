import {
    Transport,
    ClientProviderOptions,
} from '@nestjs/microservices';

export const AuthMicroserviceConfig: ClientProviderOptions = {
    name: 'AUTH_SERVICE',
    transport: Transport.RMQ,
    options: {
        queue: process.env.AUTH_API_QUEUE,
        urls: process.env.AUTH_API_URI?.split(','),
        queueOptions: {
            durable: true,
        },
    },
}