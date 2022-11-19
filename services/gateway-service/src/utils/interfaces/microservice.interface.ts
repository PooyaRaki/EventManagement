import { LanguageName } from '@utils/enums';
import { ClientProxy } from '@nestjs/microservices';
import {
    UserInHeader,
    UserInHeaderOptional,
} from '@utils/interfaces/userInHeader.interface';

export interface IMicroserviceMessage<T> {
    data?: T;
    headers?: any;
}

export interface IMicroserviceRequest<T> extends IMicroserviceMessage<T> {
    pattern: string;
    client: ClientProxy;
    language?: LanguageName;
    user?: UserInHeader | UserInHeaderOptional;
}

export interface IMicroserviceDefaultHeaders {
    language?: LanguageName;
    user?: UserInHeader | UserInHeaderOptional;
}