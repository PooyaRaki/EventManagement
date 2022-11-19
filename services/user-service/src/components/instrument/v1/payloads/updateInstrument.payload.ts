import { ObjectId } from 'mongoose';
import { IsMongoObjectId } from '@utils/validators';
import {
    Max,
    IsString,
    IsOptional,
} from 'class-validator';

export class UpdateInstrumentPayload {
    @IsString()
    @IsMongoObjectId()
    public readonly _id: ObjectId;

    @Max(100)
    @IsString()
    @IsOptional()
    public readonly name?: string;

    @Max(1000)
    @IsString()
    @IsOptional()
    public readonly description?: string;

    @Max(1000)
    @IsString()
    @IsOptional()
    public readonly logo?: string;
}