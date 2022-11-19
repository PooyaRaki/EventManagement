import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddProfileInstrumentDto {
    @IsString()
    @ApiProperty()
    id: string;
}