import { TokenConfig } from '@utils/configs';
import { SystemMessage } from '@utils/enums';
import { PassportStrategy } from '@nestjs/passport';
import {
    Strategy,
    ExtractJwt,
} from 'passport-jwt';
import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { UserInHeader } from '@utils/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    public constructor()
    {
        super({
            ignoreExpiration: false,
            secretOrKey: TokenConfig.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    /**
     * Validates a JWT token
     *
     * @param  {any} payload Token payload
     *
     * @returns {Promise<any>} Payload
     */
    public async validate(payload: any): Promise<any>
    {
        return await this.parseJsonToken(payload.sub);
    }

    /**
     * Parses a JSON token
     *
     * @param  {string} token Token string
     *
     * @returns {Promise<UserInHeader>} User object
     */
    private async parseJsonToken(token: string): Promise<UserInHeader>
    {
        try {
            return JSON.parse(token);
        } catch(error: unknown) {
            throw new UnauthorizedException(SystemMessage.PERMISSION_DENIED);
        }
    }
}