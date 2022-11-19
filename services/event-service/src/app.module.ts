import { EventModuleV1 } from '@components/events/v1';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDatabaseConfig } from '@utils/configs/databases';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDatabaseConfig),
    EventModuleV1,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
