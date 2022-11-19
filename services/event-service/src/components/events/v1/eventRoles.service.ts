import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity, EventRoles } from '@components/events/v1/entities';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AddRoleToEventPayload, IFindRoleByEventInstrument } from './payloads';
import { Status, SystemMessage } from '@utils/enums';
import { BadRequestException } from '@utils/helpers/exceptions';
import { UserId } from '@utils/types';
import { EventService } from './event.service';

@Injectable()
export class EventRolesService {
    public constructor(
        @InjectRepository(EventRoles)
        private readonly eventRolesRepository: Repository<EventRoles>,

        @Inject(forwardRef(() => EventService))
        private readonly eventService: EventService,
    ) {
        //
    }

    /**
     * Creates a new role i.e. adds a new instrument to the event
     *
     * @param  {UserId} userId User id
     * @param  {AddRoleToEventPayload} input Input data
     *
     * @returns {Promise<EventRoles>} Newly created EventRoles object
     */
    public async create(userId: UserId, input: AddRoleToEventPayload): Promise<EventRoles>
    {
        const event = await this.eventService.findByIdOrFail(input.eventId);
        await this.validateRoleCreation(userId, event, input.instrumentId);

        return await this.eventRolesRepository.save({
            seats: input.seats,
            performersCount: 0,
            status: Status.ACTIVE,
            event: { id: event.id },
            instrumentId: input.instrumentId,
        });
    }

    /**
     * Validates role creating request
     *
     * @param  {UserId} userId User id
     * @param  {EventEntity} event Event object
     * @param  {string} instrumentId Instrument id
     *
     * @returns {Promise<void>}
     */
    private async validateRoleCreation(
        userId: UserId,
        event: EventEntity,
        instrumentId: string
    ): Promise<void> {
        await this.validateEventOwner(userId, event);
        await this.validateInstrumentHasBeenAdded(userId, instrumentId);
    }

    /**
     * Checks whether the user is the owner of the event or not
     *
     * @param  {UserId} userId User id
     * @param  {EventEntity} event Event object
     *
     * @returns {Promise<void>}
     * @throws {BadRequestException} If the user is not the owner of the event throws an error
     */
    private async validateEventOwner(userId: UserId, event: EventEntity): Promise<void>
    {
        if (!(await this.eventService.isUserEvent(userId, event))) {
            throw new BadRequestException(SystemMessage.PERMISSION_DENIED);
        }
    }

    private async validateInstrumentHasBeenAdded(eventId: number, instrumentId: string)
    {
        if ((await this.findRoleByEventInstrument({ eventId, instrumentId }))) {
            throw new BadRequestException(SystemMessage.INSTRUMENT_ALREADY_ADDED);
        }
    }

    /**
     * Returns event role by instrument id and event id
     *
     * @param  {IFindRoleByEventInstrument} input Input data
     *
     * @returns {Promise<EventRoles | null>} Event role object or null if not found
     */
    public async findRoleByEventInstrument(input: IFindRoleByEventInstrument): Promise<EventRoles | null>
    {
        return await this.eventRolesRepository.findOne({
            relations: [ 'event' ],
            where: {
                event: { id: input.eventId },
                instrumentId: input.instrumentId,
            },
        });
    }

    /**
     * Returns event role by instrument id and event id
     *
     * @param  {IFindRoleByEventInstrument} input Input data
     *
     * @returns {Promise<EventRoles | null>} Event role object
     * @throws {BadRequestException} Throws BadRequestException if the role was not found
     */
    public async findRoleByEventInstrumentOrFail(input: IFindRoleByEventInstrument): Promise<EventRoles>
    {
        const role = await this.findRoleByEventInstrument(input);

        if (!role) {
            throw new BadRequestException(SystemMessage.ROLE_NOT_FOUND);
        }

        return role;
    }

    /**
     * Increases performers count in the role object
     * 
     * We kind of cache the number of performers
     *      In order to prevent running complex to get the number of performers
     *      E.g. When the owner wants to start an event with a simple query we can validate th request
     *
     * @param  {number} id Role id
     * @param  {EntityManager} queryRunner Query runner
     *
     * @returns {Promise<boolean>} True if the query was successfully performed, False otherwise
     */
    public async increasePerformerCount(id: number, queryRunner?: EntityManager): Promise<boolean>
    {
        const runner = queryRunner ?? this.eventRolesRepository;
        return (await runner.createQueryBuilder()
            .update(EventRoles)
            .set({
                performersCount: () => '"performersCount" + 1',
            })
            .where('id = :id', { id: id, })
            .execute()).raw.affectedRows > 0;
    }

    /**
     * Checks to see if there is an empty seat for the current role in the event
     *
     * @param  {number} eventId event Id
     *
     * @returns {Promise<boolean>} True if there is an empty seat, False otherwise
     */
    public async isThereEmptySeats(eventId: number): Promise<boolean>
    {
        return (await this.eventRolesRepository.createQueryBuilder('eventRole')
            .where('"eventRole"."eventId" = :eventId AND "eventRole"."performersCount" < "eventRole"."seats"', { eventId })
            .getOne()) !== null;
    }
}