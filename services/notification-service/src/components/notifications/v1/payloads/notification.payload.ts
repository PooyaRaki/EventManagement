import { IsArray, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class NotificationPayload {
    @IsArray()
    @IsInt({ each: true, })
    users: number[];

    @IsString()
    @MaxLength(200)
    title: string;

    @IsString()
    @IsOptional()
    @MaxLength(1000)
    description: string;
}