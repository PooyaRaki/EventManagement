import { Module } from '@nestjs/common';
import { NotificationModuleV1 } from '@components/notifications/v1';

@Module({
  imports: [
    NotificationModuleV1,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
