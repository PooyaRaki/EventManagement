import {
    IsString,
    IsISO8601,
} from 'class-validator';
import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateEventDto {
    @IsString()
    @ApiProperty()
    title: string;

    @IsISO8601()
    @ApiProperty()
    startedAt: Date;

    @IsString()
    @ApiPropertyOptional()
    description?: string;
}