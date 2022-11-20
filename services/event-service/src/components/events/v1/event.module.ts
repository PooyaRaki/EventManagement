import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventParticipants } from './eventParticipants.service';
import { EventService } from '@components/events/v1/event.service';
import { NotificationModuleV1 } from '@components/notifications/v1';
import { EventController } from '@components/events/v1/event.controller';
import { EventRolesService } from '@components/events/v1/eventRoles.service';
import { PerformersService } from '@components/events/v1/performers.service';
import { PerformersController } from '@components/events/v1/performers.controller';
import {
    EventRoles,
    Performers,
    EventEntity,
} from '@components/events/v1/entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EventRoles,
            Performers,
            EventEntity,
        ]),
        NotificationModuleV1,
    ],
    controllers: [
        EventController,
        PerformersController,
    ],
    providers: [
        EventService,
        EventRolesService,
        PerformersService,
        EventParticipants,
    ],
})
export class EventModuleV1 {
    //
}