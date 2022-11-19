import { IAuthToken } from './token.interface';
import { User } from '@components/user/v1/entities';

export interface IUserLoginResponse {
    user: Partial<User>;
    token: IAuthToken;
}