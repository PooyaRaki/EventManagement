import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDatabaseConfig } from '@utils/configs/databases';
import { InstrumentModuleV1 } from '@components/instrument/v1';
import { ProfileModuleV1 } from '@components/profile/v1/profile.module';

@Module({
  imports: [
    MongooseModule.forRoot(MongoDatabaseConfig.url, MongoDatabaseConfig.options),
    ProfileModuleV1,
    InstrumentModuleV1,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
