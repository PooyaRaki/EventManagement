import { Event } from './event.interface';
import { EventRole } from './eventRole.interface';

export interface Performers {
    readonly id: number;
    readonly event: Event;
    readonly userId: number;
    readonly roleId: number;
    readonly role: EventRole;
    readonly eventId: number;
}