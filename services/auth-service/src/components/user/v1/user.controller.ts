import { Controller } from '@nestjs/common';
import { MessagePayload } from '@utils/decorators';
import { User } from '@components/user/v1/entities';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from '@components/user/v1/user.service';
import { IUserLoginResponse } from '@components/user/v1/interfaces';
import {
    FindUserById,
    LoginUserPayload,
    CreateUserPayload,
    FindUserByToken,
} from '@components/user/v1/payloads';

@Controller()
export class UserController {
    public constructor(
        private readonly userService: UserService,
    ) {
        //
    }

    @MessagePattern('auth.v1.user.login')
    public async login(
        @MessagePayload() payload: LoginUserPayload,
    ): Promise<IUserLoginResponse> {
        return await this.userService.login(payload);
    }

    @MessagePattern('auth.v1.user.signup')
    public async signup(
        @MessagePayload() payload: CreateUserPayload,
    ): Promise<User> {
        return await this.userService.createUser(payload);
    }

    @MessagePattern('auth.v1.user.signup.admin')
    public async signupAdmin(
        @MessagePayload() payload: CreateUserPayload,
    ): Promise<User> {
        return await this.userService.createAdmin(payload);
    }

    @MessagePattern('auth.v1.user.findById')
    public async findById(
        @MessagePayload() payload: FindUserById,
    ): Promise<User> {
        return await this.userService.findByIdOrFail(payload.id);
    }

    @MessagePattern('auth.v1.user.findByToken')
    public async findByToken(
        @MessagePayload() payload: FindUserByToken,
    ): Promise<User> {
        return await this.userService.findByTokenOrFail(payload.token);
    }
}