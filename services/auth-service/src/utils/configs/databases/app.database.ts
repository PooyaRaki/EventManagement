import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const AppDatabaseConfig: PostgresConnectionOptions = {
    type: 'postgres',
    synchronize: false,
    host: process.env.POSTGRES_HOST,
    schema: process.env.POSTGRES_SCHEMA,
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: ~~(process.env.POSTGRES_PORT || 5432),
    migrations: [ 'dist/migrations/*{ .ts,.js}' ],
    entities: [ 'dist/components/**/*.entity{ .ts,.js}' ],
}