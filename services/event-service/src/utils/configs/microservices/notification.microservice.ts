import {
    Transport,
    ClientProviderOptions,
} from '@nestjs/microservices';

export const NotificationMicroserviceConfig: ClientProviderOptions = {
    name: 'NOTIFICATION_SERVICE',
    transport: Transport.RMQ,
    options: {
        queue: process.env.NOTIFICATION_API_QUEUE,
        urls: process.env.NOTIFICATION_API_URI?.split(','),
        queueOptions: {
            durable: true,
        },
    },
}