import { NotificationModuleV1 } from '@components/notifications/v1';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    NotificationModuleV1
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
