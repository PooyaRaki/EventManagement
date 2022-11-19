import { Controller } from '@nestjs/common';
import { Profile } from '@components/profile/v1/models';
import { ProfileService } from '@components/profile/v1/profile.service';
import { MessagePattern } from '@nestjs/microservices';
import {
    FindProfilePayload,
    CreateProfilePayload,
    UPdateProfilePayload,
    FindProfileByIdPayload,
} from '@components/profile/v1/payloads';
import { MessagePayload, UserFromHeader } from '@utils/decorators';
import { UserInHeader } from '@utils/interfaces';
import { AddInstrumentPayload } from './payloads/addInstrument.payload';

@Controller()
export class ProfileController {
    public constructor(
        private readonly profileService: ProfileService,
    ) {
        //
    }

    @MessagePattern('profile.v1.create')
    public async create(
        @UserFromHeader() user: UserInHeader,
        @MessagePayload() payload: CreateProfilePayload,
    ): Promise<Profile> {
        return await this.profileService.create(user.id, payload);
    }

    @MessagePattern('profile.v1.instrument.add')
    public async addInstrument(
        @UserFromHeader() user: UserInHeader,
        @MessagePayload() payload: AddInstrumentPayload,
    ): Promise<Profile> {
        return await this.profileService.addInstrument(user.id, payload.id);
    }

    @MessagePattern('profile.v1.update')
    public async update(
        @MessagePayload() payload: UPdateProfilePayload,
    ): Promise<Profile> {
        return await this.profileService.update(payload);
    }

    @MessagePattern('profile.v1.find')
    public async find(
        @MessagePayload() payload: FindProfilePayload,
    ): Promise<Profile[]> {
        return await this.profileService.find(payload);
    }

    @MessagePattern('profile.v1.findById')
    public async findById(
        @MessagePayload() payload: FindProfileByIdPayload,
    ): Promise<Profile> {
        return await this.profileService.findByIdOrFail(payload._id);
    }

    @MessagePattern('profile.v1.findByUserId')
    public async findByUserId(
        @UserFromHeader() user: UserInHeader,
    ): Promise<Profile> {
        return await this.profileService.findByUserIdOrFail(user.id);
    }
}