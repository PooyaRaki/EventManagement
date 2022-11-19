import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber } from 'class-validator';
import { IsFilledString } from '@utils/validators';

export class AddRoleToEventDto {
    @IsNumber()
    @ApiProperty()
    seats: number;

    @ApiProperty()
    @IsFilledString()
    instrumentId: string;

    @IsInt()
    @ApiProperty()
    eventId: number;
}