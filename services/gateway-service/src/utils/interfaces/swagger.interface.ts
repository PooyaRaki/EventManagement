import { NestFastifyApplication } from '@nestjs/platform-fastify';

export interface SwaggerInput {
    tag: string;
    path: string;
    title: string;
    version: string;
    description: string;
    app: NestFastifyApplication;
}