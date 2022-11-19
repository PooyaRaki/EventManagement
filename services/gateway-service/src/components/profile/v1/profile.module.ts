import { CacheModule, Module } from '@nestjs/common';
import { AuthGuardModule } from '@utils/guards/auth';
import { ClientsModule } from '@nestjs/microservices';
import { ProfileController } from './profile.controller';
import { ProfileCacheConfig } from '@utils/configs/caches';
import { UserMicroserviceConfig } from '@utils/configs/microservices';

@Module({
    imports: [
        CacheModule.register(ProfileCacheConfig),
        ClientsModule.register([
            UserMicroserviceConfig,
        ]),
        AuthGuardModule,
    ],
    controllers: [
        ProfileController,
    ],
})
export class ProfileModuleV1 {
    //
}