import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EventStatus } from '@components/events/v1/enums';
import { EventEntity, EventRoles } from '@components/events/v1/entities';
import { EventService } from '@components/events/v1/event.service';
import {
    FindEventPayload,
    StartEventPayload,
    CreateEventPayload,
    FindUserEventsPayload,
    AddRoleToEventPayload,
} from '@components/events/v1/payloads';
import { MessagePayload, UserFromHeader } from '@utils/decorators';
import { UserInHeader } from '@utils/interfaces';
import { EventRolesService } from './eventRoles.service';

@Controller()
export class EventController {
    public constructor(
        private readonly eventService: EventService,
        private readonly eventRoleService: EventRolesService,
    ) {
        //
    }

    @MessagePattern('event.v1.create')
    public async create(
        @UserFromHeader() user: UserInHeader,
        @MessagePayload() payload: CreateEventPayload,
    ): Promise<EventEntity> {
        return await this.eventService.create(user.id, payload);
    }
    
    @MessagePattern('event.v1.find.pending')
    public async find(
        @MessagePayload() payload: FindEventPayload,
    ): Promise<EventEntity[]> {
        return await this.eventService.find({
            limit: payload.limit,
            offset: payload.offset,
            status: EventStatus.ONBOARDING,
        });
    }

    @MessagePattern('event.v1.findUserEvents')
    public async findUserEvents(
        @UserFromHeader() user: UserInHeader,
        @MessagePayload() payload: FindUserEventsPayload,
    ): Promise<EventEntity[]> {
        return await this.eventService.findUserEventsOrFail(user.id, payload);
    }
    
    @MessagePattern('event.v1.start')
    public async start(
        @UserFromHeader() user: UserInHeader,
        @MessagePayload() payload: StartEventPayload,
    ): Promise<EventEntity> {
        return await this.eventService.start(user.id, payload);
    }
    
    @MessagePattern('event.v1.role.create')
    public async createRole(
        @UserFromHeader() user: UserInHeader,
        @MessagePayload() payload: AddRoleToEventPayload,
    ): Promise<EventRoles> {
        return await this.eventRoleService.create(user.id, payload);
    }
}