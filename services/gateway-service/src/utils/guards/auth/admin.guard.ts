import { FastifyRequest } from 'fastify';
import { AuthGuard } from './auth.service';
import { UserRole } from '@components/auth/v1/enums';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from '@utils/types';

@Injectable()
export class AdminAuthGuard extends AuthGuard implements CanActivate {

    /**
     * Checks if the user is able to access the current resource
     *
     * @param  {ExecutionContext} context Execution context
     *
     * @returns {Promise<boolean>} True if the user can access the current route otherwise false
     */
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request<FastifyRequest> = context.switchToHttp().getRequest();
        const token = this.findAuthenticationHeader(request);

        return await this.verifyToken(token, request);
    }

    /**
     * Verifies token
     *
     * @param  {string} token Token data
     * @param  {FastifyRequest} request Request object
     *
     * @returns {Promise<boolean>} True if the token is valid otherwise false
     */
    protected async verifyToken(token: string, request: Request<FastifyRequest>): Promise<boolean> {
        const user = await this.callAuthService(token);
        this.addUserToRequest(user, request);

        return user !== undefined && user.role === UserRole.Admin;
    }
}