import { IsInt, IsString } from 'class-validator';

export class JoinEventPayload {
    @IsInt()
    public readonly eventId: number;

    @IsString()
    public readonly instrumentId: string;
}