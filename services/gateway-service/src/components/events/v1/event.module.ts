import { CacheModule, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ProfileCacheConfig } from '@utils/configs/caches';
import { EventMicroserviceConfig } from '@utils/configs/microservices';
import { AuthGuardModule } from '@utils/guards/auth';
import { EventController } from './event.controller';
import { PerformersController } from './performers.controller';

@Module({
    imports: [
        CacheModule.register(ProfileCacheConfig),
        ClientsModule.register([
            EventMicroserviceConfig,
        ]),
        AuthGuardModule,
    ],
    controllers: [
        EventController,
        PerformersController,
    ],
})
export class EventModuleV1 {
    //
}