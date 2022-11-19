import { Repository } from 'typeorm';
import { UserId } from '@utils/types';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { SystemMessage } from '@utils/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { EventStatus } from '@components/events/v1/enums';
import { EventEntity } from '@components/events/v1/entities';
import { IFindEvent } from '@components/events/v1/interfaces';
import { BadRequestException } from '@utils/helpers/exceptions';
import { EventRolesService } from '@components/events/v1/eventRoles.service';
import {
    StartEventPayload,
    CreateEventPayload,
    FindUserEventsPayload,
} from '@components/events/v1/payloads';

@Injectable()
export class EventService {
    public constructor(
        @InjectRepository(EventEntity)
        private readonly eventRepository: Repository<EventEntity>,

        private readonly eventRoleService: EventRolesService,
    ) {
        //
    }

    /**
     * Creates a new Event
     *
     * @param  {UserId} userId User id
     * @param  {CreateEventPayload} input Event creation data
     *
     * @returns {Promise<Event>} A newly created event
     */
    public async create(userId: UserId, input: CreateEventPayload): Promise<EventEntity>
    {
        return await this.eventRepository.save({
            userId: userId,
            title: input.title,
            startedAt: input.startedAt,
            description: input.description,
            status: EventStatus.ONBOARDING,
        });
    }

    /**
     * Returns events by the specified criteria
     *
     * @param  {IFindEvent} input Find criteria
     *
     * @returns {Promise<EventEntity[]>} Event Objects
     */
    public async find(input: IFindEvent): Promise<EventEntity[]>
    {
        return await this.eventRepository.createQueryBuilder('event')
            .take(input.limit)
            .offset(input.offset)
            .orderBy('event.id', 'DESC')
            .leftJoinAndSelect('event.roles', 'roles')
            .where('event.status = :status', { status: input.status })
            .select([
                'roles.id', 'roles.instrumentId',
                'event.id', 'event.title', 'event.description',
            ])
            .getMany();
    }

    /**
     * Returns an event by its id
     *
     * @param  {number} eventId Event id
     *
     * @returns {Promise<EventEntity | null>}
     */
    public async findById(eventId: number): Promise<EventEntity | null>
    {
        return await this.eventRepository.findOne({
            where: {
                id: eventId,
            },
        });
    }

    /**
     * Returns an event by its id
     *
     * @param  {number} eventId Event id
     *
     * @returns {Promise<EventEntity | null>}
     * @throws {BadRequestException} If the id is invalid throws an error
     */
    public async findByIdOrFail(eventId: number): Promise<EventEntity>
    {
        const event = await this.findById(eventId);

        if (!event) {
            throw new BadRequestException(SystemMessage.EVENT_NOT_FOUND);
        }

        return event;
    }

    /**
     * Returns user events
     *
     * @param  {UserId} userId userId
     * @param  {IFindEvent} input Find criteria
     *
     * @returns {Promise<EventEntity[]>} Event Objects
     */
    public async findUserEvents(userId: UserId, input: FindUserEventsPayload): Promise<EventEntity[]>
    {
        const query = this.eventRepository.createQueryBuilder('event')
            .select([
                'performers', 'performers.id',
                'roles.id', 'roles.instrumentId',
                'event.id', 'event.title', 'event.description',
            ])
            .leftJoin('event.roles', 'roles')
            .leftJoinAndSelect('event.performers', 'performers')
            .limit(input.limit)
            .offset(input.offset)
            .where('event.userId = :userId', {
                userId: userId,
            });

        if (input.status) {
            query.andWhere('event.status = :status', {
                status: input.status,
            });
        }

        return await query.getMany();
    }

    /**
     * Returns events by the specified criteria
     *
     * @param  {UserId} userId UserId
     * @param  {IFindEvent} input Find criteria
     *
     * @returns {Promise<EventEntity[]>} Event Objects
     */
    public async findUserEventsOrFail(userId: UserId, input: FindUserEventsPayload): Promise<EventEntity[]>
    {
        const events = await this.findUserEvents(userId, input);

        if (!events) {
            throw new BadRequestException(SystemMessage.EVENT_NOT_FOUND);
        }

        return events;
    }

    /**
     * Starts a new event
     *
     * @param  {UserId} userId User id
     * @param  {StartEventPayload} input Input data
     *
     * @returns {Promise<EventEntity>}
     */
    public async start(userId: UserId, input: StartEventPayload): Promise<EventEntity>
    {
        const event = await this.findByIdOrFail(input.eventId);
        await this.validateStartingEvent(userId, event);

        const startedEvent = await this.changeStatus(event, EventStatus.ACTIVE);

        return startedEvent;
    }

