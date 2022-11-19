import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    public readonly description?: string;

    @IsArray()
    @ApiProperty()
    @IsString({ each: true, })
    public readonly instruments: string[];
}