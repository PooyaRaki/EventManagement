import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppMicroServiceConfig } from '@utils/configs/microservices';
import { HttpValidationFilter, RpcValidationFilter } from '@utils/filters';

(async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    AppMicroServiceConfig,
  );

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RpcValidationFilter());
  app.useGlobalFilters(new HttpValidationFilter());

  await app.listen();
})();