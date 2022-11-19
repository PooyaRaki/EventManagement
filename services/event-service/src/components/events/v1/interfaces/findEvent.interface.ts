import { EventStatus } from '@components/events/v1/enums';

export interface IFindEvent {
    limit: number;
    offset: number;
    status: EventStatus;
}