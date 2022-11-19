import { FastifyRequest } from 'fastify';
import { SystemMessage } from '@utils/enums';
import { FindUserByToken } from './interfaces';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '@components/auth/v1/interfaces';
import { AuthMicroserviceConfig } from '@utils/configs/microservices';
import { MicroserviceMessageRequest, MicroserviceResponse } from '@utils/helpers';
import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager'
import { AuthConfig } from '@utils/configs';
import { Request } from '@utils/types';

export abstract class AuthGuard {
    public constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,

        @Inject(AuthMicroserviceConfig.name)
        private readonly authService: ClientProxy,
    ) {
        //
    }

    /**
     * Returns request header
     *
     * @param  {FastifyRequest} request Request data
     *
     * @returns {string} Token
     * @throws {BadRequestException} If the token is not sent throws an error
     */
    protected findAuthenticationHeader(request: FastifyRequest): string {
        const token = <string> request.headers['x-authorization'];
        this.validateTokenExistence(token);

        return token;
    }

    /**
     * Checks if the token is sent in the header
     *
     * @param  {string} token Token
     *
     * @returns {void}
     * @throws {BadRequestException} If the token is not sent throw an error
     */
    private validateTokenExistence(token: string): void
    {
        if (!token) {
            throw new UnauthorizedException(SystemMessage.INVALID_AUTHENTICATION);
        }
    }

    /**
     * Find a user by its token either from cache or by calling Auth service and writing to cache
     *
     * @param  {string} token Token data
     * 
     * @returns {User | undefined} Returns user if exists, otherwise undefined
     */
    protected async findUserByToken(token: string): Promise<User | undefined> {
        return await this.findByTokenFromCache(token) ?? this.findFromAuthServiceAndCache(token);
    }

    /**
     * Find a user by its token from cache
     *
     * @param  {string} token Token data
     *
     * @returns {Promise<User | undefined>} If user exists in cache returns user, otherwise returns undefined
     */
     private async findByTokenFromCache(token: string): Promise<User | undefined>
     {
         return await this.cacheManager.get<User>(`User-${token}`);
     }

    /**
     * Calls Auth service and if the user exists writes data to cache
     *
     * @param  {string} token Token data
     * 
     * @returns {Promise<User | undefined>} User object or if not found undefined
     */
    private async findFromAuthServiceAndCache(token: string): Promise<User | undefined>
    {
        const user = await this.callAuthService(token);
        if (user) {
            await this.setTokenCache(token, user);
        }

        return user;
    }

    /**
     * Calls Auth MicroService to check user validity
     *
     * @param  {string} token Token data
     *
     * @returns {Promise<User>} User data
     */
    protected async callAuthService(token: string): Promise<User>
    {
        return MicroserviceResponse(
            MicroserviceMessageRequest<FindUserByToken, User>({
                client: this.authService,
                pattern: 'auth.v1.user.findByToken',
                data: {
                    token,
                },
            }),
        );
    }

    /**
     * Writes user data to cache
     *
     * @param  {string} token Token data
     * @param  {User} user User data
     *
     * @returns {Promise<void>}
     */
    private async setTokenCache(token: string, user: User): Promise<void>
    {
        return await this.cacheManager.set(`User-${token}`, user, AuthConfig.cacheTtl);
    }

    /**
     * Adds user object to request data
     *
     * @param  {User} user User Object
     * @param  {Request<FastifyRequest>} request Request data
     *
     * @returns {void}
     */
    protected addUserToRequest(user: User | undefined, request: Request<FastifyRequest>): void
    {
        request.user = user;
    }
}