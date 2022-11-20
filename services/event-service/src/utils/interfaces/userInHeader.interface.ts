import { UserId } from '@utils/types';

export interface UserInHeader {
    id: UserId;
}

export interface UserInHeaderOptional {
    id?: UserId;
    token?: string;
}