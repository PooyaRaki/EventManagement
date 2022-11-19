import { IsInt } from 'class-validator';

export class StartEventDto {
    @IsInt()
    eventId: number;
}