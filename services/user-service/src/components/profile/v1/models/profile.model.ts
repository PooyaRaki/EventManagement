import { Instrument } from '@components/instrument/v1/models';
import {
    HydratedDocument,
    ObjectId,
    SchemaTypes,
} from 'mongoose';
import {
    Prop,
    Schema,
    SchemaFactory,
} from '@nestjs/mongoose';

@Schema({
    timestamps: true,
})
export class Profile {
    @Prop({
        auto: true,
        type: SchemaTypes.ObjectId,
    })
    public readonly _id: ObjectId;

    @Prop({
        type: SchemaTypes.Number,
    })
    public readonly userId: number;

    @Prop({
        required: false,
        maxlength: 1000,
        type: SchemaTypes.String
    })
    public readonly description?: string;

    @Prop({
        unique: true,
        required: true,
        type: [{ type: SchemaTypes.ObjectId, ref: Instrument.name, }],
    })
    public readonly instruments: Instrument[];
}

export type ProfileDocument = HydratedDocument<Profile>;
export const ProfileSchema = SchemaFactory.createForClass(Profile);