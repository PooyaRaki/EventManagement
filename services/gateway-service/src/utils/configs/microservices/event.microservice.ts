import {
    Transport,
    ClientProviderOptions,
} from '@nestjs/microservices';

export const EventMicroserviceConfig: ClientProviderOptions = {
    name: 'EVENT_SERVICE',
    transport: Transport.RMQ,
    options: {
        queue: process.env.EVENT_API_QUEUE,
        urls: process.env.EVENT_API_URI?.split(','),
        queueOptions: {
            durable: true,
        },
    },
}