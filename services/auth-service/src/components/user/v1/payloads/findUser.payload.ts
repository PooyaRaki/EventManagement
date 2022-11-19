import {
    IdentifierPayload,
    LimitOffsetPayload,
} from '@utils/payloads';

export class FindAllUsersPayload extends LimitOffsetPayload {
    //
}
export class FindUserById extends IdentifierPayload {
    //
}

export class FindUserByToken {
    token: string;
}