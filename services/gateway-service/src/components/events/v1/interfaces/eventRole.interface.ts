import { Status } from '@utils/enums';
import { Event } from './event.interface';
import { Performers } from './performers.interface';

export interface EventRole {
    readonly id: number;
    readonly event: Event;
    readonly seats: number;
    readonly status: Status;
    readonly eventId: number;
    readonly instrumentId: number;
    readonly performerIds: number;
    readonly performers: Performers[];
}