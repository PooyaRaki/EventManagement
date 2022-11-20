import { Test } from "@nestjs/testing";
import { EventService } from './event.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventRolesService } from './eventRoles.service';
import { PerformersService } from './performers.service';
import { EventParticipants } from './eventParticipants.service';
import { AppTestDatabaseConfig } from '@utils/configs/databases';
import { NotificationModuleV1 } from '@components/notifications/v1';
import {
    Performers,
    EventRoles,
    EventEntity,
} from "./entities";

export const EventModuleV1Test = async() => Test.createTestingModule({
    imports: [
        TypeOrmModule.forRoot(AppTestDatabaseConfig),
        TypeOrmModule.forFeature([
            EventRoles,
            Performers,
            EventEntity,
        ]),
        NotificationModuleV1,
    ],
    providers: [
        EventService,
        EventRolesService,
        PerformersService,
        EventParticipants,
    ],
}).compile();