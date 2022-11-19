import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from '@utils/guards/auth';
import { UserFromHeader } from '@utils/decorators';
import { ClientProxy } from '@nestjs/microservices';
import { Profile } from '@components/profile/v1/interfaces';
import { UserMicroserviceConfig } from '@utils/configs/microservices';
import {
    ApiContract,
    UserInHeader,
} from '@utils/interfaces';
import {
    CreateProfileDto,
    AddProfileInstrumentDto,
} from '@components/profile/v1/dtos';
import {
    MicroserviceResponse,
    MicroserviceMessageRequest,
} from '@utils/helpers';
import {
    Get,
    Post,
    Body,
    Inject,
    UseGuards,
    Controller,
    UseInterceptors,
    CacheInterceptor,
} from '@nestjs/common';

@ApiTags('Profile')
@ApiSecurity('X-Authorization')
@Controller({
    version: '1',
    path: 'profile',
})
export class ProfileController {
    public constructor(
        @Inject(UserMicroserviceConfig.name)
        private readonly profileService: ClientProxy,
    ) {
        //
    }

    @Post('/')
    @UseGuards(UserAuthGuard)
    public async create(
        @Body() body: CreateProfileDto,
        @UserFromHeader() user: UserInHeader,
    ): Promise<Profile> {
        return await MicroserviceResponse(
            MicroserviceMessageRequest<CreateProfileDto, Profile>({
                user: user,
                data: body,
                client: this.profileService,
                pattern: 'profile.v1.create',
            })
        );
    }

    @Post('/instrument')
    @UseGuards(UserAuthGuard)
    public async addInstrument(
        @UserFromHeader() user: UserInHeader,
        @Body() body: AddProfileInstrumentDto,
    ): Promise<Profile> {
        return await MicroserviceResponse(
            MicroserviceMessageRequest<AddProfileInstrumentDto, Profile>({
                user: user,
                data: body,
                client: this.profileService,
                pattern: 'profile.v1.instrument.add',
            })
        );
    }

    @Get('/')
    @UseGuards(UserAuthGuard)
    @UseInterceptors(CacheInterceptor)
    public async findMyProfile(
        @UserFromHeader() user: UserInHeader,
    ): Promise<ApiContract<Profile>> {
        return {
            data: await MicroserviceResponse(
                MicroserviceMessageRequest<{}, Profile>({
                    user: user,
                    client: this.profileService,
                    pattern: 'profile.v1.findByUserId',
                }),
            ),
        }
    }
}