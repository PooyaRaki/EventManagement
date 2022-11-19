import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    EventRoles,
    Performers,
    EventEntity,
} from '@components/events/v1/entities';
import { EventService } from '@components/events/v1/event.service';
import { EventController } from '@components/events/v1/event.controller';
import { PerformersService } from '@components/events/v1/performers.service';
import { EventRolesService } from '@components/events/v1/eventRoles.service';
import { PerformersController } from '@components/events/v1/performers.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EventRoles,
            Performers,
            EventEntity,
        ]),
    ],
    controllers: [
        EventController,
        PerformersController,
    ],
    providers: [
        EventService,
        EventRolesService,
        PerformersService,
    ],
})
export class EventModuleV1 {
    //
}