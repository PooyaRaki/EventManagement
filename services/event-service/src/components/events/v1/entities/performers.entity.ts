import {
    EventRoles,
    EventEntity,
} from '@components/events/v1/entities';
import {
    Column,
    Entity,
    Unique,
    ManyToOne,
    RelationId,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Unique('EventUserRole', [ 'userId', 'role', 'event' ])
@Entity('performers')
export class Performers {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    public readonly id: number;

    @Column({
        type: 'int',
        unsigned: true,
    })
    public readonly userId: number;

    @ManyToOne(
        () => EventRoles,
        (eventRoles: EventRoles) => eventRoles.performers
    )
    public readonly role: EventRoles;

    @RelationId(
        (eventPerformers: Performers) => eventPerformers.role,
    )
    public readonly roleId: number;

    @ManyToOne(
        () => EventEntity,
        (eventEntity: EventEntity) => eventEntity.performers,
    )
    public readonly event: EventEntity;

    @RelationId(
        (eventPerformers: Performers) => eventPerformers.event,
    )
    public readonly eventId: number;
}