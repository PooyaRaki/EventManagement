import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInstrumentDto {
    @IsString()
    @ApiProperty()
    public readonly name: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    public readonly description?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    public readonly logo?: string;
}