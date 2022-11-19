import { Status } from '@utils/enums';
import { Role } from '@components/user/v1/enums';
import {
    Index,
    Entity,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    public readonly id: number;

    @Index('Role')
    @Column({
        length: 50,
        type: 'varchar',
    })
    public readonly role: Role;

    @Index({
        unique: true,
    })
    @Column({
        length: 200,
        type: 'varchar',
    })
    public readonly email: string;

    @Index({
        unique: true,
    })
    @Column({
        length: 15,
        nullable: true,
        type: 'varchar',
    })
    public readonly phone?: string;

    @Column({
        length: 200,
        select: false,
        type: 'varchar',
    })
    public readonly salt: string;

    @Column({
        length: 200,
        select: false,
        type: 'varchar',
    })
    public readonly password: string;

    @CreateDateColumn({
        type: 'timestamp',
    })
    public readonly createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    public readonly updatedAt: Date;

    @Index()
    @Column({
        type: 'smallint',
        unsigned: true,
    })
    public readonly status: Status;
}