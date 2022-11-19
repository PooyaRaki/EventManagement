import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TestAppDatabaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    dropSchema: true,
    synchronize: true,
    autoLoadEntities: true,
    host: process.env.POSTGRES_HOST,
    schema: `${process.env.POSTGRES_SCHEMA}_test`,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: ~~(process.env.POSTGRES_PORT || 5432),
    database: process.env.POSTGRES_DATABASE,
}