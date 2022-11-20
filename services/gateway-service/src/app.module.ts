import { Module } from '@nestjs/common';
import { AppService } from 'app.service';
import { AppController } from 'app.controller';
import { AuthModuleV1 } from '@components/auth/v1';
import { EventModuleV1 } from '@components/events/v1';
import { ProfileModuleV1 } from '@components/profile/v1';
import { InstrumentModuleV1 } from '@components/instrument/v1';

@Module({
  imports: [
    AuthModuleV1,
    EventModuleV1,
    ProfileModuleV1,
    InstrumentModuleV1,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
