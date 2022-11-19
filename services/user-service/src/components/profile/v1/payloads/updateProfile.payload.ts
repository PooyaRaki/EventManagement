import { ObjectId } from 'mongoose';
import { IsMongoObjectId } from '@utils/validators';
import {
    IsArray,
    IsString,
    MaxLength,
    IsOptional,
} from 'class-validator';

export class UPdateProfilePayload {
    @IsString()
    @IsMongoObjectId()
    public readonly _id: ObjectId;

    @IsString()
    @IsOptional()
    @MaxLength(1000)
    public readonly description?: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true, })
    public readonly instruments: string[];
}