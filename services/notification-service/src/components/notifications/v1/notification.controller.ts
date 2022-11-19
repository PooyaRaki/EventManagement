import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
    public constructor(
        private readonly notificationService: NotificationService,
    ) {
        //
    }

    @MessagePattern('notification.v1.send')
    public async send(): Promise<void>
    {
        return await this.notificationService.send();
    }
}