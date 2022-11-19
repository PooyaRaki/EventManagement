import { Controller } from '@nestjs/common';
import { MessagePayload, UserFromHeader } from '@utils/decorators';
import { MessagePattern } from '@nestjs/microservices';
import { FindEventPerformersPayload, JoinEventPayload } from '@components/events/v1/payloads';
import { PerformersService } from '@components/events/v1/performers.service';
import { UserInHeader } from '@utils/interfaces';
import { Performers } from './entities';

@Controller()
export class PerformersController {
    public constructor(
        private readonly performersService: PerformersService,
    ) {
        //
    }

    @MessagePattern('performers.v1.event.join')
    public async joinEvent(
        @UserFromHeader() user: UserInHeader,
        @MessagePayload() payload: JoinEventPayload,
    ): Promise<Performers> {
        return await this.performersService.joinEvent(user.id, payload);
    }

    @MessagePattern('performers.v1.findByEvent')
    public async findEventPerformers(
        @UserFromHeader() user: UserInHeader,
        @MessagePayload() payload: FindEventPerformersPayload,
    ): Promise<Performers[]> {
        return await this.performersService.findEventPerformers(user.id, payload);
    }
}