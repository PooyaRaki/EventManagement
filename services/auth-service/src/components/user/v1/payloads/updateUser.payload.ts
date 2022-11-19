import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPayload } from '@components/user/v1/payloads/createUser.payload';
import {
    IsInt,
    IsPositive,
} from 'class-validator';

export class UpdateUserPayload extends PartialType(CreateUserPayload) {
    @IsInt()
    @IsPositive()
    public readonly id: number;
}