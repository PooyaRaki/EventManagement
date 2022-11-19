import { ObjectId } from 'mongoose';
import { IsMongoObjectId } from '@utils/validators';

export class AddInstrumentPayload {
    @IsMongoObjectId()
    id: ObjectId;
}