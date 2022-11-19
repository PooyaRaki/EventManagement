import { MigrationInterface, QueryRunner } from "typeorm";

export class instrumentId1668854933984 implements MigrationInterface {
    name = 'instrumentId1668854933984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Event"."eventRoles" DROP CONSTRAINT "EventInstrument"`);
        await queryRunner.query(`ALTER TABLE "Event"."eventRoles" ALTER COLUMN "instrumentId" TYPE character varying(24), ALTER COLUMN "instrumentId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event"."eventRoles" ADD CONSTRAINT "EventInstrument" UNIQUE ("instrumentId", "eventId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Event"."eventRoles" DROP CONSTRAINT "EventInstrument"`);
        await queryRunner.query(`ALTER TABLE "Event"."eventRoles" ALTER COLUMN "instrumentId" TYPE smallint, ALTER COLUMN "instrumentId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event"."eventRoles" ADD CONSTRAINT "EventInstrument" UNIQUE ("instrumentId", "eventId")`);
    }

}
