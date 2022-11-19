import { ObjectId } from 'mongoose';
import { IsMongoObjectId } from '@utils/validators';
import {
    IsArray,
    IsString,
    MaxLength,
    IsOptional,
} from 'class-validator';

export class CreateProfilePayload {
    @IsString()
    @IsOptional()
    @MaxLength(1000)
    public readonly description?: string;

    @IsArray()
    @IsMongoObjectId({ each: true, })
    public readonly instruments: ObjectId[];
}