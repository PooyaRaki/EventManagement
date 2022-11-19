import { UserRole, UserStatus } from '@components/auth/v1/enums';
import { UserId } from '@utils/types/user.type';

export interface User {
    readonly id: UserId;
    readonly salt: string;
    readonly email: string;
    readonly phone?: string;
    readonly role: UserRole;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly password: string;
    readonly status: UserStatus;
}