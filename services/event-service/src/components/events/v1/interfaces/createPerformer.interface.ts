import { UserId } from '@utils/types';

export interface ICreatePerformer {
    userId: UserId;
    roleId: number;
    eventId: number;
}