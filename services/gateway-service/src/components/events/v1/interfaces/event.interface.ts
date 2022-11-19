import { EventRole } from './eventRole.interface';
import { Performers } from './performers.interface';
import { EventStatus } from '@components/events/v1/enums';

export interface Event {
    readonly id: number;
    readonly title: string;
    readonly userId: number;
    readonly startedAt: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly roleIds: number[];
    readonly roles: EventRole[];
    readonly status: EventStatus;
    readonly description?: string;
    readonly performerIds: number[];
    readonly performers: Performers[];
}