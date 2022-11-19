import { IsEnum, IsOptional } from 'class-validator';
import { LimitOffsetDto } from '@utils/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { EventStatus } from '@components/events/v1/enums';

export class FindUserEventsDto extends LimitOffsetDto {
    @IsOptional()
    @ApiProperty()
    @IsEnum(EventStatus)
    status?: EventStatus;
}