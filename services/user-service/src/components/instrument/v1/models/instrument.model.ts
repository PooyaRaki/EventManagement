import {
    SchemaTypes,
    HydratedDocument,
    ObjectId,
} from 'mongoose';
import {
    Prop,
    Schema,
    SchemaFactory,
} from '@nestjs/mongoose';
// import { Profile } from '@components/profile/v1/models';

@Schema({
    timestamps: true,
})
export class Instrument {
    @Prop({
        auto: true,
        type: SchemaTypes.ObjectId,
    })
    public readonly _id: ObjectId;

    @Prop({
        max: 100,
        unique: true,
        required: true,
        type: SchemaTypes.String
    })
    public readonly name: string;

    @Prop({
        max: 1000,
        required: false,
        type: SchemaTypes.String,
    })
    public readonly description?: string;

    @Prop({
        max: 1000,
        required: false,
        type: SchemaTypes.String
    })
    public readonly logo?: string;

    // @Prop({
    //     required: true,
    //     type: [{ type: SchemaTypes.ObjectId, ref: 'Profile', }],
    // })
    // public readonly profile: Profile[];
}

export type InstrumentDocument = HydratedDocument<Instrument>;
export const InstrumentSchema = SchemaFactory.createForClass(Instrument);