import { Instrument } from '@components/instrument/v1/interfaces';

export interface Profile {
    readonly _id: string;
    readonly userId: number;
    readonly description?: string;
    readonly instruments: Instrument[];
}