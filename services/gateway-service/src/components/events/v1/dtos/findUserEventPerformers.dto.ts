import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class FindUserEventPerformersDto {
    @IsInt()
    @Type(() => Number)
    eventId: number;
}