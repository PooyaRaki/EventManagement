import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenConfig } from '@utils/configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from '@components/user/v1/entities';
import { JwtStrategy } from '@components/user/v1/strategies';
import { UserService } from '@components/user/v1/user.service';
import { UserController } from '@components/user/v1/user.controller';
import { TokenService } from './token.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
        ]),
        PassportModule,
        JwtModule.register(TokenConfig),
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
        JwtStrategy,
        TokenService,
    ],
})
export class UserModuleV1 {
    //
}