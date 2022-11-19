import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule } from '@nestjs/microservices';
import { AuthMicroserviceConfig } from '@utils/configs/microservices';
import { AuthGuardModule } from '@utils/guards/auth';

@Module({
    imports: [
        ClientsModule.register([
            AuthMicroserviceConfig,
        ]),
        AuthGuardModule,
    ],
    controllers: [
        AuthController,
    ]
})
export class AuthModuleV1 {
    //
}