import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModuleV1 } from '@components/events/v1';
import { AppDatabaseConfig } from '@utils/configs/testApp.database.ts';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDatabaseConfig),
    EventModuleV1,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
