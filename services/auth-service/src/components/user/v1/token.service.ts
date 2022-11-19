import { User } from './entities';
import { JwtService } from '@nestjs/jwt';
import { IAuthToken } from './interfaces';
import { Injectable } from '@nestjs/common';
import { SystemMessage } from '@utils/enums';
import { UserInHeader } from '@utils/interfaces';
import { BadRequestException } from '@utils/exceptions';

@Injectable()
export class TokenService {
    public constructor(
        private readonly jwtService: JwtService,
    ) {
        //
    }

    public async decodeToken(token: string): Promise<UserInHeader>
    {
        try {
            return this.jwtService.verify<UserInHeader>(token);
        } catch (error: unknown) {
            throw new BadRequestException(SystemMessage.CREDENTIAL_INVALID);
        }
    }

    /**
     * Creates a token response
     *
     * @param  {User} user User data
     *
     * @returns {Promise<IAuthToken>} Token Object
     */
    public async createTokenResponse(user: User): Promise<IAuthToken>
    {
        return {
            tokenType: 'Bearer',
            accessToken: this.createAccessToken({
                id: user.id,
            }),
        };
    }

    /**
     * Creates an access token
     * @param  {UserInHeader} user User data
     *
     * @returns {string} Signed token
     */
    private createAccessToken(user: UserInHeader): string
    {
        return this.jwtService.sign(user);
    }
}