import { IsInt } from 'class-validator';
import { IsFilledString } from '@utils/validators';

export class JoinEventDto {
    @IsInt()
    public readonly eventId: number;

    @IsFilledString()
    public readonly instrumentId: string;
}