import { Module } from '@nestjs/common';
import { AuthGuardModule } from '@utils/guards/auth';
import { ClientsModule } from '@nestjs/microservices';
import { InstrumentController } from './instrument.controller';
import { UserMicroserviceConfig } from '@utils/configs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            UserMicroserviceConfig,
        ]),
        AuthGuardModule,
    ],
    controllers: [
        InstrumentController,
    ],
})
export class InstrumentModuleV1 {
    //
}