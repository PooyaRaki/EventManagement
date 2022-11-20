import { Test } from "@nestjs/testing";
import { User } from "./entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from './user.service';
import { JwtStrategy } from './strategies';
import { TokenService } from './token.service';
import { AppTestDatabaseConfig } from '@utils/configs/databases';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TokenConfig } from '@utils/configs';

export const UserModuleV1Test = async() => Test.createTestingModule({
    imports: [
        TypeOrmModule.forRoot(AppTestDatabaseConfig),
        TypeOrmModule.forFeature([
            User,
        ]),
        PassportModule,
        JwtModule.register(TokenConfig),
    ],
    providers: [
        UserService,
        JwtStrategy,
        TokenService,
    ],
}).compile();