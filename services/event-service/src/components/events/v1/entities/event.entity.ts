import { EventStatus } from '@components/events/v1/enums';
import {
    Performers,
    EventRoles,
} from '@components/events/v1/entities/index';
import {
    Column,
    Entity,
    OneToMany,
    RelationId,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('event')
export class EventEntity {
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

    @Column({
        length: 200,
        type: 'varchar',
        nullable: false,
    })
    public readonly title: string;

    @Column({
        length: 1000,
        nullable: true,
        type: 'varchar',
    })
    public readonly description?: string;

    @Column({
        type: 'timestamp',
    })
    public readonly startedAt: Date;

    @CreateDateColumn({
        type: 'timestamp',
    })
    public readonly createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    public readonly updatedAt: Date;

    @Column({
        type: 'smallint',
        unsigned: true,
    })
    public readonly status: EventStatus;

    @OneToMany(
        () => EventRoles,
        (eventRoles: EventRoles) => eventRoles.event,
    )
    public readonly roles: EventRoles[];

    @RelationId(
        (eventEntity: EventEntity) => eventEntity.roles,
    )
    public readonly roleIds: number[];

    @OneToMany(
        () => Performers,
        (eventPerformers: Performers) => eventPerformers.event,
    )
    public readonly performers: Performers[];

    @RelationId(
        (eventEntity: EventEntity) => eventEntity.performers,
    )
    public readonly performerIds: number[];
}