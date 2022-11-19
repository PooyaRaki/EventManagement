import {
    Transport,
    MicroserviceOptions,
} from '@nestjs/microservices';

export const AppMicroServiceConfig: MicroserviceOptions = {
    transport: Transport.RMQ,
    options: {
        urls: process.env.APP_SERVICE_URL?.split(','),
        queue: process.env.APP_SERVICE_QUEUE || 'event',
        queueOptions: {
            durable: true,
        }
    }
}