    /**
     * Checks whether an event can be started
     *
     * @param  {UserId} userId User id
     * @param  {StartEventPayload} event Event Object
     * 
     * @returns {Promise<void>}
     */
    private async validateStartingEvent(userId: UserId, event: EventEntity): Promise<void>
    {
        await this.validateEventOwner(userId, event);
        await this.validateEventHasNotStarted(event);
        await this.validateAllPerformersJoined(event);
    }

    /**
     * Checks if the event belongs to the user in request throws an error
     *
     * @param  {UserId} userId User id
     * @param  {EventEntity | number} event Event object Or Event Id
     *
     * @returns {Promise<void>}
     * @throws {BadRequestException} If the event belongs to the user id throw an error
     */
    private async validateEventOwner(userId: UserId, event: EventEntity | number): Promise<void>
    {
        if (!(await this.isUserEvent(userId, event))) {
            throw new ForbiddenException(SystemMessage.PERMISSION_DENIED);
        }
    }

    /**
     * Checks if the event has already started or not
     *
     * @param  {EventEntity} event Event object
     *
     * @returns {Promise<void>}
     * @throws {BadRequestException} If event has already started throws an error
     */
    private async validateEventHasNotStarted(event: EventEntity): Promise<void>
    {
        if (event.status === EventStatus.ACTIVE) {
            throw new BadRequestException(SystemMessage.EVENT_ALREADY_STARTED);
        }
    }

    /**
     * Validates if the event belongs to the user id sent in the request
     *
     * @param  {UserId} userId User id
     * @param  {EventEntity | number} event Event object
     *  
     * @returns {Promise<boolean>}
     */
    public async isUserEvent(userId: UserId, event: EventEntity | number): Promise<boolean>
    {
        event = await this.extractEventFromRequest(event);

        return event.userId === userId;
    }

    /**
     * Checks whether all the performers have joined an event
     *
     * @param  {EventEntity | number} event Event id
     *
     * @returns {void}
     * @throws {BadRequestException} If all the performers have not joined yet throws an error
     */
    private async validateAllPerformersJoined(event: EventEntity | number): Promise<void>
    {
        event = await this.extractEventFromRequest(event);

        if (await this.eventRoleService.isThereEmptySeats(event.id)) {
            throw new BadRequestException(SystemMessage.EMPTY_SEATS_EXIST);
        }
    }

    /**
     * Validates event onboarding state
     *
     * @param  {EventEntity} event Event object
     *
     * @returns {Promise<void>}
     * @throws {BadRequestException} If the event is not onboarding throws an error
     */
    public async validateEventOnboarding(event: EventEntity): Promise<void>
    {
        if (!(await this.eventIsOnboarding(event))) {
            throw new BadRequestException(SystemMessage.EVENT_NOT_ONBOARDING);
        }
    }

    /**
     * Checks if the event is in Onboarding state
     *
     * @param  {EventEntity|number} event Event object or Event id
     *
     * @returns {Promise<boolean>} True if onboarding, otherwise false 
     * @throws {BadRequestException} if the event id is invalid
     */
    public async eventIsOnboarding(event: EventEntity | number): Promise<boolean>
    {
        event = await this.extractEventFromRequest(event);

        return event.status === EventStatus.ONBOARDING;
    }

    /**
     * Checks if the event has already started
     *
     * @param  {EventEntity|number} event Event object or Event id
     *
     * @returns {Promise<boolean>} True if onboarding, otherwise false 
     * @throws {BadRequestException} if the event id is invalid
     */
    public async eventIsStarted(event: EventEntity | number): Promise<boolean>
    {
        event = await this.extractEventFromRequest(event);

        return event.status === EventStatus.ACTIVE;
    }

    /**
     * Changes event status e.g. turn event from Onboarding to Started
     *
     * @param  {EventEntity | number} event EventId Or Event Object
     * @param  {EventStatus} status Event new status
     *
     * @returns {Promise<EventEntity>}
     */
    private async changeStatus(event: EventEntity | number, status: EventStatus): Promise<EventEntity>
    {
        event = await this.extractEventFromRequest(event);

        return await this.eventRepository.save({
            ...event,
            status: status,
        });
    }

    /**
     * Extracts event from request and if the event id is sent fetches the event from database
     *
     * @param  {EventEntity|number} event Event Or Event id
     *
     * @returns {Promise<EventEntity>}
     * @throws {BadRequestException} if the event id is invalid
     */
    private async extractEventFromRequest(event: EventEntity | number): Promise<EventEntity>
    {
        return (typeof event === 'number') ? await this.findByIdOrFail(event) : event;
    }
}