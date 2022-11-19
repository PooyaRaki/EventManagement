import { ClientProxy } from '@nestjs/microservices';
import { ApiContract } from '@utils/interfaces';
import { LoginDto, RegisterDto } from './dtos';
import { User } from './interfaces';
import { ApiBadRequestResponse, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthMicroserviceConfig } from '@utils/configs/microservices';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { MicroserviceMessageRequest, MicroserviceResponse } from '@utils/helpers';
import { UserAuthGuard } from '@utils/guards/auth';
import { AdminAuthGuard } from '@utils/guards/auth/admin.guard';

@ApiTags('Auth')
@ApiSecurity('X-Authorization')
@Controller({
    path: 'auth',
    version: '1',
})
export class AuthController {
    public constructor(
        @Inject(AuthMicroserviceConfig.name)
        private readonly userService: ClientProxy,
    ) {
        //
    }

    @Post('/login')
    @ApiBadRequestResponse({ description: 'User credential is invalid!' })
    @ApiOkResponse({ description: 'Login was successful' })
    public async login(
        @Body() body: LoginDto,
    ): Promise<ApiContract<User>> {
        return {
            data: await MicroserviceResponse(
                MicroserviceMessageRequest<LoginDto, User>({
                    client: this.userService,
                    pattern: 'auth.v1.user.login',
                    data: body,
                }),
            )
        }
    }

    @Post('/register')
    public async register(
        @Body() body: RegisterDto,
    ): Promise<ApiContract<User>> {
        return {
            data: await MicroserviceResponse(
                MicroserviceMessageRequest<RegisterDto, User>({
                    client: this.userService,
                    pattern: 'auth.v1.user.signup',
                    data: body,
                }),
            )
        }
    }

    @Post('/register/admin')
    public async registerAdmin(
        @Body() body: RegisterDto,
    ): Promise<ApiContract<User>> {
        return {
            data: await MicroserviceResponse(
                MicroserviceMessageRequest<RegisterDto, User>({
                    client: this.userService,
                    pattern: 'auth.v1.user.signup.admin',
                    data: body,
                }),
            )
        }
    }

    @UseGuards(UserAuthGuard)
    @Get('/test')
    public async test() {
        return 'this is a User';
    }

    @UseGuards(AdminAuthGuard)
    @Get('/test/admin')
    public async testAdmin() {
        return 'this is an Admin user';
    }
}