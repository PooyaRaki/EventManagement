import {
    IsString,
    IsISO8601,
} from 'class-validator';

export class CreateEventPayload {
    @IsString()
    title: string;

    @IsISO8601()
    startedAt: Date;

    @IsString()
    description?: string;
}