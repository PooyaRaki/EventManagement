import { IsInt } from 'class-validator';

export class StartEventPayload {
    @IsInt()
    eventId: number;
}