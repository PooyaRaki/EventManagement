import { Profile } from '@components/profile/v1/interfaces';

export interface Instrument {
    readonly _id: string;
    readonly name: string;
    readonly logo?: string;
    readonly profile: Profile[];
    readonly description?: string;
}