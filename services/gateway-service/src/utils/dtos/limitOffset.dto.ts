import { Type } from 'class-transformer';
import {
    Min,
    Max,
    IsInt,
    IsPositive,
} from 'class-validator';

export class LimitOffsetDto {
    @Min(1)
    @IsInt()
    @Max(20)
    @IsPositive()
    @Type(() => Number)
    public readonly limit: number;

    @Min(0)
    @IsInt()
    @Type(() => Number)
    public readonly offset: number;
}