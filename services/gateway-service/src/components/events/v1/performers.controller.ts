import { UserAuthGuard } from '@utils/guards/auth';
import { UserFromHeader } from '@utils/decorators';
import { ClientProxy } from '@nestjs/microservices';
import { JoinEventDto } from '@components/events/v1/dtos';
import { Performers } from '@components/events/v1/interfaces';
import { EventMicroserviceConfig } from '@utils/configs/microservices';
import {
    ApiContract,
    UserInHeader,
} from '@utils/interfaces';
import {
    MicroserviceResponse,
    MicroserviceMessageRequest,
} from '@utils/helpers';
import {
    Body,
    Post,
    Inject,
    UseGuards,
    Controller,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Performers')
@ApiSecurity('X-Authorization')
@Controller({
    version: '1',
    path: 'performers',
})
export class PerformersController {
    public constructor(
        @Inject(EventMicroserviceConfig.name)
        private readonly performersService: ClientProxy,
    ) {
        //
    }

    @Post('/event/join')
    @UseGuards(UserAuthGuard)
    public async joinEvent(
        @Body() body: JoinEventDto,
        @UserFromHeader() user: UserInHeader,
    ): Promise<ApiContract<Performers[]>> {
        return {
            data: await MicroserviceResponse(
                MicroserviceMessageRequest<JoinEventDto, Performers[]>({
                    data: body,
                    user: user,
                    client: this.performersService,
                    pattern: 'performers.v1.event.join',
                }),
            ),
        }
    }
}