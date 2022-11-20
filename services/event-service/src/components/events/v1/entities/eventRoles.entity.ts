import { Status } from '@utils/enums';
import {
    Performers,
    EventEntity,
} from '@components/events/v1/entities';
import {
    Index,
    Column,
    Entity,
    Unique,
    ManyToOne,
    OneToMany,
    RelationId,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Unique('EventInstrument', [ 'instrumentId', 'event' ])
@Index('PerformersSeat', [ 'seats', 'performersCount' ])
@Entity('eventRoles')
export class EventRoles {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    public readonly id: number;

    @Column({
        length: 24,
        unsigned: true,
        type: 'varchar',
        comment: 'id of instrument'
    })
    public readonly instrumentId: string;

    @Column({
        unsigned: true,
        type: 'smallint',
        comment: 'Number of performers each instrument can have',
    })
    public readonly seats: number;

    @Column({
        unsigned: true,
        type: 'smallint',
        comment: 'Number of performers participated',
    })
    public readonly performersCount: number;

    @Index('Status')
    @Column({
        unsigned: true,
        type: 'smallint',
    })
    public readonly status: Status;

    @ManyToOne(
        () => EventEntity,
        (eventEntity: EventEntity) => eventEntity.roles,
    )
    public readonly event: EventEntity;

    @RelationId(
        (eventRoles: EventRoles) => eventRoles.event,
    )
    public readonly eventId: number;

    @OneToMany(
        () => Performers,
        (eventPerformers: Performers) => eventPerformers.role,
    )
    public readonly performers: Performers[];

    @RelationId(
        (eventRoles: EventRoles) => eventRoles.performers,
    )
    public readonly performerIds: number;
}