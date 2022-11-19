import {
    Min,
    Max,
    IsInt,
    IsPositive,
} from 'class-validator';

export class LimitOffsetPayload {
    @Min(1)
    @IsInt()
    @Max(20)
    @IsPositive()
    public readonly limit: number;

    @Min(0)
    @IsInt()
    public readonly offset: number;
}