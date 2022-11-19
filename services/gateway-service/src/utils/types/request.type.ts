import { User } from '@components/auth/v1/interfaces';

export type Request<T> = T & {
    user: User | undefined;
}