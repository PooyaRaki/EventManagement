import {
    IsString,
    MaxLength,
} from 'class-validator';

export class LoginUserPayload {
    @IsString()
    @MaxLength(200)
    public readonly email: string;

    @IsString()
    @MaxLength(200)
    public readonly password: string;
}