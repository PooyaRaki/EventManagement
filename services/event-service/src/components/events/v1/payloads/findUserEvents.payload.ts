import { IsEnum, IsOptional } from 'class-validator';
import { LimitOffsetPayload } from '@utils/payloads';
import { EventStatus } from '@components/events/v1/enums';

export class FindUserEventsPayload extends LimitOffsetPayload {
    @IsOptional()
    @IsEnum(EventStatus)
    status?: EventStatus;
}