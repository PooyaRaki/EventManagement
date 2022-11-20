import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { NotificationMicroserviceConfig } from '@utils/configs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            NotificationMicroserviceConfig,
        ]),
    ],
    providers: [
        NotificationService,
    ],
    exports: [
        NotificationService,
    ],
})
export class NotificationModuleV1 {
    //
}