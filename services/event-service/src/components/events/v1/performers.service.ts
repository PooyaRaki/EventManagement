import { UserId } from '@utils/types';
import { Injectable } from '@nestjs/common';
import { SystemMessage } from '@utils/enums';
import { Transaction } from '@utils/helpers';
import { EventService } from './event.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@utils/helpers/exceptions';
import { ICreatePerformer } from '@components/events/v1/interfaces';
import { EventRolesService } from '@components/events/v1/eventRoles.service';
import {
    JoinEventPayload,
    FindEventPerformersPayload,
} from '@components/events/v1/payloads';
import {
    Repository,
    DataSource,
    EntityManager,
} from 'typeorm';
import { 
    EventRoles,
    Performers,
    EventEntity,
} from '@components/events/v1/entities';

@Injectable()
export class PerformersService {

    public constructor(
        @InjectRepository(Performers)
        private readonly PERFORMERS_REPOSITORY: Repository<Performers>,

        private readonly dataSource: DataSource,
        private readonly eventService: EventService,
        private readonly eventRolesService: EventRolesService,
    ) {
        //
    }

    /**
     * Finds performer by user id and user id
     *
     * @param  {UserId} userId User id
     * @param  {number} eventId Event id
     *
     * @returns {Promise<Performers | null>} Performer object, if user has not joined the event null
     */
    public async findByUserInstrument(userId: UserId, eventId: number): Promise<Performers | null>
    {
        return this.PERFORMERS_REPOSITORY.createQueryBuilder('performer')
            .select('performer.id')
            .where(
                'performer.eventId = :eventId AND performer.userId = :userId',
                { eventId, userId },
            )
            .getOne();
    }

    /**
     * Find a performer object
     *
     * @param  {number} id Performer id
     *
     * @returns {Promise<Performers>} Performers object
     */
    public async findById(id: number): Promise<Performers | null>
    {
        return await this.PERFORMERS_REPOSITORY.findOne({ where: { id } });
    }

    /**
     * Find a performer object
     *
     * @param  {number} id Performer id
     *
     * @returns {Promise<Performers>} Performers object
     */
    public async findByIdOrFail(id: number): Promise<Performers>
    {
        const performer = await this.findById(id);

        if (!performer) {
            throw new BadRequestException(SystemMessage.PERFORMER_NOT_FOUND);
        }

        return performer;
    }

    /**
     * Returns an event performers
     *
     * @param  {UserId} userId User id
     * @param  {FindEventPerformersPayload} input Input data
     *
     * @returns {Promise<Performers>} Performers object
     */
    public async findEventPerformers(userId: UserId, input: FindEventPerformersPayload): Promise<Performers[]>
    {
        await this.validateFindPerformerOwner(userId, input.eventId);

        return this.findManyByEventIdOrFail(input.eventId);
    }

    /**
     * Find event performers
     *
     * @param  {number} eventId Event id
     *
     * @returns {Promise<Performers>} Performers object
     */
    public async findManyByEventId(eventId: number): Promise<Performers[] | null>
    {
        return await this.PERFORMERS_REPOSITORY.find({
            relations: [ 'role' ],
            where: { event: { id: eventId } },
        });
    }

    /**
     * Find event performers
     *
     * @param  {number} eventId Event id
     *
     * @returns {Promise<Performers>} Performers object
     * @throws {BadRequestException} If no performer is found
     */
    public async findManyByEventIdOrFail(eventId: number): Promise<Performers[]>
    {
        const performers = await this.findManyByEventId(eventId);

        if (!performers) {
            throw new BadRequestException(SystemMessage.PERFORMER_NOT_FOUND);
        }

        return performers;
    }

    /**
     * Adds a user to an event
     *
     * @param  {UserId} userId User id
     * @param  {JoinEventPayload} input Joining data
     *
     * @returns {Promise<Performers>} Performer object
     */
    public async joinEvent(userId: UserId, input: JoinEventPayload): Promise<Performers>
    {
        const role = await this.eventRolesService.findRoleByEventInstrumentOrFail(input);
        await this.validateJoinEvent(userId, role);

        return await Transaction<Performers>(this.dataSource,
            async (queryRunner: EntityManager) => {
                await this.eventRolesService.increasePerformerCount(role.id, queryRunner);

                return await this.create({
                    userId,
                    roleId: role.id,
                    eventId: role.event.id,
                }, queryRunner);
            },
        );
    }

    /**
     * Adds a new performer object to the database
     *
     * @param  {ICreatePerformer} input Input data
     * @param  {EntityManager} queryRunner Query runner
     *
     * @returns {Promise<number>} Newly inserted performer id
     */
    private async create(input: ICreatePerformer, queryRunner?: EntityManager): Promise<Performers>
    {
        const runner = queryRunner ?? this.PERFORMERS_REPOSITORY;
        return (await runner.createQueryBuilder()
            .insert()
            .into(Performers)
            .returning('*')
            .values({
                userId: input.userId,
                role: { id: input.roleId },
                event: { id: input.eventId },
            }).execute()).raw[0];
    }

    /**
     * Checks if a user can join an event or not
     *
     * @param  {UserId} userId User id
     * @param  {EventRoles} role Event role object
     *
     * @returns {Promise<void>}
     */
    private async validateJoinEvent(userId: UserId, role: EventRoles): Promise<void>
    {
        await this.validateEventJoinOwner(userId, role.event);
        await this.eventService.validateEventOnboarding(role.event);
        await this.validateUserAlreadyJoined(userId, role.event.id);
        await this.validateEmptySeats(role.id);
    }

    /**
     * Checks if the event belongs to the user in request throws an error
     *
     * @param  {UserId} userId User id
     * @param  {EventEntity | number} event Event object
     *
     * @returns {Promise<void>}
     * @throws {BadRequestException} If the event belongs to the user id throw an error
     */
    private async validateEventJoinOwner(userId: UserId, event: EventEntity | number): Promise<void>
    {
        if (await this.eventService.isUserEvent(userId, event)) {
            throw new BadRequestException(SystemMessage.CANNOT_JOIN_SELF_EVENT);
        }
    }

    /**
     * Checks if the event belongs to the user in request throws an error
     *
     * @param  {UserId} userId User id
     * @param  {EventEntity | number} event Event object
     *
     * @returns {Promise<void>}
     * @throws {BadRequestException} If the event belongs to the user id throw an error
     */
    private async validateFindPerformerOwner(userId: UserId, event: EventEntity | number): Promise<void>
    {
        if (!(await this.eventService.isUserEvent(userId, event))) {
            throw new BadRequestException(SystemMessage.PERMISSION_DENIED);
        }
    }

    /**
     * Checks if the user has already joined the event throws an error
     *
     * @param  {UserId} userId User id
     * @param  {number} eventId Event id
     *
     * @returns {Promise<void>}
     * @throws {BadRequestException} If the user has already joined the event throws an error
     */
    private async validateUserAlreadyJoined(userId: UserId, eventId: number): Promise<void>
    {
        const performer = await this.findByUserInstrument(userId, eventId);
        if (performer) {
            throw new BadRequestException(SystemMessage.ALREADY_JOINED);
        }
    }

    /**
     * Checks to see if there is a room for the instrument in this event
     *
     * @param  {number} roleId Role id
     * 
     * @return {Promise<void>}
     * @throws {BadRequestException} If there is no room throws an error
     */
    private async validateEmptySeats(roleId: number): Promise<void>
    {
        if (!(await this.eventRolesService.isThereEmptySeats(roleId))) {
            throw new BadRequestException(SystemMessage.EVENT_ROLE_FULL);
        }
    }
}