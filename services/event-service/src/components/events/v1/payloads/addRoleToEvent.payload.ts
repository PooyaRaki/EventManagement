import { IsInt, IsNumber } from 'class-validator';
import { IsFilledString } from '@utils/validators';

export class AddRoleToEventPayload {
    @IsNumber()
    seats: number;

    @IsFilledString()
    instrumentId: string;

    @IsInt()
    eventId: number;
}