import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
    public async send(): Promise<void>
    {
        console.log('Notification has been send!');
    }
}