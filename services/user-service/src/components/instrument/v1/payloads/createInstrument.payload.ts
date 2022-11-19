import {
    IsString,
    IsOptional,
    MaxLength,
} from 'class-validator';

export class CreateInstrumentPayload {
    @MaxLength(100)
    @IsString()
    public readonly name: string;

    @MaxLength(1000)
    @IsString()
    @IsOptional()
    public readonly description?: string;

    @MaxLength(1000)
    @IsString()
    @IsOptional()
    public readonly logo?: string;
}