import { JwtModuleOptions } from '@nestjs/jwt';

export const TokenConfig: JwtModuleOptions = {
    secret: process.env.TOKEN_SECRET,
    signOptions: {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
    }
}