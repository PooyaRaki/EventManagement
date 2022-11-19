import { UserAuthGuard } from './user.guard';
import { ClientsModule } from '@nestjs/microservices';
import { AuthCacheConfig } from '@utils/configs/caches';
import { AuthMicroserviceConfig } from '@utils/configs/microservices';
import {
    Module,
    CacheModule,
} from '@nestjs/common';
import { AdminAuthGuard } from './admin.guard';

@Module({
    imports: [
        CacheModule.register(AuthCacheConfig),
        ClientsModule.register([
            AuthMicroserviceConfig,
        ]),
    ],
    providers: [
        UserAuthGuard,
        AdminAuthGuard,
    ],
    exports: [
        CacheModule,
        ClientsModule,
    ],
})
export class AuthGuardModule {
    //
}