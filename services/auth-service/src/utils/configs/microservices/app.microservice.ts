import {
    Transport,
    RmqOptions,
} from '@nestjs/microservices';

export const AppMicroServiceConfig: RmqOptions = {
    transport: Transport.RMQ,
    options: {
        urls: process.env.APP_SERVICE_URL?.split(','),
        queue: process.env.APP_SERVICE_QUEUE || 'Auth',
        queueOptions: {
            durable: true,
        }
    }
}