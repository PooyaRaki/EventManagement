import {
    IsString,
    IsOptional,
} from 'class-validator';
import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

export class UpdateInstrumentDto {
    @IsString()
    @ApiProperty()
    public readonly _id: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    public readonly name?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    public readonly description?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    public readonly logo?: string;
}