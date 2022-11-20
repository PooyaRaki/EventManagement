import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationMicroserviceConfig } from '@utils/configs/microservices';
import { MicroserviceMessageRequest, MicroserviceResponse } from '@utils/helpers/microservice.helper';
import { INotification } from './interfaces';

@Injectable()
export class NotificationService {
    public constructor(
        @Inject(NotificationMicroserviceConfig.name)
        private readonly notificationConfig: ClientProxy,
    ) {
        //
    }

    /**
     * Sends an event to the notification service to push a message to user devices
     *
     * @returns {Promise<void>}
     */
    public async sendPush(input: INotification): Promise<void>
    {
        try {
            return await MicroserviceResponse(
                MicroserviceMessageRequest<INotification, void>({
                    data: input,
                    client: this.notificationConfig,
                    pattern: 'notification.v1.send.push',
                }),
            );
        } catch (error: unknown) {
            // No logic now !
        }
    }

    /**
     * Sends an event to the notification service to email a message to users
     *
     * @returns {Promise<void>}
     */
    public async sendEmail(): Promise<void>
    {
        try {
            return await MicroserviceResponse(
                MicroserviceMessageRequest<null, void>({
                    client: this.notificationConfig,
                    pattern: 'notification.v1.send.email',
                }),
            );
        } catch (error: unknown) {
            // No logic now !
        }
    }
}