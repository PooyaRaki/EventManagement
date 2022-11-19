import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    @ApiProperty()
    public readonly email: string;

    @IsOptional()
    @IsPhoneNumber()
    @ApiPropertyOptional()
    public readonly phone?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    public readonly firstName?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    public readonly lastName?: string;

    @IsString()
    @ApiProperty()
    public readonly password: string;

    @IsString()
    @ApiProperty()
    public readonly passwordConfirm: string;
}