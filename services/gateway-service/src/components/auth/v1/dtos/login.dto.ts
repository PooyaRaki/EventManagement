import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @IsString()
    @ApiProperty()
    public readonly email: string;

    @IsString()
    @ApiProperty()
    public readonly password: string;
}