import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Event, EventRole, Performers } from '@components/events/v1/interfaces';
import { AddRoleToEventDto, CreateEventDto, FindUserEventPerformersDto, StartEventDto } from '@components/events/v1/dtos';
import { EventMicroserviceConfig } from '@utils/configs/microservices';
import {
    MicroserviceResponse,
    MicroserviceMessageRequest,
} from '@utils/helpers';
import {
    Body,
    Post,
    Inject,
    Controller,
    UseGuards,
    Get,
    Query,
    Param,
    UseInterceptors,
    CacheInterceptor,
} from '@nestjs/common';
import { UserAuthGuard } from '@utils/guards/auth';
import { UserFromHeader } from '@utils/decorators';
import { ApiContract, UserInHeader } from '@utils/interfaces';
import { FindEventDto } from './dtos/findEvent.dto';
import { FindUserEventsDto } from './dtos/findUserEvent.dto';

@ApiTags('Events')
@ApiSecurity('X-Authorization')
@Controller({
    version: '1',
    path: 'event',
})
export class EventController {
    public constructor(
        @Inject(EventMicroserviceConfig.name)
        private readonly eventService: ClientProxy,
    ) {
        //
    }

    @Post('/')
    @UseGuards(UserAuthGuard)
    public async create(
        @Body() body: CreateEventDto,
        @UserFromHeader() user: UserInHeader,
    ): Promise<ApiContract<Event>> {
        return {
            data: await MicroserviceResponse(
                MicroserviceMessageRequest<CreateEventDto, Event>({
                    data: body,
                    user: user,
                    client: this.eventService,
                    pattern: 'event.v1.create',
                }),
            ),
        }
    }

    @Post('/role')
    @UseGuards(UserAuthGuard)
    public async createRole(
        @Body() body: AddRoleToEventDto,
        @UserFromHeader() user: UserInHeader,
    ): Promise<ApiContract<EventRole>> {
        return {
            data: await MicroserviceResponse(
                MicroserviceMessageRequest<AddRoleToEventDto, EventRole>({
                    data: body,
                    user: user,
                    client: this.eventService,
                    pattern: 'event.v1.role.create',
                }),
            ),
        }
    }

    @Get('/')
    @UseGuards(UserAuthGuard)
    @UseInterceptors(CacheInterceptor)
    public async find(
        @Query() query: FindEventDto,
        @UserFromHeader() user: UserInHeader,
    ): Promise<ApiContract<Event[]>> {
        return {
            data: await MicroserviceResponse(
                MicroserviceMessageRequest<FindEventDto, Event[]>({
                    user: user,
                    client: this.eventService,
                    pattern: 'event.v1.find.pending',
                    data: {
                        limit: ~~query.limit,
                        offset: ~~query.offset,
                    },
                }),
            ),
        }
    }

    @Get('/self')
    @UseGuards(UserAuthGuard)
    public async findUserEvent(
        @Query() query: FindUserEventsDto,
        @UserFromHeader() user: UserInHeader,
    ): Promise<ApiContract<Event[]>> {
        return {
            data: await MicroserviceResponse(
                MicroserviceMessageRequest<FindUserEventsDto, Event[]>({
                    user: user,
                    client: this.eventService,
                    pattern: 'event.v1.findUserEvents',
                    data: {
                        status: query.status,
                        limit: ~~query.limit,
                        offset: ~~query.offset,
                    },
                }),
            ),
        }
    }

    @Get('/performers/:eventId')
    @UseGuards(UserAuthGuard)
    public async findUserEventPerformers(
        @UserFromHeader() user: UserInHeader,
        @Param() param: FindUserEventPerformersDto,
    ): Promise<ApiContract<Performers[]>> {
        return {
            data: await MicroserviceResponse(
                MicroserviceMessageRequest<FindUserEventPerformersDto, Performers[]>({
                    user: user,
                    client: this.eventService,
                    pattern: 'performers.v1.findByEvent',
                    data: {
                        eventId: ~~param.eventId,
                    },
                }),
            ),
        }
    }

    @Post('/start')
    @UseGuards(UserAuthGuard)
    public async startEvent(
        @Body() body: StartEventDto,
        @UserFromHeader() user: UserInHeader,
    ): Promise<ApiContract<Event>> {
        return {
            data: await MicroserviceResponse(
                MicroserviceMessageRequest<StartEventDto, Event>({
                    user: user,
                    data: body,
                    client: this.eventService,
                    pattern: 'event.v1.start',
                }),
            ),
        }
    }
}