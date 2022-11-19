import { ObjectId } from 'mongoose';
import { LimitOffsetPayload } from '@utils/payloads';

export class FindProfilePayload extends LimitOffsetPayload {
    //
}

export class FindProfileByIdPayload {
    _id: ObjectId;
}

export class FindProfileByUserIdPayload {
    userId: number;
}