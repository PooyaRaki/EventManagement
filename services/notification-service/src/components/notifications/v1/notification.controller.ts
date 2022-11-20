import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MessagePayload } from '@utils/decorators';
import { NotificationService } from './notification.service';
import { NotificationPayload } from './payloads';

@Controller()
export class NotificationController {
    public constructor(
        private readonly notificationService: NotificationService,
    ) {
        //
    }

    @EventPattern('notification.v1.send.push')
    public async sendPush(
        @MessagePayload() payload: NotificationPayload,
    ): Promise<void>
    {
        return await this.notificationService.sendPush(payload);
    }

    @EventPattern('notification.v1.send.email')
    public async sendEmail(
        @MessagePayload() payload: NotificationPayload,
    ): Promise<void>
    {
        return await this.notificationService.sendEmail(payload);
    }
}