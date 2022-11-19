import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModuleV1 } from '@components/user/v1';
import { AppDatabaseConfig } from '@utils/configs/databases';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDatabaseConfig),
    UserModuleV1,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
