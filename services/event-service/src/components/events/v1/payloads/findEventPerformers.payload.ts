import { IsInt } from 'class-validator';

export class FindEventPerformersPayload {
    @IsInt()
    eventId: number;
}