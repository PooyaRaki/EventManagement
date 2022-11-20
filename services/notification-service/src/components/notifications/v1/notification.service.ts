import { Injectable } from '@nestjs/common';
import { NotificationPayload } from './payloads';

@Injectable()
export class NotificationService {
    public async sendPush(input: NotificationPayload): Promise<void>
    {
        console.log(input);
        console.log('Notification has been pushed to users!');
    }
    public async sendEmail(input: NotificationPayload): Promise<void>
    {
        console.log(input);
        console.log('Notification has been emailed to users!');
    }
}