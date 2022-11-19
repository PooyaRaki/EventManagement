import { MigrationInterface, QueryRunner } from "typeorm";

export class performersCount1668871204347 implements MigrationInterface {
    name = 'performersCount1668871204347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Event"."eventRoles" ADD "performersCount" smallint NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Event"."eventRoles"."performersCount" IS 'Number of performers participated'`);
        await queryRunner.query(`CREATE INDEX "Status" ON "Event"."eventRoles" ("status") `);
        await queryRunner.query(`CREATE INDEX "PerformersSeat" ON "Event"."eventRoles" ("seats", "performersCount") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "Event"."PerformersSeat"`);
        await queryRunner.query(`DROP INDEX "Event"."Status"`);
        await queryRunner.query(`ALTER TABLE "Event"."eventRoles" DROP COLUMN "performersCount"`);
    }

}
