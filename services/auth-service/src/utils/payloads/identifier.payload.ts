import { IsInt, IsPositive } from 'class-validator';

export class IdentifierPayload {
    @IsInt()
    @IsPositive()
    id: number;
}