import helmet from '@fastify/helmet'
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import compression from '@fastify/compress';
import { ResponseInterceptor } from '@utils/interceptors';
import {
  AppConfig,
  CompressionConfig,
} from '@utils/configs';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  RpcExceptionFilter,
  HttpExceptionFilter,
} from '@utils/filters';
import {
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Swagger } from '@utils/helpers';

(async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });  

  if (AppConfig.inProduction) {
    await app.register(helmet);
    await app.register(compression, CompressionConfig);
  }

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RpcExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await Swagger({
    app,
    version: '1',
    path: '/docs',
    tag: 'EventManagement',
    title: 'EventManagement',
    description: 'This is an event management service'
  });

  await app.listen(AppConfig.port, AppConfig.addr);
})();