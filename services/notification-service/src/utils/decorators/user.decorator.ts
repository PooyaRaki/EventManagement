import { IMicroserviceMessage, UserInHeader } from '@utils/interfaces';
import {
    ExecutionContext,
    createParamDecorator,
} from '@nestjs/common';
import { SystemMessage } from '@utils/enums';
import { UnAuthorizedException } from '@utils/helpers/exceptions';

/**
 * Fetches appropriate context from request
 *
 * @param  {ExecutionContext} ctx Execution context
 * 
 * @returns {IMicroserviceMessage<any>} Http request data | Microservice data
 */
 const fetchContext = (ctx: ExecutionContext): IMicroserviceMessage<any> => {
    return ctx.switchToRpc().getData<IMicroserviceMessage<any>>()
}

/**
 * Checks if user exists
 * 
 * @param  {UserInHeader} user User object
 *
 * @returns {void}
 */
const validateUserExistence = (user: UserInHeader): void => {
    if (!user) {
        throw new UnAuthorizedException(SystemMessage.PERMISSION_DENIED);
    }
}

/**
 * Returns user from request header
 */
export const UserFromHeader = createParamDecorator(
    (_: string, ctx: ExecutionContext): Partial<UserInHeader> => {
        const request = fetchContext(ctx);
        const user = request.headers.user;
        validateUserExistence(user);

        return user;
    },
);