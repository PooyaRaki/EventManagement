import {
    IsEmail,
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
    IsPhoneNumber,
} from 'class-validator';

export class CreateUserPayload {
    @IsEmail()
    @MaxLength(200)
    public readonly email: string;

    @IsOptional()
    @IsPhoneNumber()
    public readonly phone?: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    @MaxLength(100)
    public readonly firstName?: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(100)
    public readonly lastName?: string;

    @IsString()
    @MaxLength(200)
    public readonly password: string;

    @IsString()
    @MaxLength(200)
    public readonly passwordConfirm: string;
}