import { FastifyRequest } from 'fastify';
import {
    ExecutionContext,
    createParamDecorator,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from '@utils/types';
import { SystemMessage } from '@utils/enums';
import { User } from '@components/auth/v1/interfaces';

/**
 * Fetches appropriate context from request
 *
 * @param  {ExecutionContext} ctx Execution context
 * 
 * @returns {Request<FastifyRequest>} Http request data | Microservice data
 */
 const fetchContext = (ctx: ExecutionContext): Request<FastifyRequest> => {
    return ctx.switchToHttp().getRequest();
}

/**
 * Checks if user exists
 * 
 * @param  {User} user User object
 *
 * @returns {void}
 */
 const validateUserExistence = (user: User | undefined): void => {
    if (!user) {
        throw new UnauthorizedException(SystemMessage.PERMISSION_DENIED);
    }
}

/**
 * Returns user from request header
 */
export const UserFromHeader = createParamDecorator(
    (_: string, ctx: ExecutionContext): User | undefined => {
        const request = fetchContext(ctx);
        const user = request.user;

        validateUserExistence(user);

        return user;
    },
);